# Đối chiếu kỹ thuật Cube.dev Handbook

Ngày kiểm tra: 06–07/11/2026. Phạm vi: trang tổng và 9 chương, gồm 68 mục, phần chữ trong sơ đồ/tương tác, mã mẫu, thẻ tóm tắt và 117 câu ôn tập.

## Kết luận

Handbook có những sai lệch kỹ thuật thực sự. Vấn đề không chỉ ở tiếng Việt: một số ví dụ thiếu điều kiện để chạy, một số sơ đồ khái quát quá mức và vài đáp án vẫn khẳng định điều mà mã mẫu không bảo đảm.

Lượt rà soát độc lập tìm được **37 nhóm vấn đề** ở chương 00–08; đối chiếu thêm bảng so sánh sản phẩm cho **1 nhóm**, tổng cộng **38 nhóm**. Đây là số nhóm vấn đề, không phải số dòng lỗi, và không phải kết quả chạy bộ kiểm thử chính thức của Cube.

Đã sửa những phát biểu, tên trường, mã cấu hình và đáp án có đủ bằng chứng. Với ví dụ chưa hoàn chỉnh, đã đưa giới hạn lên phần người đọc nhìn thấy trước khi sao chép. Với số liệu không có nguồn tái hiện, đã bỏ cam kết hoặc ghi rõ tính minh họa. **Chưa thể chứng nhận toàn bộ Handbook là một bộ lab chạy được từ đầu đến cuối.**

## Phương pháp và giới hạn

- Đọc cả HTML và JavaScript sinh nội dung; không chỉ kiểm tra đoạn văn đang hiển thị.
- Đối chiếu tài liệu hiện hành tại docs.cube.dev, ghi chú phát hành chính thức và mã nguồn trong tổ chức cube-js. Với nội dung dbt/Looker, dùng tài liệu của chính dbt/Google.
- Phân biệt hành vi hiện hành với thay đổi lịch sử v0.28, v0.33, v0.36 và v1.8. Không suy ra thời điểm xuất hiện tính năng chỉ từ tài liệu hiện tại.
- Các liên kết GitHub `master` là nguồn có thể thay đổi; chưa dùng một commit/tag duy nhất để biên dịch tất cả ví dụ.
- Kiểm tra tài liệu và cấu trúc mã không thay thế việc chạy Cube, Postgres, Angular, Bubble.io hoặc xác thực với Cube Cloud thật. Chưa có bộ dữ liệu, cấu hình hạ tầng và phiên bản được khóa để thực hiện chứng nhận đó.
- Người dùng chọn tiếp tục với tài liệu chính thức và kết quả rà soát hiện có, không thêm lượt đánh giá bằng mô hình bên ngoài.

## Chương 00–03: luồng truy vấn và thực hành

