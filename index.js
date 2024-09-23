/* global window */

'use strict'; // eslint-disable-line strict

/**
 * Checks if the given value is a string.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} `true` if the value is a string, otherwise `false`.
 */
function isString(value) {
  return Object.prototype.toString.call(value) === '[object String]';
}

/**
 * Generates an array containing a range of numbers.
 *
 * @param {number} start - The starting number (inclusive).
 * @param {number} end - The ending number (exclusive).
 * @returns {number[]} An array containing numbers from `start` to `end - 1`.
 */
function range(start, end) {
  var rangeResult = [];
  for (var i = start; i < end; i++) {
    rangeResult.push(i);
  }
  return rangeResult;
}

/**
 * Checks if a value is either not a string or has zero length.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} `true` if the value is not a string or has zero length, otherwise `false`.
 */
function invalidTypeOrLength(value) {
  return !isString(value) || value.length === 0;
}

// Inspired by Node.js: https://github.com/nodejs/node/blob/master/lib/_http_outgoing.js
/**
 * An API for validating HTTP header names and values.
 *
 * @namespace httpHeaderValidationAPI
 */
var httpHeaderValidationAPI = {
  /**
   * Validates the HTTP header name.
   *
   * @param {string} headerName - The name of the HTTP header to validate.
   * @returns {boolean} `true` if the header name is valid, otherwise `false`.
   */
  validateHeaderName: function(headerName) {
    if (invalidTypeOrLength(headerName)) {
      return false;
    }

    var validCharCodes = []
      .concat(range(48, 58))  // 0-9
      .concat(range(65, 91))  // a-z
      .concat(range(97, 123)) // A-Z
      .concat([94, 95, 96, 124, 126]) // ^, _, `, |, ~
      .concat([33, 35, 36, 37, 38, 39, 42, 43, 45, 46]); // !, #, $, %, &, ', *, +, -, .,

    return headerName.split('').map(function(character) {
      return character.charCodeAt(0);
    }).every(function(charCode) {
      return validCharCodes.indexOf(charCode) !== -1;
    });
  },

  /**
   * Validates the HTTP header value.
   *
   * @param {string} headerValue - The value of the HTTP header to validate.
   * @returns {boolean} `true` if the header value is valid, otherwise `false`.
   */
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

  /**
   * Validates the HTTP header name and value pair.
   *
   * @param {string} name - The name of the HTTP header to validate.
   * @param {string} value - The value of the HTTP header to validate.
   * @returns {boolean} `true` if both the header name and value are valid, otherwise `false`.
   */
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
