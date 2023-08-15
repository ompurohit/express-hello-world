const express = require('express');

const router = express.Router();

const issueController = require('../app/http/controllers/issueController');

router.get('/', issueController.index);
router.post('/store', issueController.store);

module.exports = router;