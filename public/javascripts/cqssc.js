/**
 * Created by Administrator on 2017/2/6.
 */
var lastExcept = 0;
var predictCode = [];
$(document).ready(function(){
    $("#ssc-table").html("<tr><th>Expect</th><th>Open Code</th><th>Open Time</th><th>Predict</th><th>Right</th></tr>");
    getData();
});

function getData(){
    var URL;
    URL = "/cqssc/getData";
    $.ajax({
        type: "get",
        async: true,            //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: URL,    //请求发送到TestServlet处
        data: {},
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            for(var i = 0 ; i < result.length ; i++) {
                if(result[i].expect > lastExcept) {
                    lastExcept = result[i].expect;
                    Random(5,0,9);
                }
                else continue;
                $("#ssc-table").append("<tr><td>" + result[i].expect +
                                      "</td><td>" + result[i].opencode +
                                      "</td><td>" + result[i].opentime +
                                      "</td><td>" + predictCode +
                                      "</td><td>" + isRight(predictCode,result[i].opencode[8]) +
                                      "</td></tr>");
            }
        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("get ssc data error!");
        }
    });

    setTimeout(getData,60000);
}

function Random(n,min,max){
    predictCode = [];
    while(predictCode.length < n){
        var issame = false;
        var code = parseInt(Math.random()*(max-min+1)+min);
        for(var j = 0 ; j < predictCode.length ; j++){
            if(code == predictCode[j]){
                issame = true;
            }
        }
        if(!issame){
            predictCode.push(code);
        }
    }
}

function isRight(arr,num){
    for(var i = 0; i < arr.length ; i++){
        if(arr[i] == num)return true;
    }
    return false;
}