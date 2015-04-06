var cells = require('./cells'),
    _ = require('underscore');

/**
 * module to generate patterns
 */
module.exports.generate = function(board, word) {

    var pattern = '';
    var seen = {};
    var wild_cards = 1;
    var missing_char_pattern = createCharPattern(board, word);

    _.each(word, function(char, index){
        // simple way to test if a digit or not
        if (_.isFinite(char)){
            // create a wild card which excludes solved letters
            if (!seen[char]) {
                pattern += missing_char_pattern;
            } else {
                pattern += '\\' + seen[char];
            }
            seen[char] = wild_cards++;
        } else {
            pattern += char;
        }
    });

    return pattern;
};

function createCharPattern(board, word) {

    var copied_word = _.clone(word);

    // exclude all other solved letters
    _.each(_.values(cells.solved(board)), function(letter){
        copied_word.push(letter);
    });

    copied_word.sort();

    var result = '';

    // don't add the same char more than once
    _.each(_.uniq(copied_word), function(char){
        if (!_.isFinite(char)){
            result += char;
        }
    });

    if (result.length == 0){
        result = '.';
    } else {
        result = '[^' + result + ']';
    }

    return '(' + result + ')';
}