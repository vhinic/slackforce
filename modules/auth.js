var nforce = require('nforce');

var org = nforce.createConnection({
  clientId: '3MVG9sG9Z3Q1Rlbc4tkIx2fI3ZUDVyYt86Ypl8ZqBXTpzPbQNHxq7gpwKcN75BB.fpgHxzSWgwgRY6nVfvBUe',
  clientSecret: '735250516407528507',
  redirectUri: 'https://slackforce.herokuapp.com/auth/callback'
});

function login(req, res) {
    res.redirect(org.getAuthUri());
}

function callback(req, res) {
    res.send("OK");
}

function hello(req, res) {
    res.send("Hello");
}

exports.login = login;
exports.callback = callback;
exports.hello = hello;
