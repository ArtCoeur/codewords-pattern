var cells = require('../lib/cells'),
    assert = require('assert'),
    _ = require('underscore');

describe('Cells', function() {

   describe('add', function() {
      it('should add a number -> letter pair to a board', function() {
          var board = 'xyz';
          var number = '12';
          var letter = 's';
          cells.add(board, number, letter);
          assert('s' == cells.get(board, number));
      });
   });

    describe('get', function() {
        it('should return null when board is not known', function() {
            var board = '1357a';
            var number = '12';
            var result = cells.get(board, number);
            assert(null == result);
        });

        it('should return null when number is not known', function() {
            var board = '1357b';
            var number = '12';
            cells.add(board, '3', 'b');
            var result = cells.get(board, number);
            assert(null == result);
        });

        it('should return letter when number is known', function() {
            var board = '1357c';
            var number = '12';
            var letter = 'b';
            cells.add(board, number, letter);
            var result = cells.get(board, number);
            assert(letter == result);
        });
    });

    describe('solved', function() {
        it('should return empty obj when nothing is solved', function () {
            var board = 'ffea342';
            var result = cells.solved(board);
            assert(_.isObject(result));
            assert(_.isEmpty(result));
        });

        it('should return all solved number obj when they are solved', function () {
            var board = '25ea342';
            var number = '12';
            var letter = 'b';
            cells.add(board, number, letter);

            var result = cells.solved(board);
            assert(_.isObject(result));
            assert(letter == result[number]);
        });
    });

    describe('clear', function() {
        it('should remove all data', function () {
            var board = '90fe32ab';
            var number = '16';
            var letter = 'z';
            cells.add(board, number, letter);
            cells.clear();
            var result = cells.get(board, number);
            assert(null == result);
        });
    });
});