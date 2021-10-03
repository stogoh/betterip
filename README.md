# BetterIP

> **Disclaimer: This package is in very early stages. Currently there are not many features implemented yet.**

IP address utilities for NodeJS.

## Installation

npm

```shell
npm install betterip
```

## Usage

```typescript
import Bip from 'betterip'

// Validation
console.log(Bip.isIPv4('192.168.1.1')) // true
console.log(Bip.isIPv4('some.invalid.ip.address')) // false
console.log(Bip.isNetmask('255.255.255.0')) // true
console.log(Bip.isNetmask('some.invalid.net.mask')) // false

// Tools
console.log(Bip.netmasks()) // ['128.0.0.0', '192.0.0.0', '224.0.0.0', ...]
```
