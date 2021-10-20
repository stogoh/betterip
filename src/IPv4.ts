import { Bip } from './Bip'
import { and, areEqual, not, or } from './OctetArray'
import { IPV4_DECIMAL_MAX, IPV4_DECIMAL_MIN, NETMASKS } from './Utils'

class IPv4Impl {
    isIPv4(address: number[]): boolean {
        if (address == null) return false
        if (address.length != 4) return false
        if (address.some(o => o < 0 || o > 255)) return false

        return true
    }

    isNetmask(netmask: number[]): boolean {
        if (netmask == null) return false
        if (!this.isIPv4(netmask)) return false

        for (let i = 0; i < NETMASKS.length; i++) {
            if (areEqual(netmask, NETMASKS[i])) {
                return true
            }
        }

        return false
    }

    networkId(address: number[], netmask: number[]): number[] | null {
        if (address == null || netmask == null) return null
        if (!this.isIPv4(address) || !this.isNetmask(netmask)) return null

        return and(address, netmask)
    }

    broadcast(address: number[], netmask: number[]): number[] | null {
        if (address == null || netmask == null) return null
        if (!this.isIPv4(address) || !this.isNetmask(netmask)) return null

        return or(address, not(netmask))
    }

    hostId(address: number[], netmask: number[]): number[] | null {
        if (address == null || netmask == null) return null
        if (!this.isIPv4(address) || !this.isNetmask(netmask)) return null

        return and(address, not(netmask))
    }

    range(first: number[], last: number[]): number[][] {
        const firstDec = Bip.toDecimal(first)
        const lastDec = Bip.toDecimal(last)
        const addresses: number[][] = []

        if (firstDec == null || lastDec == null) return []
        if (lastDec < firstDec) return []

        for (let i = firstDec; i <= lastDec; i++) {
            addresses.push(Bip.toOctets(i))
        }

        return addresses
    }

    contains(network: number[], netmask: number[], address: number[]): boolean {
        const networkId = this.networkId(network, netmask)
        const broadcast = this.broadcast(network, netmask)
        if (networkId == null || broadcast == null) return false

        const networkIdDec = Bip.toDecimal(networkId)
        const broadcastDec = Bip.toDecimal(broadcast)
        const addressDec = Bip.toDecimal(address)
        if (networkIdDec == null || broadcastDec == null || addressDec == null) return false

        return addressDec >= networkIdDec && addressDec <= broadcastDec
    }

    netmaskFromBits(bits: number): number | null {
        if (bits < 0 || bits > 32) return null

        return 2 ** 32 - 2 ** (32 - bits)
    }

    next(address: number[], netmask?: number[]): number[] | null {
        if (!this.isIPv4(address)) return null

        const addressDec = Bip.toDecimal(address)
        const nextAddressDec = addressDec + 1
        if (nextAddressDec > IPV4_DECIMAL_MAX) return null

        return Bip.toOctets(nextAddressDec)
    }

    previous(address: number[], netmask?: number[]): number[] | null {
        if (!this.isIPv4(address)) return null

        const addressDec = Bip.toDecimal(address)
        const prevAddressDec = addressDec - 1
        if (prevAddressDec < IPV4_DECIMAL_MIN) return null

        return Bip.toOctets(prevAddressDec)
    }
}

export const IPv4: IPv4Impl = new IPv4Impl()