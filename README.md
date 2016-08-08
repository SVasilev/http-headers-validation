# http-headers-validation
## Introduction

This is a small utility for validating HTTP header names and values according to the
standart. It is useful in modules which expect users to provide some headers through options.

## Install

This module can be used as npm package. To install it type:
```
$ npm install http-headers-validation
```
in the command line.

Also if you want to use the module as a client side library just import the `index.js`
file through a `<script>` tag into your html document. The API is exposed through a global
variable called `headerUtils`.

## API

### validateHeaderName(headerName)

* headerName - A non-empty string representing the header name which we want to validate.

The function returns `false` if the `headerName` is invalid according to the standart and
`true` otherwise.

```js
var headerUtils = require('http-headers-validation');

headerUtils.validateHeaderName('If-Unmodified-Since'); // true
headerUtils.validateHeaderName('X-Forwarded-Host'); // true
headerUtils.validateHeaderName('Front-End-[]'); // false
```

### validateHeaderValue(headerValue)

* headerValue - A non-empty string representing the header value which we want to validate.

The function returns `false` if the `headerValue` is invalid according to the standart and
`true` otherwise.
```js
var headerUtils = require('http-headers-validation');

headerUtils.validateHeaderValue('VQcFUFFRCBABUFhaAwQOVw=='); // true
headerUtils.validateHeaderValue('valueWithTabulation\t'); // true
headerUtils.validateHeaderValue('\n\b'); // false
```

### validateHeader(headerName, headerValue)

* headerName - A non-empty string representing the header name which we want to validate.
* headerValue - A non-empty string representing the header value which we want to validate.

The function returns `false` if `headerName` or `headerValue` is invalid and `true` otherwise.
```js
var headerUtils = require('http-headers-validation');

headerUtils.validateHeader('Cache-Control', 'public, max-age=2000'); // true
headerUtils.validateHeader('Front-End-[]', 'backspace\bValue'); // false
```

## Testing and contributing

Every suggestions for improvements and bugfixes are welcomed in the Issues section.

For testing the module you need npm installed:
```
$ npm install
$ npm test
```

## License

[MIT](LICENSE)

