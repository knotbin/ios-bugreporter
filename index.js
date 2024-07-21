/**
 * This is the main entrypoint to your Probot app
 * 
 * @param {import('probot').Probot} app
 */
import * as express from "express";

export default (app, { getRouter }) => {
  const router = getRouter("/issue");
  router.use(express.static("public"));

  router.post("/:owner/:repo", async (req, res) => {
    try {
      const { owner, repo } = req.params;
      const { title, body } = req.body;

      if (!title || !body) {
        return res.status(400).json({ error: "Title and body are required" });
      }

      const issue = await app.octokit.issues.create({
        owner,
        repo,
        title,
        body,
      });

      res.status(201).json(issue.data);
    } catch (error) {
      app.log.error(error);
      res.status(500).json({ error: "Failed to create issue" });
    }
  });
};

