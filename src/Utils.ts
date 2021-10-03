const IPV4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const CIDR = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\s?\/(?:[0-9]|1[0-9]|2[0-9]|3[0-2])$/

export function isIPv4(address: string): boolean {
    return IPV4.test(address)
}

export function isCidrNotation(address: string): boolean {
    return CIDR.test(address)
}