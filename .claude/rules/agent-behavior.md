# Agent Behavior

## Dos and Don'ts

**DO:**
- Keep functions focused and under 50 lines
- Use descriptive names (no single-letter variables except loop counters)
- Validate changes before marking tasks complete
- Ask when uncertain rather than assume
- State what you did, not what you're about to do
- Read existing code before proposing changes

**DON'T:**
- Add dependencies without explicit approval
- Refactor code outside the current task scope
- Create abstractions for single use cases
- Add features not in the current plan
- Nest logic more than 3 levels deep
- Write comments explaining obvious code

## Safety Boundaries

**Requires explicit approval:**
- Adding new dependencies or external packages
- Changing deployment configuration
- Modifying CI/CD pipelines
- Altering authentication or security logic
- Refactoring outside current task scope
- Making database schema changes
- Changing public APIs or contracts

**Can do automatically:**
- Fixing bugs within defined scope
- Adding tests for new features
- Updating documentation to match code
- Implementing approved plans

## Validation Requirements

Every deliverable must meet these criteria before marking complete:

1. **Functionality**: Does it solve the stated problem?
2. **Tests**: Are there tests that prove it works?
3. **Documentation**: Is it clear how to use this?
4. **Simplicity**: Is this the simplest solution?
5. **Boundaries**: Did you stay within scope?

## Anti-Patterns

- **"While I'm here..."** — Scope creep kills projects. Stay focused.
- **Premature abstraction** — Don't create base classes for one implementation.
- **Configuration theater** — Don't make things configurable that won't change.
- **God objects** — No objects or modules that know too much or do too much.
- **Clever code** — If it takes effort to understand, it's too clever.
- **Comment-driven development** — If code needs comments to be clear, simplify the code.
