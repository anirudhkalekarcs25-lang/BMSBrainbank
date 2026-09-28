# GitHub Issues

## Issues Drive All Work

Work should be tracked through GitHub issues. Before starting non-trivial work,
ensure there is an issue for it. If one doesn't exist, create it.

## Issue Title Format

All issue titles MUST start with a type prefix:

| Prefix | Use When |
|--------|----------|
| `bug:` | Something is broken or not working as expected |
| `feat:` | New feature or functionality |
| `chore:` | Maintenance, dependencies, cleanup |
| `docs:` | Documentation changes |
| `refactor:` | Code restructuring without behavior change |
| `test:` | Adding or improving tests |
| `perf:` | Performance improvements |

**Examples:**
- `bug: login fails when email contains plus sign`
- `feat: add CSV export to reports dashboard`
- `chore: update Node.js to v22`
- `docs: add API authentication guide`

## Creating Issues

When creating an issue, include:
- **Title** with type prefix (required)
- **Description** of what needs to happen (required)
- **Acceptance criteria** — how do we know this is done? (recommended)
- **Context** — relevant links, screenshots, error messages (if applicable)

Use `gh issue create` to create issues from the command line.

## Linking Issues to PRs

Reference the issue in your PR description:
- `Closes #123` — auto-closes the issue when PR merges
- `Fixes #123` — same as Closes
- `Relates to #123` — links without auto-closing

## Workflow

1. Pick up or create an issue
2. Create a branch (use worktree — see git-workflow rule)
3. Implement the work
4. Create a PR that references the issue
5. Human reviews and merges
