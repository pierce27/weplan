var projectApp = angular.module('projectApp', []);


projectApp.controller('SetupCtrl', function SetupCtrl($scope, $http) {
  console.log('in controller')

  $scope.start = function(){
    var role = this.role;
    var profile = {
      'role': this.role,
      'name': this.name,
      'location': this.location,
      'date': this.date

    }
    console.log('hi');

    $http.post('/setup', profile).success(function(data){
      console.log('success');
      window.location = '/main'
      // console.log(data);
    });


  }

  $scope.signup = function(){
    console.log('here in signup')
    var user = {
      'name': {
        'firstName':this.firstName,
        'lastName': this.lastName,
      },
      'email': this.email,
      'password': this.password
    };

    $http.post('/signup', user).success(function(data){
      console.log('success');
      // window.location = '/main'
      // console.log(data);

      window.location = '/main'
    });


  }


  $scope.signin = function(){
    console.log('here in signup')
    var user = {
      'email': this.email,
      'password': this.password
    };

    $http.post('/signin', user).success(function(data){
      console.log('success');
      // window.location = '/main'
      // console.log(data);

      window.location = '/main'
    });


  }


});