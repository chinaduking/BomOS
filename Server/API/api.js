var jwt = require('jwt-simple');

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
            avatar: 'default.jpg'
        }

        req.models.t_user.create(User).exec(function(err,result) {
            res.json({Result: result, error: err});
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
        var newpassword = req.body.params.password;
        var  User = {
            password:newpassword
        };
        req.models.post.update(User).where({'username':username}).exec(function(err,result) {
            res.json({Result: result, error: err});
        });
    },

    Login: function(req,res) {
        var username = req.body.params.username;
        var password = req.body.params.password;
        if(username == 'wangjin' && password == '6db042d1203dd2873f2abb3a5c0bb3a9')
        {
            var token = jwt.encode({
                uid: 1,
                name: 'duking',
                exp:Math.floor(Date.now()/1000) + 24 * 60 * 60//1 hours
            },'duking');

            console.log(token);

            res.json({
                uid: 1,
                name: 'duking',
                success: true,
                token: 123456789,
            })
        }else{
            res.json({
                success: false,
                token:null,
            })
        }
    },
}

module.exports =  API;