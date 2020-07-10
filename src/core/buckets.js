'use strict'

/* global MyError */
require('../types')
const minio = require('../services/minio')

/**
 *
 * @param {string} bucketID
 * @returns {MyReturn}
 */
const make = async (bucketID) => {
  const [err, exists] = await minio.buckets.exists(bucketID)
  if (err || exists) {
    return [err || new MyError(400, 'bucket_already_exists')]
  }
  return minio.buckets.make(bucketID)
}

/**
 *
 * @param {string} bucketID
 * @returns {MyReturn}
 */
const exists = async (bucketID) => minio.buckets.exists(bucketID)

/**
 *
 * @param {string} bucketID
 * @returns {MyReturn}
 */
const getPolicy = async (bucketID) => minio.buckets.getPolicy(bucketID)

/**
 *
 * @param {string} bucketID
 * @param {string} policy
 */
const setPolicy = async (bucketID, policy) =>
  minio.buckets.setPolicy(bucketID, policy)

exports = module.exports = { make, exists, getPolicy, setPolicy }
