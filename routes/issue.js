const express = require('express');

const router = express.Router();

const issueController = require('../app/http/controllers/issueController');

router.get('/', issueController.index);
router.post('/store', issueController.store);
router.get('/edit/:_id', issueController.edit);
router.get('/delete/:_id', issueController.delete);

module.exports = router;