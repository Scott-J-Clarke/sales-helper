const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Routes at the `/api/tags` endpoint:

// GET all tags:
router.get('/', (req, res) => {
  Tag.findAll().then((tagData) => {
    res.json(tagData);
  });
  // Include its associated Product data (what does this mean?):
});

// GET a tag by its 'id':
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id).then((tagData) => {
    res.json(tagData);
  })
  // Include its associated Product data (what does this mean?):
});

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

// CREATE a new tag:
router.post('/', (req, res) => {
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

// UPDATE a tag's name by its `id` value:
router.put('/:id', (req, res) => {
  Tag.update(
    {
      id: req.body.id,
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => res.json(err)) ;
});

// DELETE a tag by its `id` value:
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
