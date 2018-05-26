// @flow
'use strict'

// External Dependencies
// Using dotenv to allow configuration to be set in
// code during development
require('dotenv').config()

const config = {
  PORT: parseInt(process.env.PORT) || 80
}

module.exports = config
