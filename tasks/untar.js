'use strict';

var tar = require('tar'),
    zlib = require('zlib'),
    fs = require('fs'),
    path = require('path'),
    async = require('async');

function contains(array, value){
  return array.indexOf(value) > -1;
}

/**
 * Return true if the processed file must be unzipped.
 * Check the mode and default to analyzing the file extension.
 *
 * @param file the processed file
 * @param [mode] the mode
 * @returns {Boolean} true if the file must be unzipped
 */
function mustUnzip(file, mode){
  if (mode){
    return mode === 'tgz';
  }
  var extension = path.extname(file);
  return contains(['.tgz', '.gz'], extension);
}

/**
 * Check that the passed mode is valid and will be correctly interpreted by the task.
 *
 * @param mode
 * @returns {boolean}
 */
function isValidMode(mode){
  return mode == null || contains(['tgz', 'tar'], mode);
}

/**
 * Registers a grunt task named 'untar' that will extract the tar files passed to it.
 *
 * @param grunt
 */
module.exports = function(grunt){
  grunt.registerMultiTask('untar', 'Extract tar files', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      mode : null
    });

    if (!isValidMode(options.mode)){
      grunt.fail.fatal('Invalid mode ' + options.mode);
    }

    var done = this.async();

    async.eachSeries(this.files, function(f, next) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;
      });

      async.eachSeries(src, function(file, cb){
        grunt.log.writeln('Untarring ' + file + ' to ' + f.dest);

        var stream = fs.createReadStream(file);
        if (mustUnzip(file, options.mode)){
          // stream through a zip extractor
          stream = stream.pipe(zlib.createGunzip());
          stream.on('error', cb);
        }

        // stream to file through a TAR extractor
        stream.pipe(tar.Extract({path: f.dest}))
          .on('error', cb)
          .on('end', cb);
      }, next);
    }, done);
  });
};
