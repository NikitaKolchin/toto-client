# Graph Report - toto-client  (2026-04-24)

## Corpus Check
- 144 files · ~13,109 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 219 nodes · 91 edges · 8 communities detected
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]

## God Nodes (most connected - your core abstractions)
1. `ErrorBoundary` - 5 edges
2. `validateCompetition()` - 4 edges
3. `getDefaultMRTOptions()` - 3 edges
4. `not()` - 3 edges
5. `useAppDispatch()` - 3 edges
6. `validateNation()` - 3 edges
7. `validateUser()` - 3 edges
8. `getScore()` - 3 edges
9. `ConfirmEmail()` - 2 edges
10. `handleCheckedRight()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `ConfirmEmail()` --calls--> `useAppDispatch()`  [INFERRED]
  src/features/ConfirmEmail/ui/ConfirmEmail/ConfirmEmail.tsx → src/shared/store/config/index.ts
- `handleCheckedRight()` --calls--> `not()`  [INFERRED]
  src/shared/ui/TransferList/TransferList.tsx → src/shared/lib/helpers.ts
- `handleCheckedLeft()` --calls--> `not()`  [INFERRED]
  src/shared/ui/TransferList/TransferList.tsx → src/shared/lib/helpers.ts
- `StakeEditingTable()` --calls--> `getDefaultMRTOptions()`  [INFERRED]
  src/widgets/StakeEditingTable/ui/StakeEditingTable/StakeEditingTable.tsx → src/shared/DefaultTable/index.ts
- `SettingEditingTable()` --calls--> `getDefaultMRTOptions()`  [INFERRED]
  src/widgets/SettingEditingTable/ui/SettingEditingTable/SettingEditingTable.tsx → src/shared/DefaultTable/index.ts

## Communities

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (5): getDefaultMRTOptions(), SettingEditingTable(), validateRequired(), validateSetting(), StakeEditingTable()

### Community 2 - "Community 2"
Cohesion: 0.25
Nodes (3): not(), handleCheckedLeft(), handleCheckedRight()

### Community 4 - "Community 4"
Cohesion: 0.53
Nodes (4): handleCreateCompetition(), handleSaveCompetition(), validateCompetition(), validateRequired()

### Community 5 - "Community 5"
Cohesion: 0.33
Nodes (3): ConfirmEmail(), useAppDispatch(), Layout()

### Community 6 - "Community 6"
Cohesion: 0.33
Nodes (1): ErrorBoundary

### Community 7 - "Community 7"
Cohesion: 0.6
Nodes (3): handleSaveNation(), validateNation(), validateRequired()

### Community 8 - "Community 8"
Cohesion: 0.6
Nodes (3): getScore(), handleCreateMatch(), handleSaveMatch()

### Community 9 - "Community 9"
Cohesion: 0.6
Nodes (3): handleSaveUser(), validateRequired(), validateUser()

## Knowledge Gaps
- **Thin community `Community 6`** (6 nodes): `ErrorBoundary`, `.componentDidCatch()`, `.constructor()`, `.getDerivedStateFromError()`, `.render()`, `ErrorBoundary.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 2 inferred relationships involving `getDefaultMRTOptions()` (e.g. with `StakeEditingTable()` and `SettingEditingTable()`) actually correct?**
  _`getDefaultMRTOptions()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `not()` (e.g. with `handleCheckedRight()` and `handleCheckedLeft()`) actually correct?**
  _`not()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `useAppDispatch()` (e.g. with `ConfirmEmail()` and `Layout()`) actually correct?**
  _`useAppDispatch()` has 2 INFERRED edges - model-reasoned connections that need verification._