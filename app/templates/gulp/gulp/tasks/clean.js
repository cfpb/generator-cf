'use strict';

const gulp = require( 'gulp' );
const del = require( 'del' );
const configClean = require( '../config' ).clean;

gulp.task( 'clean', () => del( configClean.dest ) );
