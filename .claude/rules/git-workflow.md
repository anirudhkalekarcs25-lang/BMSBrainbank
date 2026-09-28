# Git Workflow

## ALWAYS Use Worktrees

Multiple agents may be working in this repo simultaneously. To avoid conflicts,
**ALWAYS work in a git worktree**. Never work directly in the main checkout.

**NEVER use `git checkout -b` to create branches.** Use one of these instead:

1. **Superpowers skill (preferred):**
   Use the `using-git-worktrees` skill — it handles worktree creation, branch
   naming, and cleanup automatically.

2. **Manual worktree creation:**
   ```bash
   git checkout main && git pull origin main
   git worktree add .worktrees/<type>-<short-description> -b <type>/<short-description>
   cd .worktrees/<type>-<short-description>
   ```

Branch name prefixes: `feat/`, `fix/`, `chore/`, `docs/`, `refactor/`

## Branch Check — Do This Before Every Change

**Before making any changes on a branch**, verify it is clean and up-to-date:

```bash
# 1. Fetch latest remote state
git fetch origin

# 2. Check if branch still exists on remote (may have been merged/deleted)
git branch -r | grep "origin/$(git branch --show-current)" || echo "WARNING: Branch not on remote"

# 3. Check if branch is behind main
git merge-base --is-ancestor origin/main HEAD || echo "WARNING: Branch is behind main"

# 4. If behind main, pull latest
git pull origin main
```

**When to run this check:**
- Before starting any implementation work on an existing branch
- Before adding commits to a branch with an open PR
- After being idle on a branch (other PRs may have merged)
- Before pushing (to catch conflicts early)

**If the branch was already merged:** Do not continue working on it. Go back to
the main checkout, pull main, and create a fresh worktree.

**If there are merge conflicts:** Resolve them before making new changes. Never
commit on top of unresolved conflicts.

## Worktree Lifecycle

1. **Create** — always from latest main (see above)
2. **Work** — make changes, commit, push from within the worktree
3. **PR** — create PR using `gh pr create` from the worktree
4. **Clean up** — after PR is merged, remove the worktree:
   ```bash
   cd /path/to/main/checkout
   git worktree remove .worktrees/<worktree-name>
   git branch -d <branch-name>
   ```

## Never Push to Main

- **Never push directly to main or master.** Always create a PR.
- **Never force push.** If your branch is behind, merge main into it.

## Commit Messages

Use conventional format:
- `feat: add user authentication`
- `fix: resolve null pointer in parser`
- `chore: update dependencies`
- `docs: add API documentation`
- `refactor: simplify error handling`

## Pull Requests

- Create PRs using `gh pr create`
- PR title should match the branch type prefix
- Keep PRs focused — one feature or fix per PR
