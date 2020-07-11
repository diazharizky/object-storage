'use strict'

require('../../types')
const client = require('./client')

/**
 *
 * @param {import('stream').Stream} stream
 * @returns {Promise}
 */
const asyncStream = (stream) => {
  return new Promise((resolve, reject) => {
    const data = []
    stream.on('data', (chunk) => {
      data.push(chunk)
    })
    stream.on('end', () => resolve(data))
    stream.on('error', (err) => {
      reject(err)
    })
  })
}

/**
 *
 * @param {string} bucketID
 * @param {string} prefix
 * @returns {MyReturn}
 */
const list = async (bucketID, prefix) => {
  let err, res
  try {
    const stream = await client.listObjects(bucketID, prefix)
    res = await asyncStream(stream)
  } catch (e) {
    err = e
  }
  return [err, res]
}

/**
 *
 * @param {string} bucketID
 * @param {string} objectID
 * @returns {MyReturn}
 */
const get = async (bucketID, objectID) => {
  let err, res
  try {
    res = await client.getObject(bucketID, objectID)
  } catch (e) {
    err = e
  }
  return [err, res]
}

/**
 *
 * @param {string} bucketID
 * @param {string} objectID
 * @param {string|import('stream').Stream|Buffer} stream
 * @param {number} size
 * @param {object} metadata
 */
const put = async (bucketID, objectID, stream, size, metadata) => {
  let err
  try {
    await client.putObject(bucketID, objectID, stream, size, metadata)
  } catch (e) {
    err = e
  }
  return [err]
}

exports = module.exports = { list, get, put }
