/**
 * Created by William on 7/2/2017.
 */
var con = require('./model_index');

exports.addTeacher = function(teacher, userId,callback){
    var sql = "INSERT INTO teacher(user_id) VALUES ('" + userId +"')";
    console.log(sql);
    con.query(sql, function (err, result) {
        if(err) callback(err);
        else callback(err, result.insertId);
    });
};

exports.listTeacherInfo = function(callback){
    var sql = "SELECT user.name AS name, " +
        "(SELECT COUNT(class.id) FROM class WHERE class.teacher_id = teacher.id) AS NumberOfClass , " +
                                        "(SELECT COUNT(student.id) FROM student WHERE student.teacher_id = teacher.id) AS NumberOfStudent " +
        "FROM teacher INNER JOIN user ON teacher.user_id = user.id";

    con.query(sql, function (err, result) {
        if(err) callback(err);
        else callback(err, result);
    });
};

exports.listTeacher = function(callback){
    var sql = "SELECT user.name AS name, " +
        "FROM teacher INNER JOIN user ON teacher.user_id = user.id";

    con.query(sql, function (err, result) {
        if(err) callback(err);
        else callback(err, result);
    });
};