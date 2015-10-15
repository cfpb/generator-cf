# Change Log

All notable changes to this project will be documented in this file.
We follow the [Semantic Versioning 2.0.0](http://semver.org/) format.


## Unreleased

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

## Fixed
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
