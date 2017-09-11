'use strict';

//import AdminModel from '../../models/admin/admin'
//import dtime from 'time-formater'
//
// class Admin {
//
//      login(req, res, next) {
//          //     const newAdmin = {
//          //         user_name: 'duking',
//          //         password: '123456',
//          //         id: 1,
//          //         create_time: dtime().format('YYYY-MM-DD HH:mm'),
//          //         admin: 1,
//          //         status: 1,
//          //         city: 'cq'
//          //     };
//          //
//          //     AdminModel.create(newAdmin);
//          //
//               console.log("success!!!!!!!!!!!!");
//          // }
//      }
// }
// test = new Admin();
// test.login();
// export default new Admin()
class BaseResult{
    constructor(code,msg,data){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
    setCode(code){
        this.code = code;
    }
    getCode(){
        return this.code;
    }
    setMsg(msg){
        this.msg = msg;
    }
    getMsg(){
        return this.msg;
    }
    setData(data){
        this.data = data;
    }
    getData(){
        return this.data;
    }
    getRes(){
        return {'code':this.code,'msg':this.msg,'data':this.data};
    }
}

const SUCCESS = new BaseResult(0,'成功',{a:10,b:[{c:10,d:20},{e:30,f:40}]});
console.log(SUCCESS);