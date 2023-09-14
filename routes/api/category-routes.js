const router = require('express').Router();
const { Category, Product } = require('../../models');
// Routes at the `/api/categories` endpoint:

// GET all categories:
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a category by its 'id' value:
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Product }]
    });
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE a new category:
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE a category by its 'id' value:
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        id: req.body.id,
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        },
      }
    );
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a category by its 'id' value:
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy(
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
