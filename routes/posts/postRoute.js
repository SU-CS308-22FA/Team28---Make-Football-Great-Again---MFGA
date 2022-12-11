const express = require("express");
const router = express.Router();

const auth = require('../../middleware/auth');

const PostController = require("../../controllers/postController");

router.post('/post', auth, PostController.sendPost);

router.get('/getUserPost', auth , PostController.getUserPost);

router.get('/getAllPost', PostController.getAllPost);

router.post('/like', auth, PostController.like);

router.post('/unlike', auth, PostController.unlike);

router.post('/commentPost', auth, PostController.commentPost);

module.exports = router;