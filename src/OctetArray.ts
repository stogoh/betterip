export function not(a: number[]): number[] | null {
    if (a == null) return null
    const result: number[] = [a.length]

    for (let o = 0; o < a.length; o++) {
        result[o] = ~a[o] & 0xFF
    }

    return result
}

export function and(a: number[], b: number[]): number[] | null {
    if (a == null || b == null) return null
    const result: number[] = [a.length]

    for (let o = 0; o < a.length; o++) {
        result[o] = (a[o] & 0xFF) & (b[o] & 0xFF)
    }

    return result
}

export function or(a: number[], b: number[]): number[] | null {
    if (a == null || b == null) return null
    const result: number[] = [a.length]

    for (let o = 0; o < a.length; o++) {
        result[o] = (a[o] & 0xFF) | (b[o] & 0xFF)
    }

    return result
}

export function xor(a: number[], b: number[]): number[] | null {
    if (a == null || b == null) return null
    const result: number[] = [a.length]

    for (let o = 0; o < a.length; o++) {
        result[o] = (a[o] & 0xFF) ^ (b[o] & 0xFF)
    }

    return result
}

export function areEqual(a: number[], b: number[]): boolean | null {
    if (a == null || b == null) return null
    if (a.length != b.length) return false

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false
        }
    }

    return true
}