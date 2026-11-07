# Rà soát AI Product Engineering & Management

> Đây là báo cáo trước biên tập. Các thay đổi đã thực hiện và kết quả kiểm tra được ghi tại [ghi chú biên tập](ai-product-handbook-revision-notes.md).

Ngày rà soát: 07/11/2026. Bản được đọc: `content/ai-product-handbook/00.html` đến `21.html`, trang mục lục, dữ liệu thuật ngữ và câu hỏi trong `window.CH`, các mô phỏng trong chương, `public/learn/ai-product-handbook/sources.js`, mã hiển thị quiz dùng chung tại `public/learn/cube-handbook/kit.js`.

Đây là báo cáo nội dung; chưa sửa các chương. Đã đọc 105 câu quiz (88 câu một đáp án, 17 câu nhiều đáp án), kiểm tra chỉ mục đáp án và tham chiếu mục học: không có lỗi cấu trúc ở các trường này. Có 101 khóa thuật ngữ khác nhau; nhiều định nghĩa được lặp lại giữa các chương. Chưa nghe tám audio, xem toàn bộ video hoặc kiểm tra giao diện trên trình duyệt; kết luận không bao gồm chất lượng các phần đó hay bản đã deploy.

## Kết luận

Handbook có khung nhập môn hợp lý, câu văn nhìn chung dễ đọc và một số ví dụ tốt. Tuy nhiên, chưa đủ chặt để dùng như tài liệu học chuẩn hoặc lấy điểm quiz làm bằng chứng người học đã hiểu. Vấn đề chính là khẳng định quá rộng, phân biệt khái niệm chưa đúng, và bài tập củng cố chính các cách đơn giản hóa đó.

Không nên chỉ sửa giọng văn. Thứ tự sửa phù hợp: kiến thức và đáp án → tính nhất quán giữa các chương → ví dụ, cách giải thích → độ tự nhiên của tiếng Việt.

## 1. Các vấn đề cần sửa trước

### A01 — Prompt caching bị lẫn với response caching

Vị trí: 08.4 (`08.html:92`), 12.2 (`12.html:58`), glossary 17.2, popup `cache` ở nhiều chương.

Chương 08 nói prompt caching giúp trả kết quả mà không gọi lại model; chương 12 nói lưu phản hồi hoặc embedding và trả từ cache. Đây là những cơ chế khác nhau. Prompt caching tái sử dụng phần tính toán cho tiền tố đầu vào trùng nhau; vẫn gọi model để xử lý phần mới và sinh đầu ra. Response/semantic caching mới có thể trả lại kết quả đã lưu. Embedding cache lưu vector, không tự tạo câu trả lời.

Đề xuất viết: “Prompt caching tái sử dụng phần xử lý của tiền tố prompt lặp lại để giảm chi phí và thời gian xử lý đầu vào. Model vẫn sinh câu trả lời mới. Nếu muốn trả lại câu trả lời đã lưu, đó là response caching hoặc semantic caching, cần kiểm tra quyền truy cập và độ mới của dữ liệu.”

Nguồn: [Claude — Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching).

### A02 — Agent bị diễn giải thành model routing

Vị trí: 07.4 (`07.html:80`); đối chiếu glossary 17.2.

Đoạn “AI agent và model routing” chỉ giải thích chọn model nhỏ/lớn. Routing có thể là workflow cố định và không cần agent. Glossary chương 17 lại mô tả agent khá đúng, nên hai phần không nhất quán.

Tách ba khái niệm: tool calling là model đề xuất gọi công cụ, ứng dụng kiểm tra quyền và thực thi; agent là vòng lặp chọn hành động/công cụ theo kết quả quan sát và điều kiện dừng; model routing là chọn model theo tiêu chí. Agent không bắt buộc dùng nhiều model, và router không tự trở thành agent.

