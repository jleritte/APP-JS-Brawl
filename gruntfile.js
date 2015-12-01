module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true
      },
      files: {
        src: ['js/*.js']
      }
    },
    browserify: {
      'resources/app.js': ['js/Brawl.js']
    },
    uglify: {
      build: {
        src: 'resources/app.js',
        dest: 'resources/app.min.js'
      }
    },
    watch: {
      js: {
        files: ['js/*.js'],
        tasks: ['jshint','browserify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');


  grunt.registerTask('default', ['jshint','browserify','uglify']);

};