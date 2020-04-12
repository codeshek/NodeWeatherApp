const request = require('request');

const optional = 'units=si&lang=en';

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/433e2ac3741d368e81452c666766b6b1/' + latitude + ',' + longitude + '?' + optional;

    request({ url, json: true }, (error, { body } = response) => {
        if (error) {
            callback('Unable to connect to weather service...');
        } else if (body.error) {
            callback('Unable to find location!');
        } else {
            const data = body.currently;
            const dailyData = body.daily.data[0].summary;
            callback(undefined, dailyData + 'It is currently ' + data.temperature + ' degrees out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + data.precipProbability + '% chance of rain.');
        }
    })
}

module.exports = forecast;
