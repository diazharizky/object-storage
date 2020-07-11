'use strict'

/* global MyError */
require('../types')
const minio = require('../services/minio')

/**
 *
 * @param {string} bucketID
 * @param {string} objectID
 */
const get = async (bucketID, objectID) => {
  let [err, exists] = await minio.buckets.exists(bucketID)
  if (err || !exists) {
    return [err || new MyError(404, 'bucket_not_found')]
  }
  let res;
  [err, res] = await minio.objects.get(bucketID, objectID)
  if (err) {
    return [
      err.code !== 'NoSuchKey' ? err : new MyError(404, 'object_not_found')
    ]
  }
  return [null, res]
}

/**
 *
 * @param {string} bucketID
 * @param {?string} prefix
 */
const list = async (bucketID, prefix) => {
  const [err, exists] = await minio.buckets.exists(bucketID)
  if (err || !exists) {
    return [err || new MyError(404, 'bucket_not_found')]
  }
  return minio.objects.list(bucketID, prefix)
}

/**
 *
 * @param {string} bucketID
 * @param {string} objectID
 * @param {string|import('stream').Stream|Buffer} buffer
 * @param {number} size
 * @param {object} metadata
 */
const put = async (bucketID, objectID, buffer, size, metadata) => {
  const [err, exists] = await minio.buckets.exists(bucketID)
  if (err || !exists) {
    return [err || new MyError(404, 'bucket_not_found')]
  }
  return minio.objects.put(bucketID, objectID, buffer, size, metadata)
}

exports = module.exports = { get, list, put }
