# Adversarial factual audit: chapters 04–06

Audit date: 2026-11-06. Read the complete HTML, including figure text in JavaScript, glossary, summaries and quizzes. Documentation was located from https://docs.cube.dev/llms.txt. Findings concern current documentation/source unless explicitly stated; no Cube runtime was executed and master URLs are mutable. Handbook files were not modified.

## Substantiated discrepancies

### 1. GraphQL query uses fields that the snake_case model does not expose

- **Location:** `content/cube-handbook/06.html:131`, `:155`, `:158`, `:159`, `:347`.
- **Problem:** The text says GraphQL names are camelCase and queries `orderDate`/`totalSales`, whereas the REST/model examples define `order_date`/`total_sales`.
- **Evidence:** [Official GraphQL implementation](https://github.com/cube-js/cube/blob/master/packages/cubejs-api-gateway/src/graphql.ts): `safeName` removes the cube prefix without changing case; `makeSchema` uses it for member fields and filter fields. `objectName` camelizes GraphQL *type* names, a different operation.
- **Impact:** Copying the GraphQL example against the displayed model produces unknown-field validation errors.
- **Fix:** Use `order_date` in the where clause and selection, `total_sales` in the selection; say member names follow the declared model and introspect the schema.
- **Certainty:** High for current master; verify a pinned historic tag before making a historical behavior claim.

### 2. FILTER_GROUP repair snippet is itself malformed

- **Location:** `content/cube-handbook/06.html:217`.
- **Problem:** `FILTER_PARAMS.a.filter('a')` and `FILTER_PARAMS.b.filter('b')` omit the cube name.
- **Evidence:** [Context variables](https://docs.cube.dev/reference/data-modeling/context-variables#filter_group) documents `FILTER_PARAMS.cube_name.member_name.filter(...)`, including both components in FILTER_GROUP examples.
- **Impact:** The copyable repair cannot resolve the intended members.
- **Fix:** Use the chapter-04 example, e.g. `FILTER_PARAMS.filter_group.a.filter('a')` and `.filter_group.b.filter('b')`, in a clearly labeled JavaScript template literal or use the YAML brace syntax.
- **Certainty:** High; independent of the release-era naming convention.

### 3. An invented refresh_range setting and wrong out-of-range behavior

- **Location:** `content/cube-handbook/05.html:149`, `:252`, `:293`, `:314`, `:342`–`:343`.
- **Problem:** These describe `refresh_range` as a rollup setting and teach that exceeding it causes a miss/fallback to the warehouse.
- **Evidence:** [Pre-aggregation reference](https://docs.cube.dev/reference/data-modeling/pre-aggregations#build_range_start-and-build_range_end) uses `build_range_start`/`build_range_end`. It says results outside that range are not returned; queries can be empty. The reference contains no `refresh_range` parameter.
- **Impact:** Readers search for or configure a nonexistent option and can mistake missing historical results for a harmless warehouse fallback.
- **Fix:** Replace the term with the actual build-range settings and describe their restricted result coverage. Separate this from matching failures and `refresh_key.update_window`.
- **Certainty:** High for current docs. Do not present as a verified claim about every v0.28-era release without examining that tag.

### 4. Tenant-isolation quiz contradicts the fail-open code

- **Location:** `content/cube-handbook/06.html:381`–`:382`; code at `:98`–`:105` and `:114`–`:120`.
- **Problem:** The accepted answer promises every query receives a tenant filter and tenants see only their own data. A missing tenant claim returns the unchanged query. The prose at line 91 acknowledges that exact gap.
- **Evidence:** The displayed conditional itself proves the discrepancy. [Configuration query_rewrite](https://docs.cube.dev/reference/configuration/config#query_rewrite) explains that throwing prevents execution; it does not supply automatic rejection for absent custom claims.
- **Impact:** A security exercise rewards an unsafe guarantee.
- **Fix:** Make the sample fail closed and update the explanation, or explicitly ask what happens *when a tenant claim is present* and quiz the missing-claim failure separately.
- **Certainty:** Certain from code; does not depend on Cube version.

### 5. Fanout explanation omits the required primary key

- **Location:** `content/cube-handbook/04.html:156`–`:181`, `:453`, `:493`–`:494`.
- **Problem:** Relationship correctness is presented as sufficient for automatic duplicate protection. The join snippet provides no primary-key dimensions and references `orders.id` without showing a definition.
- **Evidence:** [Join reference: setting a primary key](https://docs.cube.dev/reference/data-modeling/joins#setting-a-primary-key) explicitly requires a primary key for joins and explains distinct-key deduplication.
- **Impact:** A reader can copy an incomplete model or expect sum protection without the key Cube needs.
- **Fix:** State that accurate relationships and valid unique primary keys are required. Add complete `line_items`/`orders` definitions or explicitly label the snippet as a fragment requiring existing key dimensions.
- **Certainty:** High; official requirement, not a speculative SQL optimization concern.

### 6. public:true is stated as universal, omitting primary-key default

- **Location:** `content/cube-handbook/04.html:95`, `:450`, `:485`–`:486`.
- **Problem:** Every member is said to default to public:true.
- **Evidence:** [Join reference](https://docs.cube.dev/reference/data-modeling/joins#setting-a-primary-key) says setting `primary_key: true` changes the dimension's default public value to false.
- **Impact:** Metadata and API exposure differ from what the learner expects, especially after adding the required keys from finding 5.
- **Fix:** Qualify the default and show `public: true` explicitly if a primary key needs public exposure.
- **Certainty:** High for current behavior; no verified first-release date.

### 7. Query-result cache is reduced to a TTL-only model

- **Location:** `content/cube-handbook/04.html:390`, `:442`, `:468`, `:504`.
- **Problem:** The summary/glossary/quiz teach reuse solely within a TTL, even saying tier 1 “only” stores JSON by TTL.
- **Evidence:** [Pre-aggregation overview: refresh keys](https://docs.cube.dev/docs/pre-aggregations/index#refresh-keys) says reuse depends on the query's refresh-key value remaining unchanged. Cube refresh keys can be interval- or SQL-based; defaults differ by data source.
- **Impact:** Readers tune an unspecified TTL instead of the cube refresh key and confuse result invalidation with pre-aggregation refresh.
- **Fix:** Explain that reuse also depends on generated SQL and refresh keys; distinguish cube refresh keys from pre-aggregation refresh keys. Keep retention/eviction TTL separate from freshness.
- **Certainty:** High. The statement that production uses Cube Store is not flagged: current env docs explicitly give cubestore as production default.

### 8. One-hour refresh is falsely treated as a maximum freshness bound

- **Location:** `content/cube-handbook/04.html:407`, `:467`, `:507`–`:508`.
- **Problem:** `every: 1 hour` is claimed to limit stale data to approximately one hour; the explanation also says the warehouse only receives queries during builds.
- **Evidence:** [Refreshing pre-aggregations](https://docs.cube.dev/docs/pre-aggregations/refreshing-pre-aggregations#troubleshooting) documents overloaded refresh workers missing scheduler intervals. [Refresh-key reference](https://docs.cube.dev/reference/data-modeling/pre-aggregations#refresh_key) describes a refresh condition, not a completed-build deadline.
- **Impact:** Misstates an operational SLO; scheduling delay/build duration/failure can extend staleness, and refresh checks themselves may query the warehouse.
- **Fix:** Say this requests hourly invalidation/rebuild eligibility; actual freshness includes scheduler delay, build time and success. Monitor last successful build and queue.
- **Certainty:** High. The normal-case hourly example is reasonable; the upper-bound wording is the error.

### 9. Cached-result and rollup-hit outcomes are conflated in troubleshooting

- **Location:** `content/cube-handbook/06.html:233`, `:238`; `content/cube-handbook/05.html:242`, `:340`–`:341`.
- **Problem:** A generic cache miss is equated with a pre-aggregation miss and increasing warehouse traffic.
- **Evidence:** [Pre-aggregation overview](https://docs.cube.dev/docs/pre-aggregations/index#refresh-keys) says a result-cache miss can execute against either pre-aggregation storage or the source. Those are separate outcomes.
- **Impact:** Operators may change rollups unnecessarily when only a result expired.
- **Fix:** Inspect result-cache reuse and `usedPreAggregations`/rollup matching separately; only infer warehouse fallback after confirming both.
- **Certainty:** High, including within the handbook's own two-layer architecture.

### 10. Production authentication is inaccurately restricted to one shared secret

- **Location:** `content/cube-handbook/05.html:96`, `:119`, `:235`, `:307`–`:308`.
- **Problem:** CUBEJS_API_SECRET is called universally mandatory and used to verify/sign every JWT.
- **Evidence:** [Environment reference](https://docs.cube.dev/reference/configuration/environment-variables#cubejs_jwk_url) supports JWK-based authentication; the same reference documents secret rotation and verification via keys from a JWKS endpoint when configured.
- **Impact:** Misleads deployments using an external identity provider and asymmetric signatures.
- **Fix:** Scope this advice to the default shared-secret authentication example; name JWKS and custom authentication as supported alternatives.
- **Certainty:** High current docs; do not confuse a recommended sample configuration with a mandatory platform constraint.

### 11. Copyable Python configuration leaves the hook unregistered

- **Location:** `content/cube-handbook/06.html:112`–`:121`.
- **Problem:** The `cube.py` tab defines only a function, without importing config or registering the hook. The note admits this, but the tab is still labeled a system configuration sample and provides Copy.
- **Evidence:** [Official Python query_rewrite example](https://docs.cube.dev/reference/configuration/config#query_rewrite) imports `config` from `cube` and uses `@config('query_rewrite')`.
- **Impact:** Copying it as cube.py does not configure the shown tenant rewrite.
- **Fix:** Include that import/decorator and the same fail-closed validation as the JS example. Remove the deferral to unspecified version docs for the essential registration step.
- **Certainty:** High current documented Python interface; medium as an editorial defect because the existing note already labels it incomplete.

## Unverified or insufficiently supported statements (do not treat as confirmed bugs)

- `05.html:133`: A built-in Prometheus `/metrics` endpoint is asserted with no setup, port or exporter. I found no such endpoint in the current documentation index/environment reference. [Official repository issue 9851](https://github.com/cube-js/cube/issues/9851) discusses Cube Store metrics via StatsD and a maintainer says documentation is absent. This is insufficient to prove no endpoint exists. Require a concrete official implementation/configuration citation; otherwise label as custom observability integration.
- `04.html:391`–`:392`, `:262`: 90–95% warehouse savings, <50ms result cache and <250ms P95 rollups lack a reproducible source/workload. Nearby prose says illustrative, but interactive cards still render these as bare performance claims. Replace with clearly hypothetical figures or supply a named benchmark, workload and measurement method. No evidence located establishing these exact figures.
- `04.html:315`–`:326`, `:428`–`:429`, `:446`, `:515`–`:516`: The 55–60%, 80–85%, and +17–23-point AI comparison has no verifiable case study in the chapter; the caveat admits this. The quiz nevertheless asserts elimination of the named error causes. Remove the unsupported causal certainty and keep hypothetical teaching data clearly hypothetical throughout.
- `05.html:70`, `:89`, `:268`, `:317`: Two API replicas only establish API-instance redundancy; the shown single Cube Store router and unspecified shared-storage deployment do not demonstrate cluster-wide HA or guaranteed zero downtime. [Production architecture](https://docs.cube.dev/cube-core/running-in-production#scaling) supports one or more routers and multiple workers. Scope the claim to API-instance failover; assess router/storage failover and rollout compatibility before asserting all-node fault tolerance.
- `04.html:260`–`:261`: Exact v0.28 batching-driver list and Snowflake export destinations were not independently verified against a pinned v0.28 source. Current driver support should not be inferred from an old list. Version-label and link the release or exact driver docs.
- `06.html:263`–`:264` and `05.html:266`: Current source confirms legacy CLI validation and server binary names exist: [CLI command registration](https://raw.githubusercontent.com/cube-js/cube/master/packages/cubejs-cli/src/cli.ts), [server manifest](https://raw.githubusercontent.com/cube-js/cube/master/packages/cubejs-server/package.json). This does not prove every bare `npx` command resolves correctly in a clean project. Verify with installed package versions. [Today's Cube CLI](https://docs.cube.dev/reference/cli) is a different cloud-platform binary; distinguish legacy cubejs-cli from it.

Historical verification caveat: the v0.36 release [official blog](https://cube.dev/blog/cube-core-v0-36-playground-2-0-custom-granularities-query-pushdown) substantiates Redis removal and prior v0.32 deprecation. That history should remain explicitly historical; it does not establish every other version date in these files.
