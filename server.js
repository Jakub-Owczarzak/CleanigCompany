const express = require('express');
const mongoose = require('mongoose');
const config = require('./server/config/config');
const HttpError = require('./model/error');
const path = require('path');

const fs = require('fs'); // bilioteka file system

const placeRouter = require('./server/routes/place-routes');
const authRouter = require('./server/routes/auth-routes');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 8080;

mongoose.connect(config.hostDB);
mongoose.connection.on('connected', () => {
  console.log('PLACES_APP database  connected');
});

app.use(express.json()); // Zastępuje bodyPoarser

//statyczne serwowawnie pplików z folderu
// musimy zrobićendpointa z adresem naszego folderu  i użyć bibliteki path
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
//mproject_backend\server\uploads\images\cbcebe0f-be81-4e4b-a90f-1b3f1e5eccbb.jpeg

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin , X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/places', placeRouter);
app.use('/auth', authRouter);
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

// Obsługa błędów
app.use((error, req, res, next) => {
  if (req.file) {
    // w obsłudze błędów sprawdzamy czy zapytanie posiada jakieś plik jeśli tak to kasujemy zdjęcie
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  console.log(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unkowm error occurred!' });
  console.log(error);
});

app.listen(port, () => console.log('server up and running on port 8080'));
