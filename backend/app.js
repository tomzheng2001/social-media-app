const express = require("express");
const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const axios = require('axios');
const { TwitterApi } = require("twitter-api-v2");

const PORT = process.env.PORT || 3001;

const app = express();
const client = new TwitterApi({appKey: 'lqHzaoTi7Fe6GqrcsKyovjQqu', appSecret: '1k9rC64dmn6kfLWSEzoc2l3bOka5hyMP5iPVdgC2iuHFQL6XNS'})

let oauthSessions = {

};

app.post('/create-post', upload.single('media'), (request, response) => {
    console.log(request.body);
    console.log(request.file);
    response.json({
        'success': true
    });
});

app.get('/get-token-request', async (req, res) => {
    const authLink = await client.generateAuthLink('https://35d8-2607-f140-6000-16-67c6-ff68-3cee-631d.ngrok.io/retrieve-token', {linkMode: 'authorize'});
    const url = authLink.url;
    oauthSessions = {
        ...oauthSessions,
        [authLink.oauth_token]: {
            oauth_token_secret: authLink.oauth_token_secret
        }
    };
    res.json({
        url: url
    });
});

app.get('/retrieve-token', (req, res) => {
    // Exact tokens from query string
  const { oauth_token, oauth_verifier } = req.query;
  // Get the saved oauth_token_secret from session
  console.log(oauthSessions);
  const oauth_token_secret = oauthSessions[oauth_token].oauth_token_secret;

  if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
    return res.status(400).send('You denied the app or your session expired!');
  }

  // Obtain the persistent tokens
  // Create a client from temporary tokens
  const client = new TwitterApi({
    appKey: 'lqHzaoTi7Fe6GqrcsKyovjQqu',
    appSecret: '1k9rC64dmn6kfLWSEzoc2l3bOka5hyMP5iPVdgC2iuHFQL6XNS',
    accessToken: oauth_token,
    accessSecret: oauth_token_secret,
  });

  client.login(oauth_verifier)
    .then(({ client: loggedClient, accessToken, accessSecret }) => {
      // loggedClient is an authentificated client in behalf of some user
      // Store accessToken & accessSecret somewhere
      console.log(accessToken, accessSecret);
      loggedClient.v1.tweet('hello!');
    })
    .catch(() => res.status(403).send('Invalid verifier or access tokens!'));
    res.redirect('/auth-twitter');
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

/*
var API_Key = 'lqHzaoTi7Fe6GqrcsKyovjQqu'  // process.env.API_KEY  // oauth_consumer_key (consumer_key) static
var API_Secret_Key =  '1k9rC64dmn6kfLWSEzoc2l3bOka5hyMP5iPVdgC2iuHFQL6XNS' // process.env.API_SECRET_KEY  // oauth_consumer_secret (consumer_secret) static
var oauth_callback = 'https://example.com'

// *************************************************************
// OAuth1.0 - 3-legged server side flow (Twitter example)
// step 1
const qs = require('querystring')
  , oauth =
    { callback: oauth_callback
    , consumer_key: API_Key
    , consumer_secret: API_Secret_Key
    }
  , url = 'https://api.twitter.com/oauth/request_token'
  ;
request.post({url:url, oauth:oauth}, function (e, r, body) {
  // Ideally, you would take the body in the response
  // and construct a URL that a user clicks on (like a sign in button).
  // The verifier is only available in the response after a user has
  // verified with twitter that they are authorizing your app.
 
  // step 2
  const req_data = qs.parse(body)
  const uri = 'https://api.twitter.com/oauth/authenticate'
    + '?' + qs.stringify({oauth_token: req_data.oauth_token})
  // redirect the user to the authorize uri
  console.log(uri)
 
  // step 3
  // after the user is redirected back to your server
  const auth_data = qs.parse(body)
    , oauth =
      { consumer_key: API_Key
      , consumer_secret: API_Secret_Key
      , token: auth_data.oauth_token
      , token_secret: req_data.oauth_token_secret
      , verifier: auth_data.oauth_verifier
      }
    , url = 'https://api.twitter.com/oauth/access_token'
    ;
  request.post({url:url, oauth:oauth}, function (e, r, body) {
    // ready to make signed requests on behalf of the user
    const perm_data = qs.parse(body)
      , oauth =  // final data for twitter client
        { consumer_key: API_Key
        , consumer_secret: API_Secret_Key
        , token: perm_data.oauth_token
        , token_secret: perm_data.oauth_token_secret
        }
  })
})
// ****************************************************************


// create twitter client after user credentials are authenticated
var client = new Twitter({
    consumer_key: API_Key,  // API Key (oauth_consumer_key)
    consumer_secret: API_Secret_Key,  // API Secret Key (oauth_consumer_secret)
    access_token_key: perm_data.oauth_token,  // resulting oauth_token
    access_token_secret: perm_data.oauth_token_secret  //  resulting oauth_token_secret
  });

  // test tweet
  client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
    if(error) throw error;
    console.log(tweet);  // Tweet body.
    console.log(response);  // Raw response object.
  });*/