import { connect } from '../../../Users/alok.nath/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/mongodb';

const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose  = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
//app.use(bodyParser.json());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true} 
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDb database connection established...");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});