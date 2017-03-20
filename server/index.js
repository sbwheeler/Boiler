const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const morgan = require('morgan');

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).end();
});

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
