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

// error handlers
function errorHandlerMiddleWare (
  err /* : ?Error */,
  req /* : $Request */,
  res /* : $Response */,
  next /* : NextFunction */
) /* : void */ {
  const boomError = Boom.boomify(err)

  // Log errors and such
  console.error(boomError)
  if (boomError.data) {
    console.log('Error Boom Data:', JSON.stringify(boomError.data))
  }

  res.status(boomError.output.statusCode)
  res.json(boomError.output.payload)
}

module.exports = errorHandlerMiddleWare
