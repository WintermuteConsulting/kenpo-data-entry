var express = require('express');
var router = express.Router();

router.route('/ranks')
  .get((req, res) => {
    res.send('Get all ranks');
  })
  .post((req, res) => {
    res.send('Create a new rank');
  })

router.route('/ranks/:id')
  .get((req, res) => {
    res.send(`Get rank ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update rank ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete rank ${req.params.id}`);
  })

module.exports = router
