// Modules
var { MongoClient: mongoc, ObjectID } = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const R = require('ramda');
const { stringifyID } = require('./helpful');
const { open: openURL } = require('openurl');

// Routing paths
var root = require('./routes/root');

// Express configuration
var app = express();
app.use(bodyParser.json());

// Server configuration
const url = 'mongodb://localhost:27017/mykenpo';

mongoc.connect(url)
.then(db => {

  // Close the DB connection if the server is interrupted
  process.on('SIGINT', () => {
    console.log("\nbye");
    db.close();
    process.exit();
  });

  // Install routers
  const dist_dir = path.join(__dirname, 'dist');
  app.use(express.static(dist_dir));
  app.get('/', (req, res, next) => {
    res.status(200).sendFile(path.join(dist_dir, 'mock.html'));
  });

  app.route('/:collection/:id?')
  .all((req, res, next) => {
    const { collection: name, id } = req.params;
    const collection = db.collection(name);
    if (id !== undefined) {
      try {
        let query = { _id: ObjectID(id) }
        switch (req.method) {
            case 'GET':
              collection.findOne(query)
              .then(doc => { (doc !== null) ? res.status(200).json(stringifyID(doc)) : res.sendStatus(404) })
              .catch(err => res.sendStatus(500));
              break;

            case 'PUT':
              collection.findOneAndReplace(query, req.body)
              .then(result => { (result.value !== null) ? res.sendStatus(200) : res.sendStatus(404) })
              .catch(err => res.sendStatus(500));
              break;

            case 'DELETE':
              collection.findOneAndDelete(query)
              .then(result => { (result.value !== null) ? res.sendStatus(200) : res.sendStatus(404) })
              .catch(err => res.sendStatus(500));
              break;

            default:
              // Unsupported method
              res.sendStatus(404);
        }
      }
      catch (e) {
        // Invalid `id`
        res.sendStatus(404);
      }
    }
    else {
      switch (req.method) {
        case 'GET':
          collection.find().toArray()
          .then(R.map(stringifyID))
          .then(docs => res.status(200).json(docs))
          .catch(err => res.sendStatus(500))
          break;

        case 'POST':
          collection.insertOne(req.body, (err, result) => {
            (err === null) ? res.set('Location', `${result.insertedId}`).sendStatus(201) : res.sendStatus(500)
          })
          break;

        default:
          // Unsupported method
          res.sendStatus(404);
      }
    }
  })

  // Start the server and open the web browser
  app.listen(3000, () => {
    console.log('Connected to database. Listening on port 3000...');
    openURL('http://localhost:3000');
  });

})
.catch(err => {
  console.log(`[!] ${err}. Check that mongod is running!`);
  process.exitCode = 1;
});
