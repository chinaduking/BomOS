var express = require('express');
var router = express.Router();

var Api = require('../API/api');

router.get('/Hello',Api.Hello);

module.exports = router;
