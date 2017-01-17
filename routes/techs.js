const ObjectID = require('mongodb').ObjectID;
const router = require('express').Router();

// Routes for getting all techniques and creating new ones
router.route('/techniques')
  .get((req, res) => {
    const {techs} = res.locals.collections;

    techs.find()
    .toArray()
    .then(ary => { return ary.map(doc => { doc._id = doc._id.toHexString(); return doc })})
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.sendStatus(500);
    });    
  })
  .post((req, res) => {
    const {techs} = res.locals.collections;
    
    // Breaking with Promise usage here - had problems with insertOne calling BOTH .then and .catch, which is a violation of the Promise spec 
    // The standard callback style works as expected
    techs.insertOne(req.body, (err, r) => {
      if (err === null) {
        res.set('Location', `/${r.insertedId}`).sendStatus(201);
      } else {
        res.sendStatus(500);
      }
    });
  })

// Routes for getting, updating, and deleting specific techniques
router.route('/techniques/:id')
  .get((req, res) => {
    const {techs} = res.locals.collections;
    const {id} = req.params;

    try {
      let oid = ObjectID(id);
      techs.findOne({ _id: oid })
      .then(doc => {
        if (doc !== null) {
          doc._id = doc._id.toHexString();
          res.status(200).json(doc)
        } else {
          res.sendStatus(404);
        }
      })
      .catch(err => { 
        res.sendStatus(500);
      })
    } 
    catch (e) {
      // `id` was not a valid ObjectID
      res.sendStatus(404);
    }
  })
  .put((req, res) => {
    const {techs} = res.locals.collections;
    const {id} = req.params;
 
    try {
      let oid = ObjectID(id);
      techs.findOneAndReplace({ _id: oid }, req.body)
      .then(doc => {
        if (doc !== null) {
          res.sendStatus(200);
        } else {
          // No matching document
          res.sendStatus(404);
        }
      })
      .catch(err => { 
        // Something unexpected
        res.sendStatus(500);
      })
    } 
    catch (e) {
      // `id` was not a valid ObjectID
      res.sendStatus(404);
    } 
  })
  .delete((req, res) => {
    const {techs} = res.locals.collections;
    const {id} = req.params; 

    try {
      let oid = ObjectID(id);
      techs.findOneAndDelete({ _id: oid })
      .then(r => {
        if (r.value !== null) {
          res.sendStatus(200);
        } else {
          // No such document
          res.sendStatus(404);
        }
      })
      .catch(err => { 
        res.sendStatus(500);
      })
    } 
    catch (e) {
      // `id` was not a valid ObjectID
      res.sendStatus(404);
    } 
  })

module.exports = router
