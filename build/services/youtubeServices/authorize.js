"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var googleapis_1 = require("googleapis");
var fs = __importStar(require("fs"));
var path_1 = require("path");
var OAuth2 = googleapis_1.google.auth.OAuth2;
var scopes = ['https://www.googleapis.com/auth/youtube'];
var tokenDir = path_1.join(__dirname, 'credentials');
var tokenPath = path_1.join(tokenDir, 'youtubeToken.json');
var tokenCode = path_1.join(tokenDir, 'code.json');
function authorize(credentials, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var clientSecret, clientId, redirectUrl, oauth2Client;
        return __generator(this, function (_a) {
            clientSecret = credentials.installed.client_secret;
            clientId = credentials.installed.client_id;
            redirectUrl = credentials.installed.redirect_uris[0];
            oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
            // Check if we have previously stored a token.
            fs.readFile(tokenPath, function (err, token2) {
                if (err) {
                    console.log("entro en error authorize");
                    getNewToken(oauth2Client, callback);
                    // getNewToken(oauth2Client, callback);
                }
                else {
                    console.log("entro en authorize");
                    console.log(JSON.parse(token2.toString()));
                    oauth2Client.credentials = JSON.parse(token2.toString());
                    callback(oauth2Client);
                }
            });
            return [2 /*return*/];
        });
    });
}
exports.authorize = authorize;
function getPermission(oauth2Client) {
    var clientSecret = oauth2Client.installed.client_secret;
    var clientId = oauth2Client.installed.client_id;
    var redirectUrl = oauth2Client.installed.redirect_uris[0];
    var client = new OAuth2(clientId, clientSecret, redirectUrl);
    var authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    console.log(authUrl);
    return authUrl;
}
exports.getPermission = getPermission;
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
function getNewToken(oauth2Client, callback) {
    var codeFile = fs.readFileSync(tokenCode);
    var code = JSON.parse(codeFile.toString());
    // console.log(code);
    console.log("oauthClient: ", oauth2Client);
    oauth2Client.getToken(code, function (err, tok) {
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
exports.getNewToken = getNewToken;
function storeToken(token) {
    try {
        fs.mkdirSync(tokenDir);
    }
    catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(tokenPath, JSON.stringify(token), function (err) {
        if (err)
            throw err;
        console.log('Token stored to ' + tokenPath);
    });
}
exports.storeToken = storeToken;
function storeCode(code) {
    try {
        fs.mkdirSync(tokenDir);
    }
    catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(tokenCode, JSON.stringify(code), function (err) {
        if (err)
            throw err;
        console.log('Token stored to ' + tokenCode);
    });
}
exports.storeCode = storeCode;
