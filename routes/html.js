var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('html/html.ejs', { title: 'HTML' });
});
router.get('/clock', function(req, res, next) {
    res.render('html/clock', { title: 'Clock' });
});
router.get('/youhuo', function(req, res, next) {
    res.render('html/youhuo', { title: 'Youhuo' });
});
router.get('/youji', function(req, res, next) {
    res.render('html/youji', { title: 'YouJi' });
});
router.get('/projectCommunication', function(req, res, next) {
    res.render('html/projectCommunication', { title: 'projectCommunication' });
});

module.exports = router;
