'use strict'

const express = require('express')
const multer = require('multer')
const router = (module.exports = express.Router())
const controllers = require('./controllers')

function getBucketPath (bucketID) {
  const basePath = '/buckets'
  if (!bucketID) {
    return basePath
  }
  return basePath + '/:' + bucketID
}
router.post(
  getBucketPath(controllers.buckets.params.bucketID),
  controllers.buckets.make
)

function getObjectPath (bucketID, objectID) {
  const basePath = getBucketPath(bucketID) + '/objects'
  if (!objectID) {
    return basePath
  }
  return basePath + '/:' + objectID
}
router.get(
  getObjectPath(controllers.objects.params.bucketID),
  controllers.objects.list
)
router.get(
  getObjectPath(
    controllers.objects.params.bucketID,
    controllers.objects.params.objectID
  ),
  controllers.objects.get
)
router.post(
  getObjectPath(
    controllers.objects.params.bucketID,
    controllers.objects.params.objectID
  ),
  multer({ storage: multer.memoryStorage() }).single('object'),
  controllers.objects.put
)
