const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=649a800407a46d85f4db9ba52233e368&query='+latitude+','+longitude+'&units=f'

    request({ url : url, json : true },(error, response) => {
        if(error){ //error object is populated only on lower level OS problems. Errors for bad inputs are returned in the response.
            callback('unable to connect to the service',undefined)
        }
        else if (response.body.error){
            callback('Unable to find the weather information. Try another location',undefined)
        }
        else{
            const {weather_descriptions, temperature:current, feelslike, visibility} = response.body.current
            callback(undefined, {
                weather : weather_descriptions[0],
                current,
                feelslike,
                visibility
            })
        }
    })
}

module.exports = forecast