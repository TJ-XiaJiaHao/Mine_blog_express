/**
 * Created by Administrator on 2017/3/29.
 */
$(document).ready(function(){



    /*点击二级导航栏筛选对应模块*/
    appear($(".box-ul"));
    function appear(dom){
        dom.css("display","block");
        dom.animate({
            marginLeft: '0',
            opacity:'1'
        }, {
            easing: 'swing',
            duration: 500,
            complete: function () {
            }
        });
    }
    function disappear(dom){
        dom.css("display","none");
        dom.animate({
            marginLeft: '50px',
            opacity:'0'
        }, {
            easing: 'swing',
            duration: 0,
            complete: function () {
            }
        });
    }
    $("#nav-second ul li").click(function() {
        /*修改导航栏样式*/
        $(this).find("label").addClass("nav-second-choosed");
        $(this).siblings().find("label").removeClass("nav-second-choosed");

        /*修改显示内容*/
        var eg = $(this).index();
        if (eg == 0) {
            appear($(".box-ul"));
            return;
        }
        disappear($(".box-ul"));
        appear($(".box").eq(eg - 1).find(".box-ul"));
    });





    /*跳转链接*/
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
    $("#showProduct").click(function(){
        window.open("/html/showProduct3D");
    });
});