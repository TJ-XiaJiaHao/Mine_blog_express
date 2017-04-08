var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('html/html.ejs', { title: 'HTML' });
});
router.get('/clock', function(req, res) {
    res.render('html/clock', { title: 'Clock' });
});
router.get('/youhuo', function(req, res) {
    res.render('html/youhuo', { title: 'Youhuo' });
});
router.get('/youji', function(req, res) {
    res.render('html/youji', { title: 'YouJi' });
});
router.get('/projectCommunication', function(req, res) {
    res.render('html/projectCommunication', { title: 'projectCommunication' });
});
router.get('/calculate', function(req, res) {
    res.render('html/calculate', { title: 'calculate' });
});

router.get('/renzheshengui', function(req, res) {
    res.render('html/renzheshengui', { title: 'renzheshengui' });
});
router.get('/arpha', function(req, res) {
    res.render('html/arpha', { title: 'arpha' });
});
router.get('/threedme', function(req, res) {
    res.render('html/threedme', { title: 'threedme' });
});
router.get('/car', function(req, res) {
    res.render('html/car', { title: 'car' });
});
router.get('/lift', function(req, res) {
    res.render('html/lift', { title: 'lift' });
});
router.get('/nav', function(req, res) {
    res.render('html/nav', { title: 'nav' });
});
router.get('/tianmao', function(req, res) {
    res.render('html/tianmao', { title: 'tianmao' });
});
router.get('/blog', function(req, res) {
    res.render('html/blog', { title: 'blog' });
});

module.exports = router;
