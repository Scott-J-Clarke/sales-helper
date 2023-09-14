const router = require('express').Router();
// Not sure why 'ProductTag' model was included in this file:
const { Tag, Product, ProductTag } = require('../../models');
// Routes at the `/api/tags` endpoint:

// GET all tags:
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a tag by its 'id':
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Product }]
    });
    res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE a new tag:
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE a tag name by its `id` value:
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      {
        id: req.body.id,
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a tag by its `id` value:
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy(
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
