const validateToken = require('./tokens').validateToken;
const buildPromise = require('./utils').buildPromise;

/**
 *
 * @param {Request} req
 * @param {Response} res
 */
function listSprints(req, res) {
  let rapidViewId = req.query.rapidViewId;
  validateToken(req, res, '1.0').then((jiraClient)=> {
    buildPromise((c)=> jiraClient.listSprints(rapidViewId, c)).then((results) => {
      res.json(results);
    });
  });
}

module.exports = {
  listSprints: listSprints,
};
