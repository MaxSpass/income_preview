const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const RoutesArray = require('./routes/index');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', ()=>{
   console.log('Mongo database connected');
});

RoutesArray.forEach(({root,routes})=>{
    app.use(root, routes);
});

app.listen(PORT, ()=>{
   console.log(`Server is running on port: ${PORT}`);
});

