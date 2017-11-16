'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const CLIENT_URL = process.env.CLIENT_URL;
const superagent = require('superagent');
const jquery = require('jquery');

app.use(express.static('./public'));
app.use(cors());


app.get('/api/v1/countries/:iso', (req, res) => {
  const url = `http://apiv3.iucnredlist.org/api/v3/country/getspecies/${req.params.iso}?token=${process.env.REDLIST_TOKEN}`
  superagent.get(url)
    .then(
      speciesByCountry => res.send(speciesByCountry.text),
      err => res.send(err)
    )
});

app.get('/api/v1/commonName/:name', (req, res) => {
  const url = `http://apiv3.iucnredlist.org/api/v3/species/common_names/${req.params.name}?token=${process.env.REDLIST_TOKEN}`
  superagent.get(url)
    .then(
      speciesByCountry => res.send(speciesByCountry.text),
      err => res.send(err)
    )
});

app.get('/api/v1/narrative/:name', (req, res) => {
  const url = `http://apiv3.iucnredlist.org/api/v3/species/narrative/${req.params.name}?token=${process.env.REDLIST_TOKEN}`
  superagent.get(url)
    .then(
      speciesByCountry => res.send(speciesByCountry.text),
      err => res.send(err)
    )
});

////// IMAGE STUFF /////////
app.get('/api/v1/images/:name', (req, res) => {
  console.log('******');
  const url = `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${req.params.name}`
  superagent.get(url)
    .set('Ocp-Apim-Subscription-Key', 'e23593948467494b89ba367541f66bbc')
    .then(
      speciesByCountry => res.send(speciesByCountry.text),
      err => res.send(err)
    )
});
//// END IMAGE STUFF ///////



// app.get('/api/v1/endangerment/:code', (req, res) => {
//   const url = `http://apiv3.iucnredlist.org/api/v3/species/category/CR?token=${process.env.REDLIST_TOKEN}`
//   superagent.get(url)
//     .then(
//       speciesByCountry => res.send(speciesByCountry.text),
//       err => res.send(err)
//     )
// });


// .then(data => console.log(data))

// app.get('/api/v1/map/', (req, res) => {
//   const url = `https://maps.googleapis.com/maps/api/js?key=${GMAPS_TOKEN}&callback=myMap`
//   superagent.get(url)
//     .then(
//       map => res.send(map.text),
//       err => res.send(err)
//     )
// });

// app.get('/api/v1/photo/:name', (req, res) => {
//   const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.CUSTOM_SEARCH}&cx=017576662512468239146:omuauf_lfve&q=${req.params.name}`
//   superagent.get(url)
//     .then(
//       speciesByCountry => res.send(speciesByCountry.text),
//       err => res.send(err)
//     )
// });


app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
