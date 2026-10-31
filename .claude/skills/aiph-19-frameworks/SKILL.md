---
name: aiph-19-frameworks
description: Học và luyện tập Chương 19 của AI Product Handbook — Framework và bảng tra quyết định (JTBD, Opportunity Solution Tree, Business Model Canvas, RICE, ICE, MoSCoW, và ba cặp quyết định RAG/fine-tuning, precision/recall, bảo mật của cloud/trong cloud). Dùng khi người dùng muốn học, ôn, chấm điểm backlog bằng RICE/ICE, chia MoSCoW, làm quiz chương 19, hoặc gõ /aiph-19-frameworks.
---

# Chương 19 · Framework và bảng tra quyết định

Nguồn gốc: `content/ai-product-handbook/19.html` (đọc phần văn bản, công thức trong Hình 1 và bảng ba cặp quyết định; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, object `terms` là thuật ngữ kèm ví dụ đời thường). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Chọn đúng framework cho câu hỏi đang có: làm gì, cho ai, kiếm tiền thế nào, ưu tiên gì, chốt phạm vi ra sao.
- Tính đúng RICE và ICE, biết khi nào dùng MoSCoW thay vì chấm điểm.
- Ra ba quyết định hay gặp trong sản phẩm AI theo bảng tra và ghi lý do vào decision log.

## Ý chính (Ghi nhớ của chương)

1. **Chung** Framework giúp nghĩ có hệ thống và nói chung một ngôn ngữ, nhưng không quyết định thay bạn.
2. **19.1** Opportunity Solution Tree: gốc là outcome, nhánh là cơ hội (nhu cầu, điểm đau), lá là giải pháp và thử nghiệm; để không nhảy thẳng từ mục tiêu tới giải pháp. Business Model Canvas cho AI: ô chi phí phải có inference cost.
3. **19.2** RICE = Reach (người/quý) × Impact (0,25–3) × Confidence (%) / Effort (người-tháng). ICE = Impact × Confidence × Ease (Impact và Confidence quy về thang 10, Ease 1–10). MoSCoW hợp để chốt phạm vi một bản phát hành với stakeholder, không phải xếp hạng backlog dài. Với tính năng AI, giữ Confidence thấp cho tới khi có số đo trên eval set.
4. **19.3** RAG khi tri thức đổi liên tục, cần trích nguồn, chi phí ban đầu thấp; fine-tuning khi cần cố định định dạng (JSON, schema), đổi văn phong, giảm token prompt. Precision khi false positive gây thiệt hại tài chính/uy tín; recall khi false negative đe dọa an toàn, tính mạng, pháp lý. Cloud lo GPU, datacenter, hypervisor; doanh nghiệp lo PII, IAM, mã hóa, guardrails.
5. **19.3** Ghi quyết định đã chọn và lý do vào decision log, kể cả khi quyết định có vẻ hiển nhiên.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 19.1 → 19.3. Mỗi framework: nói nó trả lời câu hỏi gì trong 2–3 câu, ví dụ đời thường (dùng `terms`, như MoSCoW là "bốn ngăn trong vali"), rồi hỏi **một** câu "khi nào dùng / khi nào không". Với 19.2 cho người học tự tính một ví dụ RICE trước khi đi tiếp. Với 19.3, mỗi cặp đưa một tình huống ngắn để người học chọn bên. Sai → gợi ý, không đưa đáp án ngay.

### Luyện
Áp framework vào case của người học (hỏi họ backlog/sản phẩm đang làm; nếu không có, đưa case mẫu: trợ lý AI tra quy trình nội bộ cho một công ty 300 nhân viên). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho làm lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Chấm RICE cho 4–6 hạng mục backlog của người học, xếp hạng, rồi chấm lại bằng ICE và so thứ hạng. | Đơn vị đúng (người/quý, thang Impact 0,25–3, người-tháng); phép tính đúng; hạng mục AI chưa có eval giữ Confidence thấp; giải thích được vì sao hai cách xếp lệch nhau (nếu lệch). |
| L2 | Chia MoSCoW phạm vi cho bản phát hành tới. | Must thật sự tối thiểu để bản phát hành có giá trị; Won't ghi rõ "lần này"; mỗi Must nối được với problem/outcome. |
| L3 | Vẽ Opportunity Solution Tree (dạng gạch đầu dòng) từ một outcome. | Gốc là outcome đo được, không phải tính năng; có ít nhất 2 cơ hội trước khi tới giải pháp; mỗi giải pháp có một thử nghiệm. |
| L4 | Điền 9 ô Business Model Canvas cho sản phẩm AI. | Đủ 9 ô; ô chi phí có inference cost; dòng doanh thu nhất quán với chi phí đó. |
| L5 | Với case của người học, ra ba quyết định ở 19.3 và viết một mục decision log cho từng quyết định. | Lựa chọn khớp điều kiện trong bảng; decision log có bối cảnh, giả định, dữ liệu lúc đó, lý do chấp nhận rủi ro. |
| L6 | **Sửa bài:** "Tính năng AI tóm tắt hợp đồng: Reach 5.000, Impact 3, Confidence 100%, Effort 0,5 → RICE 30.000, làm ngay. Chọn fine-tuning để model biết luật mới nhất. Bảo mật thì AWS lo hết." Chỉ ra và sửa các lỗi. | Nhận ra: Confidence 100% khi chưa có eval; Effort 0,5 người-tháng quá lạc quan cho một tính năng AI cần eval set, guardrails; tri thức luật thay đổi → RAG; PII, IAM, guardrails là việc của doanh nghiệp. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `19.html` (trường `q`, `o`, `a`, `ex`), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: chọn precision hay recall cho bộ lọc giao dịch gian lận vs. bộ phát hiện dấu hiệu tự hại trong chat). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-20-documentation` (Tài liệu và giao tiếp sản phẩm). Nếu bài yếu, chỉ về chương gốc: JTBD → `/aiph-02-problem-discovery`, RICE/MoSCoW → `/aiph-06-requirements-roadmap`, RAG/fine-tuning → `/aiph-07-ai-llm-fundamentals`, precision/recall → `/aiph-09-evaluation-responsible-ai`, Business Model Canvas/inference cost → `/aiph-12-product-economics`, bảo mật của cloud/trong cloud → `/aiph-13-risk-governance`, decision log → `/aiph-14-stakeholder`.
