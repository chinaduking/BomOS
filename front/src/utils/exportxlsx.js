var XLSX = require('xlsx');
var FileSaver = require('file-saver');

var _exports = {};
module.exports = _exports;

_exports.exportXls = function(inputdata) {

    var data = twoDimensionalArray(inputdata.length+1,7);
    data[0][0] = 'Mfr_P/N&Value'
    data[0][1] = 'Mfr'
    data[0][2] = '数量'
    data[0][3] = '预警值'
    data[0][4] = '编号'
    data[0][5] = '价格'
    data[0][6] = '备注'
    for(var i=1;i<inputdata.length+1;i++)
    {
        data[i][0] = inputdata[i-1].Mfr_Value;
        data[i][1] = inputdata[i-1].Mfr;
        data[i][2] = inputdata[i-1].Num;
        data[i][3] = inputdata[i-1].Waring_Value;
        data[i][4] = inputdata[i-1].EncodeNum;
        data[i][5] = inputdata[i-1].Price;
        data[i][6] = inputdata[i-1].Remark;
    }

    var ws = {
        s:{
            "!row" : [{wpx: 67}]
        }
    };
    ws['!cols']= [];

    for(var n = 0; n != data[0].length+1; ++n){
        if(n == 2 || n == 3 || n == 5)
        {
            ws['!cols'].push({
                wpx: 50
            });
        }else
        {
            ws['!cols'].push({
                wpx: 150
            });
        }
    }

     var range = {
        s : {
            c : 100,
            r : 10000,
        },
        e : {
            c : 0,
            r : 0
        }
    };

    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R)
                range.s.r = R;
            if (range.s.c > C)
                range.s.c = C;
            if (range.e.r < R)
                range.e.r = R;
            if (range.e.c < C)
                range.e.c = C;

            var cell = {
                v : data[R][C],
                s:{
                    fill: { fgColor: { rgb: "#EE0000"}},
                    alignment: {horizontal: "center" ,vertical: "center"},
                }
            };

            if (cell.v == null)
                continue;
            var cell_ref = XLSX.utils.encode_cell({
                c : C,
                r : R
            });
            if ( typeof cell.v === 'number')
                cell.t = 'n';
            else if ( typeof cell.v === 'boolean')
                cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            } else
                cell.t = 's';
            if(R){
                delete cell.s.fill;
            }
            ws[cell_ref] = cell;
        }
    }

    if (range.s.c < 10000000)
        ws['!ref'] = XLSX.utils.encode_range(range);

    var workbook = new Workbook();
    var wsName = 'subbom';
    workbook.SheetNames.push(wsName);
    workbook.Sheets[wsName] = ws;

    var wopts = {
        bookType : 'xlsx',
        bookSST : false,
        type : 'binary'
    };
    var wbout = XLSX.write(workbook, wopts);
    FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), "subbom.xlsx");
    //XLSX.writeFile(workbook, 'output.xlsx',wopts);
    return true;
};

function Workbook() {
    if (!(this instanceof Workbook))
        return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}

function twoDimensionalArray(xMax, yMax) {  
    var arr = new Array()  
    for (i=0; i<xMax; i++) {  
        arr[i] = new Array();  
        for (j=0; j<yMax; j++) {  
            arr[i][j] = (i+1) * (j+1)  
        }  
    }  
    return arr;  
}  

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}