"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var googleapis_1 = require("googleapis");
function getChannel(auth) {
    var service = googleapis_1.google.youtube('v3');
    service.channels.list({
        auth: auth,
        part: 'snippet,contentDetails,statistics',
        forUsername: 'GoogleDevelopers'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var channels = response.data.items;
        if (channels.length == 0) {
            console.log('No channel found.');
        }
        else {
            console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                'it has %s views.', channels[0].id, channels[0].snippet.title, channels[0].statistics.viewCount);
        }
    });
}
exports.getChannel = getChannel;
