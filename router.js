const express = require('express');
const router = express.Router();
const path = require('path')


router.get('/', async (req, res) => {
  try {
    res.render('index', {})
  } catch (err) {
    logger.error('/error %O', err)
    res.statusMessage = err.message
    res.status(412).end()
  }
})


module.exports = router;
