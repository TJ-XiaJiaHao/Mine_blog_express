var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index', { title: '个人主页' });
});
router.get('/home/info', function(req, res, next) {
    res.render('home/home', { title: '详细简历' });
});

module.exports = router;
