/**
 * Created by wuqili on 6/29/2017.
 */




//Return id if found, otherwise return null


exports.findTeacher = function(name, callback){
    var sql = "SELECT * FROM user WHERE name = '" + name + "' LIMIT 1";
    console.log(sql);
    con.query(sql, function (err, result) {
        if(err) throw err;
        if(result != '') result = result[0].id;
        callback(result);
    });
};



exports.createUser = function(info, callback){
    var sql = "INSERT INTO user (login, password,level) VALUES ('" + info.login + "','" + info.password +"','"+ info.level + "')";
    console.log(sql);
    con.query(sql, function (err, result) {
        if(err) throw err;
        console.log(result.insertId);
    });
};