var jwt = require('jwt-simple');
var multiparty = require('multiparty');
var fs = require("fs");
var XLSX = require('xlsx')
var util = require('util');
var secret = 'duking'
var Util = require('../util/util');

var API = {
    //----------------------------------登陆登出管理----------------------------------------------
    Login: function(req,res) {
        var username = req.body.username;
        var password = req.body.password;
        req.models.t_user.find().where({'username':username}).where({'password':password}).exec(function(err,result) {
            if(result != '') {
                var token = jwt.encode({
                    name: username,
                    exp:Math.floor(Date.now()/1000) + 24 * 60 * 60//1 hours
                },secret);

                console.log(token);

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }else{
                res.json({ success: false, message: '认证失败，账号或密码错误' ,token: null});
            }


        });
    },

    Logout: function(req,res) {
        "use strict";
        res.json({message:'Logout'})
    },

    //------------------------------------用户管理--------------------------------------------
    getAllUser: function getAllUser(req,res) {
        var token = req.query.token;
        var decoded = jwt.decode(token,secret)
        user = decoded.name

        req.models.t_user.find().where({'username':user}).where({'admin':1}).exec(function(err,result) {
            if(result != '') {
                req.models.t_user.find().exec(function(err,result) {
                    "use strict";
                    res.json({success: true,Result: result});
                });
            }else{
                res.json({ success: false, message: '用户权限不足，无法查看所有用户信息'});
            }
        });
    },

    addUser: function addUser(req,res) {
        var token = req.query.token;
        var decoded = jwt.decode(token,secret)
        user = decoded.name

        req.models.t_user.find().where({'username':user}).where({'admin':1}).exec(function(err,result) {
            "use strict";
            if(result != '') {
                var User = {
                    username:req.body.username,
                    password:req.body.password,
                    admin: 2,
                    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
                }

                req.models.t_user.find().where({'username':User.username}).exec(function(err,result) {
                    if(result != ''){
                        res.json({success: false, message: '用户已存在'});
                    }else {
                        req.models.t_user.create(User).exec(function (err, result) {
                            res.json({success: true});
                        });
                    }
                });
            }else{
                res.json({ success: false, message: '用户权限不足，无法操作'});
            }
        })
    },

    delUser:function delUser(req,res) {
        var username = req.body.username;

        req.models.t_user.find().where({'username':username}).exec(function(err,result) {
            "use strict";
            if(result [0].admin !=  1) {
                req.models.t_user.destroy().where({'username':username}).exec(function(err,result) {
                    res.json({ success: true, message: '账户删除成功'});
                });
            }else{
                res.json({ success: false, message: '无权删除超级管理员'});
            }
        })
    },

    upPasswd:function upPasswd(req,res) {
        var username = req.body.username;
        var newpassword = req.body.newpassword;

        req.models.t_user.update({'username':username},{'password':newpassword}).exec(function(err,result) {
            res.json({ success: true, message: '密码修改成功'});
        });
    },

    GetInfo: function (req,res) {
        var token = req.query.token;
        var decoded = jwt.decode(token,secret)
        user = decoded.name

        req.models.t_user.find().where({'username':user}).exec(function(err,result) {
            "use strict";
            var role = ''
            var avatar = ''
            if(result != '') {
                if(result[0].admin == 1)
                {
                    role = '超级管理员'
                }else{
                    role = '普通用户'
                }
                avatar = result[0].avatar
                res.json({role:role, name:user, avatar:avatar})
            }else{
                console.log('token 认证失败')
                res.json({role:null,name:null,avatar:null})
            }
        })
    },

    //------------------------------------文件上传管理--------------------------------------------
    upFileAddBom: function (req,res) {
        //生成multiparty对象，并配置上传目标路径
        var form = new multiparty.Form();
        //设置编码
        form.encoding = 'utf-8';
        //设置文件存储路径
        form.uploadDir = "../uploads/addbom/";
        //设置单文件大小限制
        form.maxFilesSize = 2 * 1024 * 1024;

        //上传完成后处理
        form.parse(req, function(err, fields, files) {
            var date = new Date().getTime().toString();
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = '../uploads/addbom/' + date + '_' + inputFile.originalFilename;
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    try {
                        var readFile = XLSX.readFile(dstPath);
                        readFile.SheetNames.forEach(function (sheetName) {
                            var readSheet = readFile.Sheets[sheetName]
                            var ref = readSheet['!ref']
                            var rowNum = ref.substring(4)
                            Util.MysqlAddBom(req,readSheet,2,rowNum);
                        })
                    }catch (err) {
                        res.json({err:err})
                    }
                }
            });

            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        })
    },

    upFileCompareBom: function (req,res) {
        //生成multiparty对象，并配置上传目标路径
        var form = new multiparty.Form();
        //设置编码
        form.encoding = 'utf-8';
        //设置文件存储路径
        form.uploadDir = "../uploads/compare/";
        //设置单文件大小限制
        form.maxFilesSize = 2 * 1024 * 1024;

        //上传完成后处理
        form.parse(req, function(err, fields, files) {
            var date = new Date().getTime().toString();
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = '../uploads/compare/' + date + '_' + inputFile.originalFilename;
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    try {
                        var readFile = XLSX.readFile(dstPath);
                        readFile.SheetNames.forEach(function (sheetName) {
                            var readSheet = readFile.Sheets[sheetName]
                            var ref = readSheet['!ref']
                            var rowNum = ref.substring(4)
                            var OutTable = []
                            Util.MysqlCompareBom(req,readSheet,15,rowNum,OutTable,res);
                        })
                    }catch (err) {
                        res.json({err:err})
                    }
                }
            });
        })
    },

    upFileAddBomNumber: function (req,res) {
        //生成multiparty对象，并配置上传目标路径
        var form = new multiparty.Form();
        //设置编码
        form.encoding = 'utf-8';
        //设置文件存储路径
        form.uploadDir = "../uploads/addbomnum/";
        //设置单文件大小限制
        form.maxFilesSize = 2 * 1024 * 1024;

        //上传完成后处理
        form.parse(req, function(err, fields, files) {
            var date = new Date().getTime().toString();
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = '../uploads/addbomnum/' + date + '_' + inputFile.originalFilename;
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    try {
                        var readFile = XLSX.readFile(dstPath);
                        readFile.SheetNames.forEach(function (sheetName) {
                            var readSheet = readFile.Sheets[sheetName]
                            var ref = readSheet['!ref']
                            var rowNum = ref.substring(4)
                            Util.MysqlAddBomNum(req,readSheet,2,rowNum,res);
                        })
                    }catch (err) {
                        res.json({err:err})
                    }
                }
            });
        })
    },

    upFileSubBomNum: function (req,res) {
        //生成multiparty对象，并配置上传目标路径
        var form = new multiparty.Form();
        //设置编码
        form.encoding = 'utf-8';
        //设置文件存储路径
        form.uploadDir = "../uploads/subbomnum/";
        //设置单文件大小限制
        form.maxFilesSize = 2 * 1024 * 1024;

        //上传完成后处理
        form.parse(req, function(err, fields, files) {
            var date = new Date().getTime().toString();
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = '../uploads/subbomnum/' + date + '_' + inputFile.originalFilename;
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    try {
                        var readFile = XLSX.readFile(dstPath);
                        readFile.SheetNames.forEach(function (sheetName) {
                            var readSheet = readFile.Sheets[sheetName]
                            var ref = readSheet['!ref']
                            var rowNum = ref.substring(4)
                            Util.MysqlSubBomNum(req,readSheet,15,rowNum,res);
                        })
                    }catch (err) {
                        res.json({err:err})
                    }
                }
            });
        })
    },



    //------------------------------------BOM管理--------------------------------------------
    getBomlist: function (req,res) {
        req.models.t_bom.find().exec(function(err,result) {
            "use strict";
            res.json({success: true,Result: result});
        });
    },

    delBom: function (req,res) {
        var token = req.body.token;
        var Id = req.body.id;
        var decoded = jwt.decode(token,secret)
        user = decoded.name

        req.models.t_user.find().where({'username':user}).exec(function(err,result) {
            "use strict";
            if(result [0].admin ==  1) {
                req.models.t_bom.destroy(Id).exec(function(err,result) {
                    res.json({ success: true, message: 'BOM删除成功'});
                });
            }else{
                res.json({ success: false, message: '非超级管理员无权删除BOM'});
            }
        })
    },

    upBom: function (req,res) {
        var token = req.body.token;
        var form = req.body.form;
        var decoded = jwt.decode(token,secret)
        user = decoded.name

        req.models.t_user.find().where({'username':user}).exec(function(err,result) {
            "use strict";
            if(result [0].admin ==  1) {
                req.models.t_bom.update({'ID':form.Id},{'Mfr_Value':form.Mfr_Value,'Mfr':form.Mfr,'Num':form.Num,'Waring_Value':form.Waring_Value,'EncodeNum':form.EncodeNum,'Price':form.Price,'Remark':form.Remark}).exec(function(err,result) {
                    res.json({ success: true, message: 'BOM更新成功'});
                });
            }else{
                res.json({ success: false, message: '非超级管理员无权更新BOM'});
            }
        })
    },

    SearchBomByMfrValue: function (req,res) {
        var MfrValue = req.query.MfrValue;
        req.models.t_bom.find({'Mfr_Value':{'like':'%'+MfrValue+'%'}}).exec(function(err,result) {
            "use strict";
            res.json({ success: true, Result: result});
        })
    },

    SearchBomByEncodeNum: function (req,res) {
        var EncodeNum = req.query.EncodeNum;
        req.models.t_bom.find().where({'EncodeNum':EncodeNum}).exec(function(err,result) {
            "use strict";
            res.json({ success: true, Result: result});
        })
    },
}

module.exports =  API;