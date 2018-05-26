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

// catch 404 and forward to error handler
function notFoundMiddleWare (
  req /* : $Request */,
  res /* : $Response */,
  next /* : NextFunction */
) /* : void */ {
  console.log('Endpoint does not exist: ' + req.originalUrl)
  next(Boom.notFound('Endpoint does not exist', req.originalUrl))
}

module.exports = notFoundMiddleWare
