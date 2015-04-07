var cells = require('./cells'),
    logger = require('./logger');

module.exports.newFact = function(fact) {
    if (fact.name == 'cell.updated') {
        logger.info('pattern: ' + body);
        cells.add(fact.board, fact.data.body.number, fact.data.body.letter);
    }
};