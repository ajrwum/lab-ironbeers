const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

// Display all beers
app.get('/beers', async (req, res, next) => {
  try {
    // get all beers from punkAPI
    const beers = await punkAPI.getBeers();
    // render the view
    res.render('beers', { beers });    
  } catch (error) {
    next(error);
  }
});

// Display a random beer
app.get('/random-beer', async (req, res, next) => {
  try {
    // get a random beer from punkAPI
    const oneBeerArray = await punkAPI.getRandom();
    // render the view
    res.render('random-beer', { oneBeerArray });    
  } catch (error) {
    next(error);
  }
});

// Display all information for one beer
app.get('/beers/beer-:id', async (req, res, next) => {
  try {
    // get the id from req.params
    const id = req.params.id;
    // get the beer info from punkAPI
    const oneBeerArray = await punkAPI.getBeer(id);
    // render the view
    res.render('detailed-beer.hbs', { oneBeerArray });    
  } catch (error) {
    next(error);
  }
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
