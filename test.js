var test = require('tape');

var request = require('./');

test('try a normal GET', function(t) {
  var url = 'https://raw.githubusercontent.com/iriscouch/browser-request/master/package.json';
  request(url, function(err, resp) {
    t.equal(resp.statusCode, 200);
    t.equal(!!resp.body.match(/browser-request/), true);
    t.end();
  });
});

test('try a normal POST', function(t) {
  var url = 'http://httpbin.org/post';
  request({
    url: url,
    method: 'POST',
    body: {
      string: 'data',
      boolean: true,
      number: 999,
      object: {
        foo: 'bar'
      },
      array: [1, 2, 3],
      float: 0.2
    }
  }, function(err, resp, body) {
    t.equal(resp.statusCode, 200);
    t.equal(!!resp.body.match(/object Object/), true);
    t.end();
  });
});

test('try a normal PUT', function(t) {
  var url = 'http://httpbin.org/put';
  request({
    url: url,
    method: 'PUT',
    body: {
      string: 'data',
      boolean: true,
      number: 999,
      object: {
        foo: 'bar'
      },
      array: [1, 2, 3],
      float: 0.2
    }
  }, function(err, resp, body) {
    t.equal(resp.statusCode, 200);
    t.equal(!!resp.body.match(/object Object/), true);
    t.end();
  });
});

test('try a normal DELETE', function(t) {
  var url = 'http://httpbin.org/delete';
  request({
    url: url,
    method: 'DELETE',
    body: {
      string: 'data',
      boolean: true,
      number: 999,
      object: {
        foo: 'bar'
      },
      array: [1, 2, 3],
      float: 0.2
    }
  }, function(err, resp) {
    t.equal(resp.statusCode, 200);
    t.equal(!!resp.body.match(/object Object/), true);
    t.end();
  });
});

test('try a 404 GET', function(t) {
  var url = 'http://httpbin.org/status/404';
  request(url, function(err, resp) {
    t.equal(resp.statusCode, 0);
    t.end();
  });
});

test('try a 500 GET', function(t) {
  var url = 'http://httpbin.org/status/500';
  request(url, function(err, resp) {
    t.equal(resp.statusCode, 0);
    t.end();
  });
});

test('try a 202 GET', function(t) {
  var url = 'http://httpbin.org/status/202';
  request(url, function(err, resp) {
    t.equal(resp.statusCode, 202);
    t.end();
  });
});

test('try a followRedirect request', function(t) {
  var url = 'http://httpbin.org/redirect/1';
  request({
    url: url,
    json: true,
    followRedirect: true
  }, function(err, resp, body) {
    t.equal(body.url, "http://httpbin.org/get");
    t.end();
  });
});

test('try a CORS GET', function(t) {
  var url = 'https://www.googleapis.com/plus/v1/activities';
  request(url, function(err, resp) {
    t.equal(resp.statusCode, 400);
    t.equal(!!resp.body.match(/Required parameter/), true);
    t.end();
  });
});

test('blob true', function(t) {
  var url = 'https://placeholdit.imgix.net/~text?txtsize=19&bg=000000&txtclr=ffffff&txt=200%C3%97200&w=200&h=200';
  request({
    url: url,
    blob: true
  }, function(err, resp, blob) {
    t.equal(resp.statusCode, 200);
    t.equal(!!blob.type.match(/^image/), true);
    t.end();
  });
});

test('try to abort a GET', function(t) {
  var url = './package.json';
  var req = request(url, function(err) {
    t.equal(err.toString(), 'Error: Network connection error');
    t.end();
  });
  req.abort();
});

test('try to abort a CORS GET', function(t) {
  var url = 'http://httpbin.org/get';
  request(url, function(err) {
    t.equal(err.toString(), 'Error: CORS request rejected: ' + url);
    t.end();
  }).abort();
});
