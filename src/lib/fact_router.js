var cells = require('./cells');

module.exports.handleFact = function(body) {
    var fact = JSON.parse(body);
    if (fact.name == 'cell.updated') {
        cells.add(fact.board, fact.data.body.number, fact.data.body.letter);
    }
};