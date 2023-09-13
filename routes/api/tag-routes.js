const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Routes at the `/api/tags` endpoint:

// GET all tags:
router.get('/', async (req, res) => {
  const tagData = await Tag.findAll();
  return res.json(tagData);
  // Include its associated Product data (what does this mean?):
});

// GET a tag by its 'id':
router.get('/:id', async (req, res) => {
  const tagData = await Tag.findByPk(req.params.id);
  return res.json(tagData);
  // Include its associated Product data (what does this mean?):
});

// CREATE a new tag:
router.post('/', async (req, res) => {
  const tagData = await Tag.create(req.body);
  return res.json(tagData);
});

// UPDATE a tag's name by its `id` value:
router.put('/:id', async (req, res) => {
  const tagData = await Tag.update(
    {
      id: req.body.id,
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  return res.json(tagData);
});

// DELETE a tag by its `id` value:
router.delete('/:id', async (req, res) => {
  const tagData = await Tag.destroy(
    {
      where: {
        id: req.params.id,
      },
    });
  return res.json(tagData);
});

module.exports = router;

// // GET all tags using '.then()' syntax:
// router.get('/', (req, res) => {
//   Tag.findAll().then((tagData) => {
//     res.json(tagData);
//   });
//   // Include its associated Product data (what does this mean?):
// });


// // GET a tag by its 'id' using '.then()' syntax:
// router.get('/:id', (req, res) => {
//   Tag.findByPk(req.params.id).then((tagData) => {
//     res.json(tagData);
//   })
//   // Include its associated Product data (what does this mean?):
// });

// // Will this GET request work better for one particular category 'id'?
// // How is it different from the GET request directly above it?
// router.get('/:id', (req, res) => {
//   Tag.findOne(
//     {
//       where: {
//         id: req.params.id
//       },
//     }
//   ).then((tagData) => {
//     res.json(tagData);
//   });
// });


// // CREATE a new tag using '.then()' syntax:
// router.post('/', (req, res) => {
//   Tag.create(req.body)
//     .then((newTag) => {
//       res.json(newTag);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });


// // UPDATE a tag's name by its `id` value using '.then()' syntax:
// router.put('/:id', (req, res) => {
//   Tag.update(
//     {
//       id: req.body.id,
//       tag_name: req.body.tag_name,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//   .then((updatedTag) => {
//     res.json(updatedTag);
//   })
//   .catch((err) => res.json(err)) ;
// });


// // DELETE a tag by its `id` value using '.then()' syntax:
// router.delete('/:id', (req, res) => {
//   Tag.destroy({
//     where: {
//       id: req.params.id,
//     }
//   })
//     .then((deletedTag) => {
//       res.json(deletedTag);
//     })
//     .catch((err) => res.json(err));
// });
