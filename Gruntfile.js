module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // concat: {
    //   options: {
    //     separator: ';'
    //   },
    //   dist: {
    //     src: ['src/**/*.js'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   }
    // },
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
    //   },
    //   dist: {
    //     files: {
    //       'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
    //     }
    //   }
    // },
    // qunit: {
    //   files: ['test/**/*.html']
    // },
    uglify: {
      dist: {
        src: [
          'public/javascripts/libs/jquery-1.7.2.min.js',
          'public/javascripts/libs/jquery-ui-1.8.23.custom.min.js',
          'public/javascripts/libs/jquery.easing.1.3.js',
          'public/javascripts/libs/jquery.blockUI.min.js',
          'public/javascripts/libs/tmpl.min.js',
          'public/javascripts/libs/jquery-html5Validate.js'
        ],
        dest: 'public/javascripts/web/jquery-common.js',
        separator: ';'
      },
      dist2:{
        src: [
          'public/javascripts/libs/underscore.min.js',
          'public/javascripts/libs/underscore.string.min.js',
          'public/javascripts/libs/backbone.min.js'
        ],
        dest: 'public/javascripts/web/backbone-common.js',
        separator: ';'
      },
      dist3:{
        src: [
          'public/javascripts/libs/umengTools.js',
          'public/javascripts/libs/umeng-plugin.js'
        ],
        dest: 'public/javascripts/web/UM-jquery-common.js',
        separator: ';'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'public/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    combo: {
      build: {
        src: 'src/*.js',
        dest: 'dist/main.combo.js',
        initModules: 'main.js',
        cwd: './'
      }
    },
    compass: {
      dist: {
        options: {
          config: 'public/config.rb'
        }
      }
    },
    watch: {
      js: {
        files: '<%= jshint.files %>',
        tasks: 'uglify'
      },
      scss: {
        files: [ 'public/sass/**/*.scss','grunt.js' ],
        tasks: [ 'compass' ]
      }
      // files: ['<%= jshint.files %>'],
      // tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-cmd-combo');
  // grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify','compass','combo']);

};