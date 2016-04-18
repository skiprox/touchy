/*global module:false*/
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    browserify: {
      examples: {
        options: {
          debug: true
        },
        files:[{
          src: ['examples/main.js'],
          dest: 'examples/js/main.js'
        }]
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['browserify:examples']);

};
