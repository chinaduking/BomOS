var express = require('express');
var router = express.Router();
var Api = require('../API/Api');

router.post('/login',Api.Login);

router.get('/getalluser',Api.getAllUser);
router.post('/adduser',Api.addUser);
router.post('/deluser',Api.delUser);
router.post('/uppasswd',Api.upPasswd);

module.exports = router;