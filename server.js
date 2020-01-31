if (process.env.NODE_ENV !== 'production') {    //loading environment variable
  require('dotenv').config()    //load everything in dotenv file
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY
const axios = require('axios')
const express = require('express')
const app = express()

app.use(express.json()) //sending json to our server
app.use(express.static('public'))

app.post('/weather', (req, res) => {
   const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`
       //convert units based on location we query
   
  axios({
    url: url,
    responseType: 'json'
  }).then(data => res.json(data.data.currently))    //just get current data, not everything  
    //console.log(req.body)
})


//daily
app.post('/daily', (req, res) => {
   const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`
  axios({
    url: url,
    responseType: 'json'
  }).then(data => res.json(data.data.daily))
})


app.listen(3000, () => {
  console.log('Server Started')
}) 