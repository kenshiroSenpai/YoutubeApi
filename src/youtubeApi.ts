import express from 'express';
const app: express.Application = express(); 
require('dotenv').config();

app.get('/test', function(req, res){
    res.send('Hello word');
});

app.get('/OAuthRequest', function(req, res){
    const url = 'https://accounts.google.com/o/oauth2/v2/auth?'+
    'scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube&'+
    'access_type=offline&'+
    'include_granted_scopes=true&'+
    // 'state=state_parameter_passthrough_value&'+
    'redirect_uri=http%3A%2F%2Flocalhost%2Foauth2callback&'+
    'response_type=code&'+
    'client_id=CLIENTE_ID'
    res.redirect('https://www.google.es');
})

app.listen(6969, function (){
    console.log('app listening on port 6969');
})