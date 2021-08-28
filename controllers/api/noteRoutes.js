const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

//router.post('/', withAuth, async (req, res) => {
router.post('/', async (req, res) => {
        try {
    const newNote = await Note.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newNote);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const noteData = await Note.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!noteData) {
      res.status(404).json({ message: 'No note found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;