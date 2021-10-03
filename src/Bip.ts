interface BipFunctions {
    isIPv4(address: string): boolean

    isNetmask(netmask: string): boolean

    netmasks(): string[]

    toBytes(value: number): number[]

    toString(octets: number[]): string
}

class BipImpl implements BipFunctions {
    isIPv4(address: string): boolean {
        return IPV4.test(address)
    }

    isNetmask(netmask: string): boolean {
        return NETMASK.test(netmask)
    }

    netmasks(): string[] {
        const netmasks: string[] = []

        for (let b = 31; b >= 0; b--) {
            netmasks.push(this.toBytes(2 ** 32 - (2 ** b)).join('.'))
        }

        return netmasks
    }

    toBytes(value: number): number[] {
        if (value < 0) return null
        if (value > 2 ** 32 - 1) return null

        return [
            value >> 24 & 0xFF,
            value >> 16 & 0xFF,
            value >> 8 & 0xFF,
            value & 0xFF
        ]
    }

    toString(octets: number[]): string {
        return octets.join('.')
    }
}

export const Bip: BipImpl = new BipImpl()