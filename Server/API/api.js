var jwt = require('jwt-simple');
var secret = 'duking'

var API = {

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
    }
}

module.exports =  API;