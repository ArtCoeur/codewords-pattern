var cells = require('./cells'),
    _ = require('underscore');

/**
 * module to generate patterns
 */
module.exports.generate = function(board, word) {

    var pattern = '';
    _.each(word, function(char){
        // simple way to test if a digit or not
        if (_.isFinite(char)){
            // create a wild card which excludes solved letters
            pattern += createWildCard(board, word);
        } else {
            pattern += char;
        }
    });

    return pattern;
};

function createWildCard(board, word) {
    var result = '';

    var copied_word = _.clone(word);

    // exclude all other solved letters
    var solved = cells.solved(board);
    _.each(_.values(solved), function(letter){
        copied_word.push(letter);
    });

    copied_word.sort();

    // don't add the same char more than once
    var unique = _.uniq(copied_word);

    _.each(unique, function(char){
        if (!_.isFinite(char)){
            result += char;
        }
    });

    if (result.length == 0){
        result = '.';
    } else {
        result = '[^' + result + ']';
    }
    
    return result;
}