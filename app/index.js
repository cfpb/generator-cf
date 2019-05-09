const banner = require( './banner' );
const chalk = require( 'chalk' );
const download = require( 'download' );
const filterComponents = require( './lib/filter-components' );
const fs = require( 'fs' );
const mkdirp = require( 'mkdirp' );
const path = require( 'path' );
const requestPromise = require( 'request-promise' );
const rimraf = require( 'rimraf' );
const RegClient = require( 'silent-npm-registry-client' );
const promisifyNode = require( 'promisify-node' );
const underscoreString = require( 'underscore.string' );
const underscoreSlugify = require( 'underscore.string/slugify' );
const updateNotifier = require( './lib/notifier' );
const YeomanGenerator = require( 'yeoman-generator' );
const yosay = require( 'yosay' );

const client = new RegClient();

// Give the npm registry client a promise interface.
promisifyNode( client );

// Alert the user if a newer version of this generator is available.
updateNotifier();

// Set list of repos from which we grab standard files.
// These will be used in the downloadTemplate function in the writing priority.
const osLibraries = [
  'https://github.com/cfpb/open-source-project-template/archive/master.zip',
  'https://github.com/cfpb/development/archive/master.zip'
];

// Grab a list of all CF components, we'll use it later.
const opts = {
  uri:     'https://api.github.com/repos/cfpb/capital-framework/contents/packages',
  json:    true,
  headers: { 'user-agent': 'generator-cf' }
};
if ( process.env.GITHUB_PERSONAL_TOKEN ) {
  opts.headers[ 'Authorization' ] = `token ${ process.env.GITHUB_PERSONAL_TOKEN }`
}
const components = requestPromise( opts ).then( filterComponents ).catch( console.error );

const manifestCheck = function() {
  try {
    const manifest = require( path.join( process.cwd(), 'package.json' ) );

    return manifest;
  } catch(e) {};
};

