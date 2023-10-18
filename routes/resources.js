const express = require('express');
const { getAllResources, getResourceDetails, insertNewResource, searchBarResources } = require('../db/queries/resources');
const router = express.Router();

//resources/new - Show New resource Page
router.get('/new', (req, res) => {
  const userId = 1;

  const templateVars = {
    userId
  };

  res.render("resource-new", templateVars);

});

router.get('/search', (req, res) => {
  const query = req.query.q;

  searchBarResources(query)
  .then(queryResult => {
    console.log(queryResult);
    const userId = 1;// to edit later

    const templateVars = {
      queryResult,
      userId
    }
    res.render('resources-search', templateVars)
  })
  .catch(err => {
    res.status(500).json({error: err.message})
  })
});

//resources/:id - Show resource with that :id
router.get('/:id', (req, res) => {
  const id = req.params.id;

  getResourceDetails(id)
    .then(resource => {
      // console.log(resource[0]);

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

//resources/ - Show All Resources
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

// Post to /resources
router.post('/', (req, res) => {
  const resource = req.body;

  insertNewResource(resource)
    .then(resource => {
      // console.log(resource);
      const userId = resource[0].owner_id;

      res.redirect(`/users/${userId}/my-resources`);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


module.exports = router;
