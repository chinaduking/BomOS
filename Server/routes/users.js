var express = require('express');
var router = express.Router();
var Api = require('../API/api');

router.post('/login',Api.Login);
router.post('/logout',Api.Logout);

router.get('/info',Api.GetInfo);
router.get('/getalluser',Api.getAllUser);
router.post('/adduser',Api.addUser);
router.post('/deluser',Api.delUser);
router.post('/uppasswd',Api.upPasswd);

router.post('/upfileaddbom',Api.upFileAddBom);
router.post('/upfilecomparebom',Api.upFileCompareBom);
router.post('/upfileaddbomnum',Api.upFileAddBomNumber);
router.post('/upfilesubbomnum',Api.upFileSubBomNum);

router.get('/bomlist',Api.getBomlist);
router.get('/shortbomlist',Api.getShortBomlist);
router.post('/delbom',Api.delBom);
router.post('/upbom',Api.upBom);
router.get('/findbymfrvalue',Api.SearchBomByMfrValue);
router.get('/findbyencodenum',Api.SearchBomByEncodeNum);

router.get('/addrecordlist',Api.getAddRecordList);
router.get('/subrecordlist',Api.getSubRecordList);

module.exports = router;