const CapitalFrameworkGenerator = YeomanGenerator.extend( {

  initializing: {

    greet: function() {
      this.pkg = require( '../package.json' );
      this.existing = manifestCheck();

      banner();
      this.log(
        '\nWelcome to the Capital Framework generator, brought\n' +
        'to you by the ' + chalk.green('Consumer Financial Protection Bureau') + '.'
      );
      this.log(
        '\nTo learn about Capital Framework, visit ' +
        chalk.bold( 'https://cfpb.github.io/capital-framework/' ) + '.\n'
      );
    }

  },

  prompting: {

    askForName: function() {
      return this.prompt( [ {
        name: 'name',
        message: 'What is the name of your project?',
        default: underscoreString.humanize(
          this.existing && this.existing.name || path.basename( process.cwd() )
        ),
      } ] ).then( function( answers ) {
        this.humanName = answers.name;
        this.slugname = underscoreSlugify( answers.name );
        this.safeSlugname = this.slugname.replace( /-+([a-zA-Z0-9])/g, g => {
            return ' ' + g[1].toUpperCase();
        } );
      }.bind( this ) );
    },

    askForDescription: function() {
      const prompts = [{
        name: 'description',
        message: 'Project\'s description',
        default: this.existing && this.existing.description ||
                 'The best website ever.'
      }, {
        name: 'homepage',
        message: 'Project\'s homepage',
        default: this.existing && this.existing.homepage ||
                 'https://www.consumerfinance.gov/'
      }, {
        name: 'license',
        message: 'Project\'s license',
        default: this.existing && this.existing.license || 'CC0'
      }, {
        name: 'repoType',
        message: 'Repository type',
        default: this.existing && this.existing.repository &&
                 this.existing.repository.type || 'git'
      }, {
        name: 'repoUrl',
        message: 'Repository URL',
        default: this.existing && this.existing.repository &&
                 this.existing.repository.url ||
                 'https://github.com/cfpb/capital-framework.git'
      }, {
        name: 'authorName',
        message: 'Author\'s name',
        default: this.existing && this.existing.author &&
                 this.existing.author.name ||
                 'Consumer Financial Protection Bureau'
      }, {
        name: 'authorEmail',
        message: 'Author\'s email',
        default: this.existing && this.existing.author &&
                 this.existing.author.email || 'tech@cfpb.gov'
      }, {
        name: 'authorUrl',
        message: 'Author\'s homepage',
        default: this.existing && this.existing.author &&
                 this.existing.author.url || 'https://cfpb.github.io/'
      }];

      return this.prompt( prompts ).then( function( answers ) {
        this.isCfpbEmployee = answers.authorEmail.indexOf( 'cfpb.gov' ) > -1;
        this.currentYear = ( new Date() ).getFullYear();
        this.props = answers;
      }.bind( this ) );
    },

    askAboutComponents: function() {
      return components.then( function( components ) {
        return this.prompt( [{
          type:    'checkbox',
          name:    'components',
          message: 'You’re about to install CF Core. Which additional CF components would you like in your app?',
          choices: components,
          default: components.map( function( c ) {
            return c.value;
          } )
        }] ).then( function( answers ) {
          var versionedComponents = this.components = [];

          // Get latest repo tag
          var getLatest = function( repo ) {
            var uri = 'https://registry.npmjs.org/' + repo;
            client.get( uri, { timeout: 1000 } ).then( function( data ) {
              versionedComponents.push( { 'name': repo, 'ver': data['dist-tags'].latest } );
            } ).catch( console.error );
          };

          answers.components.push( 'cf-core' );

          answers.components.forEach( function( el ) {
            getLatest( el );
          } );
        }.bind( this ) );
      }.bind( this ) );
    }
  },

  writing: {

    downloadTemplate: function() {
      const numLibraries = osLibraries.length;
      let count = 0;
      const done = this.async();
      osLibraries.forEach( function( library ) {
        download( library, '_cache', { extract: true } )
          .then( () => {
            count++;
            console.log( 'Finished downloading…', library );
            if ( numLibraries === count ) {
              done();
            }
          } )
          .catch( ( err ) => {
            console.log( 'Error downloading!', library, err );
          } );
      } );
    },

    appFiles: function() {
      var files = ['screenshot.png', 'CHANGELOG.md'];

      // If this is a public domain project, grab some more files from OSPT.
      if ( this.props.license === 'CC0' ) {
        files = files.concat( ['TERMS.md', 'CONTRIBUTING.md', 'LICENSE'] );
      }

      // Copy over the OSPT files.
      var rootDir = this.destinationRoot() +
                    '/_cache/open-source-project-template-master/';
      files.forEach( function _copy( file ) {
        fs.createReadStream( rootDir + file )
          .pipe( fs.createWriteStream( file ) );
      } );

      // Copy files from the front-end repo.
      var feFiles = ['.eslintrc'];
      feFiles.forEach( function _copy( file ) {
        fs.createReadStream( this.destinationRoot() + '/_cache/development-master/' + file )
          .pipe( fs.createWriteStream( file ) );
      }.bind( this ) );
      this.fs.copyTpl( this.templatePath( 'gulp/_package.json' ), 'package.json', this );
      this.fs.copyTpl( this.templatePath( 'gulp/_README.md' ), 'README.md', this );
      this.fs.copy( this.templatePath( 'gulp/_gulpfile.js' ), 'gulpfile.js' );
      this.fs.copy( this.templatePath( 'gulp/_setup.sh' ), 'setup.sh' );
      this.fs.copy( this.templatePath( 'gulp/gulp/' ), 'gulp/' );
      this.fs.copyTpl( this.templatePath( 'gulp/gulp/config.js' ), 'gulp/config.js', this );
    },

    srcFiles: function() {
      mkdirp( 'src' );
      this.fs.copyTpl( this.templatePath( 'src/static' ), 'src/static', this );
      this.fs.copyTpl( this.templatePath( 'src/index.html' ), 'src/index.html', this );
      mkdirp( 'dist' );
    },

    processGitIgnore: function() {
      var fileName = this.destinationRoot() +
                     '/_cache/open-source-project-template-master/.gitignore';
      var gitignore = this.fs.read( fileName );
      var done = this.async();
      // Add src/vendor to the end.
      gitignore = gitignore + '\r\nsrc/vendor/';
      this.fs.write( '.gitignore', gitignore );
      // Kill the _cache dir.
      rimraf( this.destinationRoot() + '/_cache', done );
    },

    copyNpmrc: function() {
      this.templatePath( '_npmrc', '.npmrc' );
    }
  },

  install: {
    installComponents: function() {
      if ( this.options['skip-install'] ) return;
      const done = this.async();
      this.spawnCommand( './setup.sh' ).on( 'close', done );
    }
  },

  end: {

    bye: function() {
      const msg = `All done! Edit the files in the src directory and then
                \`gulp build\` to compile everything into the dist directory.`;
      this.log( yosay( msg ) );
    }
  }
} );

module.exports = CapitalFrameworkGenerator;
