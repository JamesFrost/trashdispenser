#!/usr/bin/env node
if( process.argv[ 2 ] === undefined )
{
	console.error( "\nNo config file specified.\n" );
	process.exit( 1 );
}

const _trashdispenser = require( '../index.js' );
const _cwd = require( 'cwd' )();
const _fs = require( 'fs' );
const _updateNotifier = require( 'update-notifier' );
const pkg = require( __dirname + '/../package.json' );


_updateNotifier( { pkg } ).notify();

const _configFile = _cwd + '/' + process.argv[ 2 ];
const _config = JSON.parse( _fs.readFileSync( _configFile, 'utf8' ) );

_trashdispenser.dispense( _config, function( server )
{
	console.log('%s listening at %s', server.name, server.url);
});
