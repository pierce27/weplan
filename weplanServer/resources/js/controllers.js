var projectApp = angular.module('projectApp', []);

$(function() {
  $( "#datepicker" ).datepicker();
});

$("div.description").click(function(){
  
  console.log('description');
  $("btn description").addClass('show');


  });


     
projectApp.controller('TaskListCtrl', function TaskListCtrl($scope, $http) {

  $http.get('/findTasks').success(function(data){

    console.log(data)
    $scope.tasks = data;
    //$scope.$apply();

  });

  $http.get('/getMe').success(function(data){

    console.log(data)
    $scope.me = data;
    //$scope.$apply();
    console.log($scope.me)

  });
  

  $scope.orderProp = 'name';



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

      $(function() {
        $('#datepicker')
            .datepicker()   
            .on('changeDate', function(e){    
                $scope.dueDate = $('#datepicker').val();    

            });
      });


    $scope.createTask = function() {
        i = $scope.tasks.length + 1
        var newTask = {name: this.name, description: this.description, details: this.details, id: i, dueDate: this.dueDate};
        console.log('date')
        console.log($scope.dueDate)
        // this.tasks.push(newTask);
        $http.post('/newTask', newTask).success(function(data){
          console.log('Saved');
          $scope.tasks.push(data);
          $('#createTaskArea').modal('hide')

          
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

    $scope.updateDescription = function (idx) {
    
      var task_to_update = $scope.tasks[idx]
      console.log(task_to_update)


      // $http.post('/updateTask', task_to_update).success(function(data){
      //   console.log('success');

      //   // console.log(data);

      // });
      

    };

    $scope.editDescription = function ( idx ) {

      console.log(idx);
      var description_id = '.' + $scope.tasks[idx]._id;
      var description_id_string = String(description_id)
      $(description_id_string).addClass('show');
      console.log(description_id)

      

    };


    $scope.closeDescription = function ( idx ) {

      var description_id = '.' + $scope.tasks[idx]._id;
      var description_id_string = String(description_id)
      $(description_id_string).removeClass('show');
      console.log('close desc')

      

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
    console.log($scope.weddings)
    // $scope.$apply();


  });


})






