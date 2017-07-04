/**
 * Created by William on 7/2/2017.
 */
var express = require('express');
var router = express.Router();

var teacher = require('../model/model_teacher');
var User = require('../model/model_user');




router.put('/addTeacher', function (req, res) {
    User.createUser(req.body.userInfo ,function(err, userId){
        if(err){
            return res.status(500).send('Error!')
        }

        teacher.addTeacher(req.body.teacherInfo, userId ,function(err, teacherId){
            if(err){
                return res.status(500).send('Error!')
            }
            res.json(teacherId);
        })
    });
});

router.put('/addClass', function (req, res) {
    user.addUser(req.body.userInfo, 1 ,function(err, userId){
        if(err){
            return res.status(500).send('Error!')
        }

        teacher.addTeacher(req.body.teacherInfo, userId ,function(err, teacherId){
            if(err){
                return res.status(500).send('Error!')
            }
            res.json(teacherId);
        })
    });
});

router.get('/listTeacherInfo', function (req, res) {
    teacher.listTeacherInfo(function(err, list){
        if(err){
            return res.status(500).send('Error!')
        }
            res.json(list);

    });
});

router.get('/listTeacher', function (req, res) {
    teacher.listTeacher(function(err, list){
        if(err){
            return res.status(500).send('Error!')
        }
        res.json(list);
    });
});




module.exports = router;