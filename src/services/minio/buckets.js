'use strict'

require('../../types')
const client = require('./client')

/**
 *
 * @param {string} bucketID
 * @returns {MyReturn}
 */
async function exists (bucketID) {
  let err, exists
  try {
    exists = await client.bucketExists(bucketID)
  } catch (e) {
    err = e
  }
  return [err, exists]
}
exports.exists = exists

/**
 *
 * @param {string} bucketID
 * @returns {MyReturn}
 */
async function make (bucketID) {
  let err
  try {
    await client.makeBucket(bucketID)
  } catch (e) {
    err = e
  }
  return [err]
}
exports.make = make
