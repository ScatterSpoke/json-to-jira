const express = require('express');
const router = express.Router();
const tokens = require('./tokens');
const batchIssues = require('./issues').batchIssues;
const getCurrentUser = require("./users").getCurrentUser;

// Create Custom Token
router.post('/auth', tokens);

// Get info
router.get('/me', getCurrentUser);

// Create JIRA issue
router.post('/issues/batch', batchIssues);

module.exports = router;
