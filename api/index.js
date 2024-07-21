const express = require('express');
const { Probot } = require('probot');
const app = express();

// Function to create an issue
const createIssue = async function (issue, octokit) {
    const { owner, repo, title, body, assignees, labels } = issue;
    return octokit.issues.create({ owner, repo, title, body, labels, assignees });
}

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle issue creation
app.post('/issue/:owner/:repo', async (req, res) => {
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
        // Initialize Probot
        const probot = new Probot({
            // Add your GitHub App's credentials here
            appId: process.env.APP_ID,
            privateKey: process.env.PRIVATE_KEY,
            secret: process.env.WEBHOOK_SECRET,
        });

        await probot.load((app) => {
            app.on('installation.created', async (context) => {
                // Your existing installation.created event handler...
                console.log('New installation created');
            });
        });

        await createIssue(issue, probot.octokit);
        res.status(201).json({ message: 'Issue created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create issue' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;