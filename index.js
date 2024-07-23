/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
import * as express from "express";
import { ProbotOctokit } from "probot";

export default (app, { getRouter }) => {
  const octokit = new ProbotOctokit({
    auth: {
      appId: process.env.APP_ID,
      privateKey: process.env.PRIVATE_KEY,
    }
  })
  const router = getRouter("/issue");
  router.use(express.static("public"));
  // Your code here
  app.log.info("Yay, the app was loaded!");

  router.post("/new", async (req, res) => {
    const github = await octokit.auth()
    try {
      const issue = {
        title: req.query.title,
        body: req.query.body,
        labels: ["bug"]
      };
      const path = `${req.query.owner}/${req.query.repo}`
      github.issues.create(
        req.query.owner, req.query.repo, issue.title, issue.body 
      )
    } catch (error) {
      app.log.error(error);
      res.status(500).json({ error: `Failed to create issue in repo ${repo}` });
    }
  });

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};

const createIssue = async function (issue, app) {
  const github = context.octokit.app.createIssue()
  const owner = issue.owner; const repo = issue.repo; const title = issue.title; const body = issue.body; const assignees = issue.assignees; const labels = issue.labels
  return github.issues.create({ owner, repo, title, body, labels, assignees })
}