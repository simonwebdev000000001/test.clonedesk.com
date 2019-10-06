const express = require('express');
const request = require('request');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

function setHeaders(req, url, method = 'GET', jsonBody) {
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    // 'x-api-key': req.headers['x-api-key'],
    'Cookie': req.headers['cookies'],
  };
  var options = {
    method,
    url,
    headers:
      {
        'cache-control': 'no-cache',
        ...headers,
      },
  };
  if (jsonBody) options.json = jsonBody;
  return options;
}

app.use('/user/:id', function(req, res) {
  const opt = setHeaders(req, `http://test-api.clonedesk.com/api/v2/users/${req.params.id}`);
  request(opt, function(error, response, respbody) {
      res.json({
        ...response,
        body: JSON.parse(response.body),
      });
    },
  );
});
app.use('/sidebar', function(req, res) {
  request(setHeaders(req, `http://test-api.clonedesk.com/api/v2/sidebar`), function(error, response, body) {
    res.json({
      ...response,
      body: JSON.parse(response.body),
    });
  });

});
app.use('/login-session', function(req, res) {
  request(
    setHeaders(req, `http://test-api.clonedesk.com/api/v2/current-user/login-session`, 'POST', req.body)
    ,
    async function(error, response, body) {
      res.json(response);
    },
  );
});
app.use(express.static(__dirname + '/build'));
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/build/index.html');
});
// Listen to port 3000
app.listen(process.env.PORT || 3543, function(er) {
  console.log('Express server listening on port ', er);
});
