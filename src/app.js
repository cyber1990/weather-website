const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const path = require('path'); // 
const express = require('express');
const hbs = require('hbs'); // para que podamos utilizar partials
// __filename // el valor del directory
// console.log(__dirname); // para el directory name
const app = express();

// DEFINICION DE DIRECTORIOS PARA EXPRESS ***************
const publicDirectory = path.join(__dirname,'../public'); // aqui tenemos nuestros archivos estaticos como css js imagenes etc 
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials'); // creamos nuestro path para los partials

// HANDLEBARS ENGINE AND VIEWS LOCATION *****************
app.set('view engine','hbs'); // le decimos a nuestra app que vamos a utilizar hbs como nuestro template
// express por defecto buscar el archivo view para los templates
// podemos cambiar esto utilizando app.set
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// DIRECTORIOS ESTATICOS 
// con path.join() podemos movernos a varios directorios
app.use(express.static(publicDirectory)); // utilizamos el directorio public


// req contiene informacion sobre lo que le envia el cliente
// res es la respuesta del server al cliente 
app.get('', (req,res) => {
    res.render('index', {
        title: 'weather App',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jose mendoza'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'Help me with this code',
        title: 'help',
        name: 'Jose Mendoza'
    });
});

app.get('/weather', (req,res) => {

    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        });
    }

    // hacemos la peticion de la localidad
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, {temperature, precip}) => {
            if (error) {
                return res.send({error});
            } 

            res.send({
                forecast: precip,
                location: location,
                temperature: temperature,
                address: req.query.address
            });
        });
    });
});



app.get('/products', (req,res) => {
    if (!req.query.search) { // verificamos si en la url NO hay el paramtero ...?search=...
        return res.send({ 
            error: 'you must provide a search term'
        });
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found'
    });
});

// get para paginas con el error 404
app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'page not found'
    });
});



app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});