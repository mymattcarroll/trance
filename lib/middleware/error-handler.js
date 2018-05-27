// @flow
'use strict'

/*::
import type {
  $Request,
  $Response,
  NextFunction
} from 'express'
*/

// External Dependencies
const Boom = require('boom')

function errorHandlerMiddleWare (
  err /* : Error */,
  req /* : $Request */,
  res /* : $Response */,
  next /* : NextFunction */
) /* : void */ {
  // The express.json() middleware will throw an SyntaxError if the request
  // payload could not be parsed as JSON. This middleware will only kick in
  // if the Content-Type request header is set to application/json, however
  // there is chance users could set that header and not valid JSON so we will
  // catch that error here
  if (err && err.name === 'SyntaxError') {
    err = Boom.boomify(err, {
      statusCode: 400,
      message: 'Could not decode request: JSON parsing failed'
    })
  }

  // Ensure all errors are Boom errors to make error responses consistent
  const boomError = Boom.boomify(err)

  // Log errors for debugging purposes
  console.error(boomError)
  if (boomError.data) {
    console.log('Error Boom Data:', JSON.stringify(boomError.data))
  }

  res
    .status(boomError.output.statusCode)
    .json({
      error: boomError.output.payload.message
    })
}

module.exports = errorHandlerMiddleWare
