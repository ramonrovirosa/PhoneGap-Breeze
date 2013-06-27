window.commentsApp.todoListViewModel = (function (ko, datacontext) {

	//#region private functions

	var pComments = ko.observableArray();

	function getComments() {
		datacontext.getComments().then(succeeded).fail(queryFailed);

		function succeeded(results) {
            pComments(results);
			//logger.info("Fetched " + results.length + " Person(s)");
		}
	};


	function queryFailed(error) {
		//logger.error(error.message, "Query failed; please try it again.");
	}
   
	//#endregion

	getComments();

	return {
        pComments: pComments,
        getComments: getComments
	};

})(ko, commentsApp.datacontext);

// Initiate the Knockout bindings
ko.applyBindings(window.commentsApp.todoListViewModel);
