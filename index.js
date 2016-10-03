const _restify = require('restify');
const _package = require('./package.json');

exports.dispense = function( _config, callback )
{
	const _server = _restify.createServer({
		name: _package.name,
		version: _package.version
	});

	_server.use( _restify.acceptParser(_server.acceptable) );
	_server.use( _restify.queryParser() );
	_server.use( _restify.bodyParser() );

	_addEndpoints( _server, _config.endPoints );

	_server.listen(_config.port, function () 
	{
	  	if( callback !== undefined )
		  	callback( _server );
	});
};

const _addEndpoints = function( server, endPoints )
{
	if( endPoints.length === 0 )
		return;

	const thisEndPoint = endPoints[ 0 ];

	server[ thisEndPoint.method ]( thisEndPoint.uri, _curryRandomResponse( thisEndPoint.data ) );
};

const _curryRandomResponse = function( data )
{
	return function (req, res, next) 
	{
		res.send( _getRandomResponse( data ) );
		return next();
	};
};

const _getRandomResponse = function( data )
{
	return data[ Math.floor( Math.random() * data.length ) ];
};
