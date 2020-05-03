import { google } from 'googleapis';
import { CredentialsClient } from '../../interfaces/credentials';
import { Credentials } from 'google-auth-library'
import * as readline from 'readline';
import * as fs from 'fs';
import { join } from 'path';
const OAuth2 = google.auth.OAuth2;

const scopes = ['https://www.googleapis.com/auth/youtube'];
const tokenDir = join(__dirname, 'credentials');
const tokenPath = join(tokenDir, 'youtubeToken.json');
const tokenCode = join(tokenDir, 'code.json');

export async function authorize(credentials: CredentialsClient, callback: any) {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(tokenPath, (err, token2) => {
        if (err) {
            console.log("entro en error authorize");
            getNewToken(oauth2Client, callback);
        }
        else {
            console.log("entro en authorize");
            console.log(JSON.parse(token2.toString()));
            oauth2Client.credentials = JSON.parse(token2.toString());
            callback(oauth2Client);
        }
    });
}

export function getPermission(oauth2Client: any){
    const clientSecret = oauth2Client.installed.client_secret;
    const clientId = oauth2Client.installed.client_id;
    const redirectUrl = oauth2Client.installed.redirect_uris[0];
    const client = new OAuth2(clientId, clientSecret, redirectUrl);
        var authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    console.log(authUrl);
    
    return authUrl;
}

// export function getNewToken(oauth2Client: any, callback: any) {
//     var authUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: scopes
//     });
//     console.log('Authorize this app by visiting this url: ', authUrl);
//     var rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//     rl.question('Enter the code from that page here: ', function (code) {
//         rl.close();
//         console.log("code: " + code);

//         oauth2Client.getToken(code, function (err: any, token: any) {
//             if (err) {
//                 console.log('Error while trying to retrieve access token', err);
//                 return;
//             }
//             console.log("token: " + JSON.stringify(token));

//             oauth2Client.credentials = token;
//             storeToken(token);
//             callback(oauth2Client);
//         });
//     });
// }


export function getNewToken(oauth2Client: any, callback: any): any {
    const codeFile = fs.readFileSync(tokenCode);
    const code = JSON.parse(codeFile.toString());
    // console.log(code);
    console.log("oauthClient: " , oauth2Client);

    oauth2Client.getToken(code, (err: any, tok: any) => {
        console.log("code en getNewToken: " + code);
        if (err) {
            console.log('Error while trying to retrieve access token', err);
            return;
        }
        console.log(JSON.stringify(tok));
        oauth2Client.credentials = tok;
        storeToken(tok);
        callback(oauth2Client);
    });
}

export function storeToken(token: any) {
    try {
        fs.mkdirSync(tokenDir);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
        if (err) throw err;
        console.log('Token stored to ' + tokenPath);
    });
}

export function storeCode(code: any) {
    try {
        fs.mkdirSync(tokenDir);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(tokenCode, JSON.stringify(code), (err) => {
        if (err) throw err;
        console.log('Token stored to ' + tokenCode);
    });
}