/* jsonResultsAdapter: parses Edmunds data into entities */
app.value('jsonResultsAdapter', 
    new breeze.JsonResultsAdapter({

        name: "comments",

        extractResults: function (data) {
            var results = data.results;
            if (!results) throw new Error("Unable to resolve 'results' property");
            return results;
        },

        visitNode: function (node, parseContext, nodeContext) {
            if (node.id) {
                return { entityType: 'pComments'  }
            }
        }
    }));
