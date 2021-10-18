/* eslint-disable @typescript-eslint/no-unused-vars */
export const IPV4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
export const NETMASK = /^((0|128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0)|255\.(0|128|192|224|240|248|252|254|255)))))$/
export const IPV4_DECIMAL_MIN = 0
export const IPV4_DECIMAL_MAX = 2 ** 32 - 1

export const NETMASKS = [
    [0, 0, 0, 0],
    [128, 0, 0, 0],
    [192, 0, 0, 0],
    [224, 0, 0, 0],
    [240, 0, 0, 0],
    [248, 0, 0, 0],
    [252, 0, 0, 0],
    [254, 0, 0, 0],
    [255, 0, 0, 0],
    [255, 128, 0, 0],
    [255, 192, 0, 0],
    [255, 224, 0, 0],
    [255, 240, 0, 0],
    [255, 248, 0, 0],
    [255, 252, 0, 0],
    [255, 254, 0, 0],
    [255, 255, 0, 0],
    [255, 255, 128, 0],
    [255, 255, 192, 0],
    [255, 255, 224, 0],
    [255, 255, 240, 0],
    [255, 255, 248, 0],
    [255, 255, 252, 0],
    [255, 255, 254, 0],
    [255, 255, 255, 0],
    [255, 255, 255, 128],
    [255, 255, 255, 192],
    [255, 255, 255, 224],
    [255, 255, 255, 240],
    [255, 255, 255, 248],
    [255, 255, 255, 252],
    [255, 255, 255, 254],
    [255, 255, 255, 255]
]