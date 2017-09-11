var Api = require('../API/Api');

var API = {
    Hello: function Hello(req,res) {
        res.json({Resuly:'success', Data:"Hello!Api Test Ok!"});
    }
}

module.exports =  API;