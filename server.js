// Force dotenv to load explicitly from your root folder
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: __dirname + '/.env' });
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

// Added basic connection error handling wrapper
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to Mongoose Atlas'))
    .catch(err => {
        console.error('Mongoose connection failed! Verify your .env file exists in D:\\MyBookSite\\ and contains DATABASE_URL.');
        console.error(err);
    });

const db = mongoose.connection;
db.on('error', error => console.error(error));

app.use('/', indexRouter);
app.use('/authors', authorRouter); // <-- Fixed to use authorRouter instead of indexRouter


const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});