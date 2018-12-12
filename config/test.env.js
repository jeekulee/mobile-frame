'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',

  // API配置项
  API: {
    schema: '"https://"',
    domain: '"test',
    service: '"/api"',
    timeout: '"5000"'
  }
})
