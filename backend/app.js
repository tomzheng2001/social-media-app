const express = require("express");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const axios = require('axios');
const { TwitterApi } = require("twitter-api-v2");
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const PORT = process.env.PORT || 3001;

const app = express();
const client = new TwitterApi({ appKey: 'lqHzaoTi7Fe6GqrcsKyovjQqu', appSecret: '1k9rC64dmn6kfLWSEzoc2l3bOka5hyMP5iPVdgC2iuHFQL6XNS' })

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
    const authLink = await client.generateAuthLink('https://35d8-2607-f140-6000-16-67c6-ff68-3cee-631d.ngrok.io/retrieve-token', { linkMode: 'authorize' });
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
    res.send('');
});

// past 24 (?) hours
app.get('/self-sentiment', async (request, response) => {
    const loggedClient = new TwitterApi({
        appKey: 'lqHzaoTi7Fe6GqrcsKyovjQqu',
        appSecret: '1k9rC64dmn6kfLWSEzoc2l3bOka5hyMP5iPVdgC2iuHFQL6XNS',
        accessToken: '1239705480068358144-j6NaioYAf9lJhnmmuXAdKzhkDMCQt2',
        accessSecret: 'vMAl5whPvzPKBQSf05EuMzZQm7q1kto00y28gInY764GC'
    });
    loggedClient.currentUser().then((user) => {
        const userId = user.id_str;
        loggedClient.v1.userTimeline(userId, {
            count: 200,
            trim_user: true
        }).then((timeline) => {
            const recent = timeline.data.filter((tweet) => {
                return (Date.now() - Date.parse(tweet.created_at)) < (7 * 24 * 60 * 60 * 1000);
            });
            console.log(recent);
            const sentimentSum = recent.reduce((sumSoFar, tweet) => {
                return sumSoFar + sentiment.analyze(tweet.full_text).score;
            }, 0);
            response.json({
                sentimentSum: sentimentSum,
                totalTweets: recent.length
            });
        });
    });

});
app.get('/following-sentiment', () => {

});

// global, sample a few times and get confidence interval
app.get('/global-sentiment')

// historical
app.get('/self-sentiment-historical')
app.get('/following-sentiment-historical')
app.get('/global-sentiment-historical')

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});