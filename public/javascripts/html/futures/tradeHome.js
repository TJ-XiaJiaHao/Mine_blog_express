/**
 * Created by Administrator on 2016/12/6.
 */
var accountInfoBefore = 0;
var historyLi = 0;

var trade_data = [];
var x_data  = [];
var myChart;
var option;
var nowContract;
var KlineTimeOut;

var ContractTimeOut;
var ContractArr = [];

var HistoryTimeOut;

$(document).ready(function () {

    /*动态设置合约基本信息宽度*/
    UpdateConBasicInfoWidth();

    /*添加当切换合约时的特效*/
    SetChangeContract();

    /*设置账户信息主体部分特效*/
    SetAccountBodyBanner();

    /*蒙版点击开关*/
    $("#contract-op-button-sell").click(function(){
        $("#open-mask").css("visibility","visible");
    });
    $("#contract-op-button-buy").click(function(){
        $("#open-mask").css("visibility","visible");
    });
    $("#open-mask-box-btn").click(function(){
       $("#open-mask").css("visibility","hidden");
    });




    setAccountInfo("净值",99613.50,"red");
    setAccountInfo("总净盈亏",-386.19,"red");



    /*添加持仓列表*/
    addHandingItem("伦敦金","卖出",1,1172.47,1172.97,"red","","",0.00,0.00,"-50.00","red","2016-12-06 16:39:36","12793648");
    addHandingItem("伦敦金","卖出",1,1172.47,1172.97,"red","","",0.00,0.00,"-50.00","red","2016-12-06 16:39:36","12793648");
    addHandingItem("伦敦金","卖出",1,1172.47,1172.97,"red","","",0.00,0.00,"-50.00","red","2016-12-06 16:39:36","12793648");
    addHandingItem("伦敦金","卖出",1,1172.47,1172.97,"red","","",0.00,0.00,"-50.00","red","2016-12-06 16:39:36","12793648");
    addHandingItem("伦敦金","卖出",1,1172.47,1172.97,"red","","",0.00,0.00,"-50.00","red","2016-12-06 16:39:36","12793648");
    addHandingItem("伦敦金","卖出",1,1172.47,1172.97,"red","","",0.00,0.00,"-50.00","red","2016-12-06 16:39:36","12793648");

})

function KlineInit(id){

    require.config({
        paths: {
            echarts: '/javascripts/html/futures/echarts/build/dist'
        }
    });

    // 使用
    require(
        [
            'echarts',
            'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
            'echarts/chart/k'
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            myChart = ec.init(document.getElementById(id));

            option = {
                title : {
                    text: nowContract,
                    textStyle:{
                        fontSize:14,
                        fontWeight:'bolder',
                        color:'white'
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    formatter: function (params) {
                        var res = params[0].seriesName + ' ' + params[0].name;
                        res += '<br/>  开盘 : ' + params[0].value[0] + '  最高 : ' + params[0].value[3];
                        res += '<br/>  收盘 : ' + params[0].value[1] + '  最低 : ' + params[0].value[2];
                        return res;
                    }
                },
                legend: {
                    data:['上证指数'],
                    textStyle:{
                        color:'white'
                    }
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataZoom : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                dataZoom : {
                    show : true,
                    realtime: true,
                    start : 50,
                    end : 100
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        axisTick: {onGap:false},
                        splitLine: {show:false},
                        data : x_data
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        scale:true,
                        boundaryGap: [0.01, 0.01]
                    }
                ],
                series : [
                    {
                        name:'上证指数',
                        type:'k',
                        data:trade_data
                    }
                ]
            };


            // 为echarts对象加载数据
            myChart.setOption(option);
            KlineRefresh(nowContract);
        });
}

function KlineRefresh(name){
    myChart.showLoading();
    var URL;
    if(x_data.length == 0)URL = "/html/futures/KLineInit?name="+name;
    else URL = "/html/futures/KLineRefresh?name="+name;
    $.ajax({
        type: "post",
        async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: URL,    //请求发送到TestServlet处
        data: {},
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    trade_data.push(result[i].trade_data);    //挨个取出类别并填入类别数组
                    x_data.push(result[i].x_data);    //挨个取出销量并填入销量数组
                }
                myChart.hideLoading();    //隐藏加载动画
                myChart.setOption(option);
            }
            KlineTimeOut = setTimeout(KlineRefresh,5000,name);
        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
            myChart.hideLoading();
        }
    });
}

function HistoryTradeInit(){
    $.ajax({
        type: "post",
        async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: '/html/futures/HistoryTradeInit?name=' + nowContract,    //请求发送到TestServlet处
        data: {},
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                $("#contract-op-history-con").html("");
                for (var i = 0; i < result.length; i++) {
                    addNewHistoryTradeItem(result[i].time,result[i].price,result[i].color);
                }
            }
        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("合约历史交易信息加载失败!");
        }
    });
    HistoryTradeRefresh();
}

