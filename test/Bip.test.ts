import { expect } from 'chai'
import { Bip } from '../src/Bip'

const NETMASKS = [
    '0.0.0.0',
    '128.0.0.0',
    '192.0.0.0',
    '224.0.0.0',
    '240.0.0.0',
    '248.0.0.0',
    '252.0.0.0',
    '254.0.0.0',
    '255.0.0.0',
    '255.128.0.0',
    '255.192.0.0',
    '255.224.0.0',
    '255.240.0.0',
    '255.248.0.0',
    '255.252.0.0',
    '255.254.0.0',
    '255.255.0.0',
    '255.255.128.0',
    '255.255.192.0',
    '255.255.224.0',
    '255.255.240.0',
    '255.255.248.0',
    '255.255.252.0',
    '255.255.254.0',
    '255.255.255.0',
    '255.255.255.128',
    '255.255.255.192',
    '255.255.255.224',
    '255.255.255.240',
    '255.255.255.248',
    '255.255.255.252',
    '255.255.255.254',
    '255.255.255.255'
]

describe('Bip.toDecimal()', () => {
    it('Should return a number', () => {
        expect(Bip.toDecimal(0)).to.be.a('number')
        expect(Bip.toDecimal(65535)).to.be.a('number')
        expect(Bip.toDecimal([0, 0, 0, 0])).to.be.a('number')
        expect(Bip.toDecimal([0, 0, 255, 255])).to.be.a('number')
        expect(Bip.toDecimal('0.0.0.0')).to.be.a('number')
        expect(Bip.toDecimal('0.0.255.255')).to.be.a('number')
    })

    it('Should accept decimal', () => {
        expect(Bip.toDecimal(0)).to.equal(0)
        expect(Bip.toDecimal(65535)).to.equal(65535)
        expect(Bip.toDecimal(2 ** 32 - 1)).to.equal(2 ** 32 - 1)
    })

    it('Should accept octet array', () => {
        expect(Bip.toDecimal([0, 0, 0, 0])).to.equal(0)
        expect(Bip.toDecimal([0, 0, 255, 255])).to.equal(65535)
        expect(Bip.toDecimal([255, 255, 255, 255])).to.equal(2 ** 32 - 1)
    })

    it('Should accept dot-decimal notation', () => {
        expect(Bip.toDecimal('0.0.0.0')).to.equal(0)
        expect(Bip.toDecimal('0.0.255.255')).to.equal(65535)
        expect(Bip.toDecimal('255.255.255.255')).to.equal(2 ** 32 - 1)
    })

    it('Should return null for invalid input', () => {
        expect(Bip.toDecimal(-(2 ** 32))).to.be.null
        expect(Bip.toDecimal(2 ** 33)).to.be.null
        expect(Bip.toDecimal([255, 255, 511, 0])).to.be.null
        expect(Bip.toDecimal([255, 255, 0])).to.be.null
        expect(Bip.toDecimal([255, 255, 0, 0, 0])).to.be.null
        expect(Bip.toDecimal(-(2 ** 32))).to.be.null
        expect(Bip.toDecimal(2 ** 33)).to.be.null
        expect(Bip.toDecimal('an.invalid.ipv4.address')).to.be.null
    })

    it('Should throw for invalid input with { throw: true } option', () => {
        expect(() => Bip.toDecimal(-(2 ** 32), { throw: true })).to.throw()
        expect(() => Bip.toDecimal(2 ** 33, { throw: true })).to.throw()
        expect(() => Bip.toDecimal([255, 255, 511, 0], { throw: true })).to.throw()
        expect(() => Bip.toDecimal([255, 255, 0], { throw: true })).to.throw()
        expect(() => Bip.toDecimal([255, 255, 0, 0, 0], { throw: true })).to.throw()
        expect(() => Bip.toDecimal(-(2 ** 32), { throw: true })).to.throw()
        expect(() => Bip.toDecimal(2 ** 33, { throw: true })).to.throw()
        expect(() => Bip.toDecimal('an.invalid.ipv4.address', { throw: true })).to.throw()
    })
})

