"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var googleapis_1 = require("googleapis");
function getVideo(auth) {
    var serviceVideo = googleapis_1.google.youtube('v3');
    serviceVideo.search.list({
        auth: auth,
        part: 'id,snippet',
        q: 'Aaron smith - Dancin'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var result = response.data.items;
        if (result.length === 0) {
            console.log('No video found.');
        }
        else {
            // content a video.
            console.log(result[0]);
            //channelID
            // console.log(result[0].snippet.channelId);
        }
    });
}
exports.getVideo = getVideo;
