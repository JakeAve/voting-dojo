const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Poll = require('../models/Poll');
const { Option } = require('../models/Option');

// get all polls
router.get('/', async (req, res) => {
  try {
    const polls = await Poll.find({});
    res.send(polls);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// get one poll
router.get('/:pollId', async (req, res) => {
  try {
    const { pollId } = req.params;
    const poll = await Poll.findOne({ _id: pollId });
    res.send(poll);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// create new poll
router.post(
  '/',
  [
    body('question', 'Question is required')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .isLength({ min: 10 }),
    body('options', 'Must be between 2 and 20 options').isLength({
      min: 2,
      max: 20,
    }),
    body('options.*', 'Option is required').not().isEmpty().trim().escape(),
  ],
  async (req, res) => {
    const { question, options } = req.body;
    const fourHundo = (custErrors) =>
      res.status(400).json({
        errors: errors.array().length ? errors.array() : [...custErrors],
      });

    // finish validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) return fourHundo();
    if (options.length < 2)
      return fourHundo([
        {
          msg: 'Number of options must be greater than two',
          value: JSON.stringify(options),
          msg: 'Question is required',
          param: 'options',
          location: 'body',
        },
      ]);

    // Save to database
    try {
      const existingPoll = await Poll.findOne({ question }).exec();
      if (existingPoll)
        return fourHundo([{ msg: 'Poll already exists', value: question }]);

      const setVotesTo0 = options.map(
        (option) => new Option({ option, votes: 0 }),
      );
      const poll = new Poll({ question, options: setVotesTo0 });
      await poll.save();

      res.send(poll);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
