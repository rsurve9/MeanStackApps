angular.module('myApp', []).controller('appCtrl', function($scope,$http) {   
    console.log("Hello World");

// Get the data from the server and pass the data to the View on success.

var refresh = function(){
$http.get('/contactList')
    .then(function mySucces(response) {
        $scope.contactList = response.data;       
         console.log("Contacts fetched.");        
    }, function myError(response) {
        $scope.contactList = response.statusText;
         console.log("Error on Request. Error message",response.statusText);
    });
};

refresh();

// Send data to the sever to save into the database.

$scope.addContact = function(){
    console.log($scope.contact);
    $http.post('/contactList',$scope.contact)
    .then(function mySucces(response) {
        $scope.contactList = response.data;
         console.log("Contact added successfully.",response);
         refresh();
    }, function myError(response) {
        $scope.contactList = response.statusText;
         console.log("Error on Request. Error message",response.statusText);
    });
};

// Remove a contact from the database.

$scope.remove = function(id){
    console.log("Remove id",id);
    $http.delete('/contactList/' + id)
    .then(function mySucces(response) {
        $scope.contactList = response.data;
         console.log("Contact deleted successfully.",response);
         refresh();
    }, function myError(response) {
        $scope.contactList = response.statusText;
         console.log("Error on Request. Error message",response.statusText);
    });
};

// Get single contact from database.

$scope.edit = function(id){  
    $http.get('/contactList/' + id)
      .then(function mySucces(response) {
        $scope.contact = response.data;
    }, function myError(response) {
        $scope.contactList = response.statusText;
         console.log("Error on Request. Error message",response.statusText);
    });
};

// Update a single contact in the database.
$scope.update = function(){
  
    $http.put('/contactList/' + $scope.contact._id, $scope.contact)
      .then(function mySucces(response) {
        console.log("Contact details updated.");       
        refresh();         
    }, function myError(response) {
        $scope.contactList = response.statusText;
         console.log("Error on Request. Error message",response.statusText);
    });
};

// Clear the edit field selections.

$scope.deselect = function(){
    $scope.contact = "";
}

});

