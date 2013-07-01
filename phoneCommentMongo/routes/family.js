var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('familydb', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'familydb' database");
        db.collection('family', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'family' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

// =============================================================================================================


exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving family: ' + id);
    db.collection('family', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('family', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};



exports.addFamily = function(req, res) {
    var family = req.body;
    console.log('Adding family member: ' + JSON.stringify(family));
    db.collection('family', function(err, collection) {
        collection.insert(family, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}



exports.updateFamily = function(req, res) {
    var id = req.params.id;
    var family = req.body;
    console.log('Updating family: ' + id);
    console.log(JSON.stringify(family));
    db.collection('family', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, family, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating family: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(family);
            }
        });
    });
}



exports.deleteFamily = function(req, res) {
    var id = req.params.id;
    console.log('Deleting family: ' + id);
    db.collection('family', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}



// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var family = [
        {
            name: "Ramon",
            comment: "I like cheese"
        },
        {
            name: "Emmanuel",
            comment: "I like wine"
        },
        {
            name: "Himilce",
            comment: "I like crab"
        },
        {
            name: "Juan",
            comment: "I like ham"
        }
        ];

    db.collection('family', function(err, collection) {
        collection.insert(family, {safe:true}, function(err, result) {});
    });

};
