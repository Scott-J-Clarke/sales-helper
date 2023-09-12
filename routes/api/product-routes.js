const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Routes at the `/api/products` endpoint:

// Get all products:
router.get('/', (req, res) => {
  Product.findAll().then((productData) => {
    res.json(productData);
  });
  // Include its associated Category and Tag data (what does this mean?):
});

// Get one product:
router.get('/:id', (req, res) => {
  Product.findByPk(req.params.id).then((productData) => {
    res.json(productData);
  });
  // Include its associated Category and Tag data (what does this mean?):
});

// // Will this GET request work better for one particular product 'id'?
// // How is it different from the GET request directly above it?
// router.get('/:id', (req, res) => {
//   Product.findOne(
//     {
//       where: {
//         id: req.params.id
//       },
//     }
//   ).then((productData) => {
//     res.json(productData);
//   });
// });

// Create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // If there's product tags, create pairings to bulk create in the ProductTag model (what does this mean?):
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // If no product tags, just respond (what does this mean?):
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Update product (does anything need to be changed here?):
router.put('/:id', (req, res) => {
  // Update product data (does anything need to be changed here?):
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // Create filtered list of new tag_ids (does anything need to be changed here?):
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // Figure out which ones to remove (what does this mean?):
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // Run both actions (what does this mean?):
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err); (does anything need to be changed here?):
      res.status(400).json(err);
    });
});

// Delete one product by its `id` value:
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletedProduct) => {
    res.json(deletedProduct);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
