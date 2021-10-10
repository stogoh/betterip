import { BaseOpts, throwOrNull } from './Options'
import { AddressRepresentation } from './Types'
import { IPV4, IPV4_DECIMAL_MAX, NETMASK } from './Utils'

class BipImpl {
    /**
     * Checks if the provided address is a valid IPv4 address.
     * @param netmask The IPv4 address to be validated
     * @returns True if the IPv4 is valid and false if not
     */
    isIPv4(address: string): boolean {
        return IPV4.test(address)
    }

    /**
     * Checks if the provided netmask is valid
     * @param netmask The netmasks to be validated
     * @returns True if the netmask is valid and false if not
     */
    isNetmask(netmask: string): boolean {
        return NETMASK.test(netmask)
    }

    /**
     * Checks if the given string is in CIDR notation
     * @param cidr The CIDR notation to be validated
     * @returns True if the passed string is in CIDR notation and false if not
     */
    isCidr(cidr: string): boolean | null {
        const cidrParts = cidr.split('/')
        if (cidrParts.length != 2) return false

        const address = cidrParts[0]
        const bits = Number(cidrParts[1])

        if (!this.isIPv4(address)) return false
        if (isNaN(bits) || bits < 0 || bits > 32) return false

        return true
    }

    /**
     * Gets all possible netmaks. This also includes netmasks for are not allowed for subnettting.
     * @returns All valid netmasks
     */
    netmasks(): string[] {
        const netmasks: string[] = []
        for (let b = 32; b >= 0; b--) {
            const maskString = this.toString(2 ** 32 - (2 ** b))
            if (maskString == null) return []

            netmasks.push(maskString)
        }
        return netmasks
    }

    /**
     * Gets the broadcast address for a specified IPv4 address.
     * @param address The IPv4 address to get the broadcast from
     * @param netmask The netmask in which the address is loacted in
     * @param opts Options used for getting the broadcast address
     * @returns The broadcast address for the specified address in the subnet
     */
    networkId(address: AddressRepresentation, netmask: AddressRepresentation, opts?: BaseOpts): string | null {
        const addressDec = this.toDecimal(address, opts)
        const netmaskDec = this.toDecimal(netmask, opts)
        if (addressDec == null || netmaskDec == null) return null

        return this.toString(addressDec & netmaskDec, opts)
    }

    /**
     * Gets the broadcast address for a specified IPv4 address.
     * @param address The IPv4 address to get the broadcast from
     * @param netmask The netmask in which the address is loacted in
     * @param opts Options used for getting the broadcast address
     * @returns The broadcast address for the specified address in the subnet
     */
    broadcast(address: AddressRepresentation, netmask: AddressRepresentation, opts?: BaseOpts): string | null {
        const addressDec = this.toDecimal(address, opts)
        const netmaskDec = this.toDecimal(netmask, opts)
        if (addressDec == null || netmaskDec == null) return null

        return this.toString(addressDec | ~netmaskDec, opts)
    }

    /**
     * Gets the host identifier for a specified IPv4 address.
     * @param address The IPv4 address to get the host identifier from
     * @param netmask The netmask in which the address is loacted in
     * @param opts Options used for getting the host identifier
     * @returns The host identifier for the specified address
     */
    hostId(address: AddressRepresentation, netmask: AddressRepresentation, opts?: BaseOpts): string | null {
        const addressDec = this.toDecimal(address, opts)
        const netmaskDec = this.toDecimal(netmask, opts)
        if (addressDec == null || netmaskDec == null) return null

        return this.toString(addressDec & ~netmaskDec, opts)
    }

    range(first: AddressRepresentation, last: AddressRepresentation): string[] {
        const firstDec = this.toDecimal(first)
        const lastDec = this.toDecimal(last)
        if (firstDec == null || lastDec == null) return []

        const addresses: string[] = []

        for (let i = firstDec; i <= lastDec; i++) {
            const address = this.toString(i)
            if (address == null) return []
            addresses.push(address)
        }

        return addresses
    }

    /**
     * Converts an address to its decimal representation.
     * @param value The address to be converted
     * @param opts Options used for the conversion
     * @returns The provided address as an unsigned integer
     */
    toDecimal(value: AddressRepresentation, opts?: BaseOpts): number | null {
        if (value == null || value == undefined) return null

        if (typeof value == 'number') {

            if (value <= - (2 ** 32) || value > IPV4_DECIMAL_MAX) {
                return throwOrNull(opts, 'Validation failed. Decimal value must be within 0 and 2^32')
            }

            return value >>> 0
        }

        const valueBytes = typeof value == 'string'
            ? value.split('.').map(x => x == null || x.length == 0 ? null : Number(x))
            : value

        if (valueBytes.length != 4) {
            return throwOrNull(opts, 'Validation failed. Addess must contain 4 octets')
        }

        let decValue = 0
        for (let index = 0; index < valueBytes.length; index++) {
            const octet = valueBytes[index]

            if (octet == null || isNaN(octet)) {
                return throwOrNull(opts, `Validation failed. Octet ${index} is not an integer`)
            }

            if (octet < 0 || octet > 255) {
                return throwOrNull(opts, `Validation failed. Invalid value in octet ${index}: ${octet}`)
            }

            decValue <<= 8
            decValue |= octet & 0xFF
        }

        return decValue >>> 0
    }

    /**
     * Converts an address into dot decimal notation.
     * If a string is passed it will be sanitized.
     * @param address The address to be converted
     * @returns The address as dot decimal notation
     */
    toString(address: AddressRepresentation, opts?: BaseOpts): string | null {
        const addressOctets = this.toOctets(address, opts)
        if (addressOctets == null) return null

        return addressOctets.join('.')
    }

    /**
     * Converts an address into an octet array.
     * @param address The address to be converted
     * @returns The address as an octet array
     */
    toOctets(address: AddressRepresentation, opts?: BaseOpts): number[] | null {
        const addressDec = this.toDecimal(address, opts)
        if (addressDec == null) return null

        return [
            (addressDec >> 24) & 0xFF,
            (addressDec >> 16) & 0xFF,
            (addressDec >> 8) & 0xFF,
            addressDec & 0xFF
        ]
    }
}

export const Bip: BipImpl = new BipImpl()