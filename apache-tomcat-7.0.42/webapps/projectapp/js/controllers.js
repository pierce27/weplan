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

           }
        });



        });

        // $scope.tasks = tasks;
        // console.log($scope.tasks);
        // $scope.tasks = [
        //                 {'id': '0',
        //                 'name': 'Go to FLoris',
        //                 'details': 'Go to Florist Next Week'},
        //                 {'id': '1',
        //                 'name': 'Pick up Dress',
        //                 'details': 'Dress picked up tomorrow.'},
        //                 {'id': '2',
        //                 'name': 'Call DJ',
        //                 'details': 'Call him at 12345678.'}
        //             ];


    });
