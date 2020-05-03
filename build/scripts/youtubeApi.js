"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import { google } from 'googleapis';
var search_1 = require("../services/youtubeServices/search");
var authorize_1 = require("../services/youtubeServices/authorize");
var fs = __importStar(require("fs"));
var dotenv_1 = __importDefault(require("dotenv"));
var app = express_1.default();
dotenv_1.default.config();
app.get('/permission', function (req, res) {
    fs.readFile('client_secret.json', function processClientSecret(err, content) {
        if (err) {
            console.log('Error load client: ' + err);
            return;
        }
        console.log("-----------------------entro en permission------------------------");
        var url = authorize_1.getPermission(JSON.parse(content.toString()));
        res.redirect(url);
    });
});
app.get('/search', function (req, res) {
    fs.readFile('client_secret.json', function processClientSecret(err, content) {
        if (err) {
            console.log('Error load client: ' + err);
            return;
        }
        authorize_1.authorize(JSON.parse(content.toString()), search_1.getVideo).then(function () {
            res.send();
        });
    });
});
app.get('/test', function (req, res) {
    res.sendFile('C:/Users/suale/Desktop/YoutubeApi/src/frontend/index.html');
    if (req.query.code) {
        // storeToken(req.query.code)
        var code = req.query.code;
        authorize_1.storeCode(code);
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
});
