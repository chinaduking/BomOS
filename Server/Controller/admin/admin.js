//'use strict';

var AdminModel = require( '../../models/admin/admin')
var dtime = require( 'time-formater')
var Admin =  {
     login: function login(req, res) {
             const newAdmin = {
                 user_name: 'wangjin',
                 password: '11111111111111111',
                 id: 1,
                 create_time: dtime().format('YYYY-MM-DD HH:mm'),
                 admin: 1,
                 status: 1,
                 city: 'cq'
             };

            AdminModel.create(newAdmin,function (err) {
                if (err) {
                    console.log("errrrrrrrrrrrr");
                }

                console.log("succccccccccccccccccccccccccc");
            });

            console.log("success!!!!!!!!!!!!");
          },
}
module.exports =  Admin;