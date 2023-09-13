const router = require('express').Router();
const { Category, Product } = require('../../models');

// Routes at the `/api/categories` endpoint:

// GET all categories:
router.get('/', async (req, res) => {
  const categoryData = await Category.findAll();
  return res.json(categoryData);
  // Include its associated Products (what does this mean?):
});

// GET one category by its 'id' value:
router.get('/:id', async (req, res) => {
  const categoryData = await Category.findByPk(req.params.id);
  return res.json(categoryData);
  // Include its associated Products (what does this mean?):
});

// CREATE a new category:
router.post('/', async (req, res) => {
  const categoryData = await Category.create(req.body);
  return res.json(categoryData);
});

// UPDATE a category by its 'id' value:
router.put('/:id', async (req, res) => {
  const categoryData = await Category.update(
    {
      id: req.body, id,
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  return res.json(categoryData);
});

// DELETE a category by its 'id' value:
router.delete('/:id', async (req, res) => {
  const categoryData = await Category.destroy(
    {
      where: {
        id: req.params.id,
      },
    });
  return res.json(categoryData);
});

module.exports = router;


// // GET all categories using '.then()' syntax:
// router.get('/', (req, res) => {
//   Category.findAll().then((categoryData) => {
//     res.json(categoryData);
//   });
//   // Include its associated Products (what does this mean?):
// });


// // GET category by its 'id' value using '.then()' syntax:
// router.get('/:id', (req, res) => {
//   Category.findByPk(req.params.id).then((categoryData) => {
//     res.json(categoryData);
//   });
//   // Include its associated Products (what does this mean?):
// });

// // Another type of GET request. This one still uses '.then()' syntax:
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


// // CREATE a new category using '.then()' syntax:
// router.post('/', (req, res) => {
//   Category.create(req.body)
//     .then((newCategory) => {
//       res.json(newCategory);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });


// // UPDATE a category by its `id` value using '.then()' syntax:
// router.put('/:id', (req, res) => {
//   Category.update(
//     {
//       id: req.body.id,
//       category_name: req.body.category_name,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//   .then((updatedCategory) => {
//     res.json(updatedCategory);
//   })
//   .catch((err) => res.json(err));
// });


// // Delete a category by its `id` value using '.then()' syntax:
// router.delete('/:id', (req, res) => {
//   Category.destroy({
//     where: {
//       id: req.params.id,
//     }
//   })
//     .then((deletedCategory) => {
//       res.json(deletedCategory);
//     })
//     .catch((err) => res.json(err));
// });
