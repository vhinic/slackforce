var express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('./modules/auth'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.urlencoded());

app.post('/contact', auth.contact);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
