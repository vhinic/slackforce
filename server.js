var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    auth = require('./modules/auth'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(compression());

app.use('/', express.static(__dirname + '/www'));

/*
app.get('/students', students.findAll);
app.get('/students/:id', students.findById);
app.get('/students/:id/enrollments', enrollments.findByStudent);
*/

app.get('/auth/login', auth.login);
app.get('/auth/callback', auth.callback);


app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
