const validateToken = require('./tokens').validateToken;

function buildPromise(callback) {
  return new Promise((res, rej)=> {
    callback((err, val)=> {
      if (err) rej(err);
      else res(val);
    });
  });
}

function batchIssues(req, res) {
  let issues = null, defaultProject,
    projectsPromise = null, issuesPromise = null, taskIssue,
    jProjects, jIssues, jRapidView;

  // jiraClient.listProjects((e,v)=>  );

  validateToken(req, res).then((jiraClient)=> {
    issues = req.body.issues;
    projectsPromise = buildPromise((c)=> jiraClient.listProjects(c));
    issuesPromise = buildPromise((c)=> jiraClient.listIssueTypes(c));
    Promise.all([projectsPromise, issuesPromise]).then((results)=> {
      jProjects = results[0];
      jIssues = results[1];
      defaultProject = jProjects[0];
      taskIssue = jIssues.filter((iss)=> iss.name === 'Task')[0] || jIssues[0];

      validateToken(req, res, '1.0').then((jc) => {
        buildPromise((c)=> jc.listRapidViews(c)).then((rapidViews)=> {
          jRapidView = rapidViews[0];
          buildPromise((c)=> jc.getLastSprintForRapidView(jRapidView.id, c)).then((sprint)=> {
            let promises =
              issues.map((issue)=>{
                return buildPromise((c)=> {
                  jiraClient.addNewIssue({
                    fields: {
                      summary: issue.text,
                      project: {
                        id: defaultProject.id
                      },
                      issuetype: {
                        id: taskIssue.id
                      }
                    }
                  }, c);
                });
              });
            Promise.all(promises).then((jIssues) => {
              jIssues.forEach((iss)=> {
                jc.addIssueToSprint(iss.id, sprint.id, (err, value)=> {
                  console.log(err, value);
                });
              });
              res.status(201).json({ issues: jIssues });
            });
          });
        });
      });
    });
  });
}

module.exports = {
  batchIssues: batchIssues,
};
