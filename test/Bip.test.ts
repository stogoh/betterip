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