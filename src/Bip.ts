import { AddressRepresentation } from './Types'
import { IPV4, NETMASK } from './Utils'

class BipImpl {
    isIPv4(address: string): boolean {
        return IPV4.test(address)
    }

    isNetmask(netmask: string): boolean {
        return NETMASK.test(netmask)
    }

    netmasks(): string[] {
        const netmasks: string[] = []
        for (let b = 32; b >= 0; b--) {
            netmasks.push(this.toString(this.toBytes(2 ** 32 - (2 ** b))))
        }
        return netmasks
    }

    networkId(address: AddressRepresentation, netmask: AddressRepresentation): string {
        const addressDec = this.toDecimal(address)
        const netmaskDec = this.toDecimal(netmask)

        return this.toString(addressDec & netmaskDec)
    }

    broadcast(address: AddressRepresentation, netmask: AddressRepresentation): string {
        const addressDec = this.toDecimal(address)
        const netmaskDec = this.toDecimal(netmask)

        return this.toString(addressDec | ~netmaskDec)
    }

    hostId(address: AddressRepresentation, netmask: AddressRepresentation): string {
        const addressDec = this.toDecimal(address)
        const netmaskDec = this.toDecimal(netmask)

        return this.toString(addressDec & ~netmaskDec)
    }

    private toBytes(value: number): number[] {
        return [
            (value >> 24) & 0xFF,
            (value >> 16) & 0xFF,
            (value >> 8) & 0xFF,
            value & 0xFF
        ]
    }

    private toDecimal(value: AddressRepresentation): number {
        if (typeof value == 'number') {
            return value
        }

        const valueBytes = typeof value == 'string'
            ? value.split('.').map(x => Number(x))
            : value

        return (valueBytes[0] & 0xFF) << 24
            | (valueBytes[1] & 0xFF) << 16
            | (valueBytes[2] & 0xFF) << 8
            | (valueBytes[3] & 0xFF)
    }

    private toString(address: number | number[]): string {
        if (typeof address == 'number')
            return this.toString(this.toBytes(address))

        return address.join('.')
    }
}

export const Bip: BipImpl = new BipImpl()