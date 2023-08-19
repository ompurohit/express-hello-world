var express = require('express');
var router = express.Router();


// controllers 
const projectController = require('../app/http/controllers/projectController');
const pageNotFoundController = require('../app/http/controllers/pageNotFoundController');
// const labelController = require('../app/http/controllers/labelController');

router.get('/', projectController.index);
router.use('/project',require('./project'));
router.use('/issues',require('./issue'));
// router.get('/labels/:name', labelController.getLabelsData);


// always keep it in the last 
router.get("*", pageNotFoundController.index);

// router.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.error("error found: ",err.message);
  res.status(err.status || 500);
  res.render('500',{layout: '500'});
});

module.exports = router;
