module.exports = function(grunt) {

  var path = './';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      options: {
        alias: {
          'x-tag': './node_modules/x-tag/dist/x-tag-core.min.js'
        },
        browserifyOptions: {
          paths: [
            path+'js',
            path+'js/components'
          ]
        }
      },
      'build/resources/js/app.js': [path+'js/Brawl.js']
    },
    clean: [ path + 'build'],
    connect: {
      local: {
        options: {
          port: 8081,
          hostname: '127.0.0.1',
          base: 'build/',
          livereload: 8082
        }
      }
    },
    copy: {
      icon: {
        files: [{ expand: true, cwd: path + 'img/', src: [ 'favicon.ico' ], dest: path + 'build/resources/css/img/' }]
      }
    },
    csslint: {
      strict: {
        options: {
          'important': 2,
          'zero-units': 2,
          'duplicate-properties': 2,
          'regex-selectors': false,
          'box-model': false,
          'fallback-colors': false,
          'compatible-vendor-prefixes': false,
        },
        src: [path+'**/*.css']
      },
    },
    cssmin: {
      options: {
          shorthandCompacting: true,
      },
      target: {
        files: {
          'build/resources/css/styles.min.css': [
            path + 'css/*.css',
            path + 'js/console/components/**/*.css',
            path + 'js/console/components/**/**/css/*.css'
          ]
        }
      }
    },
    imagemin: {
      target: {
        files: [ {
          expand: true,
          cwd: path + 'img/',
          src: [ '**/*.{png,jpg,gif,svg}' ],
          dest: path + 'build/resources/css/img/'
        } ]
      }
    },
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
    replace: {
      prod: {
        src: path + 'home.html',
        dest: path + 'build/index.html',
        replacements: [{
            from: '{title}',
            to: 'Brawl version ' + '<%= pkg.version %>'
          }]
      },
      dev: {
        src: path + 'build/index.html',
        dest: path + 'build/index.html',
        replacements: [{
          from: /app\.min\..*js/,
          to: 'app.js'
        }]
      }
    },
    uglify: {
      build: {
        src: path + 'build/resources/js/app.js',
        dest: path + 'build/resources/js/app.min.js'
      }
    },
    watch: {
      js: {
        files: ['js/*.js','js/*.json'],
        tasks: ['jshint','browserify','uglify'],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-text-replace");


  grunt.registerTask('default', ['clean','copy','replace:prod','imagemin','jshint','csslint','cssmin','browserify','uglify']);
  grunt.registerTask('dev', ['default','replace:dev','connect','watch']);

};