describe('Bip.toString()', () => {
    it('Should return a string', () => {
        expect(Bip.toString(0)).to.be.a('string')
        expect(Bip.toString(65535)).to.be.a('string')
        expect(Bip.toString([0, 0, 0, 0])).to.be.a('string')
        expect(Bip.toString([0, 0, 255, 255])).to.be.a('string')
        expect(Bip.toString('0.0.0.0')).to.be.a('string')
        expect(Bip.toString('0.0.255.255')).to.be.a('string')
    })

    it('Should accept string', () => {
        expect(Bip.toString('0.0.0.0')).to.equal('0.0.0.0')
        expect(Bip.toString('0.0.255.255')).to.equal('0.0.255.255')
        expect(Bip.toString('255.255.255.255')).to.equal('255.255.255.255')
        expect(Bip.toString('192.168.0.1')).to.equal('192.168.0.1')
        expect(Bip.toString('192.168.000.001')).to.equal('192.168.0.1')
        expect(Bip.toString('192.168.0000.01')).to.equal('192.168.0.1')
    })

    it('Should accept decimal', () => {
        expect(Bip.toString(0)).to.equal('0.0.0.0')
        expect(Bip.toString(65535)).to.equal('0.0.255.255')
        expect(Bip.toString(2 ** 32 - 1)).to.equal('255.255.255.255')
    })

    it('Should accept octet array', () => {
        expect(Bip.toString([0, 0, 0, 0])).to.equal('0.0.0.0')
        expect(Bip.toString([0, 0, 255, 255])).to.equal('0.0.255.255')
        expect(Bip.toString([255, 255, 255, 255])).to.equal('255.255.255.255')
    })

    it('Should return null for invalid input', () => {
        expect(Bip.toString(-(2 ** 32))).to.be.null
        expect(Bip.toString(2 ** 32)).to.be.null
        expect(Bip.toString([10, 20, 30, 400])).to.be.null
        expect(Bip.toString([10, 20, 30])).to.be.null
        expect(Bip.toString([10, 20, 30, 40, 50])).to.be.null
        expect(Bip.toString([10, 20, 30, null])).to.be.null
        expect(Bip.toString([10, 20, 30, undefined])).to.be.null
        expect(Bip.toString('10.20.30.400')).to.be.null
        expect(Bip.toString('10.20.30.')).to.be.null
        expect(Bip.toString('10.20.30.40.50')).to.be.null
        expect(Bip.toString('10-20-30-40-50')).to.be.null
    })

    it('Should throw for invalid input with { throw: true } option', () => {
        expect(() => Bip.toString(-(2 ** 32), { throw: true })).to.throw()
        expect(() => Bip.toString(2 ** 32, { throw: true })).to.throw()
        expect(() => Bip.toString([10, 20, 30, 500], { throw: true })).to.throw()
        expect(() => Bip.toString([10, 20, 30], { throw: true })).to.throw()
        expect(() => Bip.toString([10, 20, 30, 40, 50], { throw: true })).to.throw()
        expect(() => Bip.toString([10, 20, 30, null], { throw: true })).to.throw()
        expect(() => Bip.toString([10, 20, 30, undefined], { throw: true })).to.throw()
        expect(() => Bip.toString('10.20.30.400', { throw: true })).to.throw()
        expect(() => Bip.toString('10.20.30.', { throw: true })).to.throw()
        expect(() => Bip.toString('10.20.30.40.50', { throw: true })).to.throw()
        expect(() => Bip.toString('10-20-30-40-50', { throw: true })).to.throw()
    })
})

