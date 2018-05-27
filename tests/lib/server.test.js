// @flow
'use strict'

// External Dependencies
const request = require('request')

// Internal Dependencies
const server = require('../../lib/server.js')
const config = require('../../lib/config.js')

// Setup base request with defaults
const baseRequest = request.defaults({
  baseUrl: `http://localhost:${config.PORT}`,
  json: true
})

describe('server.js', () => {
  // Start local server before all tests start
  beforeAll((done) => {
    server.start()
      .then(() => done())
  })

  test('A request to a missing endpoint should return 404 response', (done) => {
    baseRequest('/path/does/not/exist', (error, response, body) => {
      expect(error).toBeFalsy()
      expect(response.statusCode).toBe(404)
      expect(body).toEqual({
        error: 'Endpoint does not exist'
      })
      done()
    })
  })

  test('A GET request an existing endpoint should return a 405 response', (done) => {
    baseRequest('/', (error, response, body) => {
      expect(error).toBeFalsy()
      expect(response.statusCode).toBe(405)
      expect(body).toEqual({
        error: 'GET method has not been implemented for endpoint'
      })
      done()
    })
  })

  test('An POST request with a invalid JSON should return a 400 response', (done) => {
    baseRequest.post('/', {
      body: 'heres a bunch of stuff that should not be JSON parsable'
    }, (error, response, body) => {
      expect(error).toBeFalsy()
      expect(response.statusCode).toBe(400)
      expect(body).toBeDefined()
      expect(body.error).toContain('Could not decode request: JSON parsing failed')
      done()
    })
  })

  test('An POST request with no "payload" property should return a 400 response', (done) => {
    baseRequest.post('/', {
      body: {}
    }, (error, response, body) => {
      expect(error).toBeFalsy()
      expect(response.statusCode).toBe(400)
      expect(body).toEqual({
        error: 'Invalid request payload'
      })
      done()
    })
  })

  test('An POST request with an invalid "payload" property should return a 400 response', (done) => {
    baseRequest.post('/', {
      body: {
        payload: 123
      }
    }, (error, response, body) => {
      expect(error).toBeFalsy()
      expect(response.statusCode).toBe(400)
      expect(body).toEqual({
        error: 'Invalid request payload'
      })
      done()
    })
  })

  test('A POST request with the example JSON should return the example response JSON', (done) => {
    baseRequest.post('/', {
      json: require('../fixtures/example-request.json')
    }, (error, response, body) => {
      expect(error).toBeFalsy()
      expect(response.statusCode).toBe(200)
      expect(body).toEqual(require('../fixtures/example-response.json'))
      done()
    })
  })

  // Stop local server after all tests finish
  afterAll((done) => {
    server.stop()
      .then(() => done())
  })
})
