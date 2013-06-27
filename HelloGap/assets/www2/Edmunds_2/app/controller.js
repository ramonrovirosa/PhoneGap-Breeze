app = angular.module('app', [])

//based of of: http://www.breezejs.com/samples/edmunds

app.controller('CommentsCtrl', function ($scope, datacontext, logger) {

    //$scope.searchText = "";
    $scope.pComments = [];
    $scope.getComments = getComments;
    //$scope.getModels = getModels;
    //$scope.makeFilter = makeFilter; // Beware: called a lot!

    $scope.getComments();

    //#region private functions

    function getComments() {
        datacontext.getComments().then(succeeded).fail(queryFailed);

        function succeeded(results) {
            $scope.pComments = results;
            $scope.$apply();
            logger.info("Fetched " + results.length + " Comments");
        }
    };


    function queryFailed(error) {
        logger.error(error.message, "Query failed; please try it again.");
    }
   
    //#endregion
});