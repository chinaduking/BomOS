var jwt = require('jwt-simple');
var multiparty = require('multiparty');
var fs = require("fs");
var XLSX = require('xlsx')
var util = require('util');
var secret = 'duking'

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
        form.uploadDir = "../uploads";
        //设置单文件大小限制
        form.maxFilesSize = 2 * 1024 * 1024;

        //上传完成后处理
        form.parse(req, function(err, fields, files) {
            var date = new Date().getTime().toString();
            console.log(date)
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = '../uploads/' + date + '_' + inputFile.originalFilename;
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    try {
                        var readFile = XLSX.readFile(dstPath);
                        readFile.SheetNames.forEach(function (sheetName) {
                            var readSheet = readFile.Sheets[sheetName]
                            var ref = readSheet['!ref']
                            var rowNum = ref.substring(4,5)
                            console.log(rowNum)
                            for(var i=2;i<=rowNum;i++){
                                var Mfr_Value = readSheet['A'+ i.toString()].v
                                var Mfr = readSheet['B'+ i.toString()].v
                                var Num = readSheet['C'+ i.toString()].v
                                var Waring_Value = readSheet['D'+ i.toString()].v
                                var EncodeNum = readSheet['E'+ i.toString()].v
                                var Price = readSheet['F'+ i.toString()].v
                                var Remark = readSheet['G'+ i.toString()].v

                                var Bom = {
                                    Mfr_Value:Mfr_Value,
                                    Mfr:Mfr,
                                    Num:Num,
                                    Waring_Value: Waring_Value,
                                    EncodeNum:EncodeNum,
                                    Price:Price,
                                    Remark:Remark
                                }

                                var QyeryFinishFlg = false
                                req.models.t_bom.find().where({'Mfr_Value':Bom.Mfr_Value}).exec(function(err,result) {
                                    if(result != ''){
                                       console.log('物料已存在')
                                        QyeryFinishFlg = true
                                    }else {
                                        req.models.t_bom.create(Bom).exec(function (err, result) {
                                            console.log(Bom)
                                            QyeryFinishFlg = true
                                        });
                                    }
                                });
                                while(!QyeryFinishFlg);
                            }
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

}

module.exports =  API;