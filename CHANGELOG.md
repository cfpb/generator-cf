# Change Log

All notable changes to this project will be documented in this file.
We follow the [Semantic Versioning 2.0.0](http://semver.org/) format.


## Unreleased

### Changed
- Converts gulp task format to handle gulp 4.
- Brings in latest ESLint 5 rules and fixes.
- Changes to using `uglifyjs-webpack-plugin` instead of `gulp-uglify`.
- Bumps versions of del, grunt-contrib-uglify, grunt-eslint, browser-sync, gulp, gulp-autoprefixer, gulp-changed, gulp-clean-css, gulp-eslint, gulp-header, gulp-imagemin, gulp-less, gulp-sourcemaps, parallelshell, webpack, and webpack-stream.
- Updated markup and less for latest changes in CF v8.0.1
- Add config files to linter.
- Fix linter errors in config.
- Updates syntax to ES6.
- Replace gulp-mq-remove with postcss-unmq
- Replace gulp-autoprefixer with gulp-postcss and autoprefixer.
- General syntax spacing fixes.

### Removed
- Removes references to non-existent files.
- Removes build and default gulp tasks and merges them into gulpfile.js.
- Removes grunt workflow.
- Removes deprecated gulp-util


## 2.3.0 - 2017-07-21

### Changed
- Updated variables to `const` plus ES6 features.
- Updated min node version to greater than 6.
- Updated `chalk` to `2.0.1` from `0.4.0`.
- Updated `promisify-node` to `0.4.0` from `0.3.2`.
- Updated `request-promise` to `4.2.1` from `0.3.2`.
- Updated `rimraf` to `2.6.1` from `2.2.8`.
- Updated `silent-npm-registry-client` to `3.0.1` from `2.0.0`.
- Updated `update-notifier` to `2.2.0` from `0.2.2`.
- Updated `yeoman-generator` to `1.1.1` from `0.17.7`.
- Updated `yosay` to `2.0.0` from `0.1.0`.
- Replaced `this._` with npm-imported underscore libraries.
- Replaced `this.extract` with `download` package.
- Updated Less `.webfont-*` to Capital Framework 4 `.u-webfont-*` syntax.
- Updated `handle-errors.js` to match cfgov-refresh repo version.
- Updated `lint.js` to match cfgov-refresh repo version.
- Updated yeoman output message to automatically switch from grunt to gulp.
- Updated yeoman generator to match latest Yeoman API.
- Updated generated package dependencies.
- Updated Travis node version to 8.
- Updated the theme overrides for v4 variable changes
- Updated the example index page for v4 markup changes

### Added
- Added option to run http-server

### Removed
- Removed `gulp-load-plugins`.


## 2.2.2 - 2017-01-06

### Fixed
- Updated one more reference to `development` from `front-end`
  to reflect name change of that repo.


## 2.2.1 - 2016-11-28

### Fixed
- Removed extraneous whitespace from dependencies and `index.html`.
- Updated gulp to `3.9.1` from `3.9.0`.
- Fixed max line length warnings in linter.
- Normalized spacing in parentheses.
- Updated gulp-eslint to `3.x` and grunt-eslint to `19.x` for compatibility
  with imported `.eslintrc` file.
- Updated `@btn-font-size` to `16px` from `14px`.
- Updated reference to `development` from `front-end`
  to reflect name change of that repo.


## 2.2.0 - 2016-06-15

### Added
- GitHub issue/PR templates

### Changed
- Normalized Gulp task names to match cfgov-refresh
- Updated installed gulp-eslint to 2.0.0 from 1.0.0.
- Updated installed gulp-autoprefixer to 3.1.0 from 2.3.1
- General cleanup of capping line length, removing whitespace, etc.


## 2.1.1 - 2016-05-03

### Fixed
- Renamee .npmrc template file so that npm doesn't ignore it
- Removed duplicate caret range specifier
- Typo in bureau name


## 2.1.0 - 2016-04-07

### Added
- Added a default `.npmrc` that will automatically save all npm installs to the
  `package.json` and pin the specific version installed.

### Fixed
- Generated `main.js` no longer breaks on first run if the cf-expandables
  component was deselected during generation.
- Generator no longer tries to copy `main.less` and `index.html` twice.
- Added missing color vars for block borders to `cf-theme-enhancements.less`.
- Update the GH endpoint used to retrieve list of components and remove ignore
  list that is no longer required.

### Changed
- Pinned dependencies in generated package.json files


## 2.0.0 - 2016-01-04

### Added
- cf-type-testing to ignore list.

### Changed
- Migration to Voltrazord: Build processes now use npm instead of Bower.

### Fixed
- cf-theme-overrides.less now uses new brand palette color variables.

### Removed
- All Bower references.


## 1.4.0 - 2015-11-13

### Changed
- Overhauled color palette in CFPB's `brand-palette.less` variables file.

**WARNING:** This is a breaking change for CFPB projects that use this file.
Please heed the instructions given at the bottom of the file for updating
your project's color variables when implementing the updated palette.


## 1.3.1 - 2015-11-05

### Fixed
- Corrected typo in Grunt `js` alias that was preventing JS from compiling.


## 1.3.0 - 2015-10-15

### Added
- Added option to use Gulp as project build tool

### Changed
- Moved Grunt specific template files to `/grunt` directory


## 1.2.0 - 2015-10-13

### Added
- Re-adds html5shiv to the list of Bower dependencies.
- Adds `copy` to the `css` and `js` task aliases so that the changes get copied
  to `dist/` after they're run.

### Fixed
- Grunt `watch` updated so that it only builds what is needed,
  depending on what has been changed.

### Changed
- Updates the `copy` task to include images, include HTML files in subfolders,
  exclude HTML files from dependencies, include html5shiv.


## 1.1.2 - 2015-09-28

### Changed
- Updated grunt-eslint in template from `17.1.0` to `17.2.0`.


## 1.1.1 – 2015-08-27

### Changed
- Set default `@grid_wrapper-width` in `cf-theme-overrides.less` to 1230px.
  (@cfpb/design-manual#342)
- Set default `@expandable-group-divider` to `@gray-50`.
  (@cfpb/design-manual#143)


## 1.1.0 – 2015-08-03

### Added
- `setup.sh` script.


## 1.0.1 – 2015-07-08

### Removed
- Normalize.css imports.


## 1.0.0 – 2015-06-02

### Changed
- Supersedes `eslint` task by `lintjs`.
- If user selects every component, install capital-framework instead of every
  component individually.
- Fixes async bug that was preventing final goodbye message from being echoed.
- Updated all dev dependencies in package.json to latest versions.

## Added
- Adds `lintjs` task.
- Adds `--quiet` CLI flag to Gruntfile to suppress warnings in linter.
- Checks author's email to determine if they're a CFPB employee and uncomments
  licensed-fonts.css if they are.
- Adds `clean` task to delete the dist dir before recreating it.

### Removed
- Grunt bower and concat-cf tasks.
- `exportsOverride` section in bower.json.


## 0.7.0 - 2015-05-19

### Added
- Added webfont variables to override default webfonts in cf-core


## 0.6.0 – 2015-04-20

### Added
- Adds jit-grunt to template Gruntfile.
- Adds instructions for running tests to the README.
- Adds an additional sentence to the generator's opening welcome message.

### Changed
- Fetches `.eslintrc` for new projects from <github.com/cfpb/front-end>
  instead of having a template file in this repo that needs manual updating.
- Changes template Gruntfile to compile CF and place its static assets in
  an ignored location.
- Reformatted `brand-palette.less` to align better with the CFPB Design Manual's
  Color page. (No functional changes.)

### Fixed
- Counters look more rounded and letters are more evenly spaced in the
  CFPB ASCII art.


## 0.5.0 - 2015-04-02

### Added
- Adds details for project repository info.
- Adds an enhancements stylesheet to easily track project changes for CF
  components.
- Adds cf-core to list of user‘s selected options and updated the printed
  message.

### Changed
- Switches out JSHint for ESLint in generated project.
- Switches GitHub API to search endpoint for requesting CF components.
- Writes the CF deps to the bower file and utilizes NPM post-install
  scripts.
- Updates manifest templates to remove errant whitespace from generated
  manifests.
- Updates the installation and usage instructions in the generator README.


## 0.4.0 - 2015-03-09

### Added
- Adds a check for existing projects and uses the manifest properties as
  prompt defaults if one exists.


## 0.3.1 - 2015-01-26

### Added
- Adds `@super-btn-font-size` variable to `cf-theme-overrides.less`.

### Changed
- Changes some of the questions and default answers on the opening questionnaire.

### Fixed
- Fixes a few typos on the demo page.


## 0.3.0 - 2015-01-14

### Added
- Adds support for overriding the new CF color variables in cf-buttons.
