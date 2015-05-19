# Changelog

All notable changes to this project will be documented in this file.
We follow the [Semantic Versioning 2.0.0](http://semver.org/) format.

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
