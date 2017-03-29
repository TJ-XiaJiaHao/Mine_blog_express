/**
 * Created by Administrator on 2017/2/13.
 */

var mysql = require('mysql');

//private
var database = 'xjh';
var client ;
function mysqlConnetion(database) {
    //create connection
    client = mysql.createConnection({
        user: 'root',
        password: 'xjh15306835599'
    });

    client.connect();
    client.query("use " + database);
}

//public
module.exports = {

    isHas:function(table,key,value,callback){
        var sql = "select * from " + table + " where " + key + "='" + value + "' limit 1;";
        mysqlConnetion(database);
        client.query(sql,
        function(err,results,fileds){
            if(err){
                throw err;
            }
            if(results){
                callback(results);
            }
        })
    },

    query:function(sql,callback){
        mysqlConnetion(database);
        client.query(sql,
        function(err,results,fileds){
            if(err){
                throw err;
            }
            if(results){
                callback(results);
            }
        });
        client.end();
    }
};