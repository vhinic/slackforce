var nforce = require('nforce');

var CLIENT_ID = process.env.CLIENT_ID;
var CLIENT_SECRET = process.env.CLIENT_SECRET;
var USER_ID = process.env.USER_ID;
var PASSWORD = process.env.PASSWORD;
var CONTACT_TOKEN = process.env.CONTACT_TOKEN;

var org = nforce.createConnection({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: 'https://slackforce.herokuapp.com/auth/callback'
});

org.authenticate({ username: USER_ID, password: PASSWORD}, function(err, resp) {
    if (err) {
        console.error("Authentication error");
        console.error(err);
    } else {
        console.log("Authentication successful");
    }
});

function contact(req, res) {

    if (req.body.token != CONTACT_TOKEN) {
        res.send("Invalid token");
        return;
    }

    var q = 'SELECT Id, Name FROM Contact LIMIT 1';
    org.query({ query: q }, function(err, resp) {
        if(!err && resp.records) {
            var contact = resp.records[0];
            res.send(contact);
            //res.send({"text": contact.name});
        }
    });

}

exports.contact = contact;
