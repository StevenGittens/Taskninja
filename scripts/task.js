'use strict';

app.controller('TaskController', function($scope, FURL, $firebase, $location, $routeParams) {

    var ref = new Firebase(FURL);
    var fbTasks = $firebase(ref.child('tasks')).$asArray();
    var taskId = $routeParams.taskId;

    //console.log(fbTasks);

    if(taskId) {
        //console.log(taskId);
        $scope.selectedTask = getTask(taskId);
    }

    function getTask(taskId) {
        //console.log(taskId);
        return $firebase(ref.child('tasks').child(taskId)).$asObject();
    }

    $scope.updateTask = function(task) {
        $scope.selectedTask.$save(task);
        $location.path('/browse');
    }

$scope.tasks = fbTasks;

    $scope.postTask = function(task) {
        fbTasks.$add(task);
        $location.path('/browse');
    }
});