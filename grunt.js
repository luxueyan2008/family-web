module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    // concat: {
    //   dist: {
    //     src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
    //     dest: 'dist/<%= pkg.name %>.js'
    //   }
    // },
    min: {
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
    compass: {
      prod: {
        specify: 'public/sass/**/*.scss',
        outputstyle: 'expanded',
        linecomments: false,
        src: 'public/sass',
        dest: 'public/stylesheets',
        debugsass: true
      }
    },
    test: {
      files: ['public/**/*.js']
    },
    lint: {
      files: ['grunt.js', 'public/**/*.js']
    },
    watch: {
      js: {
        files: '<config:lint.files>',
        tasks: 'min'
      },
      scss: {
        files: [ 'public/sass/**/*.scss','grunt.js' ],
        tasks: [ 'compass:prod' ]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        exports: true,
        module: false
      }
    },
    uglify: {}
  });
  grunt.loadNpmTasks( 'grunt-compass' );
  // Default task.
  grunt.registerTask('default', 'min compass-clean compass:prod');

};
