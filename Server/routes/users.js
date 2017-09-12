var express = require('express');
var router = express.Router();

var Admin = require( '../controller/admin/admin')

router.get('/Hello',Admin.login);

module.exports = router;
