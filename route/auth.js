/**
 * Created by wuqili on 7/1/2017.
 */
var express = require('express');
var router = express.Router();

var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

var user = require('../model/model_user');
var path = require('path');


router.get('/login', function (req, res) {
    console.log('get /auth/login');
    res.sendFile(path.resolve(__dirname + '/../view/login.html'));
});

router.get('/user', function (req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user.login);
    }
    else {
        res.status(400).send('Not Authenticated!')
    }
});

router.post('/login', passport.authenticate('local', {successRedirect: '/'}), function (req, res) {
    res.send('success login');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).send('success logout');
});


passport.serializeUser(function (theuser, done) {
    console.log('serializeUser');
    done(null, theuser.id);
});

passport.deserializeUser(function (id, done) {
    console.log('deserializeUser');
    user.getUserbyId(id, function (err, founduser) {
        done(err, founduser);
    })
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log('will check user');
        user.getUserbyUsername(username, function (err, founduser) {
            if (err)
                done(err);
            else if (!founduser) {
                return done(null, false);
            }
            else {
                user.checkPassword(founduser, password, function (err, isMatch) {
                    if (err)
                        done(err);
                    else if (isMatch) {
                        done(null, founduser);
                    }
                    else {
                        done(null, false);
                    }
                });
            }
        });
    }
));

module.exports = router;