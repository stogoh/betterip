import { expect } from 'chai'
import { isIPv4 } from '../src/Utils'

describe('isIpv4', () => {

    const shouldMatch = [
        '192.168.1.1'
    ]

    const shouldFail = [
        '1.2.3.999'
    ]

    it('Should match matches', () => {
        shouldMatch.forEach(x => expect(isIPv4(x)).to.be.true)
    })

    it('Should fail fails', () => {
        shouldFail.forEach(x => expect(isIPv4(x)).to.be.false)
    })

})