// Modules
import { MongoClient as mongoc } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { expressify, expand } from './utils/helpful';
import * as handle from './utils/pretty';

const root = require('./root');

// DB configuration
const url = 'mongodb://localhost:27017/mykenpo';
const client = {
  connect() { return mongoc.connect(url); },
};

// Express configuration
const app = express();
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', './build/views');
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));
app.use('/', root);

app.route('/:collection')
  .get((req, res) => {
    handle.getCollection(client, expand(req))
    .then(result => expressify(res, result));
  })
  .post((req, res) => {
    handle.insertIntoCollection(client, expand(req))
    .then(result => expressify(res, result));
  });

app.route('/:collection/:id')
  .get((req, res) => {
    handle.getItem(client, expand(req))
    .then(result => expressify(res, result));
  })
  .put((req, res) => {
    handle.updateItem(client, expand(req))
    .then(result => expressify(res, result));
  })
  .delete((req, res) => {
    handle.deleteItem(client, expand(req))
    .then(result => expressify(res, result));
  });

// Start the server
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('The server is running at http://localhost:3000/');
});
