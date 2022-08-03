import request from 'request'

const geocode = (address, callback) => {

    const url = 'http://api.positionstack.com/v1/forward?access_key=b6648a2a0e9e1a3f64897d1cecfecf09&query=' + encodeURIComponent(address)

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (!body.data) {
            callback('Enter a valid address', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude, 
                longitude: body.data[0].longitude,
                location: body.data[0].label})
            }
    })
}

export default geocode