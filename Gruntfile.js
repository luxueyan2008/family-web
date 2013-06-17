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
    clean: {
      seajs: [
        // 'public/javascripts/dev/*',
        'public/javascripts/dist/*',
        '!public/javascripts/dist/config.js',
        '!public/javascripts/dist/main.js'
      ]
    },
    transport: {
      options: {
        debug:false
      },
      dev: {
        files: [{
          cwd: 'public/javascripts/dev',
          src: '**/*',
          dest: 'public/javascripts/dev'
        }]
      },
      main: {
        files: [{
          cwd: 'public/javascripts/dist',
          src: 'main.js',
          dest: 'public/javascripts/dist'
        }]
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'public/javascripts/dev',
          outdir: 'public/docs'
        }
      }
    },
    concat: {
      options: {
        // paths: ['public/javascripts/dev'],
        // relative: true,
        include: 'all'
      },
      dev: {
        // src: 'public/javascripts/dev/b.js',
        // dest: 'public/javascripts/dist/b.js'
        files: [{
          expand: true,
          cwd: 'public/javascripts/dev/',
          src: ['**/*'],
          dest: 'public/javascripts/dist/'
        }]
      }
    },
    uglify: {
      seajs: {
        files: [{
          expand: true,
          cwd: 'public/javascripts/dist/',
          src: ['**/*','!main.js','!config.js'],
          dest: 'public/javascripts/dist/'
        }]
      },
      jquery: {
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
      backbone:{
        src: [
          'public/javascripts/libs/underscore.min.js',
          'public/javascripts/libs/underscore.string.min.js',
          'public/javascripts/libs/backbone.min.js'
        ],
        dest: 'public/javascripts/web/backbone-common.js',
        separator: ';'
      },
      um:{
        src: [
          'public/javascripts/libs/umengTools.js',
          'public/javascripts/libs/umeng-plugin.js'
        ],
        dest: 'public/javascripts/web/UM-jquery-common.js',
        separator: ';'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'public/javascripts/libs/**/*.js'],
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
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.',
        }
      }
    },
    qunit: {
      options: {
        timeout: 10000,
        '--cookies-file': 'test/cookies.txt'
      },
      all: ['public/test/**/*.html']
    },
    compass: {
      dist: {
        options: {
          config: 'public/config.rb',
          specify: 'public/sass/**/*.scss',
          sassDir: 'public/sass',
          cssDir: 'public/stylesheets',
          debugInfo: true,
          outputStyle: 'expand'
        }
      }
    },

    watch: {
      js: {
        files: '<%= jshint.files %>',
        tasks: 'uglify:um'
      },
      scss: {
        files: [ 'public/sass/**/*.scss','Gruntfile.js' ],
        tasks: [ 'compass' ]
      },
      yuidoc: {
        files: ['<%= yuidoc.options.files %>','Gruntfile.js'],
        task: [ 'yuidoc' ]
      }
      // files: ['<%= jshint.files %>'],
      // tasks: ['jshint', 'qunit']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.registerTask('test', ['jshint','connect', 'qunit']);

  grunt.registerTask('default', ['jshint', 'uglify', 'compass', 'transport', 'concat','yuidoc']);

};