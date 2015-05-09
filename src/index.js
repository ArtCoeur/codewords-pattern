var app = require('express')(),
    logger = require('./lib/logger'),
    bodyParser = require('body-parser'),
    pattern = require('./lib/pattern'),
    router = require('./lib/router'),
    rabbitmq = require('rabbit.js');

logger.info('running');

var context = rabbitmq.createContext(
    'amqp://' + process.env.RABBITMQ_PORT_5672_TCP_ADDR + ':' + process.env.RABBITMQ_PORT_5672_TCP_PORT
);

context.on('ready', function() {

    logger.info('connected');

    // subscribe to events queues
    var sub = context.socket('SUB');

    sub.connect('events', function() {

        // deal with facts as they come in
        sub.on('data', function(body) {
            logger.info('pattern: ' + body);
            router.newFact(JSON.parse(body));
        });
    });
});

app.use(bodyParser.json({limit: '1024kb'}));

app.get('/', function (req, res) {
    res.json({
        name : 'codewords/pattern',
        description : "Provides a pattern generation service to use when querying the dictionary service"
    });
});

app.post('/regexp/:board', function(req, res) {

    logger.info('incoming: ' + req.body);
    // ensure that req.body is an array

    // expect json array in the request body with the chars & numbers to use to generate a pattern
    pattern.generate(req.params['board'], req.body, function(err, result) {
        if (!err){
            logger.info('Success');
            res.json(result);
        } else {
            logger.error(err);
            res.status(400).json(result);
        }
    });
});

var PORT = process.env.PORT || 80;

app.listen(PORT);

logger.info('Running http://localhost:' + PORT);