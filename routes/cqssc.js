/**
 * Created by Administrator on 2017/2/6.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var mMyest = require('./mMysql');

function insertData(except,opentime,opencode,predict,isright) {
    var sql = "insert into cqssc values( '" + except + "','" + opentime + "','" + opencode + "','" + predict + "','" + isright + "');";

    //判断即将插入的记录是否已经存在
    mMyest.isHas("cqssc","except",except,
    function(results){

        //如果不存在，则正常插入
        if(results.length == 0){
            mMyest.query(sql,
                function(results){
                });
        }
        else{
            console.log("**error** : the records has exit!");
        }
    });
}


/* GET cqssc page. */
router.get('/', function(req, res) {
    res.render('cqssc');
    console.log('url:/cqssc');
});
router.get('/getData',function(req,res){
    console.log('url:/cqssc/getData');
    var url = "http://f.apiplus.cn/cqssc.json";
    var options = {
        headers: {"Connection": "close"},
        url: url,
        method: 'POST',
        json:true,
        body: {}
    };
    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            var result = [];
            if(data == null){ //如果获取到的数据为空，就返回空数组
                res.end(JSON.stringify(result));
            }
            else{
                for(var i = data.data.length-1 ; i >= 0 ; i--){
                    result.push({expect: data.data[i].expect,opencode:data.data[i].opencode,opentime:data.data[i].opentime});
                    //mysqlTest();
                    insertData(data.data[i].expect,data.data[i].opentime,data.data[i].opencode,"","");
                }
            }
            res.end(JSON.stringify(result));
        }
    }
    request(options, callback);
});

module.exports = router;