'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PORT: 8081,

  // API配置项
  API: {
    protocol: '"https://"',
    domain: '"test"',
    service: '"/api"',
    timeout: '"8000"'
  }
})
