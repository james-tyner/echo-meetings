const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/meeting', require('./meeting'));
router.use('/task', require('./task'));
router.use('/team', require('./team'));
router.use('/user', require('./user'));

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    let message = '';
    for (const single_error in err.errors) {
      message += `${err.errors[single_error].message} `;
    }
    return res.status(422).json({
      errors: {
        message: Object.keys(err.errors)
          .map(key => err.errors[key].message)
          .join(' ')
      },
    });
  }

  return next(err);
});

module.exports = router;
