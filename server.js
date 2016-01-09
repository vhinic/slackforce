var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    auth = require('./modules/auth'),
    session      = require('express-session'),
    cookieParser = require('cookie-parser'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'somesecret', key: 'sid' }));
app.use(compression());
app.use(cors());

app.get('/auth/login', auth.login);
app.get('/auth/callback', auth.callback);
app.get('/hello', auth.hello);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
