import { google } from 'googleapis';

export function getVideo(auth: any) {
    const serviceVideo = google.youtube('v3');
    
    serviceVideo.search.list({
        auth: auth,
        part: 'id,snippet',
        q: 'Aaron smith - Dancin'
    }, (err: any, response: any) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var result = response.data.items;
        if (result.length === 0) {
            console.log('No video found.');
        } else {
            // content a video.
            console.log(result[0]);
            //channelID
            // console.log(result[0].snippet.channelId);
        }
    });
}