// Defining angularjs Controller and injecting ProductsService
app.controller('demoCtrl', function ($scope, $http, ContactsService) {

    $scope.divList = true;
 
    $scope.contactsData = null;
    // Fetching records from the factory created at the bottom of the script file
    ContactsService.GetAllRecords().then(function (d) {
        $scope.contactsData = d.data; // Success
    }, function () {
        alert('Error Occured !!!'); // Failed
    });

    $scope.Contact = {
        ID:'',
        Name: '',
        Phone: '',
        Email: ''
    };


    $scope.AddContact = {
        Name: '',
        Phone: '',
        Email: ''
    };

    // Reset product details
    $scope.clear = function () {
        $scope.Contact.Name = '';
        $scope.Contact.Phone = '';
        $scope.Contact.Email = '';
    }

    // Cancel product details
    $scope.cancel = function () {
        $scope.clear();
    }

   
    //Add New Item
    $scope.save = function () {
        if ($scope.AddContact.Name != "" &&
       $scope.AddContact.Phone != "" && $scope.AddContact.Email != "") {

            // or you can call Http request using $http
            $http({
                method: 'POST',
                url: 'http://localhost:52542/api/Contacts',
                data: $scope.AddContact
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.contactsData.push(response.data);
                $scope.clear();
                alert("Contact Added Successfully !!!");
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }

        $scope.divList = true;
    };

    // Edit product details
    $scope.edit = function (data) {     
        $scope.divList = false;
        $scope.divAdd = false;
        $scope.divEdit = true;
        $scope.Contact = { ID: data.ID, Name: data.Name, Phone: data.Phone, Email: data.Email };
    }

    // Update product details
    $scope.update = function () {
        if ($scope.Contact.Name != "" &&
       $scope.Contact.Phone != "" && $scope.Contact.Email != "") {
            $http({
                method: 'PUT',
                url: 'http://localhost:52542/api/Contacts/' + $scope.Contact.ID,
                data: $scope.Contact
            }).then(function successCallback(response) {
                $scope.contactsData = response.data;
                $scope.clear();
                alert("Contact Updated Successfully !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
        $scope.divAdd = false;
        $scope.divEdit = false;
        $scope.divList = true;
     
    };

    // Delete product details
    $scope.delete = function (index) {
        $http({
            method: 'DELETE',
            url: 'http://localhost:52542/api/Contacts/' + $scope.contactsData[index].ID,
        }).then(function successCallback(response) {
            $scope.contactsData.splice(index, 1);
            alert("Contact Deleted Successfully !!!");
        }, function errorCallback(response) {
            alert("Error : " + response.data.ExceptionMessage);
        });
    };


    $scope.AddContactDiv = function () {
        $scope.divAdd = true;
        $scope.divEdit = false;
        $scope.divList = false;
    }

});