---
name: aiph-06-requirements-roadmap
description: Học và luyện tập Chương 06 của AI Product Handbook — Yêu cầu, ưu tiên và roadmap (PRD cho tính năng AI, acceptance criteria định lượng, POC/prototype/MVP/pilot, ưu tiên backlog với trục data/model risk và RICE, roadmap Alpha → Beta → GA gắn ngưỡng chất lượng). Dùng khi người dùng muốn học, ôn, làm quiz hoặc luyện bài tập chương 06, hoặc gõ /aiph-06-requirements-roadmap.
---

# Chương 06 · Yêu cầu, ưu tiên và roadmap

Nguồn gốc: `content/ai-product-handbook/06.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ, mảng `STG` là dữ liệu bốn giai đoạn ở Hình 1). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Viết PRD cho tính năng AI có đủ ba phần mới: guardrails và fallback, acceptance criteria định lượng, eval set kèm mức lỗi chấp nhận được.
- Phân biệt POC, prototype, MVP, pilot theo mục tiêu, phạm vi kỹ thuật và cách đo.
- Xếp ưu tiên backlog AI theo ba trục (business impact, technical complexity, data/model risk) và chấm RICE với Confidence phản ánh rủi ro model.
- Lập roadmap Alpha → Beta → GA với mốc là ngưỡng chất lượng, không chỉ là ngày.

## Ý chính (Ghi nhớ của chương)

1. **06.1** PRD AI thêm guardrails + fallback, acceptance criteria có số (ví dụ trợ lý CSKH: groundedness > 85%, TTFT < 2,0 giây, hallucination < 5%), và trỏ tới eval set. Acceptance criteria không có con số → đội cãi nhau về "đủ tốt chưa" tới tận ngày ra mắt.
2. **06.2** POC trả lời "làm được không" (model giải được bài toán lõi trong điều kiện thí nghiệm); prototype trả lời "người dùng hiểu và thao tác được không"; MVP kiểm giá trị thị trường với chi phí tối thiểu; pilot vận hành thật ở quy mô giới hạn. POC thành công chưa cho biết người dùng có muốn sản phẩm. *(Mục này không có hộp Ghi nhớ; ý rút từ văn bản và Hình 1.)*
3. **06.3** Backlog AI có thêm trục data/model risk (thiếu dữ liệu, PII, hallucination, bias). RICE = Reach × Impact × Confidence / Effort; Confidence của tính năng AI chỉ nên cao khi đã có số đo trên eval set.
4. **06.4** Alpha nội bộ (chỉnh prompt, dựng guardrails) → Beta/Pilot (thu tương tác thật để xây golden dataset) → GA (giám sát latency, chi phí token, độ chính xác, tỷ lệ lỗi). Mốc roadmap là "đạt ngưỡng X", không chỉ "đến ngày Y".

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 06.1 → 06.4. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường, rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Ở 06.2, đi qua bốn giai đoạn theo ba cột mục tiêu / phạm vi kỹ thuật / đo thành công như Hình 1. Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Viết khung PRD 3 phần (vấn đề và mục tiêu / guardrails và fallback / acceptance criteria) cho một tính năng AI theo ngành của người học, theo mẫu trợ lý tra quy trình CSKH trong chương. | Điểm đau có số (như "8 phút"); guardrails nói rõ phạm vi dữ liệu và loại câu hỏi phải từ chối/chuyển người; ít nhất 3 tiêu chí có ngưỡng số; có nhắc eval set và acceptable error rate. |
| L2 | Xếp 4 việc vào POC / prototype / MVP / pilot: (a) gọi API model trên 50 hợp đồng mẫu xem trích điều khoản được không; (b) dựng luồng no-code với dữ liệu giả cho 5 nhân viên bấm thử; (c) mở cho 1 chi nhánh dùng với RAG hoàn chỉnh, log đầy đủ, đo CSAT; (d) đưa bản nhỏ nhất cho khách thật, xem tỷ lệ quay lại. | Đúng cả 4 (a POC, b prototype, c pilot, d MVP) **và** mỗi câu nêu được câu hỏi mà giai đoạn đó trả lời. |
| L3 | Chấm RICE cho 3 hạng mục backlog (tự nghĩ, hoặc dùng: tóm tắt ticket, tự gợi ý câu trả lời cho nhân viên, phân loại khiếu nại có chứa số CCCD), rồi nêu rủi ro data/model của từng cái. | Có đủ R, I, C, E và kết quả; Confidence thấp cho hạng mục chưa chạy eval; nêu đúng loại rủi ro (PII, thiếu dữ liệu, hallucination, bias). |
| L4 | Lập roadmap 3 mốc Alpha / Beta / GA cho tính năng ở L1; mỗi mốc ghi việc chính và điều kiện để đi tiếp. | Mỗi điều kiện là một ngưỡng đo được (ví dụ "groundedness ≥ 85% trên eval set"); Beta có mục tiêu xây golden dataset; GA có danh sách chỉ số giám sát. |
| L5 | Phân loại MoSCoW cho 6 yêu cầu của tính năng ở L1 (trong đó có ít nhất 1 guardrail và 1 fallback). | Guardrail chặn dữ liệu nhạy cảm nằm ở Must; có ít nhất một mục Won't kèm lý do. |
| L6 | **Sửa bài:** viết lại acceptance criteria "Trợ lý trả lời chính xác, nhanh, ít sai" và mốc roadmap "Ra Beta ngày 15/3" thành bản đúng. | Mỗi tính từ đổi thành chỉ số + ngưỡng + nơi đo (golden dataset); mốc Beta gắn với ngưỡng, ngày chỉ là dự kiến. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `06.html` (trường `q`, `o`, `a`, `ex`, `why` nếu có), hỏi từng câu, xáo thứ tự đáp án. Câu `type: "multi"` có nhiều đáp án đúng, báo trước cho người học. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: "POC đạt 92% trên 30 mẫu, sếp muốn GA tuần sau. Bạn trả lời gì?"; "Một hạng mục chưa chạy eval nhưng đội chấm Confidence 100% trong RICE. Sai ở đâu?"). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục, 0 = 06.1).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-07-ai-llm-fundamentals` (AI & LLM Fundamentals).
