var nforce = require('nforce'),
    org = require('./auth').org,

    CASE_TOKEN = process.env.CASE_TOKEN;

function execute(req, res) {

    if (req.body.token != CASE_TOKEN) {
        res.send("Invalid token");
        return;
    }

    var params = req.body.text.split(":");
    var subject = params[0];
    var description = params[1];

    var c = nforce.createSObject('Case');
    c.set('subject', subject);
    c.set('description', description);
    c.set('origin', 'Slack');
    c.set('status', 'New');

    org.insert({ sobject: c}, function(err, resp){
        if (err) {
            console.error(err);
            res.send("An error occurred while creating a case");
        } else {
            console.log(resp);
            res.send('Case created');
        }
    });
}

exports.case = case;
