# AGENTS

This project is a React frontend (`toto-client`) built with Vite and TypeScript.

## MCP Servers
MCP servers are configured in `.vscode/mcp.json`:

- **filesystem** — read/write access to `/Users/nikitakolchin/proj/toto-client`, `/Users/nikitakolchin/proj/toto-server`, `/Users/nikitakolchin/proj/toto-core`. Use for reading source files, creating new files, or making edits.
- **context7** — up-to-date documentation lookup via Context7. Use `resolve-library-id` to find library IDs and `query-docs` to get current docs with code examples. Useful for React, Vite, TypeScript, and any library questions.

### When to use MCP tools
- Use **filesystem** to read, create, or modify project files.
- Use **context7** when you need documentation, API references, or code examples for React, Vite, TypeScript, or any other library.