var pattern = require('../lib/pattern'),
    assert = require('assert'),
    cells = require('../lib/cells');

describe('Pattern', function() {

    describe('generate', function() {

        it ('should create a pattern the same as word when all cells are solved', function(){
            var board = 'abcde';
            var word = ['d','e','a','d'];
            var result = pattern.generate(board, word);
            assert(result == 'dead');
        });

        it ('should create a pattern excluding letters in word', function(){
            var board = 'abcde';
            var word = ['d','e','13','d'];
            var result = pattern.generate(board, word);
            assert(result == 'de[^de]d', 'Expected de[^de]d, got ' + result);
        });

        it ('should create a pattern excluding other solved letters in a board', function() {
            var board = 'abcde';
            cells.add(board, '10', 'w');
            var word = ['g','o','13','t'];
            var result = pattern.generate(board, word);
            assert(result == 'go[^gotw]t', 'Expected go[^gotw]t, got ' + result);
            cells.clear();
        });

        it ('should create a pattern excluding only other solved letters in a board', function() {
            var board = 'abcde';
            cells.add(board, '10', 'w');
            cells.add(board, '11', 'f');
            cells.add(board, '1', 'e');
            var word = ['2','3','13','11'];
            var result = pattern.generate(board, word);
            assert(result == '[^efw][^efw][^efw][^efw]', 'Expected [^efw][^efw][^efw][^efw], got ' + result);
            cells.clear();
        });

        it ('should create a pattern with dots when no letters are known', function() {
            var board = 'fbd351ae';
            var word = ['2','3','13','11'];
            var result = pattern.generate(board, word);
            assert(result == '....', 'Expected ...., got ' + result);
            cells.clear();
        });

        it ('should create a pattern which handles duplicates', function (){
            var board = 'fbd351ae';
            var word = ['2','3','3','11'];
            var result = pattern.generate(board, word);
            assert(result == '.(.)\\1.', 'Expected .(.)\\1., got ' + result);
            cells.clear();
        });
    });
});