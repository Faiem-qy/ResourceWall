const express = require('express');
const { getAllResources, getResourceDetails } = require('../db/queries/resources');
const router = express.Router();


router.get('/new', (req, res) => {
  res.send('<p>👷‍♀️👷Work in progress 🚧👷‍♂️👷‍♂️.<br>This will be the new resource page</p>');
});

router.get('/:id', (req, res) => {
  const id = 1;

  getResourceDetails(id)
    .then(resource => {
      console.log(resource[0]);

      const templateVars = {
        id,
        resource: resource[0],
        userId: resource.user_id
      };
      res.render("resource-show", templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });

});

router.get('/', (req, res) => {
  const userId = 1;

  getAllResources(userId)
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
