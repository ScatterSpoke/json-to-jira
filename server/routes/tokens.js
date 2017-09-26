const jiraErrorHandler = require('./jiraHandler').jiraErrorHandler;
const getJiraClient = require('./jiraHandler').getJiraClient;
const uid = require('rand-token').uid;
const auth = require('basic-auth');

let currentTokens = {
};

/**
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<JiraApi>}
 */
function validateToken(req, res) {
  let token = req.get('X-Auth-Token');
  let hashCredentials = currentTokens[token];
  let obj;

  return new Promise((resolve, reject)=> {
    if (hashCredentials) {
      let credentials = auth.parse('Basic '+hashCredentials);
      resolve(getJiraClient(credentials.name, credentials.pass));
    } else {
      obj = { message: 'Invalid Token' };
      reject(obj);
      res.status(401).json(obj);
    }
  });
}

/**
 * @param {String} username
 * @param {String} password
 * @return {String}
 */
function createToken(username, password) {
  let token = uid(16);
  currentTokens[token] = new Buffer(username + ":" + password).toString("base64");
  return token;
}

function tokens(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let jira = getJiraClient(username, password);
  let token = null;

  jira.getCurrentUser(function (err, value) {
    if (err) {
      jiraErrorHandler(err, res);
    } else {
      token = createToken(username, password);
      res.json({ token: token });
    }
  });
}

tokens.validateToken = validateToken;
module.exports = tokens;
