const express = require('express');
const { getMyResources, getAllResources } = require('../db/queries/resources');
const router = express.Router();

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

// getMyResources(userId)
// .then(resources => {
//   console.log(resources);

//   const templateVars = {
//     userId,
//     resources
//   };
//   res.render('resources', templateVars);
// })
// .catch(err => {
//   res.status(500).json({ error: err.message });
// });

// });

module.exports = router;
