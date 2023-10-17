/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getOneUser, updateUserProfile } = require('../db/queries/users');
const { getMyResources } = require('../db/queries/resources');

router.get('/:id/my-resources', (req, res) => {
  const userId = req.params.id;

  getMyResources(userId)
    .then(resources => {
      // console.log(resources);

      const templateVars = {
        userId,
        resources
      };
      res.render('my-resources', templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });

});

router.get('/:id/edit', (req, res) => {
  const userId = req.params.id;
  getOneUser(userId)
    .then(user => {
      const templateVars = {
        userId,
        user
      };
      // console.log(user);
      res.render('users-edit', templateVars);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;

  getOneUser(userId)
    .then(user => {
      const templateVars = {
        userId,
        user
      };
      // console.log(user);
      res.render('users-show', templateVars);
    })
    .catch(error => {
      res.status(500).json({ error: err.message });
    });

});

router.post('/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = req.body;
  // console.log(req.body);

  updateUserProfile(userId, user)
    .then(user => {
      // console.log(user);
      res.redirect(`/users/${userId}`);
    })
    .catch(err => {
      console.log({ error: err.message });
    });

});

module.exports = router;
