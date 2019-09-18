const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const seedFitbook = require('../models/seedFitbook.js');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const Posts = require('../models/posts.js')

//seed
router.get('/seed', (req, res) => {
  Posts.create(seedFitbook, (err, post) => {
    res.redirect('/')
  });
});

/* GET. */
router.get ('/', (req, res) => {
  Posts.find({}, (error, foundPosts) => {
    res.json(foundPosts)
  })
})
//////// DELETE ROUTE ////////////
router.delete('/:id', (req, res) => {
  Posts.findByIdAndRemove(req.params.id, (error, deletedPost) => {
    res.json(deletedPost)
  })
})

/////////// UPDATE ROUTE ////////////
router.put('/:id', (req, res) => {
  Posts.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedPost) => {
    res.json(updatedPost)
  })
})

////////// CREATE ROUTE ////////////
router.post('/', (req, res) => {
  Posts.create(req.body, (error, createdPost) => {
    res.json(createdPost)
  })
})


module.exports = router;