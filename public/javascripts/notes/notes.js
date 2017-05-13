/**
 * Created by Administrator on 2017/4/13.
 */
$(document).ready(function(){
    var lists = $("#book-list li");
    for(var i = 0 ; i < lists.length; i++){
        alert(lists[i].css("background-position"));

        lists[i].css("background-position","300px -90px");
    }
});