const express = require('express')
const dotenv = require('dotenv');

const port = 5000

dotenv.config()

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

var app = express();

var generateRandomString = function (length) {
  var text = '';
  var possible =
    '420HhiINnuUBb69';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/auth/login', (req, res) => {
});

app.get('/auth/callback', (req, res) => {

    var code = req.query.code;

    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: 'http://localhost:3000/auth/callback',
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' +
              spotify_client_secret).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token;
          res.redirect('/')
        }
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
