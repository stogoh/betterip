import { expect } from 'chai'
import { IPv4 } from '../src/IPv4'

describe('IPv4.isIPv4()', () => {
    it('Should return a number', () => {
        expect(IPv4.isIPv4([10, 12, 30, 40])).to.be.a('boolean')
    })

    it('Should return false for an invalid IPv4 address', () => {
        expect(IPv4.isIPv4([-10, 20, 30, 40])).to.be.false
        expect(IPv4.isIPv4([1000, 20, 30, 40])).to.be.false
        expect(IPv4.isIPv4([10, 20, 30])).to.be.false
        expect(IPv4.isIPv4([10, 20, 30, 40, 50])).to.be.false
        expect(IPv4.isIPv4(null)).to.be.false
    })

    it('Should return true for valid addresses', () => {
        expect(IPv4.isIPv4([0, 0, 0, 0])).to.be.true
        expect(IPv4.isIPv4([10, 20, 30, 40])).to.be.true
        expect(IPv4.isIPv4([255, 255, 255, 255])).to.be.true
    })
})

describe('IPv4.isNetmask()', () => {
    it('Should return true for valid netmasks', () => {
        expect(IPv4.isNetmask([0, 0, 0, 0])).to.be.true
        expect(IPv4.isNetmask([128, 0, 0, 0])).to.be.true
        expect(IPv4.isNetmask([192, 0, 0, 0])).to.be.true
        expect(IPv4.isNetmask([224, 0, 0, 0])).to.be.true
        expect(IPv4.isNetmask([240, 0, 0, 0])).to.be.true
        expect(IPv4.isNetmask([248, 0, 0, 0])).to.be.true
        expect(IPv4.isNetmask([252, 0, 0, 0])).to.be.true
        expect(IPv4.isNetmask([254, 0, 0, 0])).to.be.true
        expect(IPv4.isNetmask([255, 0, 0, 0])).to.be.true
        expect(IPv4.isNetmask([255, 128, 0, 0])).to.be.true
        expect(IPv4.isNetmask([255, 192, 0, 0])).to.be.true
        expect(IPv4.isNetmask([255, 224, 0, 0])).to.be.true
        expect(IPv4.isNetmask([255, 240, 0, 0])).to.be.true
        expect(IPv4.isNetmask([255, 248, 0, 0])).to.be.true
        expect(IPv4.isNetmask([255, 252, 0, 0])).to.be.true
        expect(IPv4.isNetmask([255, 254, 0, 0])).to.be.true
        expect(IPv4.isNetmask([255, 255, 0, 0])).to.be.true
        expect(IPv4.isNetmask([255, 255, 128, 0])).to.be.true
        expect(IPv4.isNetmask([255, 255, 192, 0])).to.be.true
        expect(IPv4.isNetmask([255, 255, 224, 0])).to.be.true
        expect(IPv4.isNetmask([255, 255, 240, 0])).to.be.true
        expect(IPv4.isNetmask([255, 255, 248, 0])).to.be.true
        expect(IPv4.isNetmask([255, 255, 252, 0])).to.be.true
        expect(IPv4.isNetmask([255, 255, 254, 0])).to.be.true
        expect(IPv4.isNetmask([255, 255, 255, 0])).to.be.true
        expect(IPv4.isNetmask([255, 255, 255, 128])).to.be.true
        expect(IPv4.isNetmask([255, 255, 255, 192])).to.be.true
        expect(IPv4.isNetmask([255, 255, 255, 224])).to.be.true
        expect(IPv4.isNetmask([255, 255, 255, 240])).to.be.true
        expect(IPv4.isNetmask([255, 255, 255, 248])).to.be.true
        expect(IPv4.isNetmask([255, 255, 255, 252])).to.be.true
        expect(IPv4.isNetmask([255, 255, 255, 254])).to.be.true
        expect(IPv4.isNetmask([255, 255, 255, 255])).to.be.true
    })

    it('Should return false for invalid netmasks', () => {
        expect(IPv4.isNetmask([255, 255, 0, 255])).to.be.false
        expect(IPv4.isNetmask([255, 255, 0])).to.be.false
        expect(IPv4.isNetmask([255, 255, 0, 0, 0])).to.be.false
        expect(IPv4.isNetmask([0, 0, 0, 255])).to.be.false
        expect(IPv4.isNetmask([255, -1, 0, 0])).to.be.false
        expect(IPv4.isNetmask(null)).to.be.false
    })
})

