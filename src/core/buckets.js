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
exports.make = make

/**
 *
 * @param {string} bucketID
 * @returns {MyReturn}
 */
const exists = async (bucketID) => minio.buckets.exists(bucketID)
exports.exists = exists
