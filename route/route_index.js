/**
 * Created by William on 7/1/2017.
 */

var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/', ensureAuthenticated, function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../view/index.html'));
});
router.get('/student', ensureAuthenticated, function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../view/student.html'));
});

router.get('/teacher', ensureAuthenticated, function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../view/teacher.html'));
});

router.get('/class', ensureAuthenticated, function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../view/class.html'));
});

router.get('/school', ensureAuthenticated, function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../view/school.html'));
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('Authenticated');
        return next();
    }
    else {
        console.log('Not Authenticated');
        res.redirect('/auth/login');
    }
}

module.exports = router;