describe('IPv4.networkId()', () => {
    it('Should return an octet array', () => {
        expect(IPv4.networkId([10, 20, 30, 40], [255, 255, 0, 0])).to.have.lengthOf(4)
    })

    it('Should return null if one of the args is null', () => {
        expect(IPv4.networkId([10, 20, 30, 40], null)).to.equal(null)
        expect(IPv4.networkId(null, [255, 255, 0, 0])).to.equal(null)
        expect(IPv4.networkId(null, null)).to.equal(null)
    })

    it('Should return null if one of the args is invalid', () => {
        expect(IPv4.networkId([10, 20, 30, 40], [])).to.equal(null)
        expect(IPv4.networkId([10, 20, 30, 40], [255, 255, 0, 255])).to.equal(null)
        expect(IPv4.networkId([-10, -20, -30, -40], [255, 255, 0, 0])).to.equal(null)
        expect(IPv4.networkId(null, null)).to.equal(null)
    })

    it('Should return the network identifer', () => {
        expect(IPv4.networkId([10, 20, 30, 40], [255, 0, 0, 0])).to.deep.equal([10, 0, 0, 0])
        expect(IPv4.networkId([10, 20, 30, 40], [255, 255, 0, 0])).to.deep.equal([10, 20, 0, 0])
        expect(IPv4.networkId([10, 20, 30, 40], [255, 255, 255, 0])).to.deep.equal([10, 20, 30, 0])
        expect(IPv4.networkId([10, 20, 30, 40], [255, 255, 255, 255])).to.deep.equal([10, 20, 30, 40])
    })
})

describe('IPv4.broadcast()', () => {
    it('Should return an octet array', () => {
        expect(IPv4.broadcast([10, 20, 30, 40], [255, 255, 0, 0])).to.have.lengthOf(4)
    })

    it('Should return null if one of the args is null', () => {
        expect(IPv4.broadcast([10, 20, 30, 40], null)).to.equal(null)
        expect(IPv4.broadcast(null, [255, 255, 0, 0])).to.equal(null)
        expect(IPv4.broadcast(null, null)).to.equal(null)
    })

    it('Should return null if one of the args is invalid', () => {
        expect(IPv4.broadcast([10, 20, 30, 40], [])).to.equal(null)
        expect(IPv4.broadcast([10, 20, 30, 40], [255, 255, 0, 255])).to.equal(null)
        expect(IPv4.broadcast([-10, -20, -30, -40], [255, 255, 0, 0])).to.equal(null)
        expect(IPv4.broadcast(null, null)).to.equal(null)
    })

    it('Should return the broadcast address', () => {
        expect(IPv4.broadcast([10, 20, 30, 40], [255, 0, 0, 0])).to.deep.equal([10, 255, 255, 255])
        expect(IPv4.broadcast([10, 20, 30, 40], [255, 255, 0, 0])).to.deep.equal([10, 20, 255, 255])
        expect(IPv4.broadcast([10, 20, 30, 40], [255, 255, 255, 0])).to.deep.equal([10, 20, 30, 255])
        expect(IPv4.broadcast([10, 20, 30, 40], [255, 255, 255, 255])).to.deep.equal([10, 20, 30, 40])
    })
})

describe('IPv4.hostId()', () => {
    it('Should return an octet array', () => {
        expect(IPv4.hostId([10, 20, 30, 40], [255, 255, 0, 0])).to.have.lengthOf(4)
    })

    it('Should return null if one of the args is null', () => {
        expect(IPv4.hostId([10, 20, 30, 40], null)).to.equal(null)
        expect(IPv4.hostId(null, [255, 255, 0, 0])).to.equal(null)
        expect(IPv4.hostId(null, null)).to.equal(null)
    })

    it('Should return null if one of the args is invalid', () => {
        expect(IPv4.hostId([10, 20, 30, 40], [])).to.equal(null)
        expect(IPv4.hostId([10, 20, 30, 40], [255, 255, 0, 255])).to.equal(null)
        expect(IPv4.hostId([-10, -20, -30, -40], [255, 255, 0, 0])).to.equal(null)
        expect(IPv4.hostId(null, null)).to.equal(null)
    })

    it('Should return the host identifer', () => {
        expect(IPv4.hostId([10, 20, 30, 40], [0, 0, 0, 0])).to.deep.equal([10, 20, 30, 40])
        expect(IPv4.hostId([10, 20, 30, 40], [255, 0, 0, 0])).to.deep.equal([0, 20, 30, 40])
        expect(IPv4.hostId([10, 20, 30, 40], [255, 255, 0, 0])).to.deep.equal([0, 0, 30, 40])
        expect(IPv4.hostId([10, 20, 30, 40], [255, 255, 255, 0])).to.deep.equal([0, 0, 0, 40])
        expect(IPv4.hostId([10, 20, 30, 40], [255, 255, 255, 255])).to.deep.equal([0, 0, 0, 0])
    })
})

