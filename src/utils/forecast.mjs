import request from 'request'

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=058295d74083327b0a922aff4a38e7c2&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        } else if (body.error)  {
            callback(body.error.message, undefined)
        } else {
            const currentTemp = body.current.temperature
            const feelsLike = body.current.feelslike
            callback(undefined, body.current.weather_descriptions[0] + `. It is currently ${currentTemp} degrees out. It feels like ${feelsLike} degrees out.`)
            }
    })
}

export default forecast