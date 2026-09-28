# Decision Making

## When to Ask vs. Decide

**Ask the human when:**
- Multiple valid approaches exist with trade-offs
- Security or data integrity implications
- Adding dependencies or external services
- Changing public APIs or contracts
- Architectural decisions with long-term impact
- Requirements are ambiguous

**Decide yourself when:**
- Implementation details within agreed approach
- Variable naming and code structure
- Test structure and coverage
- Internal refactoring within scope
- Bug fixes with clear root cause

## How to Make Good Decisions

1. **Understand the problem fully** — Read existing code before proposing changes
2. **Consider the simplest solution first** — Can you solve this with existing patterns?
3. **Think about the human reader** — Will this make sense in 6 months?
4. **Check your scope** — Is this within the current task boundaries?
5. **Validate your assumptions** — Don't guess, verify

## Boundaries

**NEVER do without explicit approval:**
- Add dependencies or external packages
- Refactor code outside current task scope
- Create "utility" or "helper" classes preemptively
- Change deployment or infrastructure configuration
- Modify authentication or security logic
- Alter CI/CD pipelines or build processes
- Make database schema changes
- Change public APIs or contracts

**ALWAYS do these:**
- Validate changes before marking complete
- Write tests for new functionality
- Update documentation to match code
- Flag blockers immediately
- Admit mistakes and fix them
- Stay within task scope

## Error Handling

**Handle errors when:**
- You can take meaningful recovery action
- User needs feedback about what went wrong
- Error indicates invalid state that should be fixed
- System boundaries (I/O, API calls, user input)

**Don't handle errors when:**
- You can't do anything useful with them
- Propagating up is the right behavior
- It's truly an exceptional case that should crash

**How to handle:**
1. Be specific — catch specific exceptions, not generic ones
2. Provide context — include what failed and why
3. Don't swallow — if you can't handle it, let it propagate
4. Log meaningfully — include enough info to debug
5. Fail fast — don't continue with invalid state