describe('Bip.toOctets()', () => {
    it('Should return an octet array with length of 4', () => {
        expect(Bip.toOctets(0)).to.have.lengthOf(4)
        expect(Bip.toOctets(65535)).to.have.lengthOf(4)
        expect(Bip.toOctets([0, 0, 0, 0])).to.have.lengthOf(4)
        expect(Bip.toOctets([0, 0, 255, 255])).to.have.lengthOf(4)
        expect(Bip.toOctets('0.0.0.0')).to.have.lengthOf(4)
        expect(Bip.toOctets('0.0.255.255')).to.have.lengthOf(4)
    })

    it('Should accept string', () => {
        expect(Bip.toOctets('0.0.0.0')).to.deep.equal([0, 0, 0, 0])
        expect(Bip.toOctets('0.0.255.255')).to.deep.equal([0, 0, 255, 255])
        expect(Bip.toOctets('255.255.255.255')).to.deep.equal([255, 255, 255, 255])
        expect(Bip.toOctets('192.168.0.1')).to.deep.equal([192, 168, 0, 1])
        expect(Bip.toOctets('192.168.000.001')).to.deep.equal([192, 168, 0, 1])
        expect(Bip.toOctets('192.168.0000.01')).to.deep.equal([192, 168, 0, 1])
    })

    it('Should accept decimal', () => {
        expect(Bip.toOctets(0)).to.deep.equal([0, 0, 0, 0])
        expect(Bip.toOctets(65535)).to.deep.equal([0, 0, 255, 255])
        expect(Bip.toOctets(2 ** 32 - 1)).to.deep.equal([255, 255, 255, 255])
    })

    it('Should accept octet array', () => {
        expect(Bip.toOctets([0, 0, 0, 0])).to.deep.equal([0, 0, 0, 0])
        expect(Bip.toOctets([0, 0, 255, 255])).to.deep.equal([0, 0, 255, 255])
        expect(Bip.toOctets([255, 255, 255, 255])).to.deep.equal([255, 255, 255, 255])
    })

    it('Should return null for invalid input', () => {
        expect(Bip.toOctets(-(2 ** 32))).to.be.null
        expect(Bip.toOctets(2 ** 32)).to.be.null
        expect(Bip.toOctets([10, 20, 30, 400])).to.be.null
        expect(Bip.toOctets([10, 20, 30])).to.be.null
        expect(Bip.toOctets([10, 20, 30, 40, 50])).to.be.null
        expect(Bip.toOctets([10, 20, 30, null])).to.be.null
        expect(Bip.toOctets([10, 20, 30, undefined])).to.be.null
        expect(Bip.toOctets('10.20.30.400')).to.be.null
        expect(Bip.toOctets('10.20.30.')).to.be.null
        expect(Bip.toOctets('10.20.30.40.50')).to.be.null
        expect(Bip.toOctets('10-20-30-40-50')).to.be.null
    })

    it('Should throw for invalid input with { throw: true } option', () => {
        expect(() => Bip.toOctets(-(2 ** 32), { throw: true })).to.throw()
        expect(() => Bip.toOctets(2 ** 32, { throw: true })).to.throw()
        expect(() => Bip.toOctets([10, 20, 30, 500], { throw: true })).to.throw()
        expect(() => Bip.toOctets([10, 20, 30], { throw: true })).to.throw()
        expect(() => Bip.toOctets([10, 20, 30, 40, 50], { throw: true })).to.throw()
        expect(() => Bip.toOctets([10, 20, 30, null], { throw: true })).to.throw()
        expect(() => Bip.toOctets([10, 20, 30, undefined], { throw: true })).to.throw()
        expect(() => Bip.toOctets('10.20.30.400', { throw: true })).to.throw()
        expect(() => Bip.toOctets('10.20.30.', { throw: true })).to.throw()
        expect(() => Bip.toOctets('10.20.30.40.50', { throw: true })).to.throw()
        expect(() => Bip.toOctets('10-20-30-40-50', { throw: true })).to.throw()
    })
})

describe('Bip.isIPv4()', () => {
    it('Should return a boolean', () => {
        expect(Bip.isNetmask('255.255.0.0')).to.be.a('boolean')
    })

    it('Should pass for valid addresses', () => {
        const shouldPass = [
            '1.2.3.4',
            '10.20.30.40',
            '100.200.100.200',
            '192.168.1.1',
            '172.255.255.0',
            '255.0.255.9'
        ]
        shouldPass.forEach(x => {
            expect(Bip.isIPv4(x), `expected ${x} to be valid`).to.be.true
        })
    })

    it('Should fail for invalid addresses', () => {
        const shouldFail = [
            '1.2.3.256',
            '-1.2.3.4',
            '+5.6.7.8',
            'one.two.three.four',
            '192_168_1_1',
            '0xc0a800fa'
        ]
        shouldFail.forEach(x => {
            expect(Bip.isIPv4(x), `expected ${x} to be invalid`).to.be.false
        })
    })
})

describe('Bip.isNetmask()', () => {
    it('Should return a boolean', () => {
        expect(Bip.isNetmask('255.255.0.0')).to.be.a('boolean')
    })

    it('Should pass for all valid netmasks', () => {
        NETMASKS.forEach(x => {
            expect(Bip.isNetmask(x), `expected ${x} to be valid`).to.be.true
        })
    })

})

