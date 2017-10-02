const validateToken = require('./tokens').validateToken;
const buildPromise = require('./utils').buildPromise;

function listRapidViews(req, res) {
  validateToken(req, res, '1.0').then((jiraClient)=> {
    buildPromise((c)=> jiraClient.listRapidViews(c)).then((results) => {
      res.json(results);
    });
  });
}

module.exports = {
  listRapidViews: listRapidViews,
};