describe('IPv4.range()', () => {
    it('Should return an octet array', () => {
        expect(IPv4.range([10, 20, 30, 40], [10, 20, 30, 50])).to.have.length(11)
        expect(IPv4.range([10, 20, 30, 40], [10, 20, 30, 40])[0]).to.have.length(4)
        expect(IPv4.range([10, 20, 30, 40], [10, 20, 30, 40])[0][0]).to.be.a('number')
    })

    it('Should return an empty array if the last parameter is lower', () => {
        expect(IPv4.range([10, 20, 30, 50], [10, 20, 30, 40])).to.deep.equal([])
    })

    it('Shoul return the correct range as an octet array', () => {
        expect(IPv4.range([10, 20, 30, 40], [10, 20, 30, 50])).to.deep.equal([
            [10, 20, 30, 40],
            [10, 20, 30, 41],
            [10, 20, 30, 42],
            [10, 20, 30, 43],
            [10, 20, 30, 44],
            [10, 20, 30, 45],
            [10, 20, 30, 46],
            [10, 20, 30, 47],
            [10, 20, 30, 48],
            [10, 20, 30, 49],
            [10, 20, 30, 50]
        ])
        expect(IPv4.range([0, 0, 0, 0], [0, 0, 0, 0])).to.deep.equal([
            [0, 0, 0, 0]
        ])
        expect(IPv4.range([10, 0, 0, 254], [10, 0, 1, 2])).to.deep.equal([
            [10, 0, 0, 254],
            [10, 0, 0, 255],
            [10, 0, 1, 0],
            [10, 0, 1, 1],
            [10, 0, 1, 2]
        ])
    })
})

describe('IPv4.contains()', () => {
    it('Should return an octet array', () => {
        expect(IPv4.contains([10, 20, 30, 40], [255, 255, 255, 0], [10, 20, 30, 50])).to.be.a('boolean')
    })

    it('Should return false for invalid parameters', () => {
        expect(IPv4.contains([10, 20, 30, -1], [255, 255, 255, 0], [10, 20, 30, 50])).to.be.false
        expect(IPv4.contains([10, 20, 30, 40], [255, 255, 0, 255], [10, 20, 30, 50])).to.be.false
        expect(IPv4.contains([10, 20, 30, 40], [255, 255, 255, 0], [10, 20, 30])).to.be.false
    })

    it('Should return false for addresses outside the specified subnet', () => {
        expect(IPv4.contains([10, 20, 30, 40], [255, 255, 255, 0], [10, 20, 31, 40])).to.be.false
        expect(IPv4.contains([10, 20, 30, 0], [255, 255, 255, 252], [10, 20, 30, 255])).to.be.false
        expect(IPv4.contains([10, 20, 30, 40], [255, 0, 0, 0], [11, 100, 100, 100])).to.be.false
    })

    it('Should return true for addresses inside the specified subnet', () => {
        expect(IPv4.contains([192, 168, 0, 1], [255, 255, 255, 0], [192, 168, 0, 100])).to.be.true
        expect(IPv4.contains([192, 168, 0, 1], [255, 255, 255, 248], [192, 168, 0, 3])).to.be.true
        expect(IPv4.contains([192, 168, 0, 1], [255, 255, 128, 0], [192, 168, 62, 100])).to.be.true
    })
})

describe('IPv4.next()', () => {
    it('Should return an octet array', () => {
        expect(IPv4.next([0, 0, 0, 0])).to.have.length(4)
        IPv4.next([0, 0, 0, 0]).forEach(o => expect(o).to.be.a('number'))
    })

    it('Should return null for an invalid address', () => {
        expect(IPv4.next([256, 256, 256, 256])).to.be.null
        expect(IPv4.next([10, 20, 30])).to.be.null
        expect(IPv4.next([10, 20, 30, 40, 50])).to.be.null
        expect(IPv4.next(null)).to.be.null
    })

    it('Should retun null if the last valid IPv4 address is exceeded', () => {
        expect(IPv4.next([255, 255, 255, 255])).to.be.null
    })

    it('Should return next next address', () => {
        expect(IPv4.next([0, 0, 0, 0])).to.deep.equal([0, 0, 0, 1])
        expect(IPv4.next([0, 0, 0, 255])).to.deep.equal([0, 0, 1, 0])
        expect(IPv4.next([0, 255, 255, 255])).to.deep.equal([1, 0, 0, 0])
    })
})

describe('IPv4.previous()', () => {
    it('Should return an octet array', () => {
        expect(IPv4.previous([255, 255, 255, 255])).to.have.length(4)
        IPv4.previous([255, 255, 255, 255]).forEach(o => expect(o).to.be.a('number'))
    })

    it('Should return null for an invalid address', () => {
        expect(IPv4.previous([256, 256, 256, 256])).to.be.null
        expect(IPv4.previous([10, 20, 30])).to.be.null
        expect(IPv4.previous([10, 20, 30, 40, 50])).to.be.null
        expect(IPv4.previous(null)).to.be.null
    })

    it('Should retun null if the first valid IPv4 address is exceeded', () => {
        expect(IPv4.previous([0, 0, 0, 0])).to.be.null
    })

    it('Should return next previous address', () => {
        expect(IPv4.previous([255, 255, 255, 255])).to.deep.equal([255, 255, 255, 254])
        expect(IPv4.previous([0, 0, 1, 0])).to.deep.equal([0, 0, 0, 255])
        expect(IPv4.previous([1, 0, 0, 0])).to.deep.equal([0, 255, 255, 255])
    })
})