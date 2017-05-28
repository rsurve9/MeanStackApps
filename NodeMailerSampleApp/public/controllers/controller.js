angular.module('myApp', []).controller('appCtrl', function($scope,$http) {  

// Send Email

$scope.sendEmail = function(){
    console.log("From controller",$scope.emailContents);

    $http.post('/sendEmail',$scope.emailContents)
    .then(function mySucces(response) {        
         console.log("Email sent successfully.",response);
         refresh();
    }, function myError(response) {        
         console.log("Error on Request. Error message",response.statusText);
    });
};

});

