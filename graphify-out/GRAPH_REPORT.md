# Graph Report - .  (2026-06-20)

## Corpus Check
- Corpus is ~15,883 words - fits in a single context window. You may not need a graph.

## Summary
- 442 nodes · 856 edges · 27 communities (17 shown, 10 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Admin & User Management|Admin & User Management]]
- [[_COMMUNITY_Competition Editing|Competition Editing]]
- [[_COMMUNITY_Routing & Navigation|Routing & Navigation]]
- [[_COMMUNITY_API & Auth|API & Auth]]
- [[_COMMUNITY_Dependencies & Tooling|Dependencies & Tooling]]
- [[_COMMUNITY_App Shell & Layout|App Shell & Layout]]
- [[_COMMUNITY_Auth & Users|Auth & Users]]
- [[_COMMUNITY_Biome Lint Config|Biome Lint Config]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Shared UI Helpers|Shared UI Helpers]]
- [[_COMMUNITY_Stats Page|Stats Page]]
- [[_COMMUNITY_Profile & Admin Pages|Profile & Admin Pages]]
- [[_COMMUNITY_Project Metadata|Project Metadata]]
- [[_COMMUNITY_PWA Manifest|PWA Manifest]]
- [[_COMMUNITY_Theme Slice|Theme Slice]]
- [[_COMMUNITY_CICD Pipeline|CI/CD Pipeline]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]

## God Nodes (most connected - your core abstractions)
1. `useAppSelector` - 30 edges
2. `compilerOptions` - 18 edges
3. `getDefaultMRTOptions()` - 15 edges
4. `Competition` - 13 edges
5. `useAppDispatch()` - 13 edges
6. `Title()` - 12 edges
7. `baseQueryWithReauth()` - 11 edges
8. `Match` - 9 edges
9. `User` - 9 edges
10. `AppRoutes` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Create React App` --conceptually_related_to--> `React Vite TypeScript Stack`  [AMBIGUOUS]
  README.md → AGENTS.md
- `React Vite TypeScript Stack` --conceptually_related_to--> `TypeScript Entry Script`  [INFERRED]
  AGENTS.md → index.html
- `App()` --calls--> `useAppSelector`  [EXTRACTED]
  src/app/App.tsx → src/shared/store/config/index.ts
- `ProfileScreen()` --calls--> `useAppSelector`  [EXTRACTED]
  src/pages/ProfilePage/ui/ProfilePage.tsx → src/shared/store/config/index.ts
- `AuthResponse` --inherits--> `TokensResponse`  [EXTRACTED]
  src/entities/User/services/queriesForAuth/queriesForAuth.ts → src/shared/api/types/TokensResponse.ts

## Import Cycles
- 1-file cycle: `src/entities/Theme/index.ts -> src/entities/Theme/index.ts`

## Hyperedges (group relationships)
- **MCP Server Toolset** — agents_filesystem_mcp, agents_context7_mcp [EXTRACTED 1.00]
- **CI/CD Pipeline Steps** — workflows_main_checkout_action, workflows_main_setup_node_action, workflows_main_scp_action, workflows_main_ssh_action [EXTRACTED 1.00]

## Communities (27 total, 10 thin omitted)

### Community 0 - "Admin & User Management"
Cohesion: 0.07
Nodes (28): actions, ChangePassword(), useAppDispatch(), useAppSelector, AppRoutesProps, routeConfig, ConfirmEmail(), AppRoutes (+20 more)

### Community 1 - "Competition Editing"
Cohesion: 0.07
Nodes (20): AdminActions(), CompetitionEditingTable(), validateCompetition(), validateRequired(), trueFalse, getDefaultMRTOptions(), EditMultipleValueRow(), MatchEditingTable() (+12 more)

### Community 2 - "Routing & Navigation"
Cohesion: 0.06
Nodes (13): CompetitionsPageAsync, ForgotPageAsync, InfoPageAsync, LoginPageAsync, MainPageAsync, NationsPageAsync, ProfilePageAsync, RegistrationPageAsync (+5 more)

### Community 3 - "API & Auth"
Cohesion: 0.10
Nodes (24): baseQueryWithAuth, baseQueryWithReauth(), ActivateDto, ChangePasswordDto, LoginDto, RegistrationDto, SendCodeDto, Competition (+16 more)

### Community 4 - "Dependencies & Tooling"
Cohesion: 0.05
Nodes (43): browserslist, development, production, dependencies, axios, dayjs, @emotion/react, @emotion/styled (+35 more)

### Community 5 - "App Shell & Layout"
Cohesion: 0.09
Nodes (14): App(), matchesApi, nationsApi, resultApi, settingsApi, container, AppDispatch, RootState (+6 more)

### Community 6 - "Auth & Users"
Cohesion: 0.16
Nodes (15): Role, User, authApi, AuthResponse, { useGetResultQuery }, rolesApi, { useGetAllRolesQuery }, usersApi (+7 more)

### Community 7 - "Biome Lint Config"
Cohesion: 0.09
Nodes (22): source, assist, actions, enabled, files, includes, formatter, enabled (+14 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+12 more)

### Community 9 - "Shared UI Helpers"
Cohesion: 0.24
Nodes (8): PropTypes, WithValue, intersection(), not(), PropsTypes, ToggleList(), PropsTypes, TransferList()

### Community 10 - "Stats Page"
Cohesion: 0.22
Nodes (6): calcProjectedPrizes(), distributeSecondHalf(), DONUT_COLORS, getPriorityTable(), LINE_COLORS, PRIORITY_TABLES

### Community 11 - "Profile & Admin Pages"
Cohesion: 0.29
Nodes (5): AdminCard(), ConfirmEmailCard(), Roles, ProfileScreen(), UserDataCard()

### Community 12 - "Project Metadata"
Cohesion: 0.25
Nodes (8): React Vite TypeScript Stack, HTML Entry Point, Web App Manifest, Root Mount Div, TypeScript Entry Script, Toto App, Create React App, React Documentation

### Community 13 - "PWA Manifest"
Cohesion: 0.29
Nodes (6): background_color, display, name, short_name, start_url, theme_color

### Community 14 - "Theme Slice"
Cohesion: 0.40
Nodes (4): initialState, { reducer }, themeSlice, ThemeState

### Community 15 - "CI/CD Pipeline"
Cohesion: 0.33
Nodes (6): Continuous Deployment Workflow, Checkout Action, Build and Deploy Job, SCP Upload Action, Setup Node Action, SSH Activate Action

## Ambiguous Edges - Review These
- `React Vite TypeScript Stack` → `Create React App`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **125 isolated node(s):** `$schema`, `enabled`, `clientKind`, `useIgnoreFile`, `includes` (+120 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `React Vite TypeScript Stack` and `Create React App`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `useAppSelector` connect `Admin & User Management` to `Competition Editing`, `Profile & Admin Pages`, `App Shell & Layout`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `Title()` connect `Competition Editing` to `Admin & User Management`, `Stats Page`, `Profile & Admin Pages`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `$schema`, `enabled`, `clientKind` to the rest of the system?**
  _125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Admin & User Management` be split into smaller, more focused modules?**
  _Cohesion score 0.06830601092896176 - nodes in this community are weakly interconnected._
- **Should `Competition Editing` be split into smaller, more focused modules?**
  _Cohesion score 0.07456140350877193 - nodes in this community are weakly interconnected._
- **Should `Routing & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.05660377358490566 - nodes in this community are weakly interconnected._