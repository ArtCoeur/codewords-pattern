var app = require('express')(),
    logger = require('./lib/logger'),
    bodyParser = require('body-parser');

app.use(bodyParser.text({type : 'text/plain', limit: '1024kb'}));
app.use(bodyParser.json({type : 'application/json', limit: '1024kb'}));

app.get('/', function (req, res) {
    res.json({
        name : 'codewords/pattern',
        description : "Provides a pattern generation service to use when querying the dictionary service"
    });
});

app.post('/pattern', function(req, res) {

    logger.log('info', 'incoming: ' + req.body);

    pattern.generate(req.body, req.get('Content-Type'), function(err, result) {
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