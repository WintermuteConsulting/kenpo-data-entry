// Modules
import { MongoClient as mongoc, ObjectID } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import R from 'ramda';
import stringifyID from './stringifyID';

const root = require('./root');

// Express configuration
const app = express();
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', './build/views');

// Server configuration
const url = 'mongodb://localhost:27017/mykenpo';

mongoc.connect(url)
.then((db) => {
  // Close the DB connection if the server is interrupted
  process.on('SIGINT', () => {
    // eslint-disable-next-line no-console
    console.log('\nbye');
    db.close();
    process.exit();
  });

  // Install routers
  const publicDir = path.join(__dirname, 'public');
  app.use(express.static(publicDir));
  app.use('/', root);

  app.route('/:collection/:id?')
  .all((req, res) => {
    const { collection: name, id } = req.params;
    const collection = db.collection(name);
    if (id !== undefined) {
      try {
        const query = { _id: ObjectID(id) };
        switch (req.method) {
          case 'GET':
            collection.findOne(query)
              .then((doc) => {
                if (doc !== null) {
                  res.status(200).json(stringifyID(doc));
                } else {
                  res.sendStatus(404);
                }
              })
              .catch(() => res.sendStatus(500));
            break;

          case 'PUT':
            collection.findOneAndReplace(query, req.body)
              .then((result) => {
                if (result.value !== null) {
                  res.sendStatus(200);
                } else {
                  res.sendStatus(404);
                }
              })
              .catch(() => res.sendStatus(500));
            break;

          case 'DELETE':
            collection.findOneAndDelete(query)
              .then((result) => {
                if (result.value !== null) {
                  res.sendStatus(200);
                } else {
                  res.sendStatus(404);
                }
              })
              .catch(() => res.sendStatus(500));
            break;

          default:
              // Unsupported method
            res.sendStatus(404);
        }
      } catch (e) {
        // Invalid `id`
        res.sendStatus(404);
      }
    } else {
      switch (req.method) {
        case 'GET':
          collection.find().toArray()
          .then(R.map(stringifyID))
          .then(docs => res.status(200).json(docs))
          .catch(() => res.sendStatus(500));
          break;

        case 'POST':
          collection.insertOne(req.body, (err, result) => {
            if (err === null) {
              res.set('Location', `${result.insertedId}`).sendStatus(201);
            } else {
              res.sendStatus(500);
            }
          });
          break;

        default:
          // Unsupported method
          res.sendStatus(404);
      }
    }
  });

  // Start the server
  app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('The server is running at http://localhost:3000/');
  });
})
.catch((err) => {
  // eslint-disable-next-line no-console
  console.log(`[!] ${err}. Check that mongod is running!`);
  process.exitCode = 1;
});
