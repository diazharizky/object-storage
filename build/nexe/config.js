'use strict'

require('nexe')
  .compile({
    input: './bin/index.js',
    output: './.bin/object-storage',
    resources: [
      'node_modules/js-yaml/index.js',
      'config/swagger.yml',
      'index.html'
    ],
    targets: {
      platform: process.env.NEXE_PLATFORM,
      arch: process.env.NEXE_ARCH,
      version: process.env.NEXE_VERSION || '12.9.1'
    },
    temp: '.nexe'
  })
  .then(() => {
    console.log('nexe_build_success') // eslint-disable-line no-console
  })
