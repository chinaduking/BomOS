var express = require('express');
var router = express.Router();

import Admin from '../controller/admin/admin'

router.get('/Hello',Admin.login);

module.exports = router;
