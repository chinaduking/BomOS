/**
 * Created by duking on 2016/12/30.
 */
var Waterline = require('waterline');
module.exports = Waterline.Collection.extend({

    identity: 't_user',
    connection: 'mysql',

    attributes: {
        ID: {
            type: 'integer',
            primaryKey:true,
        },

        username: {
            type: 'string'
        },

        password: {
            type: 'string'
        },

        admin: {
            type: 'integer'
        },

        avatar: {
            type: 'string'
        }
    }
});