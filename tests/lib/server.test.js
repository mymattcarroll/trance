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

  test('A missing endpoint should return 404 response', (done) => {
    baseRequest('/path/does/not/exist', (error, response, body) => {
      expect(error).toBeFalsy()
      expect(body).toEqual({
        error: 'Not Found',
        message: 'Endpoint does not exist',
        statusCode: 404
      })
      done()
    })
  })

  // Stop local server after all tests finish
  afterAll((done) => {
    server.stop()
      .then(() => done())
  })
})
