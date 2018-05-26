// @flow
'use strict'

// Native NodeJS Modules
const http = require('http')

// External Dependencies
const express = require('express')
const morgan = require('morgan')

// Internal Dependencies
const config = require('./config.js')

// Express configuration
express.json()
const app = express()

// Middle ware before all routes
app.use(morgan('common'))

// Routes
// Coming soon...

// Middle ware after all routes
app.use(require('./middleware/not-found.js'))
app.use(require('./middleware/error-handler.js'))

// Create HTTP server.
// Using http module here as the express app does not
// have a function to stop the server
const server = http.createServer(app)

function start () /* : Promise<void> */ {
  // Start server
  console.log(`Starting application server on port: "${config.PORT}"`)
  return new Promise((resolve, reject) => {
    // $FlowFixMe flow does not about the listen() function supporting just a port number
    server.listen(config.PORT, (error) => {
      if (error) {
        // Set exit code to error status
        process.exitCode = 1

        // handle specific listen errors with friendly messages
        switch (error.code) {
          case 'EACCES':
            console.error(`Port: "${config.PORT}" is not accessible`, error)
            break
          case 'EADDRINUSE':
            console.error(`Port: "${config.PORT}" is already in use`, error)
            break
          default:
            console.error('Unknown Server Error', error)
        }
      } else {
        console.log(`Application is available to process requests on port: "${config.PORT}"`)
      }
      // Swallow error here and resolve promise to
      // allow NodeJS to gracefully finish the script
      resolve()
    })
  })
}

function stop () /* : Promise<void> */ {
  console.log('Attempting to gracefully stop the application')
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        // On error, setting exit code to error status
        process.exitCode = 1
        console.error('Unable to gracefully stop application', error)
      } else {
        console.log('Successfully stopped application')
      }
      // Swallow error here and resolve promise to
      // allow NodeJS to gracefully finish the script
      resolve()
    })
  })
}

module.exports = {
  start,
  stop
}
