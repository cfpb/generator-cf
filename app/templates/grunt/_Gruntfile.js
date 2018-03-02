module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    // Static mappings below;
    // Needed because task name does not match package name.
    usebanner: 'grunt-banner'
  });

  // Allows a `--quiet` flag to be passed to Grunt from the command-line.
  // If the flag is present the value is true, otherwise it is false.
  // This flag can be used to, for example, suppress warning output
  // from linters.
  var env = {
    quiet: grunt.option('quiet') ? true : false
  };

  var config = {

    /**
     * Pull in the package.json file so we can read its metadata.
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Set some src and dist location variables.
     */
    loc: {
      src: 'src',
      dist: 'dist'
    },

    /**
     * Browserify: https://github.com/jmreidy/grunt-browserify/
     *
     * Grunt task for node-browserify.
     */
    browserify: {
      main: {
        src: ['<%%= loc.src %>/static/js/main.js'],
        dest: '<%%= loc.dist %>/static/js/main.js'
      }
    },

    /**
     * Less: https://github.com/gruntjs/grunt-contrib-less
     *
     * Compile Less files to CSS.
     */
    less: {
      main: {
        options: {
          // The src/vendor paths are needed to find the CF components' files.
          // Feel free to add additional paths to the array passed to `concat`.
          paths: grunt.file.expand('node_modules/cf-*/src/').concat([])
        },
        files: {
          '<%%= loc.dist %>/static/css/main.css': ['<%%= loc.src %>/static/css/main.less']
        }
      }
    },

    /**
     * Autoprefixer: https://github.com/nDmitry/grunt-autoprefixer
     *
     * Parse CSS and add vendor-prefixed CSS properties using the Can I Use database.
     */
    autoprefixer: {
      options: {
        // Options we might want to enable in the future.
        diff: false,
        map: false
      },
      main: {
        // Prefix `static/css/main.css` and overwrite.
        expand: true,
        src: ['<%%= loc.dist %>/static/css/main.css']
      },
    },

    /**
     * Uglify: https://github.com/gruntjs/grunt-contrib-uglify
     *
     * Minify JS files.
     * Make sure to add any other JS libraries/files you'll be using.
     * You can exclude files with the ! pattern.
     */
    uglify: {
      options: {
        preserveComments: 'some',
        sourceMap: true
      },
      js: {
        src: ['<%%= loc.dist %>/static/js/main.js'],
        dest: '<%%= loc.dist %>/static/js/main.min.js'
      }
    },

    /**
     * Banner: https://github.com/mattstyles/grunt-banner
     *
     * Here's a banner with some template variables.
     * We'll be inserting it at the top of minified assets.
     */
    banner:
      '/*!\n' +
      ' *  <%%= pkg.name %> - v<%%= pkg.version %>\n' +
      ' *  <%%= pkg.homepage %>\n' +
      ' *  Licensed <%%= pkg.license %> by <%%= pkg.author.name %> <<%%= pkg.author.email %>>\n' +
      ' */',

    usebanner: {
      css: {
        options: {
          position: 'top',
          banner: '<%%= banner %>',
          linebreak: true
        },
        files: {
          src: ['<%%= loc.dist %>/static/css/*.min.css']
        }
      },
      js: {
        options: {
          position: 'top',
          banner: '<%%= banner %>',
          linebreak: true
        },
        files: {
          src: ['<%%= loc.dist %>/static/js/*.min.js']
        }
      }
    },

    /**
     * CSS Min: https://github.com/gruntjs/grunt-contrib-cssmin
     *
     * Compress CSS files.
     */
    cssmin: {
      main: {
        options: {
          processImport: false
        },
        files: {
          '<%%= loc.dist %>/static/css/main.min.css': ['<%%= loc.dist %>/static/css/main.css'],
        }
      },
      'ie-alternate': {
        options: {
          processImport: false
        },
        files: {
          '<%%= loc.dist %>/static/css/main.ie.min.css': ['<%%= loc.dist %>/static/css/main.ie.css'],
        }
      }
    },

    /**
     * Legacssy: https://github.com/robinpokorny/grunt-legacssy
     *
     * Fix your CSS for legacy browsers.
     */
    legacssy: {
      'ie-alternate': {
        options: {
          // Flatten all media queries with a min-width over 960 or lower.
          // All media queries over 960 will be excluded fromt he stylesheet.
          // EM calculation: 960 / 16 = 60
          legacyWidth: 60
        },
        files: {
          '<%%= loc.dist %>/static/css/main.ie.css': '<%%= loc.dist %>/static/css/main.css'
        }
      }
    },

    /**
     * Clean: https://github.com/gruntjs/grunt-contrib-clean
     *
     * Clean files and folders
     */
    clean: ['dist'],

    /**
     * Copy: https://github.com/gruntjs/grunt-contrib-copy
     *
     * Copy files and folders.
     */
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%%= loc.src %>',
            src: [
              // HTML files
              '**/*.html',
              '!**/vendor/**'
            ],
            dest: '<%%= loc.dist %>'
          },
          {
            expand: true,
            flatten: true,
            src: [
              // Fonts
              'node_modules/cf-icons/src/fonts/*'
            ],
            dest: '<%%= loc.dist %>/static/fonts'
          },
          {
            expand: true,
            cwd: '<%%= loc.src %>/static',
            src: [
              // Images
              'img/**'
            ],
            dest: '<%%= loc.dist %>/static'
          },
          {
            expand: true,
            cwd: 'node_modules',
            src: [
              // Vendor files
              'html5shiv/dist/html5shiv-printshiv.min.js'
            ],
            dest: '<%%= loc.dist %>/static/vendor'
          }
        ]
      }
    },

    /**
     * Lint the JavaScript.
     */
    lintjs: {
      /**
       * Validate files with ESLint.
       * https://www.npmjs.com/package/grunt-contrib-eslint
       */
      eslint: {
        options: {
          quiet: env.quiet
        },
        src: [
          // 'Gruntfile.js', // Uncomment to lint the Gruntfile.
          '<%%= loc.src %>/static/js/main.js'
        ]
      }
    },

    /**
     * Watch: https://github.com/gruntjs/grunt-contrib-watch
     *
     * Run predefined tasks whenever watched file patterns are added, changed or deleted.
     * Add files to monitor below.
     */
    watch: {
      css: {
        files: ['<%%= loc.src %>/static/css/**/*.less'],
        tasks: ['css']
      },
      js: {
        files: ['Gruntfile.js', '<%%= loc.src %>/static/js/**/*.js'],
        tasks: ['js']
      },
      html: {
        files: ['<%%= loc.src %>/**/*.html'],
        tasks: ['copy:dist']
      }
    }

  };

  /**
   * Initialize a configuration object for the current project.
   */
  grunt.initConfig(config);

  /**
   * Create custom task aliases and combinations.
   */
  grunt.registerTask('css', ['less', 'autoprefixer', 'legacssy', 'cssmin', 'usebanner:css', 'copy:dist']);
  grunt.registerTask('js', ['browserify', 'uglify', 'usebanner:js', 'copy:dist']);
  grunt.registerTask('test', ['lintjs']);
  grunt.registerMultiTask('lintjs', 'Lint the JavaScript', function(){
    grunt.config.set(this.target, this.data);
    grunt.task.run(this.target);
  });
  grunt.registerTask('build', ['test', 'clean', 'css', 'js', 'copy:dist']);
  grunt.registerTask('default', ['build']);

};
