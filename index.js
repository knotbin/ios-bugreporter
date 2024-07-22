/**
 * This is the main entrypoint to your Probot app
 * 
 * @param {import('probot').Probot} app
 */
import * as express from "express";

export default (app, { getRouter }) => {
  const router = getRouter("/issue");
  router.use(express.static("public"));

  router.post("/new-bug", async (req, res) => {
    try {
      const issue = {
        owner: req.query.owner,
        repo: req.query.repo,
        title: req.query.title,
        body: req.query.body
      };

      createIssue(issue, app)
    } catch (error) {
      app.log.error(error);
      res.status(500).json({ error: "Failed to create issue" });
    }
  });
};
const createIssue = async function (issue, app) {
  const github = await app.auth();
  const owner = issue.owner; const repo = issue.repo; const title = issue.title; const body = issue.body; const assignees = issue.assignees; const labels = issue.labels
  return github.issues.create({ owner, repo, title, body, labels, assignees })
}