const express = require('express');
const { Probot } = require('probot');

module.exports = (app) => {
  const router = express.Router();

  // Function to create an issue
  const createIssue = async function (issue, context) {
    const { owner, repo, title, body, assignees, labels } = issue;
    return context.octokit.issues.create({ owner, repo, title, body, labels, assignees });
  }

  // Route to handle issue creation
  router.post('/:owner/:repo', express.json(), async (req, res) => {
    const { owner, repo } = req.params;
    const { title, body, assignees, labels } = req.body;

    const issue = {
      owner,
      repo,
      title,
      body,
      assignees,
      labels
    };

    try {
      const context = {
        octokit: app.octokit
      };
      
      await createIssue(issue, context);
      res.status(201).json({ message: 'Issue created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create issue' });
    }
  });

  // Use the router
  app.router.use('/', router);

  // The rest of your bot logic...
  app.on("installation.created", async (context) => {
    // Your existing installation.created event handler...
  });
};