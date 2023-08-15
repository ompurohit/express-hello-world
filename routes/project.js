const express = require('express');

const router = express.Router();

const projectController = require('../app/http/controllers/projectController');


router.get('/', projectController.index);

router.get('/create', projectController.create);
router.post('/store', projectController.store);
router.get('/:_id', projectController.issue);



module.exports = router;