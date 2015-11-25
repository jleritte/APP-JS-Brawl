module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {

    },
    browserify: {
      src: ['js/Brawl.js'],
      dest: 'js/app.js'
    },
    uglify: {
      build: {
        src: 'js/app.js',
        dest: 'js/app.min.js'
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