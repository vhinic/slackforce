var express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('./modules/auth'),
    contact = require('./modules/contact'),
    case = require('./modules/case'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.urlencoded());

app.post('/contact', contact.execute);
app.post('/case', case.execute);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
    auth.login();
});
