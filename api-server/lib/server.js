'use strict';
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app=express();


const apiRoute = require('../routes/api.js');  


const E404 = require('../middleware/404.js');
const E500 = require('../middleware/500.js');
app.use('/docs', express.static('./docs'));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1', apiRoute);  


app.use(E404);
app.use(E500);


module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(` listening from port ${PORT}`));
  },
};