describe('Bip.isCidr()', () => {
    it('Should returnn a boolean', () => {
        expect(Bip.isCidr('192.168.0.123/24')).to.be.a('boolean')
    })

    it('Should pass for valid notation', () => {
        const shouldPass = [
            '192.168.0.1/24',
            '172.20.10.250/22',
            '10.20.30.0/12',
            '0.0.0.0/0',
            '255.255.255.255/32'
        ]
        shouldPass.forEach(x => {
            expect(Bip.isCidr(x), `expected ${x} to be valid`).to.be.true
        })
    })

    it('Should fail for invalid notation', () => {
        const shouldFail = [
            '1.2.3.256',
            '-1.2.3.4/-1',
            '+5.6.7.8/33',
            'one.two.three.four',
            'one.two.three.four/24',
            '192_168_1_1',
            '0xc0a800fa',
            '0.0/0.0/32'
        ]
        shouldFail.forEach(x => {
            expect(Bip.isCidr(x), `expected ${x} to be invalid`).to.be.false
        })
    })
})

describe('Bip.netmasks()', () => {
    it('Should return an array', () => {
        expect(Bip.netmasks()).to.be.an('array')
    })

    it('Should contain only strings', () => {
        Bip.netmasks().forEach(x => {
            expect(x).to.be.a('string')
        })
    })

    it('Should contain 33 items', () => {
        expect(Bip.netmasks()).to.have.lengthOf(33)
    })

    it('Should contain 0.0.0.0', () => {
        expect(Bip.netmasks()).to.contain('0.0.0.0')
    })

    it('Should contain 255.255.255.254', () => {
        expect(Bip.netmasks()).to.contain('255.255.255.254')
    })

    it('Should contain 255.255.255.255', () => {
        expect(Bip.netmasks()).to.contain('255.255.255.255')
    })

    it('Should contain all valid netmaks', () => {
        expect(Bip.netmasks()).to.deep.equal(NETMASKS)
    })
})

describe('Bip.networkId()', () => {
    it('Should return a string', () => {
        expect(Bip.networkId('192.168.1.123', '255.255.255.0')).to.be.a('string')
    })

    it('Should return the network identifer', () => {
        expect(Bip.networkId('192.168.1.234', '255.255.255.0')).to.equal('192.168.1.0')
        expect(Bip.networkId('192.168.1.234', '255.255.255.128')).to.equal('192.168.1.128')
        expect(Bip.networkId('192.168.1.234', '255.255.255.224')).to.equal('192.168.1.224')
        expect(Bip.networkId('172.20.11.9', '255.255.254.0')).to.equal('172.20.10.0')
        expect(Bip.networkId('10.50.100.200', '255.255.0.0')).to.equal('10.50.0.0')
    })
})

describe('Big.broadcast()', () => {
    it('Should return a string', () => {
        expect(Bip.networkId('192.168.1.123', '255.255.255.0')).to.be.a('string')
    })

    it('Should return the broadcast address', () => {
        expect(Bip.broadcast('192.168.1.234', '255.255.255.0')).to.equal('192.168.1.255')
        expect(Bip.broadcast('192.168.1.234', '255.255.255.128')).to.equal('192.168.1.255')
        expect(Bip.broadcast('192.168.1.234', '255.255.255.240')).to.equal('192.168.1.239')
        expect(Bip.broadcast('172.20.10.9', '255.255.254.0')).to.equal('172.20.11.255')
        expect(Bip.broadcast('10.50.100.200', '255.255.0.0')).to.equal('10.50.255.255')
    })
})

describe('Big.hostId()', () => {
    it('Should return a string', () => {
        expect(Bip.networkId('192.168.1.123', '255.255.255.0')).to.be.a('string')
    })

    it('Should return the host identifier', () => {
        expect(Bip.hostId('192.168.1.234', '255.255.255.0')).to.equal('0.0.0.234')
        expect(Bip.hostId('192.168.1.234', '255.255.255.128')).to.equal('0.0.0.106')
        expect(Bip.hostId('192.168.1.234', '255.255.255.240')).to.equal('0.0.0.10')
        expect(Bip.hostId('172.20.10.9', '255.255.254.0')).to.equal('0.0.0.9')
        expect(Bip.hostId('10.50.100.200', '255.255.0.0')).to.equal('0.0.100.200')
    })
})