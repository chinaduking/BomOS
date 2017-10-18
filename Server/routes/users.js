var express = require('express');
var router = express.Router();
//var UserController = require('../app/controllers/UserController');
var Api = require('../API/Api');

router.get('/getposts',Api.getPosts);
router.get('/test',Api.Test);
router.post('/login',Api.Login);
router.post('/addpost',Api.addPost);
router.post('/delpost',Api.delPost);
router.post('/updatapost',Api.upPost);

module.exports = router;