const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic29oYW1qb3NoaTkyIiwiYSI6ImNrYmRsdTFhbDBkNHIycXFldjMwM2tjdmcifQ.njcrADq0BsmMj5YQkUll-Q&limit=1'
    
    request({ url : url, json : true},(error, response) => {
        if(error){
            callback('Unable to connect to the location services',undefined)
        }
        else if (response.body.features.length === 0){
            callback('Unable to find the location. Try another location')
        }
        else{
            const {center, place_name:location} = response.body.features[0]
            
            callback(undefined, {
                latitude : center[1],
                longitude : center[0],
                location
            })
        }
    })
}

module.exports = geocode