function HistoryTradeRefresh(){
    $.ajax({
        type: "post",
        async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: '/html/futures/HistoryTradeRefresh?name=' + nowContract,    //请求发送到TestServlet处
        data: {},
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    addNewHistoryTradeItem(result[i].time,result[i].price,result[i].color);
                }
            }
            HistoryTimeOut = setTimeout(HistoryTradeRefresh,1000);
        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("合约历史交易信息刷新失败!");
        }
    });
}

function ContractTradeRefresh(){
    UpdateContractArr();
    var URL;
    URL = "/html/futures/ContractRefresh?names="+ContractArr;
    $.ajax({
        type: "post",
        async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: URL,    //请求发送到TestServlet处
        data: {},
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    var num = $("#contract-basic-info-con").children().length;

                    /*更新信息列表*/
                    for(var j = 0; j < num ; j++){
                        var items = $("#contract-basic-info-con").children().eq(j).children();
                        if(items.eq(0).text() == result[i].name) {
                            items.eq(1).text(result[i].sell);
                            items.eq(2).text(result[i].buy);
                            items.eq(3).text(result[i].point);
                            var background = result[i].sell >result[i].closed ? "green" : "red";
                            items.eq(1).css("background",background);
                            items.eq(2).css("background",background);
                        }
                    }

                    /*更新右边的实时信息*/
                    if(result[i].name == nowContract){
                        var img = result[i].sell > result[i].closed ? "priceUp.png" : "priceDown.png";
                        var color = result[i].sell >result[i].closed ? "green" : "red";
                        $("#contract-op-sell-price").text(result[i].sell);
                        $("#contract-op-sell-price").css("color",color);
                        $("#contract-op-sell-info-img").attr("src", "/images/html/futures/" + img);
                        $("#contract-op-button-sell").css("background",color);
                        $("#contract-op-button-buy").css("background",color);
                        $("#contract-op-button-sell .price").text(result[i].sell);
                        $("#contract-op-button-buy .price").text(result[i].buy);
                        $("#op-trade-info-highest").text(result[i].highest);
                        $("#op-trade-info-highest").css("color",result[i].highest > result[i].closed ? "green" : "red");
                        $("#op-trade-info-begin").text(result[i].open);
                        $("#op-trade-info-begin").css("color",result[i].open > result[i].closed ? "green" : "red");
                        $("#op-trade-info-lowest").text(result[i].lowest);
                        $("#op-trade-info-lowest").css("color",result[i].lowest > result[i].closed ? "green" : "red");

                    }
                }
            }
            ContractTimeOut = setTimeout(ContractTradeRefresh,1000);
        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("数据刷新异常！");
        }
    });
}

function ContractDetailRefresh(){
    $.ajax({
        type: "post",
        async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: '/html/futures/ContractDetailRefresh?name=' + nowContract,    //请求发送到TestServlet处
        data: {},
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            if (result) {
                $("#contract-detail-table").children().eq(0).children().eq(0).children().eq(1).text(result[0].name);
                $("#contract-detail-table").children().eq(0).children().eq(0).children().eq(3).text(result[0].unit_of_trading);
                $("#contract-detail-table").children().eq(0).children().eq(0).children().eq(5).text(result[0].unit_of_price);
                $("#contract-detail-table").children().eq(0).children().eq(0).children().eq(7).text(result[0].minimum_price);
                $("#contract-detail-table").children().eq(0).children().eq(0).children().eq(9).text(result[0].limit_up_down);
                $("#contract-detail-table").children().eq(0).children().eq(1).children().eq(1).text(result[0].delivery_month);
                $("#contract-detail-table").children().eq(0).children().eq(1).children().eq(3).text(result[0].trading_time);
                $("#contract-detail-table").children().eq(0).children().eq(1).children().eq(5).text(result[0].last_trading_day);
                $("#contract-detail-table").children().eq(0).children().eq(1).children().eq(7).text(result[0].last_delivery_day);
                $("#contract-detail-table").children().eq(0).children().eq(1).children().eq(9).text(result[0].delivery_grade);
                $("#contract-detail-table").children().eq(0).children().eq(2).children().eq(1).text(result[0].margin);
                $("#contract-detail-table").children().eq(0).children().eq(2).children().eq(3).text(result[0].poundage);
                $("#contract-detail-table").children().eq(0).children().eq(2).children().eq(5).text(result[0].delivery_type);
                $("#contract-detail-table").children().eq(0).children().eq(2).children().eq(7).text(result[0].trading_code);
                $("#contract-detail-table").children().eq(0).children().eq(2).children().eq(9).text(result[0].delivery_point);

            }
        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("合约详情刷新失败!");
        }
    });
}

