
window.commentsApp=window.commentsApp || {};

window.commentsApp.datacontext=(function(breeze){

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var serviceName = 'http://10.0.2.2:2403/comments';

    var ds = new breeze.DataService({
        serviceName: serviceName,
        hasServerMetadata: false//,
        //useJsonp: true,
        //jsonResultsAdapter: jsonResultsAdapter
    });

    var manager = new breeze.EntityManager({dataService: ds});
    var manager2 = new breeze.EntityManager({dataService: ds});
    //model.initialize(manager.metadataStore);

    return {
        getComments: getComments,
        metadataStore: manager.metadataStore
    };


    function getComments() {
        var query =  new breeze.EntityQuery.from("comments");

        var stashName = "stash_everything_knockout";
        if(!(window.localStorage && window.localStorage.getItem("stash_everything_knockout")) ){
            var exportData = manager.exportEntities();

            window.localStorage.setItem(stashName, exportData);
            console.log("Data being cached, will be saved in browser Local Storage under 'stash_everything'");
            return manager.executeQuery(query).then(returnResults);
        }

        console.log("Retreiving data from the browser local storage cache");
        var importData = window.localStorage.getItem(stashName);
        manager2.importEntities(importData);
        return manager2.executeQuery(query).then(returnResults);

    }

    function returnResults(data){
    	//alert(data);
        return data.results
    }

    function queryFailed(error) {
        logger.error(error, "Query failed; please try it again.");
    }

})(breeze);