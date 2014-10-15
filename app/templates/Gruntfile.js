module.exports = function(grunt) {

  'use strict';
  var path = require('path');
  var config = {
    /**
     * Pull in the package.json file so we can read its metadata.
     * TODO: maybe c hange name from `pkg` to `bwr`?
     */
    pkg: grunt.file.readJSON('bower.json'),
    
    /**
     * Bower: https://github.com/yatskevich/grunt-bower-task
     * 
     * Install Bower packages and migrate static assets.
     */
    bower: {
      install: {
        options: {
          targetDir: './vendor/',
          install: true,
          verbose: true,
          cleanBowerDir: true,
          cleanTargetDir: true,
          layout: function(type, component) {
            if (type === 'img') {
              return path.join('../src/static/img');
            } else if (type === 'fonts') {
              return path.join('../src/static/fonts');
            } else {
              return path.join(component);
            }
          }
        }
      }
    },

    /**
     * Concat: https://github.com/gruntjs/grunt-contrib-concat
     * 
     * cf-less
     * Concatenate cf-* Less files prior to compiling them.
     * 
     * bodyScripts
     * Concatenates JavaScript files.
     * 
     */
    concat: {
      'cf-less': {
        src: [
          'vendor/cf-*/*.less',
          '!vendor/cf-core/*.less',
          'vendor/cf-core/cf-core.less',
          '!vendor/cf-concat/cf.less'
        ],
        dest: 'vendor/cf-concat/cf.less',
      },
      bodyScripts: {
        src: [
          'vendor/jquery/jquery.js',
          'vendor/jquery.easing/jquery.easing.js',
          'vendor/cf-*/*.js',
          'src/static/js/app.js'
        ],
        dest: 'src/static/js/main.js'
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
          paths: grunt.file.expand('vendor/**/'),
        },
        files: {
          'src/static/css/main.css': ['src/static/css/main.less']
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
      multiple_files: {
        // Prefix all CSS files found in `static/css` and overwrite.
        expand: true,
        src: ['src/static/css/*.css', '!src/static/css/*.min.css']
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
        preserveComments: 'some'
      },
      bodyScripts: {
        src: ['src/static/js/main.js'],
        dest: 'src/static/js/main.min.js'
      }
    },

    /**
     * Banner: https://github.com/mattstyles/grunt-banner
     *
     * Here's a banner with some template variables.
     * We'll be inserting it at the top of minified assets.
     */
    banner: '/*!\n' +
            ' *              ad$$             $$\n' +
            ' *             d$"               $$\n' +
            ' *             $$                $$\n' +
            ' *   ,adPYba,  $$$$$ $b,dPYba,   $$,dPYba,\n' +
            ' *  aP\'    \'$: $$    $$P\'   \'$a  $$P\'   \'$a\n' +
            ' *  $(         $$    $$(     )$  $$(     )$\n' +
            ' *  "b,    ,$: $$    $$b,   ,$"  $$b,   ,$"\n' +
            ' *   `"Ybd$"\'  $$    $$`YbdP"\'   $$`Ybd$"\'\n' +
            ' *                   $$\n' +
            ' *                   $$\n' +
            ' *                   ""\n' +
            ' *\n' +
            ' *  <%= pkg.name %> - v<%= pkg.version %>\n' +
            ' *  <%= pkg.homepage %>' +
            ' *  A public domain work of the Consumer Financial Protection Bureau\n' +
            ' */',

    usebanner: {
      css: {
        options: {
          position: 'top',
          banner: '<%= banner %>',
          linebreak: true
        },
        files: {
          src: ['src/static/css/*.min.css']
        }
      },
      js: {
        options: {
          position: 'top',
          banner: '<%= banner %>',
          linebreak: true
        },
        files: {
          src: ['src/static/js/*.min.js']
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
          'src/static/css/main.min.css': ['src/static/css/main.css'],
        }
      }
    },

    /**
     * Copy: https://github.com/gruntjs/grunt-contrib-copy
     * 
     * Copy files and folders.
     */
    copy: {
      vendor: {
        files:
        [
          {
            expand: true,
            cwd: '',
            src: [
              // Only include vendor files that we use independently
              'vendor/html5shiv/html5shiv-printshiv.min.js',
              'vendor/box-sizing-polyfill/boxsizing.htc'
            ],
            dest: 'src/static'
          }
        ]
      }
    },

    /**
     * JSHint: https://github.com/gruntjs/grunt-contrib-jshint
     * 
     * Validate files with JSHint.
     * Below are options that conform to idiomatic.js standards.
     * Feel free to add/remove your favorites: http://www.jshint.com/docs/#options
     */
    jshint: {
      options: {
        camelcase: false,
        curly: true,
        forin: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: true,
        sub: true,
        boss: true,
        strict: true,
        evil: true,
        eqnull: true,
        browser: true,
        plusplus: false,
        globals: {
          jQuery: true,
          $: true,
          module: true,
          require: true,
          define: true,
          console: true,
          EventEmitter: true
        }
      },
      all: ['src/static/js/main.js']
    },

    /**
     * Watch: https://github.com/gruntjs/grunt-contrib-watch
     * 
     * Run predefined tasks whenever watched file patterns are added, changed or deleted.
     * Add files to monitor below.
     */
    watch: {
      main: {
        files: ['src/static/css/app.less', 'src/static/js/app.js'],
        tasks: ['default']
      }
    }
  };

  grunt.initConfig(config);

  /**
   * The above tasks are loaded here.
   */
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /**
   * Create custom task aliases and combinations
   */
  grunt.registerTask('vendor', ['bower:install', 'concat:cf-less']);
  grunt.registerTask('vendor-to-static', ['copy:vendor']);
  grunt.registerTask('cssdev', ['less', 'autoprefixer', 'cssmin', 'usebanner:css']);
  grunt.registerTask('jsdev', ['concat:bodyScripts', 'uglify', 'usebanner:js']);
  grunt.registerTask('default', ['cssdev', 'jsdev']);
  grunt.registerTask('test', ['jshint']);

};
