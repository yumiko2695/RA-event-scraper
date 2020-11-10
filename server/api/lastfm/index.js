const router = require('express').Router()
const script = require('./script.js')

module.exports = router


router.get('/:profile', async (req, res, next) => {
  try {
    const profile = await req.params.profile;
    let result = await script.search(profile);
    res.send(result);
    next()
  } catch(e) {
    console.log(e)
    next(e);
  }
})

