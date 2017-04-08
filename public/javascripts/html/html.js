/**
 * Created by Administrator on 2017/3/29.
 */
$(document).ready(function(){
    /*点击二级导航栏筛选对应模块*/
    $("#nav-second ul li").click(function(){
        /*修改导航栏样式*/
        $(this).find("label").addClass("nav-second-choosed");
        $(this).siblings().find("label").removeClass("nav-second-choosed");

        /*修改显示内容*/
        var eg = $(this).index();
        if(eg == 0){
            $(".box").css("display","block");
            return;
        }
        $(".box").css("display","none");
        $(".box").eq(eg - 1).css("display","block");
    });


    /*点击标题展开或收起对应模块*/
    $(".head-title label").attr("title","点此收起")
    $(".head-title").click(function(){
        var current = $(this).parent().find("ul").css("display");
        if(current == "block"){
            $(this).parent().find("ul").css("display","none");
            $(this).find("label").attr("title","点此展开");
        }
        else {
            $(this).parent().find("ul").css("display","block");
            $(this).find("label").attr("title","点此收起");
        }
    });

    $("#clock").click(function(){
        //location.href = "/html/clock";
        window.open("/html/clock");
    });
    $("#youhuo").click(function(){
        window.open("/html/youhuo");
    });
    $("#youji").click(function(){
        window.open("/html/youji");
    });
    $("#projectCom").click(function(){
        window.open("/html/projectcommunication");
    });
    $("#calculate").click(function(){
        window.open("/html/calculate");
    });
    $("#renzheshengui").click(function(){
        window.open("/html/renzheshengui");
    });
    $("#futures").click(function(){
        window.open("/html/futures");
    });
    $("#arpha").click(function(){
        window.open("/html/arpha");
    });
    $("#threedme").click(function(){
        window.open("/html/threedme");
    });
    $("#car").click(function(){
        window.open("/html/car");
    });
    $("#lift").click(function(){
        window.open("/html/lift");
    });
    $("#nav0").click(function(){
        window.open("/html/nav");
    });
    $("#tianmao").click(function(){
        window.open("/html/tianmao");
    });
    $("#blog").click(function(){
        window.open("/html/blog");
    });
});