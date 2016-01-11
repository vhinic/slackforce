var org = require('./auth').org,

    OPPORTUNITY_TOKEN = process.env.OPPORTUNITY_TOKEN;

function execute(req, res) {

    if (req.body.token != OPPORTUNITY_TOKEN) {
        res.send("Invalid token");
        return;
    }

    var q = "SELECT Id, Name, Amount, Probability, StageName, CloseDate FROM Opportunity where isClosed=false ORDER BY amount DESC LIMIT 5";
    org.query({query: q}, function(err, resp) {
        console.log(err);
        console.log('***');
        console.log(resp);
        if (err) {
            console.error(err);
            res.send("An error as occurred");
            return;
        }
        if (resp.records && resp.records.length>0) {
            var opportunities = resp.records;
            var attachments = [];
            opportunities.forEach(function(opportunity) {
                var fields = [];
                fields.push({title: "Name", value: opportunity.get("Name"), short:true});
                fields.push({title: "Stage", value: opportunity.get("StageName"), short:true});
                fields.push({title: "Amount", value: opportunity.get("Amount"), short:true});
                fields.push({title: "Probability", value: opportunity.get("Probability"), short:true});
                fields.push({title: "Close Date", value: opportunity.get("CloseDate"), short:true});
                attachments.push({color: "#009cdb", fields: fields});
            });
            res.json({text: "Top Opportunities:", attachments: attachments});
        } else {
            res.send("No records");
        }
    });
}

exports.execute = execute;
