const router = require('express').Router();
const { Category, Product } = require('../../models');

// Routes at the `/api/categories` endpoint:

// Get all categories:
router.get('/', (req, res) => {
  Category.findAll().then((categoryData) => {
    res.json(categoryData);
  });
  // Include its associated Products (what does this mean?):
});

// Find one category by its `id` value:
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id).then((categoryData) => {
    res.json(categoryData);
  });
  // Include its associated Products (what does this mean?):
});

// // Will this GET request work better for one particular category 'id'?
// // How is it different from the GET request directly above it?
// router.get('/:id', (req, res) => {
//   Category.findOne(
//     {
//       where: {
//         id: req.params.id
//       },
//     }
//   ).then((categoryData) => {
//     res.json(categoryData);
//   });
// });

// Create a new category:
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Update a category by its `id` value:
router.put('/:id', (req, res) => {
  Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => res.json(err));
});

// Delete a category by its `id` value:
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
