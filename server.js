'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const superagent = require('superagent');

app.use(express.static('./public'));
app.use(cors());


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