function SetChangeContract(){

    /*获取合约基本信息列表的长度*/
    var num = $("#contract-basic-info-con").children().length;

    /*遍历所有的列表元素为其添加js特效*/
    for(var i = 0; i < num; i ++){

        $("#contract-basic-info-con").children().eq(i).click(function () {

            /*如果点击的合约就是当前的合约，则不做任何操作*/
            if(nowContract == $(this).children().eq(0).text())return;

            /*更改当前的合约名字*/
            nowContract = $(this).children().eq(0).text();

            x_data = [];
            trade_data = [];

            /*重新加载k线图*/
            clearTimeout(KlineTimeOut);
            KlineInit("contract-kline");

            /*立即刷新一遍交易实时信息*/
            $("#contract-op-name").text(nowContract);
            clearTimeout(ContractTimeOut);
            ContractTradeRefresh();

            /*重新加载合约历史交易记录*/
            clearTimeout(HistoryTimeOut);
            HistoryTradeInit();


            ContractDetailRefresh();

        });
    }

    /*界面初始化时模拟点击第一条合约*/
    if($("#contract-basic-info-con").children().length != 0){
        $("#contract-basic-info-con").children().eq(0).click();
    }
}

function UpdateConBasicInfoWidth(){
    var num = $("#contract-basic-info-con").children().length;
    if(num > 15){
        $("#contract-basic-info-con").css("width","110%");
    }
}

function UpdateContractArr(){
    ContractArr = [];
    var num = $("#contract-basic-info-con").children().length;
    for(var i = 0;i < num ; i++){
        ContractArr.push($("#contract-basic-info-con").children().eq(i).children().eq(0).text());
    }
}

function SetAccountBodyBanner(){
    $("#account-total-info-body").children().eq(0).animate({left:'0px'},0);
    var totalInfoNum = $("#account-total-info-header").children().length;
    for(var i=0; i < totalInfoNum ; i++){
        $("#account-total-info-header").children().eq(i).click(function () {
            var index = $(this).index();

            /*改变header属性*/
            $(this).css("background","#5e5e5e");
            $(this).siblings().css("background","black");

            /*设置对应页面切换效果*/
            var pos = 100;
            if(index > accountInfoBefore)pos = 100;
            else if(index == accountInfoBefore)return;
            else pos = -100;
            $("#account-total-info-body").children().eq(index).animate({left:pos + '%'},0);
            $("#account-total-info-body").children().eq(accountInfoBefore).animate({left: (-1*pos) + '%'},500);
            $("#account-total-info-body").children().eq(index).animate({left:'0%'},500);
            accountInfoBefore = index;
        })
    }
}

function setAccountInfo(name,value,color){
    if(name == "净值"){
        $("#netWorth").html(value);
        $("#netWorth").css("color",color);
    }
    else if(name == "总净盈亏"){
        $("#profit").html(value);
        $("#profit").css("color",color);
    }
}

function addNewHistoryTradeItem(time,price,color){
    var url;
    if(color == "red") url = "/images/html/futures/priceDown.png";
    else if(color == "green") url = "/images/html/futures/priceUp.png";
    else return;
    $("#contract-op-history-con").prepend("<label class='history-con-time'>"
        + time + "</label><label id='price-"
        + historyLi.toString() + "' class='history-con-price'>"
        + price + "</label><img class='history-img' src = '"
        + url + "'/>");
    $("#price-" + historyLi.toString()).css("color",color);
    historyLi = historyLi + 1;

    var num = $(".history-con-time").length;

    if(num > 50) $("#contract-op-history-con").eq(50).remove();

    if(num > 8){
        $("#contract-op-history-con").css("width","108%");
    }

}

function addHandingItem(name,dir,hands,openPrice,closePrice,closePriceColor,stopLoss,stopWin,rebate,interest,profit,profitColor,time,order){
    $("#handing-table").append("<tr><td>"
        + name + "</td><td>"
        + dir + "</td><td>"
        + hands + "</td><td>"
        + openPrice + "</td><td style='color:" + closePriceColor + "'>"
        + closePrice + "</td><td>"
        + stopLoss + "</td><td>"
        + stopWin + "</td><td>"
        + rebate + "</td><td>"
        + interest + "</td><td style='color:" + profitColor + "'>"
        + profit + "</td><td>"
        + time + "</td><td>"
        + order + "</td></tr>");
    var num = $("#handing-table tr").length;
    if(num > 8){
        $("#dv-handing-table").css("width","102%");
    }
}