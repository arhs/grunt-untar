# grunt-untar

> A grunt task to decompress/extract tar files, implemented with streams.

## The "untar" task

### Overview
In your project's Gruntfile, add a section named `untar` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  untar: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.mode
Type: `String`
Default value: `''`

The decompression mode. Currently supports tar and tgz.
Automatically detected per dest:src pair, but can be overridden per target if desired.

### Usage Examples

#### Default Options
In this example, the default options are used to decompress the passed tgz archive.

```js
grunt.initConfig({
  untar: {
    files: {
      'dest/default_options': 'src/testing.tgz',
    },
  },
});
```

#### Custom Options
In this example, the `mode` option is used to inform the task that the tar must be unzipped before the extraction, as
this cannot be deduced from the extension.

```js
grunt.initConfig({
  untar: {
    options: {
      mode: 'tgz'
    },
    files: {
      'dest/with_mode': 'test/fixtures/fixtures.tgz.dummyext'
    }
  },
});
```

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-untar --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-untar');
```
