'use strict';

var grunt = require('grunt'),
    untar = require('../tasks/untar'),
    child_process = require('child_process'),
    concat = require('concat-stream');

function diff(path1, path2, cb){
  var process = child_process.spawn('diff', [path1, path2, '-r']);
  return process.stdout.pipe(concat({encoding: 'string'}, cb));
}

exports.untar = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  tar: function(test) {
    test.expect(1);

    diff('tmp/tartest/', 'test/expected/', function(d){
      // there should be no difference
      test.equal(d, '');
      test.done();
    });
  },
  tgz: function(test) {
    test.expect(1);

    diff('tmp/tgztest/', 'test/expected/', function(d){
      // there should be no difference
      test.equal(d, '');
      test.done();
    });
  },
  mode: function(test) {
    test.expect(1);

    diff('tmp/modetest/', 'test/expected/', function(d){
      // there should be no difference
      test.equal(d, '');
      test.done();
    });
  }
};
