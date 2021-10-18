import { expect } from 'chai'
import { and, areEqual, not, or, xor } from '../src/OctetArray'

describe('OctetArray.not()', () => {
    it('Should return an octet array', () => {
        expect(not([255, 255, 0, 0])).to.have.lengthOf(4)
    })

    it('Should return the inverted octet array', () => {
        expect(not([0, 0, 0, 0])).to.deep.equal([255, 255, 255, 255])
        expect(not([255, 255, 0, 0])).to.deep.equal([0, 0, 255, 255])
        expect(not([255, 255, 255, 255])).to.deep.equal([0, 0, 0, 0])
        expect(not([128, 0, 0, 0])).to.deep.equal([127, 255, 255, 255])
    })
})

describe('OctetArray.and()', () => {
    it('Should return an octet array', () => {
        expect(and([255, 255, 0, 0], [255, 255, 0, 0])).to.have.lengthOf(4)
    })

    it('Should return the correct octet array', () => {
        expect(and([0, 0, 0, 0], [0, 0, 0, 0])).to.deep.equal([0, 0, 0, 0])
        expect(and([255, 255, 0, 0], [255, 255, 0, 0])).to.deep.equal([255, 255, 0, 0])
        expect(and([255, 255, 0, 0], [0, 255, 255, 0])).to.deep.equal([0, 255, 0, 0])
    })
})

describe('OctetArray.or()', () => {
    it('Should return an octet array', () => {
        expect(or([255, 255, 0, 0], [255, 255, 0, 0])).to.have.lengthOf(4)
    })

    it('Should return the correct octet array', () => {
        expect(or([0, 0, 0, 0], [0, 0, 0, 0])).to.deep.equal([0, 0, 0, 0])
        expect(or([255, 255, 0, 0], [255, 255, 0, 0])).to.deep.equal([255, 255, 0, 0])
        expect(or([255, 255, 0, 0], [0, 255, 255, 0])).to.deep.equal([255, 255, 255, 0])
    })
})

describe('OctetArray.xor()', () => {
    it('Should return an octet array', () => {
        expect(xor([255, 255, 0, 0], [255, 255, 0, 0])).to.have.lengthOf(4)
    })

    it('Should return the correct octet array', () => {
        expect(xor([0, 0, 0, 0], [0, 0, 0, 0])).to.deep.equal([0, 0, 0, 0])
        expect(xor([255, 255, 0, 0], [255, 255, 0, 0])).to.deep.equal([0, 0, 0, 0])
        expect(xor([255, 255, 0, 0], [0, 255, 255, 0])).to.deep.equal([255, 0, 255, 0])
    })
})

describe('OctetArray.areEqual()', () => {
    it('Should return a boolean', () => {
        expect(areEqual([255, 255, 0, 0], [255, 255, 0, 0])).to.be.a('boolean')
        expect(areEqual([255, 255, 0, 0], [0, 0, 255, 255])).to.be.a('boolean')
    })

    it('Should return true if the arrays have the same value', () => {
        expect(areEqual([0, 0, 0, 0], [0, 0, 0, 0])).to.be.true
        expect(areEqual([255, 255, 0, 0], [255, 255, 0, 0])).to.be.true
        expect(areEqual([0, 0, 255, 255], [0, 0, 255, 255])).to.be.true
        expect(areEqual([255, 255, 255, 255], [255, 255, 255, 255])).to.be.true
    })

    it('Should return false if the arrays have the not same value', () => {
        expect(areEqual([0, 0, 0, 0], [0, 0, 0, 255])).to.be.false
        expect(areEqual([255, 255, 0, 0], [0, 255, 0, 0])).to.be.false
        expect(areEqual([255, 0, 255, 255], [0, 0, 255, 255])).to.be.false
    })

    it('Should return false if the arrays have different lengths', () => {
        expect(areEqual([0, 0, 0, 0], [0, 0, 0])).to.be.false
        expect(areEqual([255, 255, 255], [255, 255, 255, 255])).to.be.false
    })
})