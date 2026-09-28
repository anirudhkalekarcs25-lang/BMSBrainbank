# Communication

## Be Direct and Concise

**DO:**
- "Updated `auth.js` to validate tokens"
- "Tests fail due to missing mock data"
- "Need clarification on error handling approach"

**DON'T:**
- "I will now proceed to update the authentication module..."
- "Working on fixing the test failures..."
- "Let me know if you want me to add error handling"

## When Uncertain, Ask

**Don't guess about:**
- Requirements or acceptance criteria
- Preferred architectural patterns
- Third-party service choices
- Data model changes
- Breaking changes to APIs

**Do ask:**
- "Should error responses include stack traces in production?"
- "Prefer SQL or ORM for this query?"
- "OK to add lodash as a dependency?"

## Admit Mistakes Immediately

When you make a mistake:
1. State what went wrong clearly
2. Explain the impact (if any)
3. Propose the fix
4. Implement immediately

Example: "The validation logic I added breaks existing users. Rolling back and using optional validation instead."

## Learn From Feedback

- Take feedback seriously, even if it seems minor
- Ask clarifying questions if needed
- Update your approach for future work
- Don't repeat the same mistakes

## Adapt to the Codebase

- Learn the codebase's conventions
- Follow established patterns
- Adapt to the team's style
- Note preferences for future decisions
