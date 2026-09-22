# Agent Instructions

## Prompt Log (Mandatory, Unskippable)

- At the end of **every** response, append an entry to `prompt-log.md` using the format defined at the top of that file (Context / Prompt / Summary).
- This applies to every single prompt, regardless of how small or unrelated to logging it seems.
- Never ask for permission, never omit, and never defer this step.

## Response Style

- Be extremely concise. No pleasantries, no filler.
- When asked to write code, return code only unless explanation is explicitly requested.
- No sycophantic preambles ("Sure!", "Great question!", "Absolutely!").
- No "Here's a function that..." preambles.
- Don't restate the question before answering.
- No "Note:", "Tip:", or "Remember:" appendices unless asked.
- No usage examples unless asked.
- No unsolicited suggestions or improvements beyond what was asked.
- Use short variable names where meaning is clear from context.

## Code Standards

### General

- Prioritize readability and maintainability
- Use descriptive names for all identifiers
- Keep functions/components small and single-purpose
- Break complex logic into manageable pieces
- Prefer pure functions, immutable data and composition over classes, inheritance and shared mutable state

### Naming Conventions

- **PascalCase**: Components, interfaces, types
- **camelCase**: Variables, functions, methods
- **ALL_CAPS**: Constants
- Use descriptive names in callback parameters — avoid single-letter shorthands (e.g., use `(message) => message.type` instead of `(m) => m.type`)

### TypeScript

- Use TypeScript for all code
- Follow functional programming principles where possible
- Prefer `type` over `interface` (unless extending/implementing)
- Use `const` for immutability
- Leverage `?.` and `??` operators
- Prefer `async/await` over Promise chains
- Avoid `any`; use specific types or `unknown`
- Use object literals instead of ENUMs

### React / Next.js

- Functional components with hooks only
- Follow React hooks rules (no conditional hooks)
- Client components only where interactivity requires it; keep them small
- Sync interactive UI state to the URL via `useSearchParams` — no client store, no React Query
- Loading and error states inline as text; no spinner libraries

### Import Conventions

- Group imports: external libraries → internal modules → relative imports
- Prefer named exports over default exports (except Next.js `page.tsx` / `layout.tsx`)
- Sort imports alphabetically within groups

### Component Structure

- Props type above component definition
- Use destructuring for props
- Early returns for conditional rendering
- Custom hooks before JSX
- Memoize expensive computations with `useMemo` / `useCallback` (only when measured, not preemptively)

<!-- rtk-instructions v2 -->
# RTK — Token-Optimized CLI

**rtk** is a CLI proxy that filters and compresses command outputs, saving 60-90% tokens.

## Rule

Always prefix shell commands with `rtk`:

```bash
# Instead of:              Use:
git status                 rtk git status
git log -10                rtk git log -10
cargo test                 rtk cargo test
docker ps                  rtk docker ps
kubectl get pods           rtk kubectl pods
```

## Meta commands (use directly)

```bash
rtk gain              # Token savings dashboard
rtk gain --history    # Per-command savings history
rtk discover          # Find missed rtk opportunities
rtk proxy <cmd>       # Run raw (no filtering) but track usage
```
<!-- /rtk-instructions -->
