/**
 * Created by Administrator on 2016/12/1.
 */
var current = 0;
var before = 0;

var cities_move_speed=10;
var cities_move_step = 1;
var cities_img_margin = 20;
var cities_move_flag = true;

$("document").ready(function () {
    banner_change();
    cities_img_init();
    cities_img_move();

    var ht = $("#body ul li:nth-of-type(1)").html();
    for(var i = 0;i<5 ;i++) {
        $("#body ul").append("<li>" + ht + "</li>");
    }

})

function banner_change(){
    var total_imgs = $("#banner ul").children().length;
    before = current;
    current = (current + 1) % total_imgs;
    $("#banner ul").children().eq(before).animate({opacity:'0',zIndex:'6'},2000);
    $("#banner ul").children().eq(current).animate({opacity:'1.0',zIndex:'7'},2000);
    setTimeout(banner_change,5000);
}


function cities_img_init(){
    var num = $("#cities-banner ul ").children().length;
    var li_width = $("#cities-banner ul li").width();
    var li_height = $("#cities-banner ul li").height();
    for(var i = 0 ; i < num ; i++){
        $("#cities-banner ul li:nth-child(" + (i+1) + ")").css("left",i * (li_width+cities_img_margin) + "px");
        $("#cities-banner ul li:nth-child(" + (i+1) + ")").mouseover(function () {
            $(this).css("width",(li_width + 20) + 'px');
            $(this).css("height",(li_height + 20 ) + 'px');
            $(this).css("transform","translate(-10px,-10px)");
            cities_move_flag = false;
        })
        $("#cities-banner ul li:nth-child(" + (i+1) + ")").mouseout(function () {
            $(this).css("width",(li_width) + 'px');
            $(this).css("height",(li_height) + 'px');
            $(this).css("transform","translate(0px,0px)");
            cities_move_flag = true;
        })
    }
}

function cities_img_move(){
    if(cities_move_flag) {
        var num = $("#cities-banner ul ").children().length;
        var li_width = $("#cities-banner ul li").width();
        for (var i = 0; i < num; i++) {
            var current_left = parseInt($("#cities-banner ul li:nth-child(" + (i + 1) + ")").css("left"));
            if (current_left <= (-li_width)) {
                $("#cities-banner ul li:nth-child(" + (i + 1) + ")").animate({left: (num - 1) * (li_width + cities_img_margin) + cities_img_margin + 'px'}, 0);
            }
            else {
                $("#cities-banner ul li:nth-child(" + (i + 1) + ")").animate({left: (current_left - cities_move_step) + 'px'}, 0);
            }
        }
    }
    setTimeout(cities_img_move,cities_move_speed);
}

