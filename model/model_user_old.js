/**
 * Created by wuqili on 7/1/2017.
 */

var con = require('./model_index');


exports.getUserbyUsername = function(username, callback){
    var sql = "SELECT * FROM user WHERE login = '" + username + "' LIMIT 1";
    console.log('looking for user for ' + username)
    con.query(sql, function (err, result) {
        if(err) callback(err);
        else callback(err, result ? result[0] : result);
    });
};

exports.getUserbyId = function(id, callback){
    var sql = "SELECT * FROM user WHERE id = '" + id + "' LIMIT 1";
    con.query(sql, function (err, result) {
        if(err) callback(err);
        else callback(err, result ? result[0] : result);
    });
};

exports.getUserbyName = function(name, callback){
    var sql = "SELECT * FROM user WHERE name = '" + name + "' LIMIT 1";
    con.query(sql, function (err, result) {
        if(err) callback(err);
        else callback(err, result ? result[0] : result);
    });
};

exports.addUser = function(user, level ,callback){
    var sql = "SELECT * FROM user WHERE login = '" + user.username +"' OR name = '"+ user.name + "' LIMIT 1";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (result != '') {
            callback(Error('user already exist'));
        }
        else {
            sql = "INSERT INTO user(login, name, password, level) VALUES ('" + user.username + "','" + user.name + "','" + user.password + "','" + level + "')";
            console.log(sql);
            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.insertId);
                callback(err, result.insertId);
            });
        }
    });
};





exports.checkPassword = function(user, password, callback){
    if(user.password === ''){
        callback(Error('No password stored for user'))
    }
    else if(user.password == password){
        callback(null, true);
    }
    else{
        callback(null, false);
    }
};