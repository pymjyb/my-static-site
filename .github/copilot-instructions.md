<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Copilot / AI agent instructions — static site (single-page)

Purpose
- This repository is a minimal static website. Key files at the project root: `index.html`, `script.js`, `style.css`, and `data.csv`.
- There are no build tools, package.json, or tests present. Changes are applied directly to source files and verified by opening the site in a browser.

Big picture (what to know quickly)
- index.html is the single-page entrypoint. Keep edits conservative: maintain relative paths to `script.js`, `style.css`, and `data.csv`.
- `script.js` is the client-side code area. When adding functionality that consumes data, prefer fetching `./data.csv` via a relative URL.
- `data.csv` is the canonical dataset for the site — editing it changes displayed content immediately (after reload).

Developer workflow & testing
- No build step. To test features that fetch local files (CSV) run a simple static server from the repo root so `fetch()` works (file:// will fail with most browsers):

```bash
# from project root
python3 -m http.server 8000
# or, if node/npm available:
npx serve .
```

- Alternatively use the VS Code Live Server extension. Open http://localhost:8000 and check the browser console for errors.

Patterns & conventions (repository-specific)
- Relative paths: always use './' or '/' relative links for local assets. Example: `fetch('./data.csv')` or `<script src="./script.js"></script>`.
- CSV format: treat `data.csv` as UTF-8, comma-separated with a header row. If parsing in JS, prefer a small parser (e.g., parse by line+split or include a tiny parser snippet) rather than introducing a new dependency.
- Keep CSS in `style.css`. This project follows the single-file-per-concern pattern (HTML/JS/CSS separated).

Integration points & cautions
- The only external integration is the browser runtime. There are no server-side components.
- CORS/local fetch: when implementing fetch-based features, ensure files are served over HTTP during development.
- No CI/test hooks detected. If you add scripts or toolchain files, update this document and include simple run instructions.

How to change behavior safely (examples)
- To change data shown on the page: edit `data.csv`, then reload the served page.
- To add a small client-side CSV reader, prefer a 10–30 line utility (fetch -> split lines -> map headers) and place it in `script.js` to avoid adding package management.

What NOT to do
- Don't add heavyweight build tooling (Webpack, Rollup) without explicit permission — the repo intent is minimal static delivery.
- Don't assume a Node/npm toolchain exists. If you add one, document install and run commands in this file.

If you need more context
- Search the repo for references to `data.csv`, `script.js`, and `index.html` before sweeping changes.
- If you introduce new files, follow the existing pattern: keep assets at repo root and use relative paths.

Questions / unclear areas
- The code files are minimal. If you want the agent to implement features that require assumptions (CSV shape, UI behavior), ask the maintainer for the expected CSV schema and desired UI interactions before making large changes.

Please review this guidance and tell me which sections need more detail or examples.
