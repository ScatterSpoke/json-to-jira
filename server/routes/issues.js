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
    projectsPromise = null, issuesPromise = null, rapidViewPromise, taskIssue,
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
      rapidViewPromise = buildPromise((c)=> jiraClient.findRapidView(defaultProject.name, c));
      rapidViewPromise.then((rapidView)=> {
        console.log(rapidView);
      });

      taskIssue = jIssues.filter((iss)=> iss.name === 'Task')[0] || jIssues[0];
      /*
      issues.forEach((issue)=>{
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
          },
          (err, val)=> {
            console.log(err, val);
          });
      });
      */
    });
    res.json({ issues: issues });
  });
}

module.exports = {
  batchIssues: batchIssues,
};
