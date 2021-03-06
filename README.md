# Browser Request: The easiest HTTP library you'll ever see

Browser Request is a port of Mikeal Rogers's ubiquitous and excellent [request][req] package to the browser.

**And this is a fork of [iriscouch/browser-request](https://github.com/iriscouch/browser-request).**

Jealous of Node.js? Pining for clever callbacks? Request is for you.

Don't care about Node.js? Looking for less tedium and a no-nonsense API? Request is for you too.

# Examples

Fetch a resource:

```javascript
request('/some/resource.txt', function(er, response, body) {
  if(er)
    throw er;
  console.log("I got: " + body);
})
```

Send a resource:

```javascript
request.put({
  uri:'/some/resource.xml',
  body:'<foo><bar/></foo>'
}, function(er, response) {
  if(er)
    throw new Error("XML PUT failed (" + er + "): HTTP status was " + response.status);
  console.log("Stored the XML");
})
```

To work with JSON, set `options.json` to `true`. Request will set the `Content-Type` and `Accept` headers, and handle parsing and serialization.

```javascript
request({
  method:'POST',
  url:'/db',
  body:'{"relaxed":true}',
  json:true
}, on_response)
function on_response(er, response, result) {
  if(er)
    throw er
  if(response.ok)
    console.log('Server ok, id = ' + response.id)
}
```

Or, use this shorthand version (pass data into the `json` option directly):

```javascript
request({method:'POST', url:'/db', json: { relaxed:true } }, on_response)
```

## Convenient CouchDB

Browser Request provides a CouchDB wrapper. It is the same as the JSON wrapper, however it will indicate an error if the HTTP query was fine, but there was a problem at the database level. The most common example is `409 Conflict`.

```javascript
request.couch({method:'PUT', url:'/db/existing_doc', body:{"will_conflict":"you bet!"}}, function(er, resp, result) {
  if(er.error === 'conflict')
    return console.error("Couch said no: " + er.reason); // Output: Couch said no: Document update conflict.

  if(er)
    throw er;

  console.log("Existing doc stored. This must have been the first run.");
})
```

See the [Node.js Request README][req] for several more examples. Request intends to maintain feature parity with Node request (except what the browser disallows). If you find a discrepancy, please submit a bug report. Thanks!

# Usage

## Browserify

Browser Request is a [browserify][browserify]-enabled package.

This project is not on npm.org. You can still install it via npm:

    $ npm install git+https://github.com/invokemedia/browser-request.git

Next, make a module that uses the package.

```javascript
// example.js - Example front-end (client-side) code using browser-request via browserify
//
var request = require('browser-request')
request('/', function(er, res) {
  if(!er)
    return console.log('browser-request got your root path:\n' + res.body)

  console.log('There was an error, but at least browser-request loaded and ran!')
  throw er
})
```

To build this for the browser, run it through browserify.

    $ npm run build

Deploy `browser-request.js` to your web site and use it from your page.

```html
  <script src="browser-request.js"></script> <!-- Runs the request, outputs the result to the console -->
```

## Test

You can test this library with `phantomjs`. You just need to run:

    $ npm test

This will run the `test-run.js`, which wraps up `test.js` for the browser/phantom.

## License

Browser Request is licensed under the Apache 2.0 license.

