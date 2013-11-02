var projectApp = angular.module('projectApp', []);


     
projectApp.controller('TaskListCtrl', function TaskListCtrl($scope, $http) {

  $http.get('/findTasks').success(function(data){

    console.log(data)
    $scope.tasks = data;
    //$scope.$apply();

  });





 $( ".refresh" ).click(function() {

  // $http.get('/findTasks').success(function(data){

  //   $scope.tasks = data;
  //   $scope.$apply();

  // });
        $scope.apply


  });



      // $scope.createTask = function() {
      //     console.log("creating")
      //     var newTask = {name: this.name, details: this.details};
      //     this.tasks.push(newTask);
      //     this.text = '';

      // }


    $scope.createTask = function() {
        i = $scope.tasks.length + 1
        var newTask = {name: this.name, details: this.details, id: i};
        // this.tasks.push(newTask);
        $http.post('/newTask', newTask).success(function(data){
          console.log('Saved');
          $scope.tasks.push(data);
          
        });
      
    };

    // $scope.createTask = function() {
    //     i = $scope.tasks.length + 1

    //     // this.tasks.push(newTask);
    //     $http.post('/signup', newTask).success(function(data){
    //       console.log('Saved');
    //       $scope.tasks.push(data);
          
    //     });
      
    // };



    $scope.deleteTask = function ( idx ) {
    
      console.log($scope.tasks[idx])
      var task_to_delete = $scope.tasks[idx];

    $http.post('/deleteTask', task_to_delete).success(function(data){
      console.log('success');
      $scope.tasks.splice(idx, 1);
      // console.log(data);

    });

      

    };






});







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




projectApp.controller('WeddingsCtrl', function WeddingCtrl($scope, $http) {

  $http.get('/findWedding').success(function(data){

    $scope.weddings = data;
    console.log('Wedding')
    console.log($scope.wedding)
    // $scope.$apply();


  });


})






