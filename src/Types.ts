export type NetmaskDotDecimalFormat =
    '0.0.0.0'
    | '128.0.0.0'
    | '192.0.0.0'
    | '224.0.0.0'
    | '240.0.0.0'
    | '248.0.0.0'
    | '252.0.0.0'
    | '254.0.0.0'
    | '255.0.0.0'
    | '255.128.0.0'
    | '255.192.0.0'
    | '255.224.0.0'
    | '255.240.0.0'
    | '255.248.0.0'
    | '255.252.0.0'
    | '255.254.0.0'
    | '255.255.0.0'
    | '255.255.128.0'
    | '255.255.192.0'
    | '255.255.224.0'
    | '255.255.240.0'
    | '255.255.248.0'
    | '255.255.252.0'
    | '255.255.254.0'
    | '255.255.255.0'
    | '255.255.255.128'
    | '255.255.255.192'
    | '255.255.255.224'
    | '255.255.255.240'
    | '255.255.255.248'
    | '255.255.255.252'
    | '255.255.255.254'
    | '255.255.255.255'

export type NetmaskCidrFormat =
    '/0'
    | '/1'
    | '/2'
    | '/3'
    | '/4'
    | '/5'
    | '/6'
    | '/7'
    | '/8'
    | '/9'
    | '/10'
    | '/11'
    | '/12'
    | '/13'
    | '/14'
    | '/15'
    | '/16'
    | '/17'
    | '/18'
    | '/19'
    | '/20'
    | '/21'
    | '/22'
    | '/23'
    | '/24'
    | '/25'
    | '/26'
    | '/27'
    | '/28'
    | '/29'
    | '/30'
    | '/31'
    | '/32'

export type AddressSpace =
    'public'
    | 'private'
    | 'link-local'

export type AddressRepresentation = string | number | number[]