"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/test', function (req, res) {
    res.send('Hello word');
});
app.get('/OAuthRequest', function (req, res) {
    var url = 'https://accounts.google.com/o/oauth2/v2/auth?' +
        'scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube&' +
        'access_type=offline&' +
        'include_granted_scopes=true&' +
        // 'state=state_parameter_passthrough_value&'+
        'redirect_uri=http%3A%2F%2Flocalhost%2Foauth2callback&' +
        'response_type=code&' +
        'client_id=428234207296-5aft3qm0bpe6vk0b6djq2gvh7atmr12p.apps.googleusercontent.com';
    res.redirect('https://www.google.es');
});
app.listen(6969, function () {
    console.log('app listening on port 6969');
});
