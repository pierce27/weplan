var projectApp = angular.module('projectApp', []);

$(function() {
  $( "#datepicker" ).datepicker();
});



// -------------------------------------------TASK CONTROLLER -------------------------------------------//
     
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
      $scope.apply

    });
      
  };



    //UPDATE TASK
    $scope.update = function (idx, context) {
  
      var id = '.' + context + $scope.tasks[idx]._id;
      var button_id = '.' + context + 'buttons' + $scope.tasks[idx]._id;

      var button_id_string = String(button_id)
      var id_string = String(id)
      var val = $(id_string).text();
      console.log('name')
      console.log(val)

      var newDueDate = new Date($scope.tasks[idx._id]);
      console.log('NEW DATE')
      console.log(newDueDate)

      // var detaisl = '.details .' + {$scope.tasks[idx]._id}
      // var details_id_string = String(details_id)

      if(context == 'name') {
        var task_to_update = {
          'id': $scope.tasks[idx]._id,
          'name': val,
          'description': $scope.tasks[idx].description,
          'details': $scope.tasks[idx].details,
          'dueDate': $scope.tasks[idx].dueDate
        };
      } else if(context == 'details'){
        var task_to_update = {
          'id': $scope.tasks[idx]._id,
          'name': $scope.tasks[idx].name,
          'description': $scope.tasks[idx].description,
          'details': val,
          'dueDate': $scope.tasks[idx].dueDate
        }
      } else if(context =='description'){
        var task_to_update = {
          'id': $scope.tasks[idx]._id,
          'name': $scope.tasks[idx].name,
          'description': val,
          'details': $scope.tasks[idx].details,
          'dueDate': $scope.tasks[idx].dueDate
        }
      } else if(context == 'duedate'){
        var task_to_update = {
          'id': $scope.tasks[idx]._id,
          'name': $scope.tasks[idx].name,
          'description': $scope.tasks[idx].description,
          'details': $scope.tasks[idx].details,
          'dueDate': val 
        }
      }

      console.log(task_to_update)


      $http.post('/updateTask', task_to_update).success(function(data){
      console.log('success');
      console.log(data);
      $(button_id_string).removeClass('show');

      });
    

  };


  $scope.editTask = function (idx){

  }

  $scope.showEdit = function(idx){

    $scope.details = $scope.tasks[idx].details
    $scope.dueDate = $scope.tasks[idx].dueDate
    $scope.name = $scope.tasks[idx].name
    $scope.description = $scope.tasks[idx].description
    $('#createTask').addClass('hide')
    $('#createTask').removeClass('hide')
    $('#createTaskArea').modal('show')

  }

  //SHOW EDIT BUTTONS
  $scope.edit = function ( idx, context ) {

    console.log(idx);
    var id = '.' + context + 'buttons' + $scope.tasks[idx]._id;
    var id_string = String(id)
    $(id_string).addClass('show');
    console.log(id)

    

  };

  //HIDE EDIT BUTTONS
  $scope.close = function ( idx, context ) {

    var id = '.' + context + 'buttons' + $scope.tasks[idx]._id;
    var id_string = String(id);
    console.log(id_string)
    $(id_string).removeClass('show');
    console.log('close desc')

    

  };


    //SHOW NAME EDIT BUTTONS
  $scope.editName = function ( idx ) {

    console.log(idx);
    var name_id = '.namebuttons' + $scope.tasks[idx]._id;
    var name_id_string = String(name_id)
    $(name_id_string).addClass('show');
    console.log(name_id)

    

  };

  //HIDE NAME EDIT BUTTONS
  $scope.closeName = function ( idx ) {

    var name_id = '.namebuttons' + $scope.tasks[idx]._id;
    var name_id_string = String(name_id)
    $(name_id_string).removeClass('show');
    console.log('close name')

    

  };








});




// -------------------------------------------WEDDING CONTROLLER -------------------------------------------//

projectApp.controller('WeddingsCtrl', function WeddingCtrl($scope, $http) {

  $http.get('/findWedding').success(function(data){

    $scope.weddings = data;
    console.log('Wedding')
    console.log($scope.weddings)
    // $scope.$apply();


  });


})






