
(function(ko,breeze,datacontext){
    var DT = breeze.DataType; // alias

    initialize(datacontext.metadataStore);

    return{
        initialize: initialize
    }


    function initialize(metadataStore) {
        metadataStore.addEntityType({
            shortName: "pComments",
            namespace: "Comments",
            dataProperties: {
                id:         { dataType: DT.String, isPartOfKey: true },
                name:       { dataType: DT.String },
                comment:    { dataType: DT.String }
            }

        })

    }


})(ko,breeze,commentsApp.datacontext);