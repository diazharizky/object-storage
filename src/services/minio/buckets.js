'use strict'

require('../../types')
const client = require('./client')

/**
 *
 * @param {string} bucketID
 * @returns {MyReturn}
 */
const exists = async (bucketID) => {
  let err, exists
  try {
    exists = await client.bucketExists(bucketID)
  } catch (e) {
    err = e
  }
  return [err, exists]
}

/**
 *
 * @param {string} bucketID
 * @returns {MyReturn}
 */
const make = async (bucketID) => {
  let err
  try {
    await client.makeBucket(bucketID)
  } catch (e) {
    err = e
  }
  return [err]
}

/**
 *
 * @param {string} bucketID
 * @returns {MyReturn}
 */
const getPolicy = async (bucketID) => {
  let err, res
  try {
    res = await client.getBucketPolicy(bucketID)
  } catch (e) {
    err = e
  }
  return [err, res]
}

/**
 *
 * @param {string} bucketID
 * @param {string} policy
 */
const setPolicy = async (bucketID, policy) => {
  let err
  try {
    await client.setBucketPolicy(bucketID, policy)
  } catch (e) {
    err = e
  }
  return [err]
}

exports = module.exports = { exists, make, getPolicy, setPolicy }
