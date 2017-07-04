myapp = angular.module('my-app', ['services', 'ngRoute','smart-table']);


myapp.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/table'
        })
        .when('/teacher', {
            templateUrl: '/teacher',
            controller: 'teacherController'
        })
        .when('/class', {
            templateUrl: '/class',
            controller: 'classController'
        })
        .when('/student', {
            templateUrl: '/student',
            controller: 'studentController'
        })
        .when('/school', {
            templateUrl: '/school',
            controller: 'schoolController'
        })
        .otherwise({
            redirectTo: '/'
        })
});

myapp.controller('navController', function ($scope, $q, apiFactory, $window) {
    var chain = $q.when();

    $scope.username = 'User';


    chain = chain.then(function () {
        return apiFactory.loguser().then(function (response) {
            console.log(response.data);

            $scope.username = response.data;
        }, function () {
            $window.location.href = '/auth/login';
        });
    });

    $scope.clickLogout = function(){
        return apiFactory.logout().then(function () {
            $window.location.href = '/auth/login';
        });
    }
});

myapp.controller('sideController', function ($scope, $q, apiFactory, $window, $location) {
    var chain = $q.when();

    $scope.activeMenu = $location.url() ? $location.url() : '/';

    $scope.listOption = [

        {href: '/', name: 'Dashboard', icon: 'glyph stroked dashboard-dial', iconlink: '#stroked-dashboard-dial'},
        {href: '/class', name: 'Class', icon: 'glyph stroked table', iconlink: '#stroked-table'},
        {href: '/student', name: 'Student', icon: 'glyph stroked pencil', iconlink: '#stroked-pencil'},
        {href: '/teacher', name: 'Teacher', icon: 'glyph stroked male-user', iconlink: '#stroked-male-user'},
        {href: '/school', name: 'School', icon: 'glyph stroked home', iconlink: '#stroked-home'}

    ];

    $scope.clickSide = function (option) {
        $scope.activeMenu = option.href;
        $location.url(option.href);
    }
});
myapp.controller('classController', function ($scope, $q, apiFactory) {

    var chain = $q.when();

    $scope.rowCollection = [];

    chain = chain.then(function () {
        return apiFactory.listTeacherInfo().then(function (response) {
            $scope.rowCollection = response.data;
        });
    });


    $scope.view = 'main';

    $scope.newTeacherInfo = {
        userInfo:{name:'',password:'',username:''},
        teacherInfo:{
        }
    };

    $scope.showAlert = false;

    $scope.AlertMessage = '';

    $scope.selectedTeacher = '';


    $scope.$watch('selectedTeacher',function(){
        console.log($scope.selectedTeacher);
    });


    $scope.viewMain = function () {
        $scope.view = 'main';
    };
    $scope.viewAdd = function () {
        apiFactory.listTeacher().then(function (response) {
            $scope.listTeacher = response.data;
        });
        $scope.view = 'add';
    };
    $scope.submitAdd = function () {
        console.log('submit');

        console.log($scope.selectedTeacher);
        if(!$scope.newTeacherInfo.userInfo.name || $scope.newTeacherInfo.userInfo.password.length < 6 || !$scope.newTeacherInfo.userInfo.username){
            console.log('typo');
            $scope.AlertMessage = 'Invalid Input';
            $scope.showAlert = true;
            return;
        }
        return apiFactory.addTeacher($scope.newTeacherInfo).then(function () {
            console.log('success');
            apiFactory.listTeacherInfo().then(function (response) {
                $scope.rowCollection = response.data;
            });
            $scope.view = 'main';
        }, function () {
            $scope.AlertMessage = 'Username or Name already exist';
            $scope.showAlert = true;
        })
    }
});
myapp.controller('studentController', function ($scope, $q, apiFactory) {

    var chain = $q.when();

    $scope.rowCollection = [];

    chain = chain.then(function () {
        return apiFactory.listTeacherInfo().then(function (response) {
            $scope.rowCollection = response.data;
        });
    });


    $scope.view = 'main';

    $scope.newTeacherInfo = {
        userInfo:{name:'',password:'',username:''},
        teacherInfo:{
        }
    };

    $scope.showAlert = false;

    $scope.AlertMessage = '';

    $scope.selectedTeacher = '';


    $scope.$watch('selectedTeacher',function(){
        console.log($scope.selectedTeacher);
    });


    $scope.viewMain = function () {
        $scope.view = 'main';
    };
    $scope.viewAdd = function () {
        apiFactory.listTeacher().then(function (response) {
            $scope.listTeacher = response.data;
        });
        $scope.view = 'add';
    };
    $scope.submitAdd = function () {
        console.log('submit');

        console.log($scope.selectedTeacher);
        if(!$scope.newTeacherInfo.userInfo.name || $scope.newTeacherInfo.userInfo.password.length < 6 || !$scope.newTeacherInfo.userInfo.username){
            console.log('typo');
            $scope.AlertMessage = 'Invalid Input';
            $scope.showAlert = true;
            return;
        }
        return apiFactory.addTeacher($scope.newTeacherInfo).then(function () {
            console.log('success');
            apiFactory.listTeacherInfo().then(function (response) {
                $scope.rowCollection = response.data;
            });
            $scope.view = 'main';
        }, function () {
            $scope.AlertMessage = 'Username or Name already exist';
            $scope.showAlert = true;
        })
    }
});

