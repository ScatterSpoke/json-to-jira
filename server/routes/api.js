const express = require('express');
const router = express.Router();
const tokens = require('./tokens');
const batchIssues = require('./issues').batchIssues;

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Create Custom Token
router.post('/tokens', tokens);

// Create JIRA issue
router.post('/issues/batch', batchIssues);

module.exports = router;
