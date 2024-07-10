const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const filmRoutes = require('./routes/film');

mongoose.connect('mongodb+srv://GazetteComputingCo:gcc2024c229@cluster0.i9vcrk3.mongodb.net/MovieRecs');

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Mongo DB'));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/films', filmRoutes );


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})