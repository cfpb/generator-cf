# Changelog

All notable changes to this project will be documented in this file.
We follow the [Semantic Versioning 2.0.0](http://semver.org/) format.

## 0.5.0 - 2015-04-02

### Added
- Adds details for project repository info
- Adds an enhancements stylesheet to easily track project changes for CF
components
- Adds cf-core to list of user‘s selected options and updated the printed
message

### Changed
- Switches out JSHint for ESLint in generated project
- Switches GitHub API to search endpoint for requesting CF components
- Writes the CF deps to the bower file and utilizes NPM post-install
scripts
- Updates manifest templates to remove errant whitespace from generated
manifests
- Updates the installation and usage instructions in the generator README

## 0.4.0 - 2015-03-09

### Added
- Adds a check for existing projects and uses the manifest properties as
prompt defaults if one exists.

## 0.3.1 - 2015-01-26

### Added
- Adds `@super-btn-font-size` variable to `cf-theme-overrides.less`.

### Changed
- Some of the questions and default answers on the opening questionnaire.

### Fixed
- A few typos on the demo page


## 0.3.0 - 2015-01-14

### Added
- Adds support for overriding the new CF color variables in cf-buttons.
