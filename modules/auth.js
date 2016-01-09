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
    var q = 'SELECT Id, Name FROM Contact LIMIT 1';
    res.send(org);
    /*
    org.query({ query: q }, function(err, resp) {
        if(!err && resp.records) {
            var contact = resp.records[0];
            res.send(contact);
            //res.send({"text": contact.Name});
        }
    });
    */
}

exports.login = login;
exports.callback = callback;
exports.hello = hello;
