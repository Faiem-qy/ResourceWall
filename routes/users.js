/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const { getOneUser, updateUserProfile } = require('../db/queries/users');

router.get('/', (req, res) => {
  res.render('users');
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;

  getOneUser(userId)
    .then(user => {
      const templateVars = {
        userId,
        user
      };
      console.log(user);
      res.render('users-show', templateVars);
    })
    .catch(error => {
      res.status(500).json({ error: err.message });
    });

});

router.post('/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = {
    "first_name": "Lorie",
    "last_name": "Saladine",
    "email": "lorie@mail.com",
    "password": "1",
    "profile_picture": "https://images.pexels.com/photos/2853198/pexels-photo-2853198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "handle": "leSalad",
    "bio": "ah word"
  };
  console.log(user);

  updateUserProfile(userId, user)
    .then(user => {
      console.log(user);
      res.redirect(`/users/${userId}`);
    })
    .catch(err => {
      console.log({ error: err.message });
    });

});

module.exports = router;
