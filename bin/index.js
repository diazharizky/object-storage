'use strict'

const config = require('config')
const app = require('../app')
const log = require('../src/utils/log')
const shutdown = require('../src/utils/shutdown')

module.exports = (function startApp () {
  const port = config.get('listen_port')
  const host = config.get('listen_host')
  const server = app.listen(port, host, () => {
    log.info('Listening on ' + host + ':' + port + '!')
  })
  const listener = shutdown.getListener(server)

  process.on('SIGTERM', listener)
  process.on('SIGINT', listener)
})()
