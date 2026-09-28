# Code Quality

## Core Truths

1. **Write for humans first, computers second** — Code is read 10x more than it's written
2. **Simple solutions beat clever ones** — Clever code is a liability, not an asset
3. **Working software beats perfect abstractions** — Ship something that works, then improve it
4. **Small changes are easier to review and debug** — Big changes hide problems

## The KISS Mandate

Before writing any code, ask yourself:

1. **Is this the simplest solution?** — If there's a simpler way, use it
2. **Can a junior developer understand this?** — If not, simplify it
3. **Does this solve the actual problem, not a hypothetical one?** — YAGNI is real

**KISS violations:**
- Abstract base classes with one implementation
- Configuration for values that never change
- Premature optimization without profiling
- Frameworks when functions suffice
- Patterns for the sake of patterns

## Code Structure

- Functions under 50 lines (ideally under 20)
- Nesting no more than 3 levels deep
- Descriptive names (no single-letter variables except loop counters)
- One responsibility per function/class
- DRY only after third duplication (not before)

## Testing Standards

- Test behavior, not implementation
- Test edge cases and error conditions
- Tests should be readable without documentation
- One assertion concept per test
- Test names describe what they verify
