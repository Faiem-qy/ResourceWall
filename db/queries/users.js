const db = require('../connection');

const getAllUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getOneUser = (id) => {
  const queryString = {
    text: `SELECT * FROM users WHERE id = $1`,
    values: [id]
  };
  return db.query(queryString)
    .then(data => {
      return data.rows[0];
    });
};



module.exports = { getAllUsers, getOneUser};
