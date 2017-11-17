'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const CLIENT_URL = process.env.CLIENT_URL;
const superagent = require('superagent');

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

app.get('/api/v1/category/:category', (req, res) => {
  const url = `http://apiv3.iucnredlist.org/api/v3/species/category/${req.params.category}?token=${process.env.REDLIST_TOKEN}`
  superagent.get(url)
    .then(
      speciesByCategory => res.send(speciesByCategory.text),
      err => res.send(err)
    )
});

app.get('/api/v1/images/:name', (req, res) => {
  const url = `https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=+${req.params.name}`
  superagent.get(url)
    .set('Ocp-Apim-Subscription-Key', 'e23593948467494b89ba367541f66bbc')
    .then(
      imageBySpecies => res.send(imageBySpecies.text),
      err => res.send(err)
    )
});


app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
