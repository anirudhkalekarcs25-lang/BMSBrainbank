# Self-Review

Review YOUR OWN current changes before committing. This is a self-check, not a peer review.

1. Run `git diff` to see all changes
2. For each changed file, verify:
   - Does the change solve the stated problem?
   - Is this the simplest approach?
   - Any security concerns? (injection, secrets, auth)
   - Are changes tested?
   - Did you stay within the task boundary?
3. Run the project's test suite
4. Run the project's linter
5. Report any issues found, or confirm ready to commit
