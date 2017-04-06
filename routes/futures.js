var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var async = require('async');
var url = require('url');
var request = require('request');

var test_x = [
    "2013/2/7", "2013/2/8", "2013/2/18", "2013/2/19", "2013/2/20",
    "2013/2/21", "2013/2/22", "2013/2/25", "2013/2/26", "2013/2/27",
    "2013/2/28", "2013/3/1", "2013/3/4", "2013/3/5", "2013/3/6",
    "2013/3/7", "2013/3/8", "2013/3/11", "2013/3/12", "2013/3/13",
    "2013/3/14", "2013/3/15", "2013/3/18", "2013/3/19", "2013/3/20",
    "2013/3/21", "2013/3/22", "2013/3/25", "2013/3/26", "2013/3/27",
    "2013/3/28", "2013/3/29", "2013/4/1", "2013/4/2", "2013/4/3",
    "2013/4/8", "2013/4/9", "2013/4/10", "2013/4/11", "2013/4/12",
    "2013/4/15", "2013/4/16", "2013/4/17", "2013/4/18", "2013/4/19",
    "2013/4/22", "2013/4/23", "2013/4/24", "2013/4/25", "2013/4/26",
    "2013/5/2", "2013/5/3", "2013/5/6", "2013/5/7", "2013/5/8",
    "2013/5/9", "2013/5/10", "2013/5/13", "2013/5/14", "2013/5/15",
    "2013/5/16", "2013/5/17", "2013/5/20", "2013/5/21", "2013/5/22",
    "2013/5/23", "2013/5/24", "2013/5/27", "2013/5/28", "2013/5/29",
    "2013/5/30", "2013/5/31", "2013/6/3", "2013/6/4", "2013/6/5",
    "2013/6/6", "2013/6/7", "2013/6/13"
];
var test_trade = [ // 开盘，收盘，最低，最高
];

/* GET home page. */
router.get('/', function(req, res, next) {
    var contractBasicInfoArr = [];

    /*异步并行处理函数*/
    async.parallel([
            /*获取合约基本信息列表*/
            function(callback){
                http.get('http://127.0.0.1:3000/html/futures/ContractBasicInfo',function (res) {
                    var json = '';
                    res.on('data',function (d) {
                        json+=d;
                    });
                    res.on('end',function () {
                        console.log(json);
                        contractBasicInfoArr = JSON.parse(json);
                        callback(res);
                    }).on('error',function(e){
                        console.log(e);
                    });
                });
            }
        ],
        function(response){
            console.log("its contract" + contractBasicInfoArr);
            var response = {
                title: 'Express',
                contractBasicInfoArr:contractBasicInfoArr
            };
            res.render('html/futures',response);
        }
    );
});

