var express = require('express'),
    app = express(),
    //    cors = require('cors'),
    bodyParser = require('body-parser'),
    config = require('./config.json'),
    mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var mongo_server = new Server(config.mongo_server, config.mongo_port, {
    auto_reconnect: true
});

var port = process.env.PORT || 4000;

db = new Db('membersdb', mongo_server);
db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'membersdb' database");
        db.collection('members', {
            strict: true
        }, function (err, collection) {
            if (err) {
                console.log("The 'members' collection doesn't exist. Please create it.");
                console.log("$ mongo");
                console.log("> use membersdb");
                console.log("> db.createCollection('members')");
                process.exit(1);
            }
        });
    }
});

var router = express.Router();

// route middleware that will happen on every request
router.use(function (req, res, next) {

    //CHECK KEY

    next();
});

require('./routes/user')(router, db, config);
require('./routes/group')(router, db, config);
require('./routes/settings')(router, db, config);
require('./routes/login')(router, db, config);
require('./routes/email')(router, db, config);

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);