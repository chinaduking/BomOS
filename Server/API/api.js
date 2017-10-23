var jwt = require('jwt-simple');
var secret = 'duking'

var API = {

    getAllUser: function getAllUser(req,res) {
        req.models.t_user.find().exec(function(err,result) {
            "use strict";
            res.json({Result: result,error: err});
        });
    },

    addUser: function addUser(req,res) {
        var User = {
            username:req.body.params.username,
            password:req.body.params.password,
            admin: 2,
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        }

        req.models.t_user.find().where({'username':User.username}).exec(function(err,result) {
            if(result != ''){
                res.json({Result:null,text:'用户已存在'});
            }else {
                req.models.t_user.create(User).exec(function (err, result) {
                    res.json({Result: result, error: err});
                });
            }
        });
    },

    delUser:function delUser(req,res) {
        var username = req.body.params.username;
        req.models.t_user.destroy().where({'username':username}).exec(function(err,result) {
            res.json({Result: result, error: err});
        });
    },

    upPasswd:function upPasswd(req,res) {
        var username = req.body.params.username;
        var newpassword = req.body.params.newpassword;

        console.log(username,newpassword);

        req.models.t_user.update({'username':username},{'password':newpassword}).exec(function(err,result) {
            res.json({Result: result, error: err});
        });
    },

    Login: function(req,res) {
        console.log(req.body);
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
        console.log(token)
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