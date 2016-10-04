# trashdispenser
Quickly create a server to mock responses :poop:

```bash
npm install -g trashdispenser
```
Built using <a href="https://www.npmjs.com/package/restify">Restify</a>.
## Usage
### Command Line
```bash
trashdispenser config.json
```
Where 'config.json' is a file containing configuration.
### Code
```js
var trashdispenser = require( 'trashdispenser' );

trashdispenser.dispense( config, function( server ) // callback optional
{
  // server is a restify server object
});
```
## Config
```json
{
	"url" : "yourservers.url.com",
	"port" : 8080,
	"endPoints" :
	[
		{
			"uri" : "/an/endpoint/:environment",
			"method" : "get",
			"data" :
			[
				"random data",
				"more random data"
			]
		},
        {
			"uri" : "/another/:endpoint",
			"method" : "get",
			"data" :
			[
				"random data",
				"more random data"
			]
		}
	] 
}
```
Data returned from requests is chosen randomly from the data array.

If url attribute is not set, will default to local host.

## License
MIT
