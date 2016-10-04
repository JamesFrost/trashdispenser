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

	if( _config.url == undefined )
	{
		_server.listen(_config.port, function () 
		{
		  	if( callback !== undefined )
			  	callback( _server );
		});
	}
	else
	{
		_server.listen(_config.port, _config.url, function () 
		{
		  	if( callback !== undefined )
			  	callback( _server );
		});
	}
};

const _addEndpoints = function( server, endPoints )
{
	if( endPoints.length === 0 )
		return;

	const thisEndPoint = endPoints[ 0 ];

	if( typeof thisEndPoint.data === "function" )
		server[ thisEndPoint.method ]( thisEndPoint.uri, thisEndPoint.data );
	else
		server[ thisEndPoint.method ]( thisEndPoint.uri, _curryRandomResponse( thisEndPoint.data ) );

	_addEndpoints( server, endPoints.slice( 1 ) );
};

const _curryRandomResponse = function( data )
{
	return function (req, res, next) 
	{
		var text = '';
		for (var i = 0; i <= 500; ++i) 
		{
			text += JSON.stringify( _getRandomResponse( data ) );
		}

		res.send( text );
		return next();
	};
};

const _getRandomResponse = function( data )
{
	return data[ Math.floor( Math.random() * data.length ) ];
};
