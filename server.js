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
