interface BipFunctions {

    isIPv4(address: string): boolean

    isIPv6(address: string): boolean

    isNetmask(netmask: string): boolean

    networkId(address: string): boolean

    sameSubnet(addresses: string[]): boolean

}

class BipRoot implements BipFunctions {
    isIPv4(address: string): boolean {
        throw new Error('Method not implemented.')
    }
    isIPv6(address: string): boolean {
        throw new Error('Method not implemented.')
    }
    isNetmask(netmask: string): boolean {
        throw new Error('Method not implemented.')
    }
    networkId(address: string): boolean {
        throw new Error('Method not implemented.')
    }
    sameSubnet(addresses: string[]): boolean {
        throw new Error('Method not implemented.')
    }
}

declare const Bip: BipRoot

//////////////////////////////////////////////////
//              Implementation          //////////
//////////////////////////////////////////////////


Bip.sameSubnet(['asdasd', 'assdf'])