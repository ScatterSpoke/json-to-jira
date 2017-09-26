const validateToken = require('./tokens').validateToken;
const jiraErrorHandler = require('./jiraHandler').jiraErrorHandler;

function getCurrentUser(req, res) {
  validateToken(req, res).then((jiraClient)=> {
    jiraClient.getCurrentUser(function (err, value) {
      if (err) {
        jiraErrorHandler(err, res);
      } else {
        res.json(value);
      }
    });
  })
}

module.exports = {
  getCurrentUser: getCurrentUser,
};
