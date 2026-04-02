# Github-activity-CLI
A simple Command Line Interface (CLI) application built with Node.js that fetches and displays the recent activity of any GitHub user directly in your terminal.
🚀 Features
Real-time Data: Fetches the latest events (commits, stars, issues) using the official GitHub REST API.

Zero Dependencies: Built entirely using native Node.js features (no external libraries like Octokit or Axios), as per the project requirements.

User-Friendly Output: Transforms raw JSON data into readable sentences (e.g., "- Pushed 3 commits to repository/name").

Error Handling: Gracefully handles invalid usernames, 404 errors, and API connection issues.

🛠️ Technical Overview
Language: JavaScript (Node.js)

API: GitHub Events API

Key Concepts:

Asynchronous programming with async/await.

Handling command-line arguments using process.argv.

HTTP streaming and JSON parsing using the native fetch API.

Logic implementation using switch statements for different GitHub event types.

📦 Installation & Usage
Clone the repository:

Bash
git clone https://github.com/your-username/github-activity-cli.git
cd github-activity-cli
Run the application:
Pass the GitHub username as an argument after the file name:

Bash
node index.js <username>
Example:

Bash
node index.js octocat
📋 Sample Output
Plaintext
Output:
- Pushed 1 commit(s) to octocat/boysenberry-repo-1
- Created branch in octocat/boysenberry-repo-1
- Starred github/docs
📝 Challenges Overcome
The main challenge of this project was fetching data without using high-level libraries like Octokit. I implemented the native fetch method and configured the required User-Agent headers to comply with GitHub's security policies. I also practiced data mapping to convert complex API payloads into simple, human-readable strings.

Pro-Tip:
If you want to make the command even more professional (to run it as github-activity <username> instead of node index.js), you can add a "bin" section to your package.json later!

Roadmap: https://roadmap.sh/projects/github-user-activity
