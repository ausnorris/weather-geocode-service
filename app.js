const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const app = express();
const logResponseTime = require("./utils/response-time-logger");
const PORT = process.env.WEATHER_GEOCODE_LB_SERVICE_PORT || 3001
var cors = require('cors');

app.use(cors());
app.use(logResponseTime)
app.get('/api', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'please provide address'
        })

        }else{
            geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
                if (error){
                    return res.send({
                        error: error
                    })
                }else{
                    return res.send({
                        latitude,
                        longitude,
                        location
                    })
                    
                }
            })
        }

})
app.listen(PORT, () => {
    console.log('server started on port ' + PORT)
})