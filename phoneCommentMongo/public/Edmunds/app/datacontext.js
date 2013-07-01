/* datacontext: data access and model management layer */
app.factory('datacontext', function (logger, model, jsonResultsAdapter) {

    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);

    var serviceName = 'http://127.0.0.1:3000';

    var ds = new breeze.DataService({
        serviceName: serviceName,
        hasServerMetadata: false//,
        //useJsonp: true,
        //jsonResultsAdapter: jsonResultsAdapter
    });



    var manager = new breeze.EntityManager({dataService: ds});
    //var manager2 = new breeze.EntityManager({dataService: ds});

    model.initialize(manager.metadataStore);
    //model.initialize(manager2.metadataStore);



    return {
        getComments: getComments
    };



    /*** implementation details ***/

    function getComments() {
        var query =  new breeze.EntityQuery.from("family");

       // var stashName = "stash_everything_ang";
        //if(!(window.localStorage && window.localStorage.getItem("stash_everything_ang")) ){
        //    var exportData = manager.exportEntities();

        //    window.localStorage.setItem(stashName, exportData);
        //    console.log("Data being retreived from server, will be saved in browser Local Storage under 'stash_everything'");
            return manager.executeQuery(query).then(returnResults);
        //}

//        console.log("Retreiving data from the browser local storage cache");
//        var importData = window.localStorage.getItem(stashName);
//        manager2.importEntities(importData);
//        return manager2.executeQuery("family").then(returnResults);

    }

    function returnResults(data){
        return data.results
    }
});