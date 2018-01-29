// Here I have created a factory which is a populer way to create and configure services. You may also create the factories in another script file which is best practice.
// You can also write above codes for POST,PUT,DELETE in this factory instead of controller, so that our controller will look clean and exhibits proper Separation of Concern.
app.factory('ContactsService', function ($http) {

    var fac = {};

    fac.GetAllRecords = function () {
        return $http.get('http://localhost:52542/api/Contacts');
    }



    return fac;


});
