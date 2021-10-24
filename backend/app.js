const express = require("express");
const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const axios = require('axios');
const { TwitterApi } = require("twitter-api-v2");
var Sentiment = require('sentiment');


const API_key = process.env.API_KEY
const API_key_secret = process.env.API_KEY_SECRET
const PORT = process.env.PORT || 3001;
const app = express();
var sentiment = new Sentiment();
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

function calculate_homeTimeline_sentiment() {
  const homeTimeline = await client.v1.homeTimeline({ exclude_replies: true });
  var total_sentiment_val = 0
  for await (const tweet of homeTimeline) {
    total_sentiment_val += sentiment.analyze(tweet)
  }
  avg_sentiment_val = total_sentiment_val / homeTimeline.length
  console.log("Avg sentiment value from your home timeline: ", avg_sentiment_val)
  return avg_sentiment_val
}


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
