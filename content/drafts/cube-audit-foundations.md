# Adversarial factual audit: foundations (00–03)

Audit date: 2026-11-06. Scope: `content/cube-handbook/{00,01,02,03}.html`, including script-generated explanations, snippets and quiz explanations. No handbook files modified. Sources were discovered using [the official documentation index](https://docs.cube.dev/llms.txt). Line numbers below refer to the reviewed files, before subsequent edits by other agents. Severity expresses impact on the handbook contract, not a security vulnerability assessment.

## Substantiated discrepancies

### F01 — The setup does not launch the promised Postgres service (high)

- **Locations:** `03.html:75–87`, `03.html:391`, `03.html:462–463`; also the promise in `02.html:185–186` that chapter 03 implements the pictured local architecture.
- **Problem:** Following `npm install -g cubejs-cli`, `cubejs create ng-demo -d postgres`, and `docker-compose up -d` does not create a Postgres container. The driver flag selects connectivity support; it does not provision that database. The quiz explicitly marks “start Postgres and Cube containers” as correct.
- **Official evidence:** [CLI project templates](https://github.com/cube-js/cube/blob/master/packages/cubejs-cli/src/templates.ts), `dockerCompose`, define a single `cube` service; no `postgres` service, DB volume, database creation, user, or credentials. Generated starter orders data are a SQL literal sample, not a running Postgres instance.
- **Impact:** A reader cannot reach the promised setup; subsequent connection and import instructions require an independently supplied server. Marking the checklist complete is misleading.
- **Concrete fix:** Supply a complete, pinned Compose file with Postgres service, health check, environment values, persistent storage and matching Cube host configuration; or change every setup/quiz claim to “start Cube” and explicitly require an existing Postgres server.
- **Certainty/version:** High for current official CLI template. An author-customized Compose file could start Postgres, but no such file is supplied in these chapters.

### F02 — The CLI is deprecated, but introduced as the unqualified current setup path (medium)

- **Locations:** `03.html:75–84`, `03.html:401–403`.
- **Problem:** Instructions install an unpinned `cubejs-cli` while calling it the Cube CLI, without distinguishing the legacy `cubejs` CLI from the newer Cube CLI.
- **Official evidence:** [v1.8 release notes](https://cube.dev/blog/cube-core-v1-8-mistake-proof-defaults-performance) explicitly deprecate `cubejs` / `cubejs-cli` in favor of the new Cube CLI.
- **Impact/fix:** Readers receive a deprecated workflow while believing this is current guidance. Label it as a legacy Core project generator with a tested version, or replace it with the documented current Core setup. Deprecation alone does not prove these commands fail.
- **Certainty/version:** High; applies to v1.8/current documentation, not to the historical v0.33 era.

### F03 — The purported Superstore practice lacks the data-loading path needed for its model (high usability)

- **Locations:** `03.html:106–135`, `03.html:302`, `03.html:310–319`, `03.html:331–332`.
- **Problem:** The chapter now correctly distinguishes `ecom-dump.sql` from Superstore, but the only executable import loads the unrelated ecom dataset. It never provides the Superstore source, CSV import/transformation instructions or rows for the supplied DDL. `createdb ecom` also differs from the configured `CUBEJS_DB_NAME=ecom_db`. `users.js` introduces another table without defining/loading it. The displayed 2026 response is not identified there as synthetic.
- **Official evidence:** The [Cube model reference](https://docs.cube.dev/reference/data-modeling/cube#sql_table) defines `sql_table` as the actual table Cube will query; it does not create or populate it. The official [CLI templates](https://github.com/cube-js/cube/blob/master/packages/cubejs-cli/src/templates.ts) supply different literal starter data and no Superstore loader.
- **Impact:** This is advertised as an ordered practical exercise, but the source-to-model-to-query chain cannot be reproduced from the chapter. Creating the shown table gives zero rows, not the illustrated response.
- **Concrete fix:** Choose one dataset throughout; provide its licensed download/source and explicit import script, matching DB name, all required tables and expected counts. Otherwise label the entire dataset/model/response sequence as disconnected examples and list the missing prerequisites prominently.
- **Certainty/version:** High from the file contents. I have not claimed the unrelated ecom download is unavailable.

### F04 — Read-only driver is incorrectly taught as a universal write blocker (high)

- **Locations:** `02.html:163`, `02.html:169`, `02.html:265–266`, `02.html:317`, `02.html:346–347`.
- **Problem:** “chặn mọi thao tác ghi” / only SELECT / no schema changes overstates what the driver flag enforces. Its ordinary purpose is to let external pre-aggregation builds stream/download results rather than staging tables in the source. It is not a database permission boundary or a general SQL firewall.
- **Official evidence:** [PostgresDriver source](https://github.com/cube-js/cube/blob/master/packages/cubejs-postgres-driver/src/PostgresDriver.ts): `readOnly()` returns the configuration flag, while `queryResponse()` sends SQL directly to the connection. `prepareConnection()` sets timezone and timeout, not a read-only transaction. Table creation/upload methods do not reject solely on that flag.
- **Impact:** Readers may rely on this flag instead of database role privileges or misunderstand writes performed by custom code/model SQL.
- **Concrete fix:** Describe the supported pre-aggregation build strategy and expected absence of staging writes. Explicitly require a least-privilege database account for enforcement; replace the quiz's universal “blocks all writes” wording. Do not suggest the source can never receive a non-SELECT statement.
- **Certainty/version:** High for the inspected Postgres implementation. Do not generalize implementation details to every driver; the v0.28 default change itself is historically correct.

### F05 — Timer refresh-key optimization is generalized to every refresh key (high)

- **Locations:** `02.html:171`, `02.html:270–273`, `02.html:296`, `02.html:348–349`.
- **Problem:** The chapter claims that from v0.28 the source no longer receives repeated `refresh_key` checks. Custom SQL keys that read source tables still need to execute against that source. The visualization gives an unconditional zero count.
- **Official evidence:** [v0.28 notes](https://cube.dev/blog/cube-core-v0-28-batching-and-export-buckets) specify **timer** refresh keys. [Cube `refresh_key` reference](https://docs.cube.dev/reference/data-modeling/cube#refresh_key) supports source-reading keys such as `SELECT MAX(updated_at_timestamp) FROM orders` and distinguishes them from interval keys.
- **Impact:** Incorrect query-budget/observability expectations; encourages interpreting legitimate source refresh SQL as a regression.
- **Concrete fix:** Restrict prose and diagram to interval-only keys and explicitly contrast custom `sql` keys. For current versions, mention interval keys can also be evaluated locally when configured; do not insist Cube Store always runs them.
- **Certainty/version:** High. The [v1.8 notes](https://cube.dev/blog/cube-core-v1-8-mistake-proof-defaults-performance) add local interval-key evaluation, further limiting the unqualified current claim.

### F06 — v0.28 is wrongly credited with completed rolling-window rollup support (medium)

- **Locations:** `02.html:155`, `02.html:344–345`.
- **Problem:** Moving partition evaluation is said to mean Cube could use rolling-window rollups in that release.
- **Official evidence:** [v0.28 release notes](https://cube.dev/blog/cube-core-v0-28-batching-and-export-buckets) call the partition move the **first step towards** supporting rolling-window rollups. That wording does not announce delivered support.
- **Impact/fix:** Corrupts version history and can lead a reader to deploy an insufficient historical version. Say the change fixed range-related partition evaluation and laid groundwork for later rolling-window support. Cite the actual later release separately if specifying availability.
- **Certainty/version:** High about the unsupported attribution; this audit does not establish the earliest later release that completed all relevant forms of rolling-window support.

### F07 — Quiz explicitly contradicts the compiler/aggregate-awareness relationship (high educational)

- **Locations:** `02.html:330–331`, `02.html:336–337`; compare `02.html:75`, `02.html:127`, `02.html:223`.
- **Problem:** The correct-answer explanation says Schema Compiler does **not** choose rollups, and another explanation says SQL must first exist before matching can occur. These are categorical statements, although surrounding prose correctly acknowledges that matching is part of compilation.
- **Official evidence:** [`PreAggregations.ts` inside `cubejs-schema-compiler`](https://github.com/cube-js/cube/blob/master/packages/cubejs-schema-compiler/src/adapter/PreAggregations.ts) contains `findPreAggregationForQuery()` and matching logic used during query generation.
- **Impact:** Learners are penalized for understanding real component boundaries; they learn that Aggregate Awareness is a mutually exclusive implementation component outside the compiler.
- **Concrete fix:** Ask what *capability* chooses a rollup, while explaining that it runs as part of compilation/planning. State the numbered ordering is pedagogical and must not be read as “generate final SQL, then match.” Remove the false distractor explanations.
- **Certainty/version:** High for documented JS compiler implementation; Tesseract internals can differ, so avoid freezing internal package boundaries as a timeless API contract.

### F08 — “No SQL reaches the warehouse” needs stronger scenario bounds (medium)

- **Locations:** `02.html:145`, `02.html:242`, `02.html:250`, `02.html:262`, `02.html:328–329`, `02.html:340–341`, `02.html:350–351`.
- **Problem:** A matching rollup is treated as sufficient to guarantee exactly zero warehouse commands. The earlier scenario only excludes a usable result-cache entry and enables raw-source fallback. It does not exclude source-reading refresh keys, missing builds, rebuilds, refresh workers or range queries.
- **Official evidence:** [Refreshing pre-aggregations](https://docs.cube.dev/docs/pre-aggregations/refreshing-pre-aggregations) describes refresh-worker rebuilds. [Cube refresh-key reference](https://docs.cube.dev/reference/data-modeling/cube#refresh_key) permits source-reading SQL keys.
- **Impact/fix:** Change to “the foreground analytical SELECT reads an already-built usable rollup”; explicitly exclude build/refresh/freshness queries from the zero count. The demonstration is valid under that narrow scenario, not as an all-traffic statement.
- **Certainty/version:** High that the guarantee is overbroad; actual number of commands is configuration-dependent.

### F09 — A general multi-API lifecycle incorrectly requires JWT authentication for SQL protocol (medium)

- **Locations:** `02.html:137`, `02.html:236–237`, `02.html:294`, `02.html:311–312`, `02.html:338–339`.
- **Problem:** The lifecycle starts with REST, GraphQL **or SQL API**, but then universally verifies JWT and derives securityContext from it.
- **Official evidence:** [SQL API authentication](https://docs.cube.dev/reference/core-data-apis/sql-api/security) supports `checkSqlAuth(req, username)` returning password and securityContext for Postgres-protocol authentication. [SQL API transports](https://docs.cube.dev/reference/core-data-apis/sql-api) distinguish Postgres connections from HTTP token-based calls.
- **Impact/fix:** Readers cannot map BI/psql authentication to the diagram. Say “authenticate using the transport's mechanism and obtain securityContext; for REST/GraphQL this commonly uses JWT; SQL protocol may use username/password and checkSqlAuth.” Scope JWT quiz questions to the REST example.
- **Certainty/version:** High for documented Core SQL protocol. Managed-platform authentication options can add further mechanisms.

### F10 — Datawarehouse-copy and zero-cost caching claims are false (medium)

- **Locations:** `01.html:175`, `01.html:189`; related warehouse analogy at `01.html:255`.
- **Problem:** Cube is said not to copy data out of the warehouse and to cache with no increase in warehouse cost. External rollups are physically materialized datasets outside the source; building and refreshing them consumes source compute and may incur egress.
- **Official evidence:** [Pre-aggregation getting started](https://docs.cube.dev/docs/pre-aggregations/getting-started-pre-aggregations) explains condensed source datasets stored in Cube Store and refresh/rebuild behavior. [v0.28 notes](https://cube.dev/blog/cube-core-v0-28-batching-and-export-buckets) establish Cube Store as the default external pre-aggregation store for new projects.
- **Impact/fix:** Incorrect data-residency and cost expectations. Say Cube retains the warehouse as the authoritative source, may materialize pre-aggregated data in Cube Store, and can reduce repeated analytical scans while still paying build/refresh costs.
- **Certainty/version:** High. Net cost savings depend on workload; no universal monetary outcome is guaranteed.

### F11 — Chapter 01's dimension definitions omit required SQL (medium)

- **Location:** `01.html:204` (generated YAML for `status` and `created_at`).
- **Problem:** Both dimensions specify only name/type, unlike the documented plain-dimension shape. They have no SQL, case expression, geo expression or inheritance that would supply one.
- **Official evidence:** [Dimensions reference](https://docs.cube.dev/reference/data-modeling/dimensions) specifies name, sql and type for ordinary dimensions. [CubeValidator.ts](https://github.com/cube-js/cube/blob/master/packages/cubejs-schema-compiler/src/compiler/CubeValidator.ts), `DimensionsSchema`, requires SQL in the ordinary-dimension branch.
- **Impact/fix:** A copied illustrative model is not valid as written. Add `sql: status` and `sql: created_at`. Also declare the referenced customers cube (or clearly mark it as a separate omitted dependency).
- **Certainty/version:** High for the explicit plain-dimension definitions shown and current validator. Special dimension types/inherited members have other valid forms but are absent here.

### F12 — REST count response is the wrong type for this Postgres example (medium)

- **Location:** `03.html:332`.
- **Problem:** `orders.count` is the number `120`, while `orders.total_sales` is a string. With the described Postgres REST path and no numeric-casting option/transform, a count is returned as a numeric string.
- **Official evidence:** [REST numeric conversion recipe](https://docs.cube.dev/recipes/core-data-api/cast-numerics) documents numeric strings and opt-in front-end conversion. The [REST reference](https://docs.cube.dev/reference/core-data-apis/rest-api/reference) shows count as a string and explains driver-native numeric representation.
- **Impact/fix:** Inaccurate response-shape contract. Change to `"120"`, label the whole response synthetic, and explain deliberate conversion where it is needed. Do not claim every driver always emits strings in every API.
- **Certainty/version:** High for the stated Postgres REST example; types vary with drivers, client transformations, options and SQL transport.

### F13 — chartPivot rows are incorrectly passed straight to Chart.js datasets (medium)

- **Locations:** `03.html:185`, `03.html:220–227`, `03.html:350`, `03.html:358`, `03.html:481–482`.
- **Problem:** `chartData = res.chartPivot()` yields rows with `x`, `xValues` and member-keyed values. The template binds these rows as `[datasets]`. They are not Chart.js dataset objects with a `data` array. The limitation note only mentions missing variables, so adding those variables does not repair this central conversion error. Single-value cards also receive an array, not the intended scalar.
- **Official evidence:** [`ResultSet.chartPivot()` SDK reference](https://docs.cube.dev/reference/javascript-sdk/reference/cubejs-client-core#chartpivot) documents that row shape and `series()` as another useful representation; Cube remains visualization-agnostic.
- **Impact/fix:** Even a reader completing the declared missing fields cannot draw the promised chart or number correctly. Add an explicit adapter into labels and `{label, data}` datasets, and extract the selected scalar for single-value cards. Bound the example to specified chart-library versions.
- **Certainty/version:** High for the shown data-shape mismatch. No Angular runtime was launched; this is a contract comparison, not an executed build result.

### F14 — Current dependencies are installed against an unversioned historical Angular/chart example (medium)

- **Locations:** `03.html:189`, `03.html:220–222`, `03.html:341–350`.
- **Problem:** The npm command resolves latest packages, but the sample has a historical `ChartsModule` / `[datasets]` / `[chartType]` integration without version bounds. Cube's Angular client now has its own current minimum Angular version. Saying only “not a complete project” does not explain which environment could compile these APIs.
- **Official evidence:** [v1.8 release notes](https://cube.dev/blog/cube-core-v1-8-mistake-proof-defaults-performance) state that `@cubejs-client/ngx` requires Angular 20+, beginning in v1.7.41.
- **Impact/fix:** Pin the historical Angular/Cube/ng2-charts/Chart.js versions and date the example, or update all snippets and install commands together for a current tested stack. State the Angular 20 minimum when using current Cube packages.
- **Certainty/version:** High for Cube's Angular minimum and missing pins. Exact latest ng2-charts compilation errors were not independently checked against its official documentation, so those remain a version-compatibility risk, not a separately proven Cube defect.

### F15 — Authentication promises omit the CLI-generated development-mode exception (high educational)

- **Locations:** `03.html:99`, `03.html:158`, `03.html:173`, `03.html:411–415`, especially `03.html:466–467` (only accept tokens signed with the correct secret). Also `00.html:557–558` and `00.html:775` need an explicit non-dev assumption.
- **Problem:** The setup uses the generated dev environment, but later explanations imply that successful queries demonstrate JWT signature enforcement. The default generated `.env` has `CUBEJS_DEV_MODE=true`. Dev mode bypasses authentication; a successful request here does not establish production authorization behavior.
- **Official evidence:** [CLI template](https://github.com/cube-js/cube/blob/master/packages/cubejs-cli/src/templates.ts) sets dev mode true. [Angular integration docs](https://docs.cube.dev/reference/javascript-sdk/angular) explicitly state development mode bypasses authentication. [REST authentication docs](https://docs.cube.dev/reference/core-data-apis/rest-api#authentication) say tokens are not required in development but can still supply context.
- **Impact/fix:** Add a clearly scoped test: use dev mode locally for exploring, then test authentication with `CUBEJS_DEV_MODE=false` and valid/invalid/missing tokens in an isolated local environment. Qualify signature-verification claims and quizzes with “outside development mode, using default JWT auth.” Do not present a dev-mode success as RLS assurance.
- **Certainty/version:** High for current documented/generated dev mode; specific access-policy bypass details can vary, so test them rather than extending this claim to every authorization hook.

### F16 — Raw REST integrations omit Cube's required Continue-wait handling (medium)

- **Locations:** `03.html:167–173`, `03.html:257–261`.
- **Problem:** The cURL/Bubble path is introduced as receiving the result after one call. It never explains the possible HTTP 200 `{ "error": "Continue wait" }` response or retrying the same query. This differs from the SDK path, which handles polling internally.
- **Official evidence:** [REST Continue wait documentation](https://docs.cube.dev/reference/core-data-apis/rest-api#continue-wait) describes repeated identical requests until completion and warns abandoned queries can become orphaned. HTTP success is not sufficient evidence of a data payload.
- **Impact/fix:** Add a bounded polling workflow (same query/request span, retries, timeout, other-error handling), or explicitly bound this lab to a prewarmed fast query and point to robust production handling. A one-shot curl is acceptable as a diagnostic, not a universal integration implementation.
- **Certainty/version:** High; manifests with slow queries/queues and may not occur in small local examples.

### F17 — “Code and output at this step” falsely suggests the miniature compiler generates the displayed SQL (medium)

- **Locations:** `00.html:196`, `00.html:472`, `00.html:577–617`, `00.html:745–747`; sample with order at `00.html:377–389`.
- **Problem:** The miniature `compile()` has no handling for `query.order`, but its adjacent “output” for the city-ranking query contains `ORDER BY 2 DESC`. It emits parameter placeholders, whereas the output uses literal values and also lists separate params. The global simulation note avoids a claim that real Cube is running, but the code/output correspondence is still false.
- **Official evidence:** [REST query format](https://docs.cube.dev/reference/core-data-apis/rest-api/query-format) documents order as operative query behavior; [SQL endpoint reference](https://docs.cube.dev/reference/core-data-apis/rest-api/reference#base_path-v1-sql) documents SQL text with placeholders and a separate parameter collection. The local mismatch is directly visible in the displayed function and constant output.
- **Impact/fix:** Label the function non-executable pseudocode and the output an independently authored explanatory SQL sketch; or implement the supported sorting subset and show actual placeholder SQL plus params generated by it. Keep a literal-expanded SQL view separate and named as such.
- **Certainty/version:** High about the local mismatch. No claim that this pedagogical function must reproduce all real compiler behavior.

## Unverified, version-dependent, or insufficiently bounded claims (not established false)

1. **`00.html:223–234`, `00.html:817`: exact eager startup/save five-stage compiler pipeline.** The docs describe model syntax and directory structure, not this strict implementation sequence. Template references cannot all be treated as simple startup-time alias substitution: aliases and SQL depend on the query and join path. Fix by labeling the pipeline conceptual and avoiding exact lifecycle timing unless verified against a pinned compiler implementation. Confidence: medium concern; not asserted as a reproduced failure.
2. **`00.html:780`: same JSON always yields the same SQL.** This needs stable model, configuration, security context, timezone defaults, compiler/planner version and pre-aggregation context. Official source examples show SQL may target rollups; [the SQL endpoint](https://docs.cube.dev/reference/core-data-apis/rest-api/reference#base_path-v1-sql) also exposes planning-related flags. Fix: “for the same query and the same model/configuration/context, SQL generation is programmatic rather than an LLM guess.” Not a claim that nondeterministic SQL is generated under identical full inputs.
3. **`00.html:528`, `00.html:653`, `00.html:698`, `00.html:718`: `claude-sonnet-5-5`.** No Cube source establishes this external provider model identifier. This audit's allowed evidence set does not establish whether it exists. Replace with a clearly marked `YOUR_SUPPORTED_MODEL` placeholder or validate against Anthropic documentation before calling the full route usable. Not declared false from absence of evidence.
4. **`00.html:670–724`: “entire server code” remains a route fragment.** It assumes an initialized `app`, request-body middleware, authenticated `req.user`, env variables and the separately shown Cube queryRewrite config. The text at `00.html:213` does not fully name those prerequisites. Explicitly label a route fragment and enumerate them. SDK correctness is distinct from missing application scaffolding.
5. **`00.html:808`, `01.html:202–206`: referenced shops/customers definitions are omitted.** These model fragments require those cubes and their keys to exist. State those omitted dependencies or supply them. Do not call an excerpt a standalone runnable model. No isolated compile run was performed for these snippets.
6. **`01.html:80`, `01.html:244`, `01.html:282–283`: unconditional byte-for-byte portability both ways.** Shared modeling syntax does not establish compatibility across arbitrary Core/Cloud versions, feature flags, source dialects, custom execution environments or platform-specific attributes. Fix by bounding portability to compatible versions/features/configuration; no concrete failing model was produced during this audit.
7. **`02.html:119`, `02.html:231`: P95 <250ms “target on medium infrastructure”.** No reproducible workload/hardware or official benchmark is identified. It is explicitly not a guarantee, but attribution to “handbook” is circular. Supply a measured fixture/source or remove the numeric target. Not called demonstrably false.
8. **`03.html:242`, `03.html:372–377`, `03.html:485–488`: historical Playground labels.** The figure caption acknowledges historical labels, but quizzes ask them without the historical bound. Add the same version/screenshot bound to quiz questions or update them to current UI. This audit did not launch a specific Playground version.
9. **`03.html:109–111`: plain HTTP dump import and absent `-L`.** The endpoint's redirect/content behavior was not verified; do not claim this loads SQL successfully until testing the download and inspecting the file. Prefer an official HTTPS source and fail-on-error/follow-redirect options once confirmed.

## Method limits

This was an independent source audit, not a Cube deployment or Angular build. Only official Cube docs/blog/source underpin the substantiated Cube behavior claims. Current docs contain some historical defaults inconsistent with newer release notes; version-specific release notes were preferred for current behavior, and no default refresh interval was used as a finding. Source URLs on `master` are moving references; pin the reviewed commit when implementing regression fixtures. Comparison/pricing claims in 01 were separately assigned to the parent auditor and are not adjudicated here.
