const fs = require( 'fs' );
const glob = require( 'glob' );

/**
 * Set up file paths
 */
const loc = {
  src:  './src',
  dist: './dist',
  lib:  './node_modules', // eslint-disable-line no-sync, no-inline-comments, max-len
  test: './test'
};

module.exports = {
  pkg: JSON.parse( fs.readFileSync( 'package.json' ) ), // eslint-disable-line no-sync, no-inline-comments, max-len
  banner:
      '/*!\n' +
      ' *  <%%= pkg.name %> - v<%%= pkg.version %>\n' +
      ' *  <%%= pkg.homepage %>\n' +
      ' *  Licensed <%%= pkg.license %> by' +
      ' <%= pkg.author.name %> <%= pkg.author.email %>\n' +
      ' */',
  lint: {
    src: [
      loc.src + '/static/js/**/*.js',
      loc.test + '/unit_tests/**/*.js',
      loc.test + '/browser_tests/**/*.js'
    ],
    build: [
      'gulpfile.js',
      'gulp/**/*.js',
      'config/**/*.js'
    ]
  },
  test: {
    src:   loc.src + '/static/js/**/*.js',
    tests: loc.test
  },
  clean: {
    dest: loc.dist
  },
  styles: {
    cwd:      loc.src + '/static/css',
    src:      '/main.less',
    dest:     loc.dist + '/static/css',
    settings: {
      paths: glob.sync( loc.lib + '/cf-*/src/' ),
      compress: true
    }
  },
  scripts: {
    src: [
      loc.src + '/static/js/main.js'
    ],
    dest: loc.dist + '/static/js/',
    name: 'main.js'
  },
  images: {
    src:  loc.src + '/static/img/**',
    dest: loc.dist + '/static/img'
  },
  copy: {
    files: {
      src: [
        loc.src + '/**/*.html',
        loc.src + '/_*/**/*',
        '!' + loc.lib + '/**/*.html'
      ],
      dest: loc.dist
    },
    icons: {
      src:  loc.lib + '/cf-icons/src/icons/*',
      dest: loc.dist + '/static/icons/'
    },
    vendorJs: {
      src: [
        loc.lib + '/html5shiv/dist/html5shiv-printshiv.min.js'
      ],
      dest: loc.dist + '/static/js/'
    }
  }
};
