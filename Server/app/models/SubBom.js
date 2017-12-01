var Waterline = require('waterline');
module.exports = Waterline.Collection.extend({

    identity: 't_subbom',
    connection: 'mysql',

    attributes: {
        ID: {
            type: 'integer',
            primaryKey:true,
        },

        Mfr_Value: {
            type: 'string'
        },

        Mfr: {
            type: 'string'
        },

        Num: {
            type: 'integer'
        },

        Waring_Value: {
            type: 'integer'
        },

        EncodeNum: {
            type: 'string'
        },

        Price: {
            type: 'string'
        },
        Remark: {
            type: 'string'
        },
    }
});