myapp.controller('schoolController', function ($scope, $q, apiFactory) {

    var chain = $q.when();

    $scope.rowCollection = [];

    chain = chain.then(function () {
        return apiFactory.listTeacherInfo().then(function (response) {
            $scope.rowCollection = response.data;
        });
    });


    $scope.view = 'main';

    $scope.newTeacherInfo = {
        userInfo:{name:'',password:'',username:''},
        teacherInfo:{
        }
    };

    $scope.showAlert = false;

    $scope.AlertMessage = '';

    $scope.selectedTeacher = '';


    $scope.$watch('selectedTeacher',function(){
        console.log($scope.selectedTeacher);
    });


    $scope.viewMain = function () {
        $scope.view = 'main';
    };
    $scope.viewAdd = function () {
        apiFactory.listTeacher().then(function (response) {
            $scope.listTeacher = response.data;
        });
        $scope.view = 'add';
    };
    $scope.submitAdd = function () {
        console.log('submit');

        console.log($scope.selectedTeacher);
        if(!$scope.newTeacherInfo.userInfo.name || $scope.newTeacherInfo.userInfo.password.length < 6 || !$scope.newTeacherInfo.userInfo.username){
            console.log('typo');
            $scope.AlertMessage = 'Invalid Input';
            $scope.showAlert = true;
            return;
        }
        return apiFactory.addTeacher($scope.newTeacherInfo).then(function () {
            console.log('success');
            apiFactory.listTeacherInfo().then(function (response) {
                $scope.rowCollection = response.data;
            });
            $scope.view = 'main';
        }, function () {
            $scope.AlertMessage = 'Username or Name already exist';
            $scope.showAlert = true;
        })
    }
});

myapp.controller('teacherController', function ($scope, $q, apiFactory) {

    var chain = $q.when();

    $scope.rowCollection = [];

    chain = chain.then(function () {
        return apiFactory.listTeacherInfo().then(function (response) {
            $scope.rowCollection = response.data;
        });
    });


    $scope.view = 'main';

    $scope.newTeacherInfo = {
        userInfo:{name:'',password:'',username:''},
        teacherInfo:{
        }
    };

    $scope.showAlert = false;

    $scope.AlertMessage = '';

    $scope.viewMain = function () {
        $scope.view = 'main';
    };
    $scope.viewAdd = function () {
        $scope.view = 'add';
    };
    $scope.submitAdd = function () {
        console.log('submit');
        if(!$scope.newTeacherInfo.userInfo.name || $scope.newTeacherInfo.userInfo.password.length < 6 || !$scope.newTeacherInfo.userInfo.username){
            console.log('typo');
            $scope.AlertMessage = 'Invalid Input';
            $scope.showAlert = true;
            return;
        }
        return apiFactory.addTeacher($scope.newTeacherInfo).then(function () {
            console.log('success');
            apiFactory.listTeacherInfo().then(function (response) {
                $scope.rowCollection = response.data;
            });
            $scope.view = 'main';
        }, function () {
            $scope.AlertMessage = 'Username or Name already exist';
            $scope.showAlert = true;
        })
    }

});

angular.module('loginModule', ['services']);

angular.module('loginModule').controller("loginController", function ($scope, $q, apiFactory, $location, $window) {

    var chain = $q.when();

    $scope.user = {
        username: '',
        password: ''
    }
    $scope.showAlert = false;


    $scope.clickLogin = function () {
        console.log('click on login');

        return apiFactory.login($scope.user).then(function () {
            console.log('success');
            $window.location.href = '/';
        }, function () {
            $scope.showAlert = true;
        })
    }

});




