var cells = require('./cells');

module.exports.newFact = function(fact) {
    if (fact.name == 'cell.updated') {
        cells.add(fact.board, fact.data.body.number, fact.data.body.letter);
    }
};