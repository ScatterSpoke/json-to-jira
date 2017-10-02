const validateToken = require('./tokens').validateToken;
const buildPromise = require('./utils').buildPromise;

function batchIssues(req, res) {
  let issues = req.body.issues, projectId = req.body.projectId,
    sprintId = req.body.sprintId, issueTypeId = req.body.issueTypeId;

  // jiraClient.listProjects((e,v)=>  );

  validateToken(req, res).then((jiraClient)=> {
    let promises =
      issues.map((issue)=>{
        return buildPromise((c)=> {
          jiraClient.addNewIssue({
            fields: {
              summary: issue.text,
              project: {
                id: projectId
              },
              issuetype: {
                id: issueTypeId
              }
            }
          }, c);
        });
      });
    Promise.all(promises).then((jIssues) => {
      validateToken(req, res, '1.0').then((jc) => {
        jIssues.forEach((iss)=> {
          jc.addIssueToSprint(iss.id, sprintId, (err, value)=> {
            console.log(err, value);
          });
        });
      });
      res.status(201).json(jIssues);
    });
  });
}

module.exports = {
  batchIssues: batchIssues,
};
