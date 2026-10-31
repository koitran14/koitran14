---
name: aiph-01-product-thinking
description: Học và luyện tập Chương 01 của AI Product Handbook — Product Thinking và vòng đời sản phẩm AI (deterministic vs probabilistic, product/project/feature/service, output–outcome–impact, precision vs recall, ngưỡng lỗi chấp nhận được, vòng đời năm giai đoạn và đội ngũ). Dùng khi người dùng muốn học, ôn, làm quiz hoặc luyện bài tập chương 01, hoặc gõ /aiph-01-product-thinking.
---

# Chương 01 · Product Thinking và vòng đời sản phẩm AI

Nguồn gốc: `content/ai-product-handbook/01.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ; hàm `sorter(...)` chứa 6 câu phân loại output/outcome/impact). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Giải thích được vì sao AI là probabilistic và điều đó đổi cách làm sản phẩm thế nào.
- Phân biệt AI product, project, feature, service theo mục tiêu, chi phí/rủi ro và cách đo.
- Xếp một kết quả vào output, outcome hay impact; chọn ưu tiên precision hay recall theo cái giá của từng loại sai.
- Viết ra ngưỡng lỗi chấp nhận được, guardrails, fallback, human-in-the-loop trước khi build.
- Kể đúng năm giai đoạn vòng đời và vai trò của từng người trong đội.

## Ý chính (Ghi nhớ của chương)

1. **01.1** Chỉ coi AI là một dự án cần bàn giao → bỏ qua inference cost, latency và việc chất lượng giảm dần (drift) sau ra mắt. Dự án kết thúc khi bàn giao; sản phẩm AI tốn tiền mỗi lần có người dùng.
2. **01.2** Hỏi "người dùng làm được gì tốt hơn" trước "mình đã làm xong cái gì". Output (thứ bàn giao) → outcome (thay đổi ở hệ thống/người dùng) → impact (retention, ARR, ROI). Precision = TP/(TP+FP) giảm báo nhầm; recall = TP/(TP+FN) giảm bỏ sót; chọn cái nào là quyết định kinh doanh.
3. **01.3** Ngưỡng lỗi chấp nhận được là quyết định sản phẩm, viết ra **trước** khi build. Trợ lý tra cứu sai 1/50 câu vẫn dùng được nếu có trích nguồn; tự quyết hoàn tiền thì một lỗi đã là quá nhiều → AI đề xuất, người duyệt.
4. **01.4** Vòng đời là vòng tròn: Ideation → Discovery → Evaluation → Deployment → Monitoring, rồi Monitoring cấp dữ liệu cho Ideation lần sau. AI PM dịch kỳ vọng kinh doanh thành tiêu chí đo được.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 01.1 → 01.4. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường (có thể dùng phép so sánh trong `terms`, ví dụ máy bán nước cho deterministic, chuông báo cháy cho false positive), rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Lấy một hệ thống AI người học biết (hoặc trợ lý hỗ trợ khách hàng): mô tả nó dưới 4 góc product / project / feature / service theo 3 cột của bảng 01.1 (mục tiêu, chi phí–rủi ro, đo thành công). | Cột chi phí nêu được khác biệt: chi phí cố định (project) vs inference cost theo lưu lượng (product) vs theo lượt gọi API (feature) vs SLA (service). |
| L2 | Phân loại 6 câu trong hình `sorter` của chương (tích hợp API LLM; tự giải quyết 20%→45%; chi phí hỗ trợ giảm và gia hạn tăng; eval set 300 câu; tra quy trình 8 phút→<1 phút; ARR tăng), rồi tự viết 1 câu cho mỗi tầng về sản phẩm của mình. | 6/6 đúng; câu tự viết có số đo được, outcome không bị viết thành output ("đã làm xong…"). |
| L3 | Chọn precision hay recall cho 4 hệ thống: phát hiện gian lận, gắn nhãn spam, sàng lọc chẩn đoán y tế, tự duyệt tiền thưởng. Nêu FP và FN cụ thể của từng hệ thống. | Lý do dựa trên cái giá của FP vs FN, không dựa trên "chỉ số nào cao hơn"; gian lận/y tế → recall, spam/tiền thưởng → precision. |
| L4 | Viết hướng dẫn đánh giá cho một tính năng AI: lỗi nào chấp nhận được, lỗi nào không, guardrail, fallback, điểm chuyển cho người. | Ngưỡng là con số (kiểu "1/50 câu"); phân biệt tác vụ thường vs nhạy cảm; có đường fallback/human-in-the-loop cụ thể. |
| L5 | Vẽ vòng đời năm giai đoạn cho một sản phẩm AI cụ thể: mỗi giai đoạn một việc làm, một người chịu trách nhiệm (PM, ML Engineer, Data Engineer, UX, pháp lý/bảo mật). | Đủ 5 giai đoạn đúng thứ tự; Monitoring có mũi tên quay về Ideation với dữ liệu cụ thể (drift, phản hồi). |
| L6 | **Sửa bài:** viết lại báo cáo quý "Q3 đội đã tích hợp GPT vào app, hoàn thành eval set 300 câu và ra mắt đúng hạn — dự án thành công" thành báo cáo theo outcome và impact. | Giữ output làm phụ; thêm ít nhất 1 outcome và 1 impact đo được; nhắc chi phí vận hành/drift sau ra mắt. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `01.html` (trường `q`, `o`, `a`, `ex`, `why`), hỏi từng câu, xáo thứ tự đáp án (câu `type: "multi"` phải chọn đủ). Sau đó thêm 2 câu tình huống tự soạn (ví dụ: hệ thống tự khóa thẻ khi nghi gian lận nên đặt ngưỡng lỗi và human-in-the-loop thế nào; độ chính xác giảm 3 tháng sau ra mắt là giai đoạn nào phát hiện và quay về đâu). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-02-problem-discovery` (Problem Discovery & User Research).
