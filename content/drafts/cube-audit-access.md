# Adversarial factual audit — chapters 07 and 08

Audit date: 2026-11-06. Scope: both HTML files, including generated examples, explanatory popovers, diagrams, summaries and quizzes. Compared against the current official index https://docs.cube.dev/llms.txt and pages linked below. No Cube runtime or version-pinned deployment was supplied; runtime failure modes below distinguish verified documentation contradictions from matters requiring execution. No handbook edits made.

## Confirmed discrepancies

### A1 — High: compile-time authorization example lacks its cache boundary

- Location: `content/cube-handbook/08.html:160-171`; repeated conceptual omission at `08.html:576`.
- Claim/example: derive `isFinance` in `extendContext`, then use it for `finance_view.public`, implying this changes for each caller. No `contextToAppId` is configured in this example.
- Official evidence: [Context variables — COMPILE_CONTEXT](https://docs.cube.dev/reference/data-modeling/context-variables#compile_context) says the compile context is evaluated once per app-ID key and does not change between users sharing that key. The [security-context guide](https://docs.cube.dev/docs/data-modeling/access-control/context#using-compile_context) introduces the app-ID mapping before dynamic models.
- Impact: finance and non-finance callers can reuse a model compiled with another caller's visibility. This example is unsafe to present as per-request authorization.
- Fix: use access-policy conditions/groups for caller authorization; if demonstrating dynamic compilation, include an app ID covering every authorization-dependent model variation and explain compilation/cache behavior. Do not imply tenant ID alone separates finance and non-finance within the same tenant.
- Certainty: high for documented cache behavior; exact observable leak/error/metadata visibility depends on endpoint and pinned version.

### A2 — High: the case-study view cannot expose the required WAU

- Location: `07.html:136`, `07.html:263`, `07.html:277-280`; compare `07.html:444-445`.
- Claim: every query, including the shared WAU requirement, goes through `sales_data_mart`.
- Actual example: that view includes only orders/customer/region members. `events.active_users` and `events.event_time` are absent, and events has no join or tenant dimension. The quiz instead asks readers to query the events cube directly.
- Official evidence: [Member-level security](https://docs.cube.dev/docs/data-modeling/access-control/member-level-security) distinguishes cube/view API surfaces; [matching](https://docs.cube.dev/docs/pre-aggregations/matching-pre-aggregations#eligible-pre-aggregations) substitutes view members with the cube members actually defined in that view. A view does not expose unrelated measures implicitly.
- Impact: the advertised common interface does not implement one of its two primary metrics, and the orders-only tenant filter cannot establish tenant scope for the disconnected events fact.
- Fix: explicitly scope the example to revenue, or add a coherent tenant-aware events model and supported view/query interface for WAU. Include that interface in the architecture and quiz.
- Certainty: high, by direct inspection; no claim that an unspecified future multi-fact model is impossible.

### A3 — High: selecting fields in a view does not enforce view-only access

- Location: `07.html:121`, `07.html:266`, `07.html:300`, `07.html:313-314`, `07.html:439`; model at `07.html:271-280`.
- Claim: AI only queries the curated view and therefore cannot select other tables/fields or make wrong joins.
- Actual configuration: no underlying cube has `public: false` or equivalent access restriction. The client behavior is asserted rather than enforced.
- Official evidence: [Member-level security](https://docs.cube.dev/docs/data-modeling/access-control/member-level-security#managing-member-level-access) states cubes, views and their members are public and introspectable by default, and access must be configured.
- Impact: creating a curated view alone does not remove direct cube surfaces, nor guarantee AI correctness. The architecture claims a stronger security and correctness boundary than its code supplies.
- Fix: state view usage as a client convention unless enforced; restrict underlying public API surfaces as appropriate, then test allowed queries and bypass attempts. Replace guarantees of no wrong joins with an accuracy objective.
- Certainty: high for defaults and missing configuration; no empirical AI accuracy conclusion.

### A4 — High: daily exact distinct counts cannot be freely summed into week/month counts

- Location: `07.html:272-274`, explanatory popover `07.html:294`.
- Claim: the daily `merchant_monthly_sales` rollup can serve weekly/monthly queries by summing daily values. It includes `unique_orders` with `type: count_distinct`.
- Official evidence: [Measures — type](https://docs.cube.dev/reference/data-modeling/measures#type) explicitly distinguishes exact distinct count from additive approximate distinct count. [Matching algorithm](https://docs.cube.dev/docs/pre-aggregations/matching-pre-aggregations#matching-algorithm) checks measure additivity and required dimensions.
- Impact: the blanket reuse claim is false for queries selecting `unique_orders`; Cube must preserve distinct semantics rather than sum daily distinct integers. Queries may miss that rollup, and rollup-only can reject them. A query selecting only additive revenue is a different case (quiz q8 can remain conditional).
- Fix: qualify the popover by selected measures; use an additive order-count definition only if the source grain/uniqueness warrants it, an explicitly approximate distinct count, or exact rollups at the required grains.
- Certainty: high for non-additivity; exact-grain exceptions depend on matching/version and should be tested rather than denied categorically.

### A5 — Medium: five-minute refresh is presented as a maximum staleness guarantee

- Location: `07.html:296`, `07.html:419` (also simplified at `07.html:161`).
- Claim: dashboard data can lag at most approximately one configured refresh cycle.
- Official evidence: [Refreshing pre-aggregations](https://docs.cube.dev/docs/pre-aggregations/refreshing-pre-aggregations#refresh-scheduler-interval-error) documents overloaded refresh workers and unfinished intervals. [Pre-aggregation refresh_key](https://docs.cube.dev/reference/data-modeling/pre-aggregations#refresh_key) describes scheduling/checks, not a completed-build deadline.
- Impact: five minutes is not an end-to-end freshness bound: queueing, source ingestion, build duration and failures add lag.
- Fix: call this a target refresh/check interval, and require measured freshness plus build monitoring before promising a maximum.
- Certainty: high; no numeric alternative SLA inferred.

### A6 — High: hosted MCP explanation and quiz retain the old direct-API/JWT story

- Location: `07.html:171`, `07.html:401`, `07.html:454-455`; compare hosted endpoint configuration at `07.html:343-350`.
- Claim: the shown MCP agent sends an application JWT, discovers via Meta API, and submits Semantic SQL or GraphQL.
- Official evidence: current [MCP server](https://docs.cube.dev/docs/integrations/mcp-server#query-and-discovery) documents `searchDataModel` discovery and `runQuery` using SQL API; its authentication sections document OAuth and API-key token flows. No GraphQL MCP tool is listed.
- Impact: the quiz describes a different integration than the hosted connector actually configured. Passing a merchant JWT to a normal Core REST client does not describe the shown Cloud OAuth identity flow or prove tenant context propagation.
- Fix: describe hosted MCP identity and tools accurately; separately label any custom Core MCP adapter, including how it obtains and forwards user context. Replace q11's blanket JWT/Meta answer with the chosen integration's actual contract.
- Certainty: high for current hosted tooling; a custom adapter can do otherwise, but none is implemented here. Historical claims need dates/version pins.

### A7 — Medium: JWT_KEY is incorrectly described as another JWKS mechanism

- Location: `08.html:571`, quiz `08.html:599-600` (`ch08_q2`).
- Claim: JWKS is read through `CUBEJS_JWK_URL` or `CUBEJS_JWT_KEY`.
- Official evidence: [JWT configuration reference](https://docs.cube.dev/reference/configuration/config#jwt) defines `jwkUrl` as a JWKS URL, while `key`/`CUBEJS_JWT_KEY` is cryptographic key material, analogous to the API secret.
- Impact: confuses a fetched key set with a locally configured verification key and associated rotation behavior.
- Fix: separate shared secret, configured verification key, JWKS URL and custom authentication; fix both glossary and quiz.
- Certainty: high for current configuration contract.

### A8 — Medium: conditional measure masking omits an explicit unmasking exception

- Location: `08.html:316`, generated warning `08.html:515`.
- Claim: without grouping by the row-filter dimension, the entire conditional measure always becomes masked.
- Official evidence: [Masking across multiple policies](https://docs.cube.dev/docs/data-modeling/data-access-policies#masking-across-multiple-policies) also documents unmasking when the query's own filter is equally or more restrictive on the same member; this can expose the real aggregate without grouping by that dimension.
- Impact: teaches an absolute masking rule that gives the wrong result for a documented supported query shape.
- Fix: add the query-filter exception and demonstrate a matching restricted query alongside the unfiltered aggregate.
- Certainty: high for current docs, but the release introducing this optimization is not established; pin the engine/version when describing older behavior.

### A9 — Medium: policy summary reverses the denial quantifier

- Location: `08.html:564` (`sections.s6.sum`).
- Claim: result is empty when no member is allowed (`Không member nào được phép`).
- Official evidence: [Policy evaluation](https://docs.cube.dev/docs/data-modeling/data-access-policies#the-permission-space) denies when any queried member has no granting policy.
- Impact: a mixed query with one allowed member and one forbidden member is incorrectly implied to succeed in this summary.
- Fix: say `Chỉ cần một member trong truy vấn không được policy nào cho phép thì truy vấn bị từ chối / trả kết quả rỗng.`
- Certainty: high; this is a discrepancy between the generated summary and the chapter's own more precise prose.

## Source conflicts and claims not established as confirmed errors

1. **08.html:521 — legacy compile-context syntax.** The generated YAML comment uses `"{COMPILE_CONTEXT.security_context.tenant_id}.orders"`. The current [context-variable reference](https://docs.cube.dev/reference/data-modeling/context-variables#compile_context) requires Jinja `{{ }}` and shows `securityContext`; however the current [multitenancy guide](https://docs.cube.dev/embedding/multitenancy#queryrewrite-vs-multitenant-compile-context) itself still shows the legacy single-brace `security_context` form. This is an official-source conflict. Prefer the reference's modern syntax, but do not claim runtime incompatibility without testing the selected release.
2. **08.html:175 — direct Core Data API `cubeCloud.userAttributes` advice.** Current [access-policy reference](https://docs.cube.dev/reference/data-modeling/data-access-policies#using-securitycontext) says direct Core Data API authentication should use `securityContext` rather than `userAttributes`. The handbook's instruction to put Cloud groups/attributes inside `cubeCloud` needs an exact supported authentication-integration source and version; absent that, show top-level application claims plus `contextToGroups`. A `cubeCloud` claim alone should not be taught as automatically recreating platform identity.
3. **08.html:373-404, 537-542 — tenant filter versus staff member permissions.** The example injects `orders_view.tenant_id` while store_staff grants only status/created_at/count. Whether rewrite-added filter members bypass ordinary member-access checks must be established with the chosen version. The view definition itself is omitted. Do not assert a demonstrated execution result until this query shape is tested.
4. **07.html:274 — YAML pre_aggregations mapping.** Modern [reference](https://docs.cube.dev/reference/data-modeling/pre-aggregations#name) uses a sequence with `- name:`; this example uses the JS-style keyed mapping. This audit did not prove the parser rejects that form on all relevant versions. Convert to documented YAML or execute a compile test before calling it runnable.
5. **07.html:113 — “v0.33 conventions.”** Current syntax is not automatically evidence of the exact release in which every convention arrived. The historical version attribution needs an official release/tag citation or should be removed.
6. **08.html:276 — masking introduced in Core v1.6.23.** Current behavior docs do not alone establish the introduction version. Needs an official release/tag source before retention as verified history.
7. **07.html:362-365, 373 — numerical benefits and maintenance hours.** Explicitly fictional; no external benchmark can verify them. Keep them as hypothetical targets, never measured outcomes. Likewise rollups alone do not establish the guaranteed P95 language at `07.html:439`.
8. **07.html:378-381 — third-party repo and shell commands.** This audit used only official Cube sources and did not execute or inspect the unrelated third-party repository. Container names, SQL path and the `<` shell redirection should not be presented as verified Windows PowerShell instructions.

## Already-exposed case-study contradictions still requiring resolution

`07.html:123-128` acknowledges profit versus net revenue, customer versus merchant tenant ID, missing regions cube and rollup-only/miss inconsistency (`07.html:153`). These are not hidden new findings, but warnings inside a “deep read” do not turn the displayed model into an internally coherent runnable case. Either correct the model and diagrams together or label the whole example prominently as intentionally incomplete/pseudocode before copyable code. In particular, tenant identity mismapping is material to the claimed isolation boundary.