router.get('/ContractBasicInfo', function(req, res) {
    console.log("目的：获取合约列表，参数：");
    var result = [];
    result.push({name:'伦敦金',sell:1172.48,buy:1172.97,point:50,color:"green"});
    result.push({name:'伦敦银',sell:16.763,buy:16.803,point:4.0,color:"red"});
    result.push({name:'美元指数',sell:1172.48,buy:1172.97,point:50,color:"green"});
    result.push({name:'纽约期油',sell:1172.48,buy:1172.97,point:50,color:"green"});
    result.push({name:'美元离岸人名币',sell:1172.48,buy:1172.97,point:50,color:"red"});
    result.push({name:'离岸人名币白银',sell:1172.48,buy:1172.97,point:50,color:"red"});
    result.push({name:'离岸人名币黄金',sell:1172.48,buy:1172.97,point:50,color:"red"});
    result.push({name:'伦敦金',sell:1172.48,buy:1172.97,point:50,color:"green"});
    result.push({name:'伦敦银',sell:16.763,buy:16.803,point:4.0,color:"red"});
    result.push({name:'美元指数',sell:1172.48,buy:1172.97,point:50,color:"green"});
    result.push({name:'纽约期油',sell:1172.48,buy:1172.97,point:50,color:"green"});
    result.push({name:'美元离岸人名币',sell:1172.48,buy:1172.97,point:50,color:"red"});
    result.push({name:'离岸人名币白银',sell:1172.48,buy:1172.97,point:50,color:"red"});
    result.push({name:'离岸人名币黄金',sell:1172.48,buy:1172.97,point:50,color:"red"});
    result.push({name:'伦敦金',sell:1172.48,buy:1172.97,point:50,color:"green"});
    result.push({name:'伦敦银',sell:16.763,buy:16.803,point:4.0,color:"red"});
    result.push({name:'美元指数',sell:1172.48,buy:1172.97,point:50,color:"green"});
    result.push({name:'纽约期油',sell:1172.48,buy:1172.97,point:50,color:"green"});
    result.push({name:'美元离岸人名币',sell:1172.48,buy:1172.97,point:50,color:"red"});
    result.push({name:'离岸人名币白银',sell:1172.48,buy:1172.97,point:50,color:"red"});
    result.push({name:'离岸人名币黄金',sell:1172.48,buy:1172.97,point:50,color:"red"});
    res.end(JSON.stringify(result));
});
router.post('/ContractDetailRefresh', function(req, res) {
    console.log("目的：加载历史交易信息，参数：" + req.query.name);
    var result = [];
    result.push({
        name:req.query.name,
        unit_of_trading:"10吨/手",
        unit_of_price:"元",
        minimum_price:"2元/吨",
        limit_up_down:"不超过上一交易日结算价±3%",
        delivery_month:"1、2、3、4、5、6、7、8、9、10、11、12月",
        trading_time:"每周一至周五上午9:00～11:30，下午13:30～15:00",
        last_trading_day:"合约交割月份的15日(遇法定假日顺延)",
        last_delivery_day:"最后交易日后连续五个工作日",
        delivery_grade:"标准品：符合GB/T 3274-2007《碳素结构钢和低合金结构钢热轧厚钢板和钢带》的Q235B或符合JIS G 3101-2010《一般结构用轧制钢材》的SS400，厚度5.75mm、宽度1500mm热轧卷板。",
        margin:"合约价值的4%",
        poundage:"1.5元/手；当日平仓减半收取",
        delivery_type:"实物交割",
        trading_code:"HC",
        delivery_point:"上海期货交易所"

    });
    res.end(JSON.stringify(result));
});
router.post('/HistoryTradeInit', function(req, res) {
    console.log("目的：加载历史交易信息，参数：" + req.query.name);

    var result = [];
    result.push({time:"2016-12-12 16:39:25",price:(Math.random() * 2000).toFixed(2),color:"red"});
    result.push({time:"2016-12-12 16:39:27",price:(Math.random() * 2000).toFixed(2),color:"green"});
    result.push({time:"2016-12-12 16:39:30",price:(Math.random() * 2000).toFixed(2),color:"red"});
    result.push({time:"2016-12-12 16:39:54",price:(Math.random() * 2000).toFixed(2),color:"red"});
    result.push({time:"2016-12-12 16:40:54",price:(Math.random() * 2000).toFixed(2),color:"green"});
    result.push({time:"2016-12-12 16:45:21",price:(Math.random() * 2000).toFixed(2),color:"red"});
    res.end(JSON.stringify(result));
});
router.post('/HistoryTradeRefresh', function(req, res) {
    var result = [];
    if((Math.random() * 10).toFixed(0) > 5)res.end(JSON.stringify(result));
    result.push({time:"2016-12-12 16:39:27",price:(Math.random() * 2000).toFixed(2),color:(Math.random() * 10).toFixed(0) > 5 ? "green" : "red"});
    res.end(JSON.stringify(result));
});
router.post('/ContractRefresh', function(req, res) {
    var result = [];
    result.push({name:'伦敦金',sell:(Math.random() * 2000).toFixed(2),buy:(Math.random() * 2000).toFixed(2),point:50,highest:(Math.random() * 2000).toFixed(2),lowest:(Math.random() * 2000).toFixed(2),open:1170.69,closed:1170.35,buyRate:"-1.25%",sellRate:"-0.75"});
    result.push({name:'伦敦银',sell:(Math.random() * 2000).toFixed(2),buy:(Math.random() * 2000).toFixed(2),point:50,highest:(Math.random() * 2000).toFixed(2),lowest:(Math.random() * 2000).toFixed(2),open:1170.69,closed:1170.35,buyRate:"-1.25%",sellRate:"-0.75"});
    result.push({name:'美元指数',sell:(Math.random() * 2000).toFixed(2),buy:(Math.random() * 2000).toFixed(2),point:50,highest:(Math.random() * 2000).toFixed(2),lowest:(Math.random() * 2000).toFixed(2),open:1170.69,closed:1170.35,buyRate:"-1.25%",sellRate:"-0.75"});
    result.push({name:'纽约期油',sell:(Math.random() * 2000).toFixed(2),buy:(Math.random() * 2000).toFixed(2),point:50,highest:(Math.random() * 2000).toFixed(2),lowest:(Math.random() * 2000).toFixed(2),open:1170.69,closed:1170.35,buyRate:"-1.25%",sellRate:"-0.75"});
    result.push({name:'美元离岸人名币',sell:(Math.random() * 2000).toFixed(2),buy:(Math.random() * 2000).toFixed(2),point:50,highest:(Math.random() * 2000).toFixed(2),lowest:(Math.random() * 2000).toFixed(2),open:1170.69,closed:1170.35,buyRate:"-1.25%",sellRate:"-0.75"});
    result.push({name:'离岸人名币白银',sell:(Math.random() * 2000).toFixed(2),buy:(Math.random() * 2000).toFixed(2),point:50,highest:(Math.random() * 2000).toFixed(2),lowest:(Math.random() * 2000).toFixed(2),open:1170.69,closed:1170.35,buyRate:"-1.25%",sellRate:"-0.75"});
    result.push({name:'离岸人名币黄金',sell:(Math.random() * 2000).toFixed(2),buy:(Math.random() * 2000).toFixed(2),point:50,highest:(Math.random() * 2000).toFixed(2),lowest:(Math.random() * 2000).toFixed(2),open:1170.69,closed:1170.35,buyRate:"-1.25%",sellRate:"-0.75"});
    res.end(JSON.stringify(result));
});
router.post('/KLineInit', function(req, res) {
    console.log("目的：获取k线图初始数据，参数：" + req.query.name);
    var options = {
        headers: {"Connection": "close"},
        url: "http://stock2.finance.sina.com.cn/futures/api/json.php/IndexService.getInnerFuturesMiniKLine5m?symbol=RB0",
        method: 'POST',
        json:true,
        body: {}
    };
    function callback(error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log('----info------',data);
            var result = [];
            if(data == null){ //如果获取到的数据为空，就返回空数组
                res.end(JSON.stringify(result));
            }
            else{
                for(var i = data.length-1 ; i >= 0 ; i--){
                    result.push({x_data: data[i][0],trade_data:[data[i][1],data[i][4],data[i][3],data[i][2]]});
                }
            }
            res.end(JSON.stringify(result));
        }
    }
    request(options, callback);
});
router.post('/KLineRefresh', function(req, res) {

    var result = [];

    if(test_x.length <= 0 || test_trade.length <= 0)res.end(JSON.stringify(result));

    result.push({x_data: test_x.shift(),trade_data:test_trade.shift()});

    res.end(JSON.stringify(result));
});
module.exports = router;