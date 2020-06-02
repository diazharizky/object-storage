'use strict'

const log = require('./log')

/**
 *
 * @param {import('http').Server} server
 * @returns {NodeJS.SignalsListener}
 */
const getListener = (server) => {
  let connections = []

  server.on('connection', (connection) => {
    connections.push(connection)
    connection.on('close', () => {
      connections = connections.filter((curr) => curr !== connection)
    })
  })

  const shutdown = () => {
    log.info('Received kill signal, shutting down gracefully')

    server.close(() => {
      log.info('Closed out remaining connections')
      process.exit(0)
    })

    setTimeout(() => {
      log.error(
        'Could not close connections in time, forcefully shutting down'
      )
      process.exit(1)
    }, 10000)

    connections.forEach((curr) => curr.end())

    setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000)
  }

  return shutdown
}
exports.getListener = getListener
