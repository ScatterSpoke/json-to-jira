const express = require('express');
const router = express.Router();
const tokens = require('./tokens');
const batchIssues = require('./issues').batchIssues;
const getCurrentUser = require("./users").getCurrentUser;
const listProjects = require('./projects').listProjects;
const listIssueTypes = require('./issueTypes').listIssueTypes;
const listRapidViews = require('./rapidViews').listRapidViews;
const listSprints = require('./sprints').listSprints;

// Create Custom Token
router.post('/auth', tokens);

// Get info
router.get('/me', getCurrentUser);

router.get('/projects', listProjects);
router.get('/issue_types', listIssueTypes);
router.get('/rapid_views', listRapidViews);
router.get('/sprints', listSprints);

// Create JIRA issue
router.post('/issues/batch', batchIssues);

module.exports = router;
