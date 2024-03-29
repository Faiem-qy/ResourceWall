const express = require('express');
const { getAllResources, getResourceDetails, insertNewResource, searchBarResources, updateResource, insertRating, addComment, increaseLikes, decreaseLikes } = require('../db/queries/resources');
const router = express.Router();

//resources/new - Show New resource Page
router.get('/new', (req, res) => {
  const userId = req.session.user_id;

  const templateVars = {
    userId
  };

  res.render("resource-new", templateVars);

});

//resources/search - Search bar
router.get('/search', (req, res) => {
  const query = req.query.q;
  const userId = req.session.user_id;

  searchBarResources(query)
    .then(queryResult => {

      const templateVars = {
        queryResult,
        userId
      };
      res.render('resources-search', templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// resources/:id/edit - Resources edit
router.get('/:id/edit', (req, res) => {
  const resourceId = req.params.id;
  const userId = req.session.user_id;

  getResourceDetails(resourceId, userId)
    .then(resource => {
console.log(resource[0]);
      const templateVars = {
        resourceId,
        resource: resource[0],
        userId
      };
      res.render("resource-edit", templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });

});

//resources/:id - Show resource with that :id
router.get('/:id', (req, res) => {
  const resourceId = req.params.id;
  const userId = req.session.user_id;

  getResourceDetails(resourceId, userId)
    .then(resource => {
      console.log(resource)
      const templateVars = {
        resource,
        userId,
        resourceId
      };
      res.render("resource-show", templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });

});

//resources/ - Show All Resources
router.get('/', (req, res) => {
  const userId = req.session.user_id;

  getAllResources(userId)
    .then(resources => {

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

// ----POST-----

// POST - Unlike
router.post('/:id/unlike', (req, res) => {
  const userId = req.session.user_id;
  const resourceId = req.params.id;

  decreaseLikes(userId, resourceId)
    .then(unlike => {
      console.log("UNLIKKE*****", unlike);
      res.redirect(`/users/${userId}/my-resources`);
    })
    .catch(err => {
      console.log({ error: err.message });
    });
});

// POST - Like
router.post('/:id/unlike', (req, res) => {
  const userId = req.session.user_id;
  const resourceId = req.params.id;

  decreaseLikes(userId, resourceId)
    .then(unlike => {
      console.log("UNLIKKE*****", unlike);
      res.redirect(`/users/${userId}/my-resources`);
    })
    .catch(err => {
      console.log({ error: err.message });
    });
});

router.post('/:id/like', (req, res) => {
  const userId = req.session.user_id;
  const resourceId = req.params.id;

  increaseLikes(userId, resourceId)
    .then(like => {
      console.log("LIKKE*****", like);
      res.redirect(`/users/${userId}/my-resources`);
    })
    .catch(err => {
      console.log({ error: err.message });
    });
});

// Post to /resources/:id/comment
router.post('/:id/comment', (req, res) => {
  const resourceId = req.params.id;
  const commentText = req.body.comment;
  const userId = req.session.user_id;
  console.log(commentText);

  addComment(userId, commentText, resourceId)
    .then(resource => {
      res.redirect(`/resources/${resourceId}`);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

//resources/:id/rating - Edit rating
router.post('/:id/rating', (req, res) => {

  const userId = req.session.user_id;
  const resourceId = req.params.id;
  const rating = req.body.rating;

  insertRating(userId, resourceId, rating)
    .then(rating => {
      res.redirect(`/resources/${resourceId}`);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Post to /resources/:id - Edit Resource
router.post('/:id', (req, res) => {
  const resourceId = req.params.id;
  const resourceToUpdate = req.body;
  const userId = req.session.user_id;

  updateResource(resourceId, resourceToUpdate)
    .then(resource => {
      res.redirect(`/resources/${resourceId}`);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Post to /resources - Add New Resource
router.post('/', (req, res) => {
  const resource = req.body;
  const userId = req.session.user_id;

  insertNewResource(resource)
    .then(resource => {
      res.redirect(`/users/${userId}/my-resources`);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


module.exports = router; 