| ID | Vị trí | Sai lệch hoặc thiếu điều kiện | Xử lý trong mã nguồn |
|---|---|---|---|
| F01 | 03.1, ôn tập 03 | `-d postgres` chọn driver; mẫu Compose của CLI không tạo Postgres. | Sửa hướng dẫn, tóm tắt và đáp án: phải cung cấp Postgres riêng. [Mẫu CLI](https://github.com/cube-js/cube/blob/master/packages/cubejs-cli/src/templates.ts) |
| F02 | 03.1 | Gọi `cubejs-cli` là đường cài đặt hiện hành, không nêu đã deprecated. | Gắn nhãn trình tạo dự án Core cũ, phân biệt Cube CLI mới. [Ghi chú v1.8](https://cube.dev/blog/cube-core-v1-8-mistake-proof-defaults-performance) |
| F03 | 03.2–03.4 | Import ecom không tạo dữ liệu Superstore; thiếu loader và bảng users; tên DB không thống nhất. | Sửa tên DB; ghi rõ chuỗi ví dụ chưa tái hiện được và response là giả định. Chưa bổ sung một bộ lab/dataset đầy đủ. [sql_table](https://docs.cube.dev/reference/data-modeling/cube#sql_table) |
| F04 | 02.5 và ôn tập | `readOnly` bị mô tả là chặn mọi thao tác ghi. | Sửa sơ đồ, thuật ngữ, câu hỏi: đây là cờ chiến lược build; quyền tài khoản CSDL mới cưỡng chế chỉ đọc. [Postgres driver](https://github.com/cube-js/cube/blob/master/packages/cubejs-postgres-driver/src/PostgresDriver.ts) |
| F05 | 02.5 | Tối ưu timer refresh key bị áp cho cả key có SQL tùy chỉnh. | Giới hạn hình và lời giải vào timer; key như MAX(updated_at) vẫn đọc nguồn. [v0.28](https://cube.dev/blog/cube-core-v0-28-batching-and-export-buckets), [refresh_key của cube](https://docs.cube.dev/reference/data-modeling/cube#refresh_key) |
| F06 | 02.4 và ôn tập | Gán hỗ trợ rolling-window rollup hoàn chỉnh cho v0.28. | Sửa thành bước đặt nền tảng, chưa xác định bản đầu tiên hỗ trợ đầy đủ. [Ghi chú phát hành](https://cube.dev/blog/cube-core-v0-28-batching-and-export-buckets) |
| F07 | 02.2–02.3 và ôn tập | Đáp án nói compiler không chọn rollup và phải sinh SQL xong mới khớp. | Phân biệt tên cơ chế Aggregate Awareness với thành phần triển khai; thứ tự hình là giản lược. [Mã lập kế hoạch](https://github.com/cube-js/cube/blob/master/packages/cubejs-schema-compiler/src/adapter/PreAggregations.ts) |
| F08 | Sơ đồ và bộ đếm SQL ở 02 | Khớp rollup bị suy ra toàn kho nguồn nhận đúng 0 SQL. | Ghi rõ chỉ đếm SELECT phân tích ở nhánh đang xem, với rollup sẵn; không đếm build/refresh. [Refresh worker](https://docs.cube.dev/docs/pre-aggregations/refreshing-pre-aggregations) |
| F09 | 02.3 | Luồng chung REST/GraphQL/SQL luôn yêu cầu JWT. | Bổ sung xác thực theo transport; SQL protocol có username/password và checkSqlAuth. [SQL API security](https://docs.cube.dev/reference/core-data-apis/sql-api/security) |
| F10 | 01.1–01.2 | Khẳng định không đưa dữ liệu ra khỏi warehouse và cache không tăng chi phí nguồn. | Nêu external rollup lưu dữ liệu tổng hợp; build/refresh vẫn tốn tài nguyên. [Pre-aggregations](https://docs.cube.dev/docs/pre-aggregations/getting-started-pre-aggregations) |
| F11 | YAML 01.4 | Dimension status và created_at thiếu sql; cube được join bị lược bỏ. | Bổ sung sql và ghi rõ các phụ thuộc/khóa chính còn phải khai báo. [Dimensions](https://docs.cube.dev/reference/data-modeling/dimensions) |
| F12 | Response 03.4 | Postgres count hiển thị số 120 trong khi ví dụ REST thường trả numeric string. | Đổi thành `"120"`; giới hạn theo driver/API, không áp cho mọi tình huống. [Numeric conversion](https://docs.cube.dev/recipes/core-data-api/cast-numerics) |
| F13 | Angular 03.5–03.6 | chartPivot trả dòng pivot, không phải Chart.js datasets; ô số cũng chưa được tách scalar. | Sửa lời giải và chỉ rõ adapter còn thiếu. Snippet Angular vẫn là ví dụ lịch sử chưa hoàn chỉnh, không chứng nhận chạy được. [ResultSet](https://docs.cube.dev/reference/javascript-sdk/reference/cubejs-client-core#chartpivot) |
| F14 | Lệnh npm 03.5 | Cài bản mới nhất với template Angular/ng2-charts cũ, không khóa phiên bản. | Nêu rõ rủi ro tương thích; ngx từ v1.7.41 cần Angular 20+. Chưa dựng một dự án Angular mới. [v1.8](https://cube.dev/blog/cube-core-v1-8-mistake-proof-defaults-performance) |
| F15 | 00 và 03 | Thành công trong dev mode bị hiểu là JWT đã được xác minh. | Thêm giả định ngoài dev mode vào giải thích xác thực; nêu dev mode bỏ qua xác minh. [Production](https://docs.cube.dev/cube-core/running-in-production) |
| F16 | cURL/Bubble 03.4, 03.8 | Chưa giải thích HTTP 200 có thể chứa Continue wait. | Bổ sung điều kiện retry cùng truy vấn, giới hạn chờ và lỗi; không coi HTTP 200 là đã có data. [REST lifecycle](https://docs.cube.dev/reference/core-data-apis/rest-api#continue-wait) |
| F17 | 00.2 | SQL hiển thị có ORDER BY nhưng compiler rút gọn không xử lý order; placeholder và literal không khớp. | Ghi rõ mã giả và SQL giải thích được soạn riêng, không phải đầu ra đã chạy của hàm mini. [Query format](https://docs.cube.dev/reference/core-data-apis/rest-api/query-format) |

## Chương 04–06: mô hình, cache và vận hành

| ID | Vị trí | Sai lệch hoặc thiếu điều kiện | Xử lý trong mã nguồn |
|---|---|---|---|
| O01 | 06.2 | Model snake_case nhưng GraphQL gọi orderDate/totalSales. | Đổi thành order_date/total_sales, sửa thẻ tóm tắt; khuyên introspect schema. [GraphQL implementation](https://github.com/cube-js/cube/blob/master/packages/cubejs-api-gateway/src/graphql.ts) |
| O02 | 06.4 | FILTER_PARAMS thiếu cấp tên cube. | Bổ sung filter_group trước a/b; ghi rõ đây là phần SQL template JavaScript. [FILTER_GROUP](https://docs.cube.dev/reference/data-modeling/context-variables#filter_group) |
| O03 | 05.5 | Dùng tham số refresh_range không có trong reference, lại suy ra fallback khi ngoài phạm vi. | Sửa thành build_range_start/build_range_end và phân biệt giới hạn dữ liệu với điều kiện khớp. Dữ liệu ngoài build range có thể không trả về. [Build range](https://docs.cube.dev/reference/data-modeling/pre-aggregations#build_range_start-and-build_range_end) |
| O04 | 06.1 và ôn tập | Đáp án hứa cách ly mọi tenant dù code cho qua khi thiếu claim. | Sửa đáp án và gắn nhãn ví dụ lỗi; chỉ tới mẫu từ chối thiếu claim ở 07.5/08.10. Chưa đổi thành một triển khai production đã kiểm thử. [query_rewrite](https://docs.cube.dev/reference/configuration/config#query_rewrite) |
| O05 | 04.3 | Quan hệ join đúng bị coi là đủ chống tính trùng. | Bổ sung điều kiện primary_key thực sự duy nhất và đánh dấu đoạn join là phần trích. [Primary key](https://docs.cube.dev/reference/data-modeling/joins#setting-a-primary-key) |
| O06 | 04.1 | Mọi member đều được nói mặc định public:true. | Bổ sung ngoại lệ primary_key dimension thường mặc định ẩn, cả thuật ngữ/đáp án. [Primary key defaults](https://docs.cube.dev/reference/data-modeling/joins#setting-a-primary-key) |
| O07 | 04.6 | Cache kết quả bị giải thích chỉ theo TTL. | Phân biệt khóa truy vấn/refresh key với chính sách lưu giữ. [Caching overview](https://docs.cube.dev/docs/pre-aggregations) |
| O08 | 04.7 | every:1 hour bị hiểu là dữ liệu cũ tối đa một giờ. | Sửa hình, thuật ngữ và ôn tập: nhịp làm mới không phải deadline build hay SLA freshness. [Refreshing](https://docs.cube.dev/docs/pre-aggregations/refreshing-pre-aggregations) |
| O09 | 05.4, 06.5 | Cache miss bị đồng nhất với không khớp rollup. | Tách tỷ lệ dùng lại kết quả và tỷ lệ dùng pre-aggregation; không kết luận tải warehouse chỉ từ cache miss. [Hai tầng cache](https://docs.cube.dev/docs/pre-aggregations) |
| O10 | 05.2–05.3 | CUBEJS_API_SECRET bị gọi bắt buộc cho mọi cách xác thực. | Giới hạn vào ví dụ secret chung; nêu JWKS/check_auth là lựa chọn khác. [Environment reference](https://docs.cube.dev/reference/configuration/environment-variables#cubejs_jwk_url) |
| O11 | cube.py 06.1 | Hàm query_rewrite chưa đăng ký với Cube. | Thêm import config và decorator; vẫn ghi rõ ví dụ thiếu guard tenant là ví dụ lỗi. [Python config](https://docs.cube.dev/reference/configuration/config#query_rewrite) |

## Chương 07–08: tình huống tổng hợp và phân quyền

| ID | Vị trí | Sai lệch hoặc thiếu điều kiện | Xử lý trong mã nguồn |
|---|---|---|---|
| A01 | 08.3 | public phụ thuộc isFinance nhưng thiếu app-ID để tách model biên dịch. | Thêm contextToAppId theo isFinance và điều kiện mọi giá trị ảnh hưởng model phải có trong khóa. Không coi COMPILE_CONTEXT là context riêng từng request. [Compile context](https://docs.cube.dev/reference/data-modeling/context-variables#compile_context) |
| A02 | 07.3–07.4 | View doanh thu không chứa WAU/events, events chưa có tenant model. | Sửa mô tả/phần yêu cầu để nêu hai nhánh chưa được thống nhất. Chưa bổ sung thiết kế multi-fact hoàn chỉnh. [Views](https://docs.cube.dev/docs/data-modeling/views) |
| A03 | 07.3 | View chọn lọc không tự chặn truy cập cube gốc. | Bỏ bảo đảm “chỉ qua view”; nêu cần public/access policy và kiểm thử đường truy cập trực tiếp. [Member security](https://docs.cube.dev/docs/data-modeling/access-control/member-level-security) |
| A04 | Rollup 07.3 | Cộng daily exact count_distinct lên tuần/tháng bị nói là luôn đúng. | Giới hạn tái tổng hợp vào measure phù hợp; unique_orders có thể không khớp rollup. [Matching](https://docs.cube.dev/docs/pre-aggregations/matching-pre-aggregations), [Measures](https://docs.cube.dev/reference/data-modeling/measures#type) |
| A05 | 07.5 | Nhịp refresh 5 phút bị coi là độ trễ tối đa. | Sửa thành nhịp kiểm tra/làm mới, không bảo đảm freshness đầu cuối. [Refresh behavior](https://docs.cube.dev/reference/data-modeling/pre-aggregations#refresh_key) |
| A06 | MCP 07.5 và ôn tập | Cấu hình hosted MCP nhưng giải thích theo JWT/Meta/GraphQL của client Core tự xây. | Nêu OAuth/API-key token flow, searchDataModel và runQuery; tách ví dụ Core Data API bên cạnh. [MCP server](https://docs.cube.dev/docs/integrations/mcp-server) |
| A07 | Thuật ngữ/ôn tập 08 | CUBEJS_JWT_KEY bị coi là URL JWKS. | Tách khóa xác minh cấu hình trực tiếp với CUBEJS_JWK_URL. [JWT configuration](https://docs.cube.dev/reference/configuration/config#jwt) |
| A08 | Masking 08.7 | Không GROUP BY được nói luôn che measure, bỏ sót ngoại lệ filter đủ chặt. | Bổ sung ngoại lệ trong đoạn văn và panel tương tác. [Conditional masking](https://docs.cube.dev/docs/data-modeling/data-access-policies#masking-across-multiple-policies) |
| A09 | Tóm tắt 08.6 | “Không member nào được phép” sai lượng từ so với “có một member bị cấm”. | Sửa tóm tắt: chỉ một member được hỏi không được cấp quyền cũng làm truy vấn bị từ chối/trả rỗng. [Policy evaluation](https://docs.cube.dev/docs/data-modeling/data-access-policies#the-permission-space) |

## Bảng so sánh và những điểm chưa thể kết luận

**C01 — Bảng Cube/dbt/Looker ở 01.6:** bổ sung GraphQL/Python SDK của dbt, Looker API/Embed SDK; bỏ nhận định giá “đắt khi mở rộng” và tên gói cũ không được kiểm chứng. Giá và điều kiện sử dụng phụ thuộc gói/thời điểm. Nguồn: [dbt API](https://docs.getdbt.com/docs/dbt-apis/sl-api-overview), [Looker API/embedding](https://docs.cloud.google.com/looker/docs/use-embedding-and-api), [Looker pricing](https://cloud.google.com/looker/pricing), [Cube pricing](https://cube.dev/pricing).

Các điểm sau không được ghi là “đã chứng minh sai trên mọi phiên bản”:

1. **Các số AI 55–60%, 80–85%, +17–23 điểm; P95 250ms; tiết kiệm 90–95%.** Không có bộ câu hỏi/workload/cấu hình/phương pháp để tái hiện. Đã bỏ số hiệu năng chung khỏi bảng so sánh cache; biểu đồ AI còn lại chỉ là minh họa chưa kiểm chứng. Không dùng làm bằng chứng chọn sản phẩm.
2. **Metrics /metrics.** Chưa xác minh endpoint Prometheus này có sẵn cho mọi bản Core. Đã thay hướng dẫn khẳng định bằng yêu cầu cấu hình cơ chế metrics/exporter phù hợp. Không kết luận Cube không có bất kỳ khả năng metrics nào.
3. **Khả năng HA cả cụm.** Hai API instance chỉ chứng minh dự phòng tầng API; router/storage, health check và tương thích rollout còn cần thiết kế riêng. Đã thu hẹp các bảo đảm “không downtime”.
4. **COMPILE_CONTEXT có hai dạng trong nguồn chính thức.** Trang multitenancy vẫn có ví dụ single-brace/security_context cũ, trong khi reference hiện hành dùng Jinja/securityContext. Handbook chọn cú pháp reference hiện hành; chưa kết luận cú pháp cũ bị từ chối trên mọi release.
5. **cubeCloud.userAttributes và token tích hợp Cloud.** Key dành riêng không nên được coi là cách tự tạo danh tính Cloud chỉ bằng việc chèn claim. Đã nêu giới hạn; cần kiểm thử với đúng cấu hình xác thực tài khoản/deployment.
6. **Filter do queryRewrite thêm tham chiếu member không nằm trong quyền của vai trò.** Cần chạy với đúng engine/version và view hoàn chỉnh. Chưa chứng nhận kết quả giả lập là bằng chứng runtime.
7. **Model tình huống 07.3.** Vẫn thiếu regions.yml, profit khác net revenue, customer_id khác merchant_id, kiểu khai báo pre_aggregations cần chuẩn hóa/biên dịch, và WAU chưa có tenant model. Đây là ví dụ để phân tích lỗi, được cảnh báo trước mã; không phải giải pháp hoàn chỉnh đã được sửa và chạy.
8. **Mã Angular/Bubble/route ứng dụng.** Chưa khóa dependency, chưa cung cấp loader/tất cả scaffold, chưa chạy tích hợp thật. Model LLM bên ngoài đã đổi thành placeholder; không khẳng định một tên model chưa xác minh là hợp lệ.
9. **Các mốc lịch sử khác.** Không dùng tài liệu hiện tại để tự xác nhận mọi danh sách driver v0.28 hay ngày xuất hiện masking. Những gì chưa có release/tag cụ thể vẫn phải đọc trong phạm vi nguồn được dẫn.

## Hồ sơ đối chiếu chi tiết

Ba bản ghi sau giữ nguyên vị trí và bằng chứng ở thời điểm trước đợt sửa kỹ thuật; số dòng có thể dịch chuyển sau biên tập. Chúng là hồ sơ phát hiện, không phải danh sách lỗi còn tồn tại nguyên trạng:

- [Chương 00–03](cube-audit-foundations.md): 17 nhóm, kèm các điểm chưa xác minh.
- [Chương 04–06](cube-audit-operations.md): 11 nhóm, kèm giới hạn kiểm chứng.
- [Chương 07–08](cube-audit-access.md): 9 nhóm, kèm xung đột giữa nguồn.

Nguồn chính thức mới đã được gắn vào từng chương trong `public/learn/cube-handbook/sources.js`. Không có thay đổi được xuất bản lên website công khai trong lượt kiểm tra này.

## Kiểm tra sau sửa

- Trang tổng và 9 chương trả HTTP 200 trên bản xem trước cục bộ.
- 11 script nội tuyến qua kiểm tra cú pháp; cấu trúc tóm tắt khớp tiêu đề mục.
- Giữ đủ 117 câu ôn tập; kiểm tra chỉ số đáp án và liên kết tới mục học. Các câu hỏi/phương án đã sửa cần được ôn lại; giữ định danh câu hỏi và lịch sử lưu cũ, không coi điểm cũ là chứng nhận cho bản mới.
- 62 mục nguồn tham khảo, trong đó có 23 nguồn chính thức được bổ sung; mọi khóa nguồn gắn vào chương đều tồn tại.
- Lint qua; còn cảnh báo img có sẵn tại components/custom/commandSearch.tsx:73.
- Chưa chạy Cube compiler/SQL engine, Angular build hay kiểm thử tenant bằng tài khoản thật. HTTP 200 chỉ chứng minh trang Handbook tải được.
