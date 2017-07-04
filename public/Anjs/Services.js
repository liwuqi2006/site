angular.module('services', []);


// Define Factory services for getting the promotion status options from back-end.
angular.module('services').factory('apiFactory', ['$http', apiFactory]);

function apiFactory($http) {


    function login(user){
        return $http.post('/auth/login', user);
    }

    function logout(user){
        return $http.get('/auth/logout', user);
    }

    function loguser(){
        return $http.get('/auth/user');
    }

    function addTeacher(teacherInfo){
        return $http.put('/api/addTeacher', teacherInfo);
    }

    function listTeacherInfo(){
        return $http.get('/api/listTeacherInfo');
    }

    function listTeacher(){
        return $http.get('/api/listTeacherInfo');
    }
    var service = {
        // promotion status
        login: login,
        logout: logout,
        loguser: loguser,
        addTeacher:addTeacher,
        listTeacherInfo: listTeacherInfo,
        listTeacher: listTeacher

    };
    return service;
}


angular.module('passport', []);

angular.module('passport').factory('loginService', function() {

    var User = '';

    function getUser(){
        return User;

    }

    function setuser(newUser){
        User = newUser;
        module.run(function($http) {
            $http.defaults.headers.common.Authorization = user;
        });

    }

    var loginService = {
        getUser:getUser,
        setUser:setuser
    };

    return loginService;
});