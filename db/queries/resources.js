const db = require('../connection');

const getAllResources = () => {
  return db.query(`
    SELECT
    resources.id as id,
    resources.owner_id as user_id,
    resources.title as title,
    resources.description as description,
    resources.thumbnail_img as thumbnail_img,
    resources.url as url,
    categories.category_name as category_name,
    (SELECT COUNT(comments.id) FROM comments WHERE comments.id IS NOT NULL AND resources.id = comments.resource_id) AS number_of_comments,
    (SELECT COUNT(likes.id) FROM likes WHERE likes.resource_id = resources.id) AS likes,
    (SELECT ROUND(AVG(ratings.rating)) FROM ratings WHERE ratings.resource_id = resources.id) as avg_rating
    FROM resources 
    JOIN categories ON resources.category_id = categories.id
    LEFT JOIN comments ON comments.resource_id = resources.id
    LEFT JOIN likes ON likes.resource_id = resources.id
    LEFT JOIN ratings ON ratings.resource_id = resources.id
    GROUP BY resources.id, resources.owner_id, resources.title, resources.description, resources.thumbnail_img, resources.url, categories.category_name;`)
    .then(data => {
      return data.rows;
    });
};

const getMyResources = (id) => {
  const searchString = {
    text: `
    SELECT
    resources.id as id,
    resources.owner_id as user_id,
    resources.title as title,
    resources.description as description,
    resources.thumbnail_img as thumbnail_img,
    resources.url as url,
    categories.category_name as category_name,
    (SELECT COUNT(comments.id) FROM comments WHERE comments.id IS NOT NULL AND resources.id = comments.resource_id) AS number_of_comments,
    (SELECT COUNT(likes.id) FROM likes WHERE likes.resource_id = resources.id) AS likes,
    (SELECT ROUND(AVG(ratings.rating)) FROM ratings WHERE ratings.resource_id = resources.id) as avg_rating
    FROM resources 
    JOIN categories ON resources.category_id = categories.id
    LEFT JOIN comments ON comments.resource_id = resources.id
    LEFT JOIN likes ON likes.resource_id = resources.id
    LEFT JOIN ratings ON ratings.resource_id = resources.id
    WHERE resources.owner_id = $1
    GROUP BY resources.id, resources.owner_id, resources.title, resources.description, resources.thumbnail_img, resources.url, categories.category_name`,
    values: [id]
  };
  return db.query(searchString)
    .then(data => {
      return data.rows;
    });
};

const insertNewResource = (resource) => {
  const queryString = {
    text: `
    INSERT INTO resources (owner_id, url, thumbnail_img, title, description, category_id)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *;`,
    values: [resource.owner_id, resource.url, resource.thumbnail_img, resource.title, resource.description, resource.category_id]
  };
  return db.query(queryString)
    .then(data => {
      return data.rows;
    });
};

const categoryBtnResourcesSearch = (category_name) => {
  const searchString = {
    text: `
    SELECT
    resources.owner_id,
    resources.title,
    resources.description,
    resources.thumbnail_img,
    resources.url,
    categories.category_name,
    (SELECT COUNT(comments.id) FROM comments WHERE comments.id IS NOT NULL AND resources.id = comments.resource_id) AS number_of_comments,
    (SELECT COUNT(likes.id) FROM likes WHERE likes.resource_id = resources.id) AS likes
    FROM resources 
    JOIN categories ON resources.category_id = categories.id
    LEFT JOIN comments ON comments.resource_id = resources.id
    LEFT JOIN likes ON likes.resource_id = resources.id
    WHERE categories.category_name = $1
    GROUP BY resources.id, resources.owner_id, resources.title, resources.description, resources.thumbnail_img, resources.url, categories.category_name`,
    values: [category_name]
  };
  return db.query(searchString)
    .then(data => {
      return data.rows;
    });
};

module.exports = {
  getAllResources,
  insertNewResource,
  getMyResources,
  categoryBtnResourcesSearch
};