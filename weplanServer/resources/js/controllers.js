var projectApp = angular.module('projectApp', []);

$(function() {
  $( "#datepicker" ).datepicker();
});

     
projectApp.controller('TaskListCtrl', function TaskListCtrl($scope, $http) {
  
  //GET TASKS FOR MAIN
  $http.get('/findTasks').success(function(data){

    console.log(data)
    $scope.tasks = data;
    //$scope.$apply();

  });

  //GET MY USER INFO
  $http.get('/getMe').success(function(data){

    console.log(data)
    $scope.me = data;
    //$scope.$apply();
    console.log($scope.me)

  });
  
  //FILTER
  $scope.orderProp = 'name';


  //REFRESH BUTTON
  $( ".refresh" ).click(function() {$scope.apply});


  //DATE PICKER
  $(function() {
    $('#datepicker')
        .datepicker()   
        .on('changeDate', function(e){    
            $scope.dueDate = $('#datepicker').val();    

        });
  });



  //CREATE TASK
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




  //DELETE TASK
  $scope.deleteTask = function ( idx ) {
  
    console.log($scope.tasks[idx])
    var task_to_delete = $scope.tasks[idx];

    $http.post('/deleteTask', task_to_delete).success(function(data){
      console.log('success');
      $scope.tasks.splice(idx, 1);
      // console.log(data);

    });
      
  };


  //UPDATE DESCRITPION
  $scope.updateDescription = function (idx) {
  
    var description_id = '.description' + $scope.tasks[idx]._id;
    var description_id_string = String(description_id)
    var descHtml = $(description_id_string).html();
    console.log('description')
    console.log(descHtml)

    // var detaisl = '.details .' + {$scope.tasks[idx]._id}
    // var details_id_string = String(details_id)

    var task_to_update = {
      'id': $scope.tasks[idx]._id,
      'description': descHtml,
      'details': $scope.tasks[idx].details
    }

    console.log(task_to_update)


    $http.post('/updateTask', task_to_update).success(function(data){
    console.log('success');
    console.log(data);
    $(description_id_string).removeClass('show');

    });
    

  };


  //SHOW EDIT BUTTONS
  $scope.editDescription = function ( idx ) {

    console.log(idx);
    var description_id = '.' + $scope.tasks[idx]._id;
    var description_id_string = String(description_id)
    $(description_id_string).addClass('show');
    console.log(description_id)

    

  };

  //HIDE EDIT BUTTONS
  $scope.closeDescription = function ( idx ) {

    var description_id = '.' + $scope.tasks[idx]._id;
    var description_id_string = String(description_id)
    $(description_id_string).removeClass('show');
    console.log('close desc')

    

  };








});






projectApp.controller('WeddingsCtrl', function WeddingCtrl($scope, $http) {

  $http.get('/findWedding').success(function(data){

    $scope.weddings = data;
    console.log('Wedding')
    console.log($scope.weddings)
    // $scope.$apply();


  });


})






