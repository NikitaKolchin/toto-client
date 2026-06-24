# Graph Report - toto-client  (2026-06-23)

## Corpus Check
- 147 files · ~15,055 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 243 nodes · 111 edges · 15 communities detected
- Extraction: 95% EXTRACTED · 5% INFERRED · 1% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 145|Community 145]]
- [[_COMMUNITY_Community 146|Community 146]]
- [[_COMMUNITY_Community 147|Community 147]]

## God Nodes (most connected - your core abstractions)
1. `ErrorBoundary` - 5 edges
2. `Build and Deploy Job` - 5 edges
3. `validateCompetition()` - 4 edges
4. `getDefaultMRTOptions()` - 3 edges
5. `not()` - 3 edges
6. `distributeSecondHalf()` - 3 edges
7. `validateNation()` - 3 edges
8. `validateUser()` - 3 edges
9. `getScore()` - 3 edges
10. `normalizeApiId()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Create React App` --conceptually_related_to--> `React Vite TypeScript Stack`  [AMBIGUOUS]
  README.md → AGENTS.md
- `handleCheckedRight()` --calls--> `not()`  [INFERRED]
  src/shared/ui/TransferList/TransferList.tsx → src/shared/lib/helpers.ts
- `handleCheckedLeft()` --calls--> `not()`  [INFERRED]
  src/shared/ui/TransferList/TransferList.tsx → src/shared/lib/helpers.ts
- `StakeEditingTable()` --calls--> `getDefaultMRTOptions()`  [INFERRED]
  src/widgets/StakeEditingTable/ui/StakeEditingTable/StakeEditingTable.tsx → src/shared/DefaultTable/index.ts
- `SettingEditingTable()` --calls--> `getDefaultMRTOptions()`  [INFERRED]
  src/widgets/SettingEditingTable/ui/SettingEditingTable/SettingEditingTable.tsx → src/shared/DefaultTable/index.ts

## Hyperedges (group relationships)
- **MCP Server Toolset** — agents_filesystem_mcp, agents_context7_mcp [EXTRACTED 1.00]
- **CI/CD Pipeline Steps** — workflows_main_checkout_action, workflows_main_setup_node_action, workflows_main_scp_action, workflows_main_ssh_action [EXTRACTED 1.00]

## Communities

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (3): not(), handleCheckedLeft(), handleCheckedRight()

### Community 2 - "Community 2"
Cohesion: 0.25
Nodes (5): getDefaultMRTOptions(), SettingEditingTable(), validateRequired(), validateSetting(), StakeEditingTable()

### Community 3 - "Community 3"
Cohesion: 0.25
Nodes (2): handleCloseMainMenu(), handleMainMenuNavigate()

### Community 4 - "Community 4"
Cohesion: 0.52
Nodes (5): handleCreateCompetition(), handleSaveCompetition(), normalizeApiId(), validateCompetition(), validateRequired()

### Community 5 - "Community 5"
Cohesion: 0.33
Nodes (1): ErrorBoundary

### Community 6 - "Community 6"
Cohesion: 0.47
Nodes (3): calcProjectedPrizes(), distributeSecondHalf(), getPriorityTable()

### Community 7 - "Community 7"
Cohesion: 0.47
Nodes (3): handleSaveNation(), validateNation(), validateRequired()

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (6): Continuous Deployment Workflow, Checkout Action, Build and Deploy Job, SCP Upload Action, Setup Node Action, SSH Activate Action

### Community 9 - "Community 9"
Cohesion: 0.6
Nodes (3): handleSaveUser(), validateRequired(), validateUser()

### Community 10 - "Community 10"
Cohesion: 0.6
Nodes (3): getScore(), handleCreateMatch(), handleSaveMatch()

### Community 11 - "Community 11"
Cohesion: 0.5
Nodes (2): useAppDispatch(), Layout()

### Community 13 - "Community 13"
Cohesion: 0.67
Nodes (3): React Vite TypeScript Stack, Create React App, React Documentation

### Community 145 - "Community 145"
Cohesion: 1.0
Nodes (1): Filesystem MCP Server

### Community 146 - "Community 146"
Cohesion: 1.0
Nodes (1): Context7 MCP Server

### Community 147 - "Community 147"
Cohesion: 1.0
Nodes (1): Toto App

## Ambiguous Edges - Review These
- `React Vite TypeScript Stack` → `Create React App`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **10 isolated node(s):** `Continuous Deployment Workflow`, `Checkout Action`, `Setup Node Action`, `SCP Upload Action`, `SSH Activate Action` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 3`** (9 nodes): `handleAccountMenu()`, `handleCloseAccountMenu()`, `handleCloseMainMenu()`, `handleLogin()`, `handleLogout()`, `handleMainMenu()`, `handleMainMenuNavigate()`, `handleProfile()`, `Header.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (6 nodes): `ErrorBoundary`, `.componentDidCatch()`, `.constructor()`, `.getDerivedStateFromError()`, `.render()`, `ErrorBoundary.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (4 nodes): `useAppDispatch()`, `Layout()`, `index.ts`, `MainLayout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 145`** (1 nodes): `Filesystem MCP Server`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 146`** (1 nodes): `Context7 MCP Server`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 147`** (1 nodes): `Toto App`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `React Vite TypeScript Stack` and `Create React App`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Are the 2 inferred relationships involving `getDefaultMRTOptions()` (e.g. with `StakeEditingTable()` and `SettingEditingTable()`) actually correct?**
  _`getDefaultMRTOptions()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `not()` (e.g. with `handleCheckedRight()` and `handleCheckedLeft()`) actually correct?**
  _`not()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Continuous Deployment Workflow`, `Checkout Action`, `Setup Node Action` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._