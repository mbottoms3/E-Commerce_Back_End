const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// GET all tags
router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({ 
      // be sure to include its associated Product data
      include: [{ model: Product, as: 'product_tags' }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  
});

// GET a single tag
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product, as: 'product_tags' }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE a new tag
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a tag by id
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update({
      tag_name: req.body.tag_name,
    },
    {
      where: { id: req.params.id },
    }
    );
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json({ message: 'Tag updated' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a tag by id
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json({ message: 'Tag Deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
