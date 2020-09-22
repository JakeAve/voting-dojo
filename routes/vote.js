const express = require('express');
const router = express.Router();

const Poll = require('../models/Poll');

// vote on poll
router.post('/:pollId/:optionId', async (req, res) => {
  try {
    const { pollId, optionId } = req.params;
    const poll = await Poll.findOne({ _id: pollId });
    const option = poll.options.find(({ _id }) => _id.toString() === optionId);
    option.votes++;

    await poll.save();
    res.send(poll);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/', (req, res) => res.send({ test: 'test' }));

module.exports = router;
