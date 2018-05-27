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

function tvShows (
  req /* : $Request */,
  res /* : $Response */,
  next /* : NextFunction */
) /* : void */ {
  // Ensure the request is a POST request
  if (req.method !== 'POST') {
    next(Boom.methodNotAllowed(`${req.method} method has not been implemented for endpoint`))
    return
  }

  // Request request for debugging purposes
  console.log('Request Payload:', JSON.stringify(req.body, null, 2))

  // Validate payload
  if (!req.body || !req.body.payload || !Array.isArray(req.body.payload)) {
    next(Boom.badRequest('Invalid request payload'))
    return
  }

  const tvShows = req.body.payload

  try {
    // Apply business logic to filter results, see below link for requirements
    // http://codingchallenge.nine.com.au/
    const response = tvShows
      .filter((tvShow) => {
        // Ensure the tvShow is an object
        return tvShow &&
          // and the "drm" property is true (we are doing a strict check for true instead of just checking for a truthy value)
          tvShow.drm === true &&
          // and the "episodeCount" is a number and more than 0
          typeof tvShow.episodeCount === 'number' && tvShow.episodeCount > 0
      })
      .map((tvShow /* : any */) => {
        return {
          image: (tvShow.image || {}).showImage,
          slug: tvShow.slug,
          title: tvShow.title
        }
      })

    res.status(200).json({
      response
    })
  } catch (error) {
    next(error)
  }
}

module.exports = tvShows
