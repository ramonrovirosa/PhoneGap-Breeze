var express = require('express'),
    path = require('path'),
    http = require('http'),
    family = require('./routes/family');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public/Edmunds')));
});

app.get('/family', family.findAll);
app.get('/family/:id', family.findById);
app.post('/family', family.addFamily);
app.put('/family/:id', family.updateFamily);
app.delete('/family/:id', family.deleteFamily);

//app.listen(3000);
//console.log('Listening on port 3000...');

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});