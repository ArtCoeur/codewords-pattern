var pattern = require('../lib/pattern'),
    assert = require('assert'),
    cells = require('../lib/cells');

describe('Pattern', function() {

    describe('generate', function() {

        it ('should create a pattern the same as word when all cells are solved', function(){
            var board = 'abcde';
            var word = ['d','e','a','d'];
            var result = pattern.generate(board, word, function(err, result){
                assert(result['pattern'] == 'dead');
            });

        });

        it ('should create a pattern excluding letters in word', function(){
            var board = 'abcde';
            var word = ['d','e','13','d'];
            var result = pattern.generate(board, word, function(err, result){
                assert(result['pattern'] == 'de([^de])d', 'Expected de([^de])d, got ' + result['pattern']);
            });

        });

        it ('should create a pattern excluding other solved letters in a board', function() {
            var board = 'abcde';
            cells.add(board, '10', 'w');
            var word = ['g','o','13','t'];
            var result = pattern.generate(board, word, function(err, result){
                assert(result['pattern'] == 'go([^gotw])t', 'Expected go([^gotw])t, got ' + result['pattern']);
            });

            cells.clear();
        });

        it ('should create a pattern excluding only other solved letters in a board', function() {
            var board = 'abcde';
            cells.add(board, '10', 'w');
            cells.add(board, '11', 'f');
            cells.add(board, '1', 'e');
            var word = ['2','3','13','11'];
            var result = pattern.generate(board, word, function(err, result){
                assert(result['pattern'] == '([^efw])([^efw])([^efw])([^efw])', 'Expected ([^efw])([^efw])([^efw])([^efw]), got ' + result['pattern']);
            });

            cells.clear();
        });

        it ('should create a pattern with dots when no letters are known', function() {
            var board = 'fbd351ae';
            var word = ['2','3','13','11'];
            var result = pattern.generate(board, word, function(err, result){
                assert(result['pattern'] == '(.)(.)(.)(.)', 'Expected (.)(.)(.)(.), got ' + result['pattern']);
            });

            cells.clear();
        });

        it ('should create a pattern which handles duplicates', function (){
            var board = 'fbd351ae';
            var word = ['2','3','3','11'];
            var result = pattern.generate(board, word, function(err, result){
                assert(result['pattern'] == '(.)(.)\\2(.)', 'Expected (.)(.)\\2(.), got ' + result['pattern']);
            });

            cells.clear();
        });

        it ('should create a pattern which handles multiple duplicates', function (){
            var board = 'fbd351ae';
            var word = ['2','3','3','11','2'];
            var result = pattern.generate(board, word, function(err, result){
                assert(result['pattern'] == '(.)(.)\\2\(.)\\1', 'Expected (.)(.)\\2(.)\\1, got ' + result['pattern']);
            });

            cells.clear();
        });

        it ('should create a pattern which combines everything', function (){
            var board = 'fbd351ae';
            var word = ['a','3','3','o','4','e','17'];
            cells.add(board, '11', 'f');
            cells.add(board, '16', 'k');
            var result = pattern.generate(board, word, function(err, result){
                assert(result['pattern'] == 'a([^aefko])\\1o([^aefko])e([^aefko])', 'Expected a([^aefko])\\1o([^aefko])e([^aefko]), got ' + result['pattern']);
            });

            cells.clear();
        });
    });
});