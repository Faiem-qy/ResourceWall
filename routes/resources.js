const express = require('express');
const { getMyResources } = require('../db/queries/resources');
const router = express.Router();

router.get('/', (req, res) => {
  const userId = 1;

  getMyResources(userId)
    .then(resources => {
      console.log(resources);

      const templateVars = {
        userId,
        resources
      };
      res.render('resources', templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });

});

module.exports = router;