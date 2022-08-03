// Necessary imports for the app
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import hbs from 'hbs'
import geocode from './utils/geocode.mjs'
import forecast from './utils/forecast.mjs'

//Setting up __dirname in ES module 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Setting up path variables
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

const app = express()

// Setting up template engine, it's directory and partials
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

// Setting up static directory
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Your Weather',
        name: 'Ram'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ram'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        content: 'Please choose a help topic',
        name: 'Ram'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Address should be provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })            
            } 
            res.send({
                location,
                forecast: forecastData
            })   
        })
    })    
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errMsg: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errMsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server up and running at port 3000')
})