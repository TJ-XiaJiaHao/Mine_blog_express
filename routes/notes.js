/**
 * Created by Administrator on 2017/4/12.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('notes/notes', { title: '课程笔记' });
});

module.exports = router;
