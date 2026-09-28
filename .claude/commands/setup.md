# Project Setup

You are helping a user customize this project template for their specific project.
Walk through the following steps ONE AT A TIME. Ask each question, wait for the
answer, then apply the changes before moving to the next.

## Step 0: Verify Plugins

Before anything else, verify that required plugins are installed and working.

Run these checks silently (don't ask the user, just do them):

1. Run `claude plugin list` and check the output for:
   - `superpowers@claude-plugins-official` — should show as enabled
   - `ui-ux-pro-max@ui-ux-pro-max-skill` — should show as enabled

2. If **superpowers** is missing: something is wrong with the settings.json.
   Tell the user: "Superpowers plugin didn't auto-install. Try running:
   `claude plugin install superpowers@claude-plugins-official`"

3. If **ui-ux-pro-max** is missing: the marketplace likely isn't registered.
   Tell the user: "UI/UX Pro Max plugin isn't installed. Run these two commands
   and restart Claude Code:
   ```
   claude plugin marketplace add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
   claude plugin install ui-ux-pro-max@ui-ux-pro-max-skill
   ```
   "

4. If both are installed and enabled, tell the user briefly:
   "Plugins verified — superpowers and ui-ux-pro-max are installed."
   Then proceed to Step 1.

If either plugin failed to install, still proceed with setup — the plugins
aren't required for project customization, just for development workflows.

## Step 1: Project Basics
Ask:
- What is this project called?
- Give me a one-line description of what it does.
- What's the primary tech stack? (e.g., "Node.js + React", "Go API", "Python FastAPI", "Terraform infra")

Update CLAUDE.md with their answers.

## Step 2: Project Structure
Ask:
- What does your directory layout look like? (or say "let me scan it" and read the file tree)

Update the Project Structure section of CLAUDE.md.

## Step 3: Development Commands
Ask:
- How do you install dependencies? (e.g., npm install, go mod download, pip install -r requirements.txt)
- How do you run tests? (e.g., npm test, pytest, go test ./...)
- How do you build? (e.g., npm run build, go build, make)
- How do you deploy? (e.g., git push, gh workflow run, Atlantis via PR)

Update CLAUDE.md Development section.
Update .claude/commands/deploy.md with their deploy process.

## Step 4: Linting & Code Style
Based on the tech stack from Step 1, auto-configure:
- Trim .claude/rules/linting.md to only include the relevant stacks
- Fill in .claude/rules/code-style.md with stack-appropriate conventions
- Fill in .claude/rules/testing.md with their test runner and patterns

Don't ask the user to define code style rules — infer sensible defaults from
their stack and ask "Does this look right?" instead.

## Step 5: Permissions
Based on the dev commands from Step 3, update .claude/settings.json:
- Add any project-specific commands to the allow list
  (e.g., if they use make, add "Bash(make *)")
- If they mentioned specific tools not in the default allow list, add them

## Step 6: Cleanup
- Delete api-conventions.md if the project is not building an API
- If the project uses MCP servers, mention adding a .mcp.json file
Note: code-style.md and testing.md are always filled in by Step 4 — no need to check them here.

## Step 7: Summary
Show the user what was configured and what files were changed.
Suggest they review the changes and commit.
