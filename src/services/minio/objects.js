'use strict'

require('../../types')
const client = require('./client')

/**
 *
 * @param {import('stream').Stream} stream
 * @returns {Promise}
 */
function asyncStream (stream) {
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
async function list (bucketID, prefix) {
  let err, res
  try {
    const stream = await client.listObjects(bucketID, prefix)
    res = await asyncStream(stream)
  } catch (e) {
    err = e
  }
  return [err, res]
}
exports.list = list

/**
 *
 * @param {string} bucketID
 * @param {string} objectID
 * @returns {MyReturn}
 */
async function get (bucketID, objectID) {
  let err, res
  try {
    res = await client.getObject(bucketID, objectID)
  } catch (e) {
    err = e
  }
  return [err, res]
}
exports.get = get

/**
 *
 * @param {string} bucketID
 * @param {string} objectID
 * @param {string|import('stream').Stream|Buffer} stream
 */
async function put (bucketID, objectID, stream) {
  let err
  try {
    await client.putObject(bucketID, objectID, stream)
  } catch (e) {
    err = e
  }
  return [err]
}
exports.put = put
