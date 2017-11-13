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
  superagent(url)
    .set(`Authorization,`, `token ${process.env.REDLIST_TOKEN}`)
    .then(
      countries => res.send(countries.text),
      err => res.send(err)
    )
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
