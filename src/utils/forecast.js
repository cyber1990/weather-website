const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1dbbc0fcd4a99e17915af34e7a6f024c/${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to conect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            // console.log(body.daily.data[0]);
            callback(undefined, body.daily.data[0].summary + 
                    ' It is currently ' + body.currently.temperature + 
                    ' degress out. This high today is ' + 
                    body.daily.data[0].temperatureHigh + 
                    ' with a low of ' + body.daily.data[0].temperatureLow + 
                    '. There is a ' + body.currently.precipProbability + 
                    '% chance of rain.')
        }
    });

}
module.exports = forecast;

