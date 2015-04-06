var app = require('express')(),
    logger = require('./lib/logger'),
    bodyParser = require('body-parser'),
    pattern = require('./lib/pattern'),
    cells = require('./lib/cells');

app.use(bodyParser.json({limit: '1024kb'}));

app.get('/', function (req, res) {
    res.json({
        name : 'codewords/pattern',
        description : "Provides a pattern generation service to use when querying the dictionary service"
    });
});

app.post('/pattern/:board', function(req, res) {

    logger.log('info', 'incoming: ' + req.body);

    // expect json array in the request body with the chars & numbers to use to generate a pattern
    pattern.generate(req.params[board], req.body, function(err, result) {
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