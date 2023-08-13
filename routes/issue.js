const express = require('express');

const router = express.Router();

const issueController = require('../app/Http/controllers/issueController');

router.get('/', issueController.index);
router.post('/store', issueController.store);

module.exports = router;