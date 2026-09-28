# Linting

Recommended lint tools by stack. Run the project's linter before marking work complete.

## Terraform

| Tool | Install | Run |
|------|---------|-----|
| `tflint` | `brew install tflint` | `tflint` |
| `terraform fmt` | (built-in) | `terraform fmt -check -recursive` |

## HTML

| Tool | Install | Run |
|------|---------|-----|
| `htmlhint` | `npm i -D htmlhint` | `npm run lint` |

Add to package.json: `"lint": "htmlhint '**/*.html'"`

## JavaScript / React

| Tool | Install | Run |
|------|---------|-----|
| `eslint` | `npm i -D eslint` | `npm run lint` |
| `prettier` | `npm i -D prettier` | `npm run format` |

Add to package.json: `"lint": "eslint ."`, `"format": "prettier --write ."`

For React, also install: `npm i -D eslint-plugin-react`

## Go

| Tool | Install | Run |
|------|---------|-----|
| `golangci-lint` | `brew install golangci-lint` | `golangci-lint run` |
| `go vet` | (built-in) | `go vet ./...` |
| `gofmt` | (built-in) | `gofmt -l .` |

## Bash

| Tool | Install | Run |
|------|---------|-----|
| `shellcheck` | `brew install shellcheck` | `shellcheck script.sh` |
| `shfmt` | `brew install shfmt` | `shfmt -d .` |

## Adding Lint Commands to Permissions

If you add a new lint tool, add it to `.claude/settings.json` allow list:
```json
"Bash(your-lint-tool *)"
```

This auto-approves the tool so the agent doesn't prompt every time.
