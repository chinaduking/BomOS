var Waterline = require('waterline');
module.exports = Waterline.Collection.extend({

    identity: 't_bom',
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
            type: 'float'
        },
        Remark: {
            type: 'string'
        },
    }
});