'use strict'

/* global MyError */
require('../types')
const minio = require('../services/minio')

/**
 *
 * @param {string} bucketID
 * @param {string} objectID
 * @returns {MyReturn}
 */
async function get (bucketID, objectID) {
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
exports.get = get

/**
 *
 * @param {string} bucketID
 * @param {?string} prefix
 * @returns {MyReturn}
 */
async function list (bucketID, prefix) {
  const [err, exists] = await minio.buckets.exists(bucketID)
  if (err || !exists) {
    return [err || new MyError(404, 'bucket_not_found')]
  }
  return minio.objects.list(bucketID, prefix)
}
exports.list = list

/**
 *
 * @param {string} bucketID
 * @param {string} objectID
 * @param {string|import('stream').Stream|Buffer} buffer
 * @returns {MyReturn}
 */
async function put (bucketID, objectID, buffer) {
  const [err, exists] = await minio.buckets.exists(bucketID)
  if (err || !exists) {
    return [err || new MyError(404, 'bucket_not_found')]
  }
  return minio.objects.put(bucketID, objectID, buffer)
}
exports.put = put
