import express, { Application } from 'express';
// import { google } from 'googleapis';
import { getVideo } from '../services/youtubeServices/search';
import { authorize, storeToken, storeCode, getPermission } from '../services/youtubeServices/authorize';
import * as fs from 'fs';
import dotenv from 'dotenv';

const app: Application = express();
dotenv.config();

app.get('/permission', (req, res) => {
    fs.readFile('client_secret.json', function processClientSecret(err, content) {
        if (err) {
            console.log('Error load client: ' + err);
            return;
        }
        console.log("-----------------------entro en permission------------------------");
        const url = getPermission(JSON.parse(content.toString()));
        res.redirect(url);
    });
});

app.get('/search', (req, res) => {
    fs.readFile('client_secret.json', function processClientSecret(err, content) {
        if (err) {
            console.log('Error load client: ' + err);
            return;
        }
        authorize(JSON.parse(content.toString()), getVideo, ).then(() =>{
            res.send();
        });
    });
});

    app.get('/test', function (req, res) {
        res.sendFile('C:/Users/suale/Desktop/YoutubeApi/src/frontend/index.html');
        if (req.query.code) {
            // storeToken(req.query.code)
            const code = req.query.code
            storeCode(code);
        }
    });


    // app.get('/OAuthRequest', function (req, res) {
    //     const url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
    //         'scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube&' +
    //         'access_type=offline&' + 
    //         'include_granted_scopes=true&' +
    //         // 'state=state_parameter_passthrough_value&'+
    //         'redirect_uri=http%3A%2F%2Flocalhost%3A6969%2Ftest&' +
    //         'response_type=code&' +
    //         'client_id=' + process.env.CLIENTE_ID
    //     res.redirect(url);
    // });

    app.listen(6969, function () {
        console.log('app listening on port 6969');
    })