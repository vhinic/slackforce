var nforce = require('nforce'),

    CLIENT_ID = process.env.CLIENT_ID,
    CLIENT_SECRET = process.env.CLIENT_SECRET,
    USER_ID = process.env.USER_ID,
    PASSWORD = process.env.PASSWORD,
    CONTACT_TOKEN = process.env.CONTACT_TOKEN,

    org = nforce.createConnection({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: 'https://slackforce.herokuapp.com/auth/callback',
      mode: 'single'
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
    var q = "SELECT Id, Name, Phone, MobilePhone, Email FROM Contact WHERE Name LIKE '%" + req.body.text + "%' LIMIT 5";
    org.query({query: q}, function(err, resp) {
        if (err) {
            console.error(err);
            res.send("An error as occurred");
            return;
        }
        if (resp.records && resp.records.length>0) {
            var contacts = resp.records;
            var attachments = [];
            contacts.forEach(function(contact) {
                var fields = [];
                fields.push({title: "Name", value: contact.name, short:true});
                fields.push({title: "Phone", value: contact.phone, short:true});
                attachments.push({fields: fields});
            });
            res.send(JSON.stringify({text: "Contacts", attachments: attachments}));
        } else {
            res.send("No records");
        }
    });
}

exports.contact = contact;
