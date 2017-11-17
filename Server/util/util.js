
var Util = {
    MysqlAddBom:function (req,readSheet,num,rownum) {
        i= num;
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

        req.models.t_bom.find().where({'Mfr_Value':Bom.Mfr_Value}).exec(function(err,result) {
            if(result != ''){
                i++;
                if(i<=rownum) {
                    Util.MysqlAddBom(req, readSheet, i, rownum);
                }else{
                    res.json({ success: true, message: 'BOM数据库更新成功'});
                }
            }else {
                req.models.t_bom.create(Bom).exec(function (err, result) {
                    i++;
                    if(i<=rownum) {
                        Util.MysqlAddBom(req, readSheet, i, rownum);
                    }else {
                        res.json({ success: true, message: 'BOM数据库更新成功'});
                    }
                });
            }
        });
    },

    MysqlCompareBom:function (req,readSheet,num,rownum,OutTable,res) {
        i= num;
        var Value = readSheet['D'+ i.toString()].v
        var MfrPN = readSheet['F'+ i.toString()].v
        var Num = readSheet['B'+ i.toString()].v
        var SerachKey = MfrPN;
        if(SerachKey == 'NA') {
            SerachKey = Value;
        }

        var OutBom = {
            ID:'NA',
            Mfr_Value:SerachKey,
            Mfr:'NA',
            Num:Num,
            Waring_Value: 0,
            EncodeNum:'NA',
            Price:'NA',
            Remark:'NA'
        }

        req.models.t_bom.find({Num:{'<':Num}}).where({'Mfr_Value':SerachKey}).exec(function(err,result) {
            if(result != ''){
                result[0].Num = Num - result[0].Num;
                //xl.exportXls(result)
                OutTable.push(result[0]);
                i++;
                if(i<=rownum){
                    Util.MysqlCompareBom(req, readSheet, i, rownum,OutTable,res);
                }else{
                    res.json({ success: true, data:OutTable});
                }
            }else{
                req.models.t_bom.find().where({'Mfr_Value':SerachKey}).exec(function(err,result) {
                    "use strict";
                    if(result == ''){
                        OutTable.push(OutBom);
                    }
                    i++;
                    if(i<=rownum){
                        Util.MysqlCompareBom(req, readSheet, i, rownum,OutTable,res);
                    }else {
                        res.json({ success: true, data:OutTable});
                    }
                })
            }
        });
    },

    MysqlAddBomNum:function (req,readSheet,num,rownum,res) {
        i= num;
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
        req.models.t_bom.find().where({'Mfr_Value':Mfr_Value}).exec(function(err,result){
            if(result != ''){
                var upNum = result[0].Num + Num;
                req.models.t_bom.update({'Mfr_Value':Mfr_Value},{'Num':upNum}).exec(function(err,result) {
                    i++;
                    if(i<=rownum) {
                        Util.MysqlAddBomNum(req, readSheet, i, rownum,res);
                    }else{
                        res.json({ success: true, message: 'BOM数据库更新成功'});
                    }
                })
            }else{
                req.models.t_bom.create(Bom).exec(function (err, result) {
                    i++;
                    if(i<=rownum) {
                        Util.MysqlAddBomNum(req, readSheet, i, rownum,res);
                    }else {
                        res.json({ success: true, message: 'BOM数据库更新成功'});
                    }
                });
            }
        })
    },

    MysqlSubBomNum:function (req,readSheet,num,rownum,res) {
        i= num;
        var Value = readSheet['D'+ i.toString()].v
        var MfrPN = readSheet['F'+ i.toString()].v
        var Num = readSheet['B'+ i.toString()].v
        var SerachKey = MfrPN;
        if(SerachKey == 'NA') {
            SerachKey = Value;
        }

        req.models.t_bom.find({Num:{'>=':Num}}).where({'Mfr_Value':SerachKey}).exec(function(err,result){
            if(result != ''){
                var upNum = result[0].Num - Num;
                req.models.t_bom.update({'Mfr_Value':SerachKey},{'Num':upNum}).exec(function(err,result) {
                    i++;
                    if(i<=rownum) {
                        Util.MysqlSubBomNum(req, readSheet, i, rownum,res);
                    }else{
                        res.json({ success: true, message: 'BOM数据库更新成功'});
                    }
                })
            }else{
                i++;
                if(i<=rownum) {
                    Util.MysqlSubBomNum(req, readSheet, i, rownum,res);
                }else {
                    res.json({ success: true, message: 'BOM数据库更新成功'});
                }
            }
        })
    },

}

module.exports =  Util;