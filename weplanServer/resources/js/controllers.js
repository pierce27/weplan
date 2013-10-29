    var projectApp = angular.module('projectApp', []);


     
    projectApp.controller('TaskListCtrl', function TaskListCtrl($scope, $http) {

        console.log('hello');
        var db = 'db';
        var mydb = 'myprojectdb';
        var tasks;
        $.ajax({
           url: 'http://localhost:3000/findTasks',
           type: 'get',
           data: {'db':'myprojectdb'} ,
           // dataType: 'json',
           cache: false,
           timeout: 5000,
           success: function(data) {
              // console.log(data);
              console.log(data);
              $scope.tasks = data;
              // console.zlog(data.rows[0].key)
              $scope.$apply();
               

           }
        });





       $( ".refresh" ).click(function() {
                $.ajax({
           url: 'http://localhost:3000/findTasks',
           type: 'get',
           // dataType: 'jsonp',
           cache: false,
           timeout: 5000,
           success: function(data) {
              // console.log(data);
              console.log(data);
              $scope.tasks = data;
              // console.zlog(data.rows[0].key)
              $scope.$apply();
               console.log("refreshed");               
               console.log($scope.tasks);

             }
          });


        });



        // $scope.createTask = function() {
        //     console.log("creating")
        //     var newTask = {name: this.name, details: this.details};
        //     this.tasks.push(newTask);
        //     this.text = '';

        // }


  $scope.submit = function() {
      i = $scope.tasks.length + 1
      var newTask = {name: this.name, details: this.details, id: i};
      this.tasks.push(newTask);

    
  };







    });
