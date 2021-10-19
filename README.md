# BetterIP

Better IP address utilities for NodeJS written in TypeScript. Inspired by the popular [ip](https://github.com/indutny/node-ip) module.

![GitHub Workflow Status (event)](https://img.shields.io/github/workflow/status/stogoh/betterip/Linux%20build?event=push&label=build)
[![codecov](https://codecov.io/gh/stogoh/betterip/branch/dev/graph/badge.svg?token=PNULHMM2W9)](https://codecov.io/gh/stogoh/betterip)
![License](https://img.shields.io/github/license/stogoh/betterip)

## Installation

```shell
npm install betterip
```

## Usage

```typescript
// Import
const { Bip } = require('betterip') // CommonJS
import { Bip } from 'betterip' // ES6

// Validation
console.log(Bip.isIPv4('192.168.1.1')) // true
console.log(Bip.isIPv4('some.invalid.ip.address')) // false
console.log(Bip.isNetmask('255.255.255.0')) // true
console.log(Bip.isNetmask('some.invalid.net.mask')) // false
console.log(Bip.isCidr('192.168.1.1/24')) // true
console.log(Bip.isCidr('192.168.1.1/255.255.255.0')) // false

// Tools
console.log(Bip.networkId('192.168.1.123', '255.255.255.0')) // '192.168.1.0'
console.log(Bip.broadcast('192.168.1.123', '255.255.255.0')) // '192.168.1.255'
console.log(Bip.hostId('192.168.1.123', '255.255.255.0')) // '0.0.0.123'
console.log(Bip.netmaskFromBits(24)) // '255.255.255.0'
console.log(Bip.range('192.168.1.0', '192.168.1.2')) // [ '192.168.1.0', '192.168.1.1', '192.168.1.2' ]
console.log(Bip.contains('192.168.1.0', '255.255.255.0', '192.168.1.123')) // true
console.log(Bip.netmasks()) // [ '0.0.0.0', '128.0.0.0', '192.0.0.0', ... ]

// Conversion
console.log(Bip.toDecimal('192.168.1.123')) // 3232235899
console.log(Bip.toString([172, 20, 10, 50])) // '172.20.10.50'
console.log(Bip.toOctets(2886994482)) // [ 172, 20, 10, 50 ]
```
