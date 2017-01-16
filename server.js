// Modules 
var mongoc = require('mongodb').MongoClient;
var express = require('express');

// Routing paths
var root = require('./routes/root');
var techs = require('./routes/techs');
var ranks = require('./routes/ranks');

// Express configuration 
var app = express();

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

  // Pass the DB to our custom routers
  app.use((req, res, next) => {
    res.locals.db = db;
    next();
  });

  app.use(root);
  app.use(techs);
  app.use(ranks);  

  // Start the server
  app.listen(3000, () => {
    console.log('Connected to database. Listening on port 3000...');
  });

})
.catch(err => {
  console.log(`[!] ${err}. Check that mongod is running!`);
  process.exitCode = 1; 
});


