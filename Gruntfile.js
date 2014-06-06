/*
 * grunt-untar
 * https://github.com/arhs/grunt-untar
 *
 * Copyright (c) 2014 Laurent VB
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    untar: {
      tgztest: {
        files: {
         'tmp/tgztest': 'test/fixtures/fixtures.tgz'
        }
      },
      tartest: {
        files: {
          'tmp/tartest': 'test/fixtures/fixtures.tar'
        }
      },
      modetest: {
        options: {
          mode: 'tgz'
        },
        files: {
          'tmp/modetest': 'test/fixtures/fixtures.tgz.dummyext'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'untar', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
