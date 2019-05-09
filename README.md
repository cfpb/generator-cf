# generator-cf [![Build Status](https://secure.travis-ci.org/cfpb/generator-cf.png?branch=master)](https://travis-ci.org/cfpb/generator-cf)

[Yeoman](http://yeoman.io) generator for [Capital Framework](http://cfpb.github.io/capital-framework/).

![generator-cf screenshot](https://raw.githubusercontent.com/cfpb/generator-cf/master/screenshot.gif)

## Installation

Install Yeoman and the Capital Framework generator:

```bash
npm install -g yo generator-cf
```

## Usage

Create a new project directory and `cd` to it:
```bash
mkdir my-new-project && cd $_
```

Run the Capital Framework generator:
```bash
yo cf
```

Compile the assets:
```bash
gulp
```

A demo page is generated at:
```bash
./dist/index.html
```

To view this page, run a simple server so that the assets resolve correctly:
```bash
cd ./dist/
python -m SimpleHTTPServer
```

And visit `http://localhost:8000/` in a web browser.

Build your project!

## Contributing

To hack on this generator, fork this repo, clone it and use `npm link`:

```bash
$ cd generator-cf
$ npm link
$ cd some-empty-directory-somewhere
$ npm link generator-cf
$ yo cf
```

Edit the source files and re-run `yo cf` to see the changes.
Please modify the current tests or write new tests if you add functionality to the generator.
Tests can be executed by running `npm test` from the project's root.

----

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)

