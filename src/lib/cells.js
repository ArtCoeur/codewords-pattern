/**
 * As facts arrive this module stores the current state of boards
 */

var cells = {};

/**
 *
 * @param board
 * @param number
 * @param letter
 */
module.exports.add = function(board, number, letter) {
    if (!cells[board]){
        cells[board] = {};
    }
    cells[board][number] = letter;
};

/**
 *
 * @param board
 * @param number
 * @returns {*}
 */
module.exports.get = function(board, number){
    if (cells[board]){
        return cells[board][number];
    }
};

/**
 *
 * @param board
 * @returns {*}
 */
module.exports.solved = function(board) {
    if (cells[board]){
        return cells[board];
    }
    return {};
};

/**
 *
 */
module.exports.clear = function() {
    cells = {};
};