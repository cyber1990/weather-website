const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1dbbc0fcd4a99e17915af34e7a6f024c/${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to conect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                precip: body.currently.precipProbability
            });
        }
    });

}
module.exports = forecast;

