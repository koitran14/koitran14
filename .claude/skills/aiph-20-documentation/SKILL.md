---
name: aiph-20-documentation
description: Học và luyện tập Chương 20 của AI Product Handbook — Tài liệu và giao tiếp sản phẩm (checklist PRD sáu mục cho tính năng AI, roadmap dễ đọc có điều kiện đi tiếp, decision log, product review). Dùng khi người dùng muốn học, ôn, viết hoặc chấm PRD AI, viết decision log, chuẩn bị product review, làm quiz chương 20, hoặc gõ /aiph-20-documentation.
---

# Chương 20 · Tài liệu và giao tiếp sản phẩm

Nguồn gốc: `content/ai-product-handbook/20.html` (đọc phần văn bản, checklist PRD ở 20.1 và mẫu product review ở 20.3; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, object `terms` là thuật ngữ kèm ví dụ đời thường). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Viết PRD cho tính năng AI đủ sáu mục, mỗi mục trả lời được câu hỏi của nó trước khi build.
- Viết roadmap theo vấn đề, thứ tự, lý do, có cột "điều kiện đi tiếp"; tách bản cho người ngoài đội khỏi kế hoạch của đội.
- Ghi decision log và chạy product review đi tới quyết định tiếp tục / điều chỉnh / dừng.

## Ý chính (Ghi nhớ của chương)

1. **Chung** Tài liệu tốt giúp kỹ thuật và kinh doanh không hiểu lệch nhau. Với AI, tài liệu phải ghi rõ "đủ tốt" nghĩa là đạt con số nào.
2. **20.1** Sáu mục PRD: (1) Mục tiêu và bài toán: giá trị gì, vì sao cần AI xác suất thay vì quy tắc; (2) Phạm vi tự động hóa và handoff: AI tự làm gì, chuyển người ra sao khi độ tin cậy thấp; (3) Eval criteria: đường dẫn eval set, ngưỡng precision, recall, latency để ra mắt; (4) Guardrails và bảo mật: chặn prompt injection, lọc nội dung độc hại, PII redaction; (5) Ngân sách inference và TCO: chi phí tối đa $/task thành công; (6) Hồ sơ tuân thủ: mức rủi ro theo EU AI Act, thông điệp minh bạch trên giao diện.
3. **20.1** Một PRD AI thiếu mục eval criteria thì chưa thể bắt đầu build.
4. **20.2** Roadmap là công cụ giao tiếp, không phải lịch trình chi tiết. Roadmap cho người ngoài theo outcome, theo quý; kế hoạch đội theo task, theo sprint.
5. **20.3** Decision log: bối cảnh, giả định, dữ liệu lúc đó, lý do chấp nhận rủi ro. Product review: so outcome thật với giả định trong PRD, kiểm eval còn đại diện không, quyết định tiếp tục / điều chỉnh / dừng.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 20.1 → 20.3. Với 20.1, mỗi lượt 2 mục PRD: nêu câu hỏi của mục, cho ví dụ một câu trả lời đạt và một câu trả lời mơ hồ ("chính xác cao" vs "precision ≥ 95% trên eval set 300 mẫu"), rồi hỏi người học vì sao bản mơ hồ không dùng được. Với 20.2 và 20.3, giải thích 3–5 câu rồi hỏi **một** câu "vì sao". Sai → gợi ý, không đưa đáp án ngay.

### Luyện
Dùng tính năng AI người học đang làm (nếu không có, dùng case mẫu của chương: trợ lý tra quy trình nội bộ, giả định thời gian tra giảm từ 8 phút xuống dưới 1 phút). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Viết PRD rút gọn đủ sáu mục của checklist. | Mỗi mục trả lời đúng câu hỏi của nó; eval criteria có con số và đường dẫn eval set; handoff có ngưỡng kích hoạt; ngân sách tính theo $/task thành công, không theo $/request; tuân thủ nêu mức rủi ro và thông điệp minh bạch. |
| L2 | Viết roadmap 3 mốc cho người ngoài đội, có cột "điều kiện đi tiếp". | Theo outcome và quý, không liệt kê task; mỗi mốc có ngưỡng chất lượng hoặc chi phí đo được; nói được thứ tự và lý do. |
| L3 | Viết một mục decision log cho một quyết định gần đây (ví dụ RAG hay fine-tuning, model nào). | Đủ bốn phần: bối cảnh, giả định, dữ liệu lúc đó, lý do chấp nhận rủi ro; đọc lại sau 6 tháng vẫn hiểu. |
| L4 | Điền mẫu product review (giả định, kết quả, eval còn đại diện?, $/task, quyết định + lý do) với số liệu giả lập người học tự đặt. | So đúng outcome với giả định PRD; có chỉ số độ đại diện của eval (tỷ lệ câu hỏi mới chưa có trong golden dataset); quyết định khớp số liệu. |
| L5 | **Sửa bài:** PRD sau: "Mục tiêu: dùng GPT làm chatbot HR. Chất lượng: trả lời chính xác, nhanh. Chi phí: càng rẻ càng tốt. Bảo mật: tuân thủ quy định." Chỉ ra lỗi theo checklist và viết lại. | Bỏ tên giải pháp khỏi mục tiêu, nêu vì sao cần AI; thêm phạm vi và handoff; thay "chính xác, nhanh" bằng ngưỡng + eval set; ngân sách $/task; guardrails cụ thể (injection, PII redaction); mức rủi ro EU AI Act. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `20.html` (trường `q`, `o`, `a`, `ex`; nếu `a` là mảng thì người học phải chọn đủ), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: sếp muốn bắt đầu build ngay vì "PRD đủ rồi" nhưng chưa có eval set; product review thấy 40% câu hỏi tháng này không có trong golden dataset). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-21-capstone` (Capstone: từ vấn đề đến launch). Nếu bài yếu, chỉ về chương gốc: PRD/roadmap → `/aiph-06-requirements-roadmap`, eval/guardrails → `/aiph-09-evaluation-responsible-ai`, $/task → `/aiph-12-product-economics`, EU AI Act → `/aiph-13-risk-governance`, decision log → `/aiph-14-stakeholder`.
