const path = require('path') //to work with file and directory paths
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define paths for configuring express server
const public_dir = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('views', viewspath) //set a customised path to the views directory.
app.set('view engine','hbs') //setup handle bar template engine for dynamic website templating.
hbs.registerPartials(partialsPath)

app.use(express.static(public_dir)) //setup the path of the static assets directory to the server.

app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather App !!',
        name : 'Soham'
    }) //gets a view and converts it to html.
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About SOHAM',
        name : 'Soham'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        message : 'Welcome to the help page',
        title : 'Help',
        name : 'Soham'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide location to fetch weather.'
        })
    }
    geocode(req.query.address,(error, data) => {
        if(error){
            res.send({
                error
            })
        }
        else{
            const { latitude, longitude, location } = data
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    res.send({
                        error
                    })
                }
                else{
                    const { weather, current, feelslike } = forecastData
                    res.send({
                        location,
                        weather,
                        current,
                        feelslike
                    })
                }
              })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({ //return is used to prevent the res.send again.
            error : 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title : 404,
        message : 'Help article not found.'
    })
})
//Handling the url not found error.
app.get('*', (req,res) => {
    res.render('404', {
        title : 404,
        message : 'PAGE NOT FOUND'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})