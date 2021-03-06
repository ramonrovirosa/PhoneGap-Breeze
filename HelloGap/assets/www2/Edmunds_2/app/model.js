﻿/* model: entity definitions */
app.factory('model', function () {
    var DT = breeze.DataType; // alias
    return {
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


})