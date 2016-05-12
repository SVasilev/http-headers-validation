/* global window */

'use strict';

var _ = require('lodash');

function invalidTypeOrLength(value) {
  return !_.isString(value) || value.length === 0;
}

// Inspired by Node.js: https://github.com/nodejs/node/blob/master/lib/_http_outgoing.js
var httpHeaderValidationAPI = {
  validateHeaderName: function(headerName) {
    if (invalidTypeOrLength(headerName)) {
      return false;
    }

    var validCharCodes = []
      .concat(_.range(48, 58))  // 0-9
      .concat(_.range(65, 91))  // a-z
      .concat(_.range(97, 123)) // A-Z
      .concat([94, 95, 96, 124, 126]) // ^, _, `, |, ~
      .concat([33, 35, 36, 37, 38, 39, 42, 43, 45, 46]); // !, #, $, %, &, ', *, +, -, .,

    return headerName.split('').map(function(character) {
      return character.charCodeAt(0);
    }).every(function(charCode) {
      return validCharCodes.indexOf(charCode) !== -1;
    });
  },

  validateHeaderValue: function(headerValue) {
    if (invalidTypeOrLength(headerValue)) {
      return false;
    }

    return headerValue.split('').map(function(character) {
      return character.charCodeAt(0);
    }).every(function(charCode) {
      return (charCode > 31 && charCode <= 255 && charCode !== 127) || charCode === 9;
    });
  },

  validateHeader: function(name, value) {
    if (invalidTypeOrLength(name) || invalidTypeOrLength(value)) {
      return false;
    }

    return this.validateHeaderName(name) && this.validateHeaderValue(value);
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = httpHeaderValidationAPI;
} else {
  window.headerUtils = httpHeaderValidationAPI;
}