Nguồn: [Anthropic — Building effective agents](https://www.anthropic.com/research/building-effective-agents).

### A03 — Ép chọn fine-tuning để bảo đảm JSON schema

Vị trí: bảng 07.4, bài phân loại `rftQ` câu 2 (`07.html:117`), quiz 07/my6, bảng 11.2, bảng 19.3 và quiz 19/my4 (`19.html:304`).

Fine-tuning có thể cải thiện hành vi, văn phong và tuân thủ định dạng, nhưng không tự bảo đảm “luôn đúng schema”. Với yêu cầu đó, cần giới thiệu structured outputs/constrained decoding khi model hỗ trợ, kiểm tra schema và xử lý lỗi/từ chối/đầu ra bị cắt. Đúng schema cũng không đồng nghĩa đúng nội dung nghiệp vụ.

RAG và fine-tuning có thể kết hợp. Không nên dạy như hai hướng loại trừ nhau. Các nhận định RAG luôn rẻ hơn nhiều, fine-tuning luôn cần tự quản GPU và luôn có latency thấp hơn cũng phải thêm điều kiện.

Nguồn: [Claude — Structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs).

### A04 — Hallucination, groundedness và faithfulness không phải ba ngăn loại trừ nhau

Vị trí: 09.3 (`09.html:56`), bài phân loại `ghf`, quiz 09/my4, glossary 17.3.

Một câu tự thêm ba ngày nghỉ không có trong tài liệu vừa thiếu căn cứ, vừa có thể được chấm là hallucination. Câu đảo ngược chính sách cũng không faithful và không được nguồn hỗ trợ. Faithfulness trong Ragas đo mức các khẳng định được ngữ cảnh truy xuất hỗ trợ, chồng lấn đáng kể với groundedness. Không có một ranh giới phổ quát như bài tập hiện tại ngụ ý.

Cần chọn bộ định nghĩa và rubric cụ thể; phân biệt “đúng với nguồn” với “đúng ngoài thực tế”. Đổi bài tập thành: khẳng định nào được nguồn hỗ trợ, khẳng định nào mâu thuẫn nguồn, khẳng định nào chưa đủ căn cứ. Hoặc cho phép chọn nhiều nhãn.

Nguồn: [Ragas — Faithfulness](https://docs.ragas.io/en/v0.2.5/concepts/metrics/available_metrics/faithfulness/).

### A05 — Confidence được dùng như xác suất đúng mà chưa có cơ chế đo

Vị trí: 04.2, 04.4; 11.3; decision log 14.4; capstone 21; popup `confidence`.

Các ngưỡng 50%, 75% được ghi là ví dụ, nhưng chưa nói điểm do đâu sinh ra và có được hiệu chỉnh hay không. LLM tự nói “tôi chắc 90%” không tương đương xác suất đúng 90%; điểm retrieval cũng không phải xác suất toàn bộ câu trả lời đúng. Chỉ duyệt các câu confidence thấp còn có thể bỏ sót câu sai nhưng tự tin cao.

Cần giải thích nguồn điểm, kiểm tra calibration trên dữ liệu có nhãn, đánh giá theo nhóm tác vụ và lấy mẫu cả nhóm điểm cao. UI chỉ hiển thị số phần trăm khi ý nghĩa của nó đã được kiểm chứng.

Nguồn về thiết kế niềm tin: [Google PAIR — Explainability + Trust](https://pair.withgoogle.com/guidebook-v2/chapter/explainability-trust/).

### A06 — Precision/recall cần định nghĩa lớp dương và hành động

Vị trí: 01.2, quiz 01/my4; 10.2 (`10.html:46`), quiz 10/my4; capstone 21.

Chương 01 gán phát hiện gian lận cho recall; chương 10 dùng “phát hiện gian lận giao dịch lớn” làm ví dụ precision. Cả hai có thể hợp lý ở các bước khác nhau, nhưng hiện thiếu điều kiện để người đọc hiểu vì sao.

Hãy định nghĩa: dương tính là gian lận hay đủ điều kiện được duyệt? Hệ thống chỉ cảnh báo cho chuyên viên hay tự khóa giao dịch? Nếu FN tốn 100 lần FP và có người rà cảnh báo, có lý do ưu tiên recall; nếu tự khóa tài khoản với tổn thất lớn khi khóa nhầm, phải đặt ràng buộc precision. Không chọn chỉ số chỉ từ tên ngành.

Với trích xuất số tiền, nên bổ sung field-level exact match, sai số giá trị, tỷ lệ hồ sơ đạt và tỷ lệ phải duyệt tay. Gọi mọi số tiền sai là FP mà không định nghĩa cách ghép cặp trường dự đoán/chuẩn thì chưa đủ rõ.

### A07 — SOM không thống nhất giữa công thức, widget và quiz

Vị trí: 03.2 (`03.html:51`, `03.html:98`), tóm tắt mục và quiz 03/my2.

Tiêu đề widget và quiz dùng “số khách hàng ICP tiếp cận được × ACV”, còn code nhân thêm tỷ lệ chốt. Nếu đầu vào là khách hàng tiềm năng tiếp cận được, phải có giả định tỷ lệ giành được. Nếu đã là khách hàng giành được, không nhân lần nữa. Ví dụ “20 triệu USD trong hai năm” cũng cần tách khỏi giá trị hợp đồng quy năm/ARR tại cuối kỳ.

Chốt một định nghĩa và đơn vị thời gian cho toàn bộ phần này: số khách tiềm năng tiếp cận × tỷ lệ chuyển đổi × ACV, với giả định đã nêu. Không trình bày nó như công thức SOM duy nhất áp dụng cho mọi mô hình kinh doanh.

### A08 — Guardrails và Macie bị mô tả chắc chắn quá mức

Vị trí: 09.4, 13.4; sơ đồ capstone (`21.html:82`) và quiz 21/my2.

Guardrails có thể phát hiện/lọc một số loại nội dung hoặc prompt attack theo cấu hình; không bảo đảm chặn mọi injection, hallucination hay bias. Cần kết hợp kiểm soát quyền, xác thực đầu vào công cụ và kiểm tra đầu ra.

Macie phát hiện dữ liệu nhạy cảm trong S3; không tự là bộ che dữ liệu đồng bộ trên mọi request. “Macie + Lambda” cần mô tả rõ phần phát hiện, sự kiện/quy trình xử lý, Lambda che dữ liệu và điều kiện chỉ index bản đã kiểm tra. Không mặc định nhận diện CCCD Việt Nam nếu chưa kiểm tra managed/custom identifier và chất lượng thực tế.

Nguồn: [AWS — Macie sensitive-data discovery](https://docs.aws.amazon.com/macie/latest/user/data-classification.html), [AWS — Prompt attack filters](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html).

### A09 — Deterministic/probabilistic bị đẩy thành đối lập tuyệt đối

Vị trí: 01.1, 04.1, 10.1, 17.1 và quiz liên quan.

Không phải mọi AI đều cho đầu ra khác nhau với cùng đầu vào; nhiều model phân loại chạy inference xác định. Phần mềm truyền thống cũng có ngẫu nhiên, trạng thái và phụ thuộc dịch vụ ngoài. Khác biệt quan trọng là hành vi học từ dữ liệu và chất lượng phải kiểm tra trên phân phối tác vụ, cùng các ràng buộc hệ thống.

Viết: “Ở ứng dụng LLM sinh nội dung, đầu ra có thể biến thiên và chất lượng không chỉ kiểm bằng khớp đáp án tuyệt đối. Hệ thống vẫn cần kiểm thử pass/fail cho quyền truy cập, schema, công cụ và quy tắc nghiệp vụ.” Tránh “phần mềm thường chỉ đo đúng/sai”, “AI không bao giờ đúng 100%” hay “quy tắc đúng 100%” như định luật.

### A10 — Mốc EU AI Act cần dẫn nguồn hiện hành, không sửa theo trí nhớ cũ

Vị trí: 03.4, 09.4, 13.2, 21.3 và quiz 13/my2.

Đối chiếu ngày 07/11/2026: các mốc 02/12/2027 cho Annex III và 02/08/2028 cho Annex I phù hợp với tài liệu EU hiện hành đã kiểm tra. Không nên kết luận hai mốc này sai chỉ vì khác lộ trình ban đầu. Thông tin AI Omnibus có hiệu lực tháng 07/2026 cũng có căn cứ trong nguồn chính thức.

Điểm cần sửa là cách dẫn “theo báo cáo nguồn, chưa kiểm chứng” và câu hỏi gom mọi hệ thống rủi ro cao về một ngày. Cần ghi rõ Annex III/Annex I, ngày đối chiếu và nguồn sửa đổi. Capstone IDP + CSKH không tự thuộc nhóm rủi ro cao chỉ vì dùng trong doanh nghiệp bảo hiểm; phải xét mục đích sử dụng cụ thể. Thông báo đang tương tác với AI cũng không chỉ dành cho hệ thống rủi ro cao.

Nguồn: [European Commission — AI Act timeline](https://ai-act-service-desk.ec.europa.eu/en/ai-act/eu-ai-act-implementation-timeline), [EUR-Lex — bản hợp nhất 27/07/2026](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02024R1689-20260727), [Article 50 transparency](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act).

## 2. Thuật ngữ và nội dung cần làm chặt hơn

| Vị trí | Vấn đề | Hướng sửa |
|---|---|---|
| 03, 16: buyer persona | Đồng nhất với một người duyệt tiền/chặn mua | Là chân dung đại diện người mua hoặc nhóm vai trò tham gia quyết định; phân biệt economic buyer, champion, influencer và end user |
| 16: ACV | “Giá trị hợp đồng trung bình mỗi năm” dễ lẫn với trung bình toàn bộ khách hàng | Giá trị một hợp đồng được quy về một năm; nếu lấy trung bình nhiều hợp đồng thì gọi rõ average ACV |
| 03, 16: LTV | Gộp doanh thu/lợi nhuận tùy ý; so chi phí theo tháng/lượt với LTV cả đời | Chốt revenue LTV hay contribution/gross-margin LTV, cùng kỳ và cùng phạm vi chi phí; thêm CAC khi đánh giá khả năng kinh doanh |
| 05, 14 | Chia PM làm what/why, engineer làm how quá cứng; CSAT bị loại khỏi chỉ số kỹ sư | Nêu đây là trọng tâm trách nhiệm, còn discovery, eval và outcome là phần phối hợp; sửa quiz 05/my2 |
| 14.2 | Gán toàn bộ bảng PM/Engineer cho swyx; liệt kê Python, TypeScript, REST/gRPC, LangChain/LlamaIndex là “bắt buộc” | Ghi bảng là tổng hợp biên tập; tách năng lực bắt buộc khỏi ví dụ công nghệ. Bài gốc chủ yếu bàn AI Engineer và nền tảng nghề nghiệp, không đủ căn cứ gán từng hàng của bảng |
| 07, 17: các kiểu học | “Ba kiểu học” không nhắc self-supervised dù đang dạy LLM | Thêm self-supervised pretraining; trình bày đây là phân loại nhập môn, không phải danh sách đầy đủ |
| 08.4 | Viết “Latency (TTFT)” như đồng nghĩa | Tách TTFT, tổng thời gian hoàn thành, thời gian mỗi token; báo cáo p50/p95 và điều kiện tải |
| 08, 15 | 429 mặc định phải fallback; gateway được coi là tránh lock-in | Nêu backoff/retry, queue, quota, chính sách fallback; gateway giảm một phần chi phí đổi provider, không xóa phụ thuộc schema, tool, dữ liệu và chất lượng |
| 09.2, 11.4, 17 | Offline/online/LLM-as-a-judge thành ba lựa chọn ngang hàng; online đồng nhất A/B | Offline/online là bối cảnh đánh giá; human/code/LLM là cách chấm. LLM judge dùng được cả offline và online; A/B là một thiết kế thí nghiệm |
| 09, 17: golden dataset | “Mốc cố định” có thể khiến người học giữ mãi bộ đã lỗi thời | Giữ bộ hồi quy có version, thêm holdout và bộ dữ liệu mới; tránh rò rỉ đáp án và overfit bộ eval |
| 10, 17: drift | Định nghĩa là chất lượng giảm dần | Drift là thay đổi phân phối dữ liệu/quan hệ đầu vào–đầu ra; có thể làm giảm chất lượng, không đồng nghĩa luôn giảm hoặc giảm từ từ |
| 10.3 | Mọi lần người dùng sửa được xem như nhãn chuẩn | Đây là tín hiệu phản hồi cần kiểm chất lượng, quyền sử dụng và thiên lệch trước khi đưa vào tập huấn luyện/eval |
| 12.1 | Liệt kê inference cost, cost/task, context cost, TCO như bốn phần cộng được | Cost/task là tỷ số, TCO là tổng; chi phí ngữ cảnh có thể đã nằm trong inference/storage. Tách chi phí thành phần khỏi chỉ số tổng hợp để tránh đếm hai lần |
| 12.3 | Self-host trên SageMaker bị gắn mặc định với CapEx | Dịch vụ cloud thuê theo mức dùng thường là OpEx; phân biệt với mua phần cứng. “Build” cần định nghĩa là xây ứng dụng, tự host hay huấn luyện model |
| 05, 12 | Bảng lương và % chất lượng model nhỏ chưa có benchmark/nguồn đủ rõ | Bỏ khỏi luồng học chính hoặc dẫn nguồn có thời điểm, cấp bậc, địa điểm, base/total compensation; không suy nhu cầu thị trường chỉ từ mức lương |
| 15.3 | Công thức điểm danh mục tự tổng hợp có quiz học thuộc | Giữ nhãn heuristic minh họa, ưu tiên bài tập phân tích độ nhạy và rủi ro; không dạy như chuẩn ngành |

Bài gốc tham khảo cho AIE: [The Rise of the AI Engineer](https://latent.space/p/ai-engineer/). RICE gốc: [Intercom — RICE](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers). Confidence của RICE là độ chắc của các ước tính ưu tiên, không chỉ chất lượng model trên eval set; một tính năng đạt eval vẫn có thể chưa có bằng chứng về reach hoặc impact.

## 3. Mạch liên kết và độ sâu

Điểm tốt: thứ tự vấn đề → thị trường → thiết kế → xây → đo → quản trị → dự án dễ theo dõi. Ví dụ nhân viên CSKH mất tám phút tra quy trình được dùng lại, giúp nối discovery, PRD, UX và chi phí. Các khối ý chính và ghi nhớ hỗ trợ đọc lướt.

Các khoảng hụt:

- Chương 02 mang tiêu đề user research nhưng thiếu cách phỏng vấn không dẫn dắt, tuyển người tham gia, quan sát và tổng hợp bằng chứng. Persona vẫn chủ yếu là mô tả khái niệm.
- Chương 05 hứa strategy/positioning nhưng chủ yếu là chia vai PM/Engineer và chọn model. Cần một ví dụ xác định khách hàng, lựa chọn cạnh tranh, khác biệt và các việc chủ động không làm.
- Chương 10 hứa product analytics nhưng phần lớn lại là ML evaluation. North Star, funnel, cohort mới được nêu tên; thiếu bảng dữ liệu và một quyết định sản phẩm rút ra từ nó.
- Chương 11 hứa experimentation/growth nhưng A/B và AARRR chỉ có một đoạn. Thiếu giả thuyết, đơn vị randomization, metric chính/guardrail, cỡ mẫu và tiêu chí dừng. Không cần dạy thống kê dài, nhưng cần chỉ ra việc phải làm.
- Chương 12 thiếu pricing, contribution margin và ngân sách phục vụ; bảng lương không giúp trả lời câu hỏi kinh tế sản phẩm.
- Chương 14 lặp gần nguyên chủ đề chia vai ở 05; nên dành chỗ cho một tình huống kỹ thuật, kinh doanh và compliance bất đồng và cách đi tới quyết định.
- Chương 15 mang tên chiến lược nâng cao nhưng phần lớn là catalog AWS và công thức điểm tự tổng hợp. Cần sâu hơn về thời điểm làm platform, khách hàng nội bộ và chi phí vận hành platform.
- Capstone 21 chuyển sang một dự án tài chính lớn với số mục tiêu, 800 mẫu eval và nhiều dịch vụ, nhưng chưa dẫn xuất chúng từ dữ liệu discovery. Với người mới, ví dụ một trợ lý nội bộ hẹp xuyên suốt sẽ dễ kiểm chứng hơn.

Nên giữ một case xuyên suốt: mỗi chương bổ sung một hiện vật (problem statement, bằng chứng phỏng vấn, PRD, eval rubric, kiến trúc, dashboard, decision log). Đây sẽ là liên kết thực chất hơn việc nhắc “xem chương X”. Không cần tăng số chương.

## 4. Tiếng Việt và câu hỏi “có silly không?”

Văn bản không ngô nghê toàn bộ. Các ví dụ “RAG như thi mở sách”, embedding như tọa độ và trace để lần ra bước hỏng hữu ích cho người mới. Điểm yếu là lạm dụng ví von và khẩu hiệu tuyệt đối, đôi lúc tạo cảm giác đang giảng cho trẻ nhỏ thay vì kỹ sư.

| Câu/cách giải thích hiện tại | Nhận xét và cách sửa |
|---|---|
| “Token là đơn vị tiền tệ thật của AI” | Dễ nhớ nhưng sai phạm vi: token là đơn vị biểu diễn/xử lý và thường là cơ sở tính phí API; chi phí còn có compute, storage, tool, con người |
| LLM là “người đã đọc gần hết thư viện” | Nhân hóa và gợi rằng model có thể nhớ/tra mọi tài liệu. Thay bằng mô tả học các mẫu ngôn ngữ từ dữ liệu, sinh câu trả lời chứ không mặc định truy xuất nguồn |
| ML là “học nấu ăn bằng cách nếm nhiều món” | Chỉ gợi học từ ví dụ, không giải thích nhãn, mục tiêu hay phản hồi; dùng ví dụ phân loại ticket có dữ liệu đầu vào và nhãn cụ thể |
| Foundation model là “phôi sắt ... dao hay kéo” | Không sai nghiêm trọng nhưng xa bối cảnh độc giả. Ví dụ cùng model được dùng cho tóm tắt, phân loại và hỏi đáp rõ hơn |
| Stakeholder là “người quanh bàn chia bánh” | Dễ gợi tranh lợi ích hơn trách nhiệm/ảnh hưởng; thay bằng các bên bị tác động hoặc có khả năng ảnh hưởng quyết định |
| FDE là kỹ sư công trường, đối lập kỹ sư văn phòng | Ví von không cần thiết và làm hẹp vai trò; mô tả trực tiếp làm cùng khách hàng, tích hợp và phản hồi cho product |
| “Bạn đã giỏi bước 4 và 5” ở 18.2 | Tự suy năng lực độc giả. Sửa thành “Nền tảng kỹ sư có thể giúp bạn ở hai bước này; vẫn cần kiểm tra yêu cầu production cụ thể” |
| “Đặt sau khi thấy số là tự lừa mình” | Quá quy kết. Sửa thành “Đặt ngưỡng sau khi xem kết quả dễ làm lệch quyết định; nếu đổi ngưỡng, cần ghi lý do và kiểm tra lại” |
| “Information architecture không thể giả định một luồng dữ liệu tuyến tính” | Lẫn kiến trúc thông tin với control/data flow. Sửa thành “Giao diện cần thể hiện nguồn, giới hạn và cách xử lý khi kết quả chưa đủ tin cậy” |
| “Khách chỉ trả tiền khi giải triệt để bài toán” | Cường điệu; người dùng có thể trả tiền cho một cải thiện có giá trị dù chưa giải hết vấn đề |

Đề xuất nguyên tắc biên tập: định nghĩa chính xác trước → ví dụ ngay trong công việc → giới hạn của ví dụ. Chỉ giữ ví von khi nó giúp hiểu thêm. Không cần mỗi thuật ngữ đều có một câu ví von.

Các từ nên giải thích lần đầu rồi dùng nhất quán: deployment/triển khai, production/môi trường vận hành thật, latency/độ trễ, inference/suy luận, handoff/chuyển giao cho người. Có thể giữ PRD, API, RAG và tên framework. Tránh chuỗi pha ngôn ngữ như “ship”, “build”, “model chạy thật”, “ngưỡng production” thay đổi tùy đoạn. “Điểm đau” dùng vừa phải; “khó khăn” hoặc một tác vụ cụ thể thường tự nhiên hơn.

## 5. Đánh giá toàn bộ quiz

### Phát hiện chung

- 105 câu: 88 câu một đáp án, 17 câu nhiều đáp án. Chưa tính các bài phân loại tương tác là quiz trong thống kê này.
- 70/88 câu một đáp án có đáp án đúng ở B, tức khoảng 79,5%; A: 5, C: 12, D: 1. Đây là phân bố trên toàn bộ câu một đáp án, một số câu chỉ có 2–3 lựa chọn. Mã hiện tại render `q.o.map(...)`, không đảo thứ tự. Riêng chương 04, cả sáu câu đều có đáp án B.
- Phương án nhiễu như “màu sắc”, “logo”, “lương thành viên”, “từ CPU”, “AI không cần kiểm thử” quá dễ loại. Đáp án đúng thường là lựa chọn dài nhất và đầy đủ nhất.
- Nhiều câu chỉ hỏi nhớ một danh sách của chương, không đo khả năng ra quyết định. Có thể dùng để tự ôn, nhưng điểm cao chưa chứng minh hiểu hoặc áp dụng được.
- Các phép tính kiểm tra được đều đúng với giả định đề bài: 05/my4 = 10.500 USD; 10/my2 = 75%; 10/my3 = 60%; 12/my2 = 0,04 USD; 19/my2 = 500. Vấn đề lớn nằm ở khung khái niệm, không phải số học.

### Những câu cần chỉnh hoặc viết lại

| Câu | Lý do |
|---|---|
| 01/my1 | Học thuộc đối lập deterministic/probabilistic quá tuyệt đối |
| 01/my3 | Retention có thể được gọi là outcome ở khung khác; cần ghi “theo khung phân loại trong chương” hoặc chọn ví dụ ít tranh cãi hơn |
| 01/my4, 10/my4 | Thiếu chi phí FP/FN, lớp dương và hành động sau dự đoán |
| 03/my2 | Bỏ tỷ lệ chuyển đổi dù widget có dùng |
| 03/my5 | So chi phí API với LTV thiếu cùng kỳ và phạm vi; cần sửa cả đoạn dạy |
| 04/my1 | Ngụ ý AI không có pass/fail; cần tách chất lượng thống kê khỏi ràng buộc phần mềm |
| 04/my6, 11/my1 | Hoàn tiền không phải lúc nào cũng cần người; nên nêu “khoản hoàn tiền vượt hạn mức hoặc ngoài chính sách” |
| 05/my2 | Không nên chấm CSAT sai chỉ vì người làm là kỹ sư |
| 06/my6 | Beta không có một mục đích phổ quát là thu golden dataset; nên hỏi mục tiêu thử nghiệm trong tình huống cụ thể |
| 07/my6, 19/my4, sorter 07 câu JSON | Bỏ structured outputs; fine-tuning không bảo đảm luôn đúng schema |
| 08/my2 | 429 không bắt buộc lập tức chuyển provider; cần nêu chính sách giả định hoặc cho lựa chọn backoff/fallback phù hợp |
| 09/my4 và sorter 09 | Các nhãn lỗi chồng lấn, không có một đáp án duy nhất ổn định |
| 10/my1 | Chi phí mỗi tác vụ thành công cũng áp dụng cho phần mềm không AI; “đặc thù” nên đổi thành “cần bổ sung trong tình huống này” |
| 11/my3 | Nếu lỗi do retrieval, prompt hoặc suy luận, chỉ cập nhật kho tri thức chưa chắc sửa được. Thêm điều kiện “tài liệu nguồn đã lỗi thời” |
| 12/my1 | Chi phí không nhất thiết tuyến tính tuyệt đối vì batching, caching, hợp đồng và hạ tầng cố định |
| 12/my4 | POC không luôn nên dùng API; thêm điều kiện về dữ liệu, chính sách, thời gian và năng lực đội |
| 13/my2 | Phải nêu rõ nhóm Annex III; không gom mọi high-risk thành một ngày |
| 13/my3 | Tên lĩnh vực rộng chưa đủ để quyết định phân loại pháp lý; dùng intended use cụ thể |
| 14/my2 | Giải thích “code production là việc AI Engineer” quá cứng; không bắt buộc PM code khác với cấm/loại trách nhiệm |
| 15/my2 | Gateway giảm phụ thuộc tích hợp, không tự loại vendor lock-in |
| 15/my4 | Chỉ kiểm nhớ công thức tự tổng hợp; nên thay bằng tình huống đọc điểm và nhận ra giới hạn |
| 16/my1 | Unit economics quan trọng nhưng không phải định nghĩa duy nhất của PMF |
| 20/my1 | Danh sách đối thủ có thể hợp lệ trong PRD; hỏi “theo checklist sáu mục của chương” nếu muốn kiểm nhớ danh sách này |
| 21/my2 | Học thuộc một pipeline Macie/Lambda chưa giải thích cơ chế và giới hạn |

Không có nghĩa mọi câu còn lại đều cần bỏ: các câu về công thức precision/recall, RICE, TTFT, JTBD và cấu trúc problem statement có thể giữ sau khi cải thiện phương án nhiễu.

### Ví dụ viết lại

**Chọn metric:** “Hệ thống chỉ gắn cờ giao dịch để chuyên viên rà; mỗi giao dịch bỏ sót thiệt hại trung bình 10 triệu đồng, mỗi cảnh báo nhầm tốn 20 nghìn đồng; đội còn khả năng rà thêm. Nên thử hướng nào trước?” Đáp án tốt: tăng recall trong giới hạn khối lượng rà, rồi đánh giá tổng chi phí. Các phương án khác phải là lựa chọn có vẻ hợp lý, như tăng precision để giảm số ca rà, giữ accuracy tổng thể, hoặc chỉ tối ưu latency. Giải thích phải nêu vì sao từng lựa chọn chưa phù hợp với dữ kiện.

**JSON:** “Model đã trả lời đúng phần lớn nội dung, nhưng thỉnh thoảng bỏ trường bắt buộc trong JSON. API có structured outputs. Bước đầu hợp lý nhất?” Đáp án: dùng schema-constrained output và validate, rồi đo lại; không nhảy thẳng sang fine-tuning. Nhắc rằng đúng schema chưa bảo đảm đúng số liệu.

**Bám nguồn:** Cho đoạn chính sách cùng ba khẳng định; yêu cầu đánh dấu “được hỗ trợ / mâu thuẫn / chưa có căn cứ”. Đề này có rubric rõ hơn ép chọn hallucination/groundedness/faithfulness.

Nên tăng tỷ trọng câu tình huống, thay nhiễu bằng sai lầm phổ biến, thêm giải thích vì sao mỗi lựa chọn sai. Cân lại vị trí đáp án trước; nếu dùng đảo thứ tự, phải giữ đúng ánh xạ đáp án và giải thích `why`.

## 6. Nguồn và thứ tự xử lý

`sources.js` hiện công khai rằng nguồn chính là ba báo cáo do AI hỗ trợ soạn, nhưng các mục đó không có đường dẫn truy xuất. Phần minh bạch này tốt; nó không thay được bằng chứng cho từng khẳng định. Nhiều video giúp học tiếp, nhưng không tự là chứng cứ cho các số 90–95%, giảm 70%, 80%, lương hoặc KPI dự án.

Đợt 1: sửa A01–A09 và các đáp án liên quan; cập nhật nguồn EU tại A10. Đồng bộ bài chính, `sections.sum`, glossary, popup và mô phỏng, tránh sửa văn xuôi nhưng để quiz tiếp tục dạy định nghĩa cũ.

Đợt 2: thống nhất thuật ngữ; bỏ bảng lương chưa kiểm chứng khỏi chương kinh tế; bổ sung case và bằng chứng ở các chương 02, 05, 10, 11, 12, 14, 15.

Đợt 3: biên tập tiếng Việt và ví von; viết lại nhiễu; cân vị trí đáp án; kiểm tra lại toàn bộ quiz với nội dung đã sửa.

Khi sửa nội dung chính thức, cần kiểm tra cả gói skill tải xuống trong `public/learn/ai-product-handbook/skills` và dữ liệu liên quan trong `lib/aiph-skills.json`; báo cáo này chưa giải nén/đối chiếu nội dung các ZIP. Audio cũng cần một lượt rà riêng để tránh tiếp tục truyền đạt định nghĩa cũ.
