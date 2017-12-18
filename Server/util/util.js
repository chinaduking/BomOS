
var Util = {
    MysqlAddBom:function (req,readSheet,num,rownum,res) {
        i= num;
        try {
            var Mfr_Value = readSheet['A' + i.toString()].v
            var Mfr = readSheet['B' + i.toString()].v
            var Num = readSheet['C' + i.toString()].v
            var Waring_Value = readSheet['D' + i.toString()].v
            var EncodeNum = readSheet['E' + i.toString()].v
            var Price = readSheet['F' + i.toString()].v
            var Remark = readSheet['G' + i.toString()].v

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
                        Util.MysqlAddBom(req, readSheet, i, rownum,res);
                    }else{
                        res.json({ success: true, message: 'BOM数据库更新成功'});
                    }
                }else {
                    req.models.t_bom.create(Bom).exec(function (err, result) {
                        i++;
                        if(i<=rownum) {
                            Util.MysqlAddBom(req, readSheet, i, rownum,res);
                        }else {
                            res.json({ success: true, message: 'BOM数据库更新成功'});
                        }
                    });
                }
            });
        }catch (err) {
            res.json({ success: false, message: '表格格式有误，请检查表格式',err:err});
        }
    },

    MysqlCompareBom:function (req,readSheet,num,rownum,OutTable,res) {
        try {
            i = num;
            var Value = readSheet['D' + i.toString()].v
            var MfrPN = readSheet['F' + i.toString()].v
            var Num = readSheet['B' + i.toString()].v
            var SerachKey = MfrPN;
            if (SerachKey == 'NA') {
                SerachKey = Value;
            }

            var OutBom = {
                ID: 'NA',
                Mfr_Value: SerachKey,
                Mfr: 'NA',
                Num: Num,
                Waring_Value: 0,
                EncodeNum: 'NA',
                Price: 'NA',
                Remark: 'NA'
            }

            req.models.t_bom.find({Num: {'<': Num}}).where({'Mfr_Value': SerachKey}).exec(function (err, result) {
                if (result != '') {
                    result[0].Num = Num - result[0].Num;
                    //xl.exportXls(result)
                    OutTable.push(result[0]);
                    i++;
                    if (i <= rownum) {
                        Util.MysqlCompareBom(req, readSheet, i, rownum, OutTable, res);
                    } else {
                        res.json({success: true, data: OutTable});
                    }
                } else {
                    req.models.t_bom.find().where({'Mfr_Value': SerachKey}).exec(function (err, result) {
                        "use strict";
                        if (result == '') {
                            OutTable.push(OutBom);
                        }
                        i++;
                        if (i <= rownum) {
                            Util.MysqlCompareBom(req, readSheet, i, rownum, OutTable, res);
                        } else {
                            res.json({success: true, data: OutTable});
                        }
                    })
                }
            });
        }catch (err){
            res.json({ success: false, message: '表格格式有误，请检查表格式',err:err});
        }
    },

    MysqlAddBomNum:function (req,readSheet,num,rownum,res) {
        try {
            i = num;
            var Mfr_Value = readSheet['A' + i.toString()].v
            var Mfr = readSheet['B' + i.toString()].v
            var Num = readSheet['C' + i.toString()].v
            var Waring_Value = readSheet['D' + i.toString()].v
            var EncodeNum = readSheet['E' + i.toString()].v
            var Price = readSheet['F' + i.toString()].v
            var Remark = readSheet['G' + i.toString()].v

            var Bom = {
                Mfr_Value: Mfr_Value,
                Mfr: Mfr,
                Num: Num,
                Waring_Value: Waring_Value,
                EncodeNum: EncodeNum,
                Price: Price,
                Remark: Remark
            }
            req.models.t_bom.find().where({'Mfr_Value': Mfr_Value}).exec(function (err, result) {
                if (result != '') {
                    var upNum = result[0].Num + Num;
                    var upPrice = ((result[0].Num *result[0].Price + Price * Num)/(result[0].Num+ Num)).toFixed(2);
                    req.models.t_bom.update({'Mfr_Value': Mfr_Value}, {'Num': upNum,'Price':upPrice}).exec(function (err, result) {
                        i++;
                        if (i <= rownum) {
                            req.models.t_addbom.create(Bom).exec(function (err, result) {
                                Util.MysqlAddBomNum(req, readSheet, i, rownum, res);
                            })
                        } else {
                            req.models.t_addbom.create(Bom).exec(function (err, result) {
                                res.json({success: true, message: 'BOM数据库更新成功'});
                            })
                        }
                    })
                } else {
                    req.models.t_bom.create(Bom).exec(function (err, result) {
                        i++;
                        if (i <= rownum) {
                            req.models.t_addbom.create(Bom).exec(function (err, result) {
                                Util.MysqlAddBomNum(req, readSheet, i, rownum, res);
                            })
                        } else {
                            req.models.t_addbom.create(Bom).exec(function (err, result) {
                                res.json({success: true, message: 'BOM数据库更新成功'});
                            })
                        }
                    });
                }
            })
        }catch (err) {
            res.json({ success: false, message: '表格格式有误，请检查表格式',err:err});
        }
    },

    MysqlSubBomNum:function (req,readSheet,num,rownum,res,Project) {
        try {
            i = num;
            var Value = readSheet['D' + i.toString()].v
            var MfrPN = readSheet['F' + i.toString()].v
            var Num = readSheet['B' + i.toString()].v
            var SerachKey = MfrPN;
            if (SerachKey == 'NA') {
                SerachKey = Value;
            }

            req.models.t_bom.find({Num: {'>=': Num}}).where({'Mfr_Value': SerachKey}).exec(function (err, result) {
                if (result != '') {
                    var upNum = result[0].Num - Num;
                    result[0].Num = Num;
                    var Bom = {
                        Project:Project,
                        Mfr_Value: result[0].Mfr_Value,
                        Mfr: result[0].Mfr,
                        Num: result[0].Num,
                        Waring_Value: result[0].Waring_Value,
                        EncodeNum: result[0].EncodeNum,
                        Price: result[0].Price,
                        Remark: result[0].Remark
                    }
                    req.models.t_subbom.create(Bom).exec(function (err, result) {
                        req.models.t_bom.update({'Mfr_Value': SerachKey}, {'Num': upNum}).exec(function (err, result) {
                            i++;
                            if (i <= rownum) {
                                Util.MysqlSubBomNum(req, readSheet, i, rownum, res,Project);
                            } else {
                                res.json({success: true, message: 'BOM数据库更新成功'});
                            }
                        })
                    })
                } else {
                    i++;
                    if (i <= rownum) {
                        Util.MysqlSubBomNum(req, readSheet, i, rownum, res,Project);
                    } else {
                        res.json({success: true, message: 'BOM数据库更新成功'});
                    }
                }
            })
        }catch (err) {
            res.json({ success: false, message: '表格格式有误，请检查表格式',err:err});
        }
    },

    CheckIsAddBomTable:function (readSheet,startrow,endrow) {
        "use strict";
        var i = 1;
        var Mfr_Value = readSheet['A' + i.toString()].v
        var Mfr = readSheet['B' + i.toString()].v
        var Num = readSheet['C' + i.toString()].v
        var Waring_Value = readSheet['D' + i.toString()].v
        var EncodeNum = readSheet['E' + i.toString()].v
        var Price = readSheet['F' + i.toString()].v
        var Remark = readSheet['G' + i.toString()].v
        if(Mfr_Value != 'Mfr_P/N&Value'){
            return 0;
        }
        if(Mfr != 'Mfr'){
            return 0;
        }
        if(Num != '数量'){
            return 0;
        }
        if(Waring_Value != '预警值'){
            return 0;
        }
        if(EncodeNum != '编号'){
            return 0;
        }
        if(Price != '价格'){
            return 0;
        }
        if(Remark != '备注'){
            return 0;
        }


        for(var i=startrow;i<=endrow;i++){
            var Mfr_Value = readSheet['A' + i.toString()].v
            var Mfr = readSheet['B' + i.toString()].v
            var Num = readSheet['C' + i.toString()].v
            var Waring_Value = readSheet['D' + i.toString()].v
            var EncodeNum = readSheet['E' + i.toString()].v
            var Price = readSheet['F' + i.toString()].v
            var Remark = readSheet['G' + i.toString()].v
            if(!isNumber(Num)){
                return 0;
            }
            if(!isNumber(Waring_Value)){
                return 0;
            }
            if(!isNumber(Price)){
                return 0;
            }
        }
        return 1;
    },
    CheckIsCompareBomTable:function (readSheet,startrow,endrow) {
        "use strict";
        var i=12;
        var Value = readSheet['D' + i.toString()].v
        var MfrPN = readSheet['F' + i.toString()].v
        var Num = readSheet['B' + i.toString()].v
        if(Value != 'Value') {
            return 0;
        }
        if(MfrPN != 'mfr P/N') {
            return 0;
        }
        if(Num != 'Quantity') {
            return 0;
        }

        for(var i=startrow;i<=endrow;i++){
            var Value = readSheet['D' + i.toString()].v
            var MfrPN = readSheet['F' + i.toString()].v
            var Num = readSheet['B' + i.toString()].v
            if(!isNumber(Num)) {
                return 0;
            }
        }
        return 1;
    },

    CheckIsAddBomTableNum:function (readSheet,startrow,endrow) {
        "use strict";
        var i = 1;
        var Mfr_Value = readSheet['A' + i.toString()].v
        var Mfr = readSheet['B' + i.toString()].v
        var Num = readSheet['C' + i.toString()].v
        var Waring_Value = readSheet['D' + i.toString()].v
        var EncodeNum = readSheet['E' + i.toString()].v
        var Price = readSheet['F' + i.toString()].v
        var Remark = readSheet['G' + i.toString()].v
        if(Mfr_Value != 'Mfr_P/N&Value'){
            return 0;
        }
        if(Mfr != 'Mfr'){
            return 0;
        }
        if(Num != '数量'){
            return 0;
        }
        if(Waring_Value != '预警值'){
            return 0;
        }
        if(EncodeNum != '编号'){
            return 0;
        }
        if(Price != '价格'){
            return 0;
        }
        if(Remark != '备注'){
            return 0;
        }

        for(var i=startrow;i<=endrow;i++){
            var Mfr_Value = readSheet['A' + i.toString()].v
            var Mfr = readSheet['B' + i.toString()].v
            var Num = readSheet['C' + i.toString()].v
            var Waring_Value = readSheet['D' + i.toString()].v
            var EncodeNum = readSheet['E' + i.toString()].v
            var Price = readSheet['F' + i.toString()].v
            var Remark = readSheet['G' + i.toString()].v

            if(!isNumber(Num)){
                return 0;
            }
            if(!isNumber(Waring_Value)){
                return 0;
            }
            if(!isNumber(Price)){
                return 0;
            }
        }
        return 1;
    },
    CheckIsSubBomTableNum:function (readSheet,startrow,endrow) {
        "use strict";
        var i=12;
        var Value = readSheet['D' + i.toString()].v
        var MfrPN = readSheet['F' + i.toString()].v
        var Num = readSheet['B' + i.toString()].v
        if(Value != 'Value') {
            return 0;
        }
        if(MfrPN != 'mfr P/N') {
            return 0;
        }
        if(Num != 'Quantity') {
            return 0;
        }
        for(var i=startrow;i<=endrow;i++){
            var Value = readSheet['D' + i.toString()].v
            var MfrPN = readSheet['F' + i.toString()].v
            var Num = readSheet['B' + i.toString()].v

            if(!isNumber(Num)){
                return 0;
            }
        }
        return 1;
    },

}

function isNumber(value) {
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}

module.exports =  Util;