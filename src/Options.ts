
export interface BaseOpts {
    throw: boolean
}

export const throwOrNull = (opts?: BaseOpts, message?: string): null => {
    if (opts && opts.throw) {
        throw new Error(message)
    }

    return null
}