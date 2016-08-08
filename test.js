var should = require('should');
var httpHeadersValidation = require('./index');

describe('headers validation module', function() {
  describe('validates HTTP header names', function() {
    it('should return true for common names', function() {
      httpHeadersValidation.validateHeaderName('Cache-Control').should.be.equal(true);
      httpHeadersValidation.validateHeaderName('Cookie').should.be.equal(true);
      httpHeadersValidation.validateHeaderName('Host').should.be.equal(true);
      httpHeadersValidation.validateHeaderName('Content-Type').should.be.equal(true);
    });

    it('should validate more obscure names', function() {
      httpHeadersValidation.validateHeaderName('If-Unmodified-Since').should.be.equal(true);
      httpHeadersValidation.validateHeaderName('TE').should.be.equal(true);
      httpHeadersValidation.validateHeaderName('Proxy-Authenticate').should.be.equal(true);
      httpHeadersValidation.validateHeaderName('Strict-Transport-Security').should.be.equal(true);
    });

    it('should validate custom header names', function() {
      httpHeadersValidation.validateHeaderName('Front-End-Https').should.be.equal(true);
      httpHeadersValidation.validateHeaderName('X-Csrf-Token').should.be.equal(true);
      httpHeadersValidation.validateHeaderName('X-Forwarded-Host').should.be.equal(true);
      httpHeadersValidation.validateHeaderName('My-Custom-Header-05^_`|~!#$%&\'*+-.').should.be.equal(true);
    });

    it('should return false for invalid header names', function() {
      httpHeadersValidation.validateHeaderName({}).should.be.equal(false);
      httpHeadersValidation.validateHeaderName('Front-End-[]').should.be.equal(false);
      httpHeadersValidation.validateHeaderName('My-Invalid-Header-;').should.be.equal(false);
      httpHeadersValidation.validateHeaderName('X-Forwarded-\\').should.be.equal(false);
      httpHeadersValidation.validateHeaderName('(X,N)').should.be.equal(false);
    });
  });

  describe('validates HTTP header values', function() {
    it('should validate common values', function() {
      httpHeadersValidation.validateHeaderValue('public, max-age=2000').should.be.equal(true);
      httpHeadersValidation.validateHeaderValue('Secure').should.be.equal(true);
      httpHeadersValidation.validateHeaderValue('localhost').should.be.equal(true);
      httpHeadersValidation.validateHeaderValue('application/json').should.be.equal(true);
    });

    it('should validate more obscure values', function() {
      httpHeadersValidation.validateHeaderValue('valueWithTabulation\t').should.be.equal(true);
      httpHeadersValidation.validateHeaderValue('-05:00').should.be.equal(true);
      httpHeadersValidation.validateHeaderValue('VQcFUFFRCBABUFhaAwQOVw==').should.be.equal(true);
      httpHeadersValidation.validateHeaderValue('okhttp/2.5.0').should.be.equal(true);
    });

    it('should return false for invalid header values', function() {
      httpHeadersValidation.validateHeaderValue('').should.be.equal(false);
      httpHeadersValidation.validateHeaderValue('\n\b').should.be.equal(false); // If charCode < 32
      httpHeadersValidation.validateHeaderValue('⌂').should.be.equal(false); // If charCode === 127
      httpHeadersValidation.validateHeaderValue('withˆ').should.be.equal(false); // If charCode > 255
    });
  });

  describe('validates HTTP header key-value pairs', function() {
    it('should return true for valid header key-value pairs', function() {
      httpHeadersValidation.validateHeader('My-Custom-Header-05^_`|~!#$%&\'*+-.', 'valueWithTabulation\t').should.be.equal(true);
    });

    it('should return false for invalid key-value pairs', function() {
      httpHeadersValidation.validateHeader({}, 'application/json').should.be.equal(false);
      httpHeadersValidation.validateHeader('Cookie', '').should.be.equal(false);
      httpHeadersValidation.validateHeader('My-Invalid-Header-;', 'valueWithTabulation\t').should.be.equal(false);
      httpHeadersValidation.validateHeader('Cache-Control', 'withˆ').should.be.equal(false);
    });
  });
});
