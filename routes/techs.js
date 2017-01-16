const mongo = require('mongodb');
const express = require('express');
const router = express.Router();

router.route('/techniques')
  .get((req, res) => {
    res.send('Get all techniques');
  })
  .post((req, res) => {
    res.send('Create a new technique');
  })

router.route('/techniques/:id')
  .get((req, res) => {
    res.send(`Get technique ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update technique ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete technique ${req.params.id}`);
  })

module.exports = router
