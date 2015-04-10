var app = require('express')(),
    logger = require('./lib/logger'),
    bodyParser = require('body-parser'),
    pattern = require('./lib/pattern'),
    router = require('./lib/router'),
    rabbitmq = require('rabbit.js');

// wait until rabbitmq can accept connections, somehow
function doConnect(){

    try {
        var context = rabbitmq.createContext(
            'amqp://' + process.env.RABBITMQ_PORT_5672_TCP_ADDR + ':' + process.env.RABBITMQ_PORT_5672_TCP_PORT
        );

        context.on('ready', function() {

            logger.info('pattern: connected');

            // subscribe to events queues
            var sub = context.socket('SUB');

            sub.connect('events', function () {

                // deal with facts as they come in
                sub.on('data', function (body) {
                    logger.info('pattern: ' + body);
                    router.newFact(JSON.parse(body));
                });
            });
        });

    } catch (err){
        logger.error("caught error trying to connect to rabbitmq" + err);
        setTimeout(doConnect, 2000);
    }
}

// hack to wait till rabbitmq is up
setTimeout(doConnect, 12000);

app.use(bodyParser.json({limit: '1024kb'}));

app.get('/', function (req, res) {
    res.json({
        name : 'codewords/pattern',
        description : "Provides a pattern generation service to use when querying the dictionary service"
    });
});

app.post('/regexp/:board', function(req, res) {

    logger.log('info', 'incoming: ' + req.body);
    // ensure that req.body is an array

    // expect json array in the request body with the chars & numbers to use to generate a pattern
    pattern.generate(req.params['board'], req.body, function(err, result) {
        if (!err){
            logger.log('info', 'Success');
            res.json(result);
        } else {
            logger.log('error', err);
            res.status(400).json(result);
        }
    });
});

var PORT = process.env.PORT || 80;

app.listen(PORT);

logger.log('info', 'Running codewords pattern service on http://localhost:' + PORT);