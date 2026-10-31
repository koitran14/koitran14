---
name: aiph-02-problem-discovery
description: Học và luyện tập Chương 02 của AI Product Handbook — Problem Discovery và nghiên cứu người dùng (bẫy công nghệ đi tìm bài toán, launch readiness, Jobs to Be Done, persona cho sản phẩm AI, problem statement). Dùng khi người dùng muốn học, ôn, làm quiz hoặc luyện bài tập chương 02, hoặc gõ /aiph-02-problem-discovery.
---

# Chương 02 · Problem Discovery và nghiên cứu người dùng

Nguồn gốc: `content/ai-product-handbook/02.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Quyết định được khi nào **không** nên dùng AI (quy tắc IF-THEN là đủ).
- Đặt ngưỡng launch readiness trên eval set ngay từ lúc discovery.
- Phân tích một việc theo JTBD: chức năng, cảm xúc, xã hội.
- Viết persona có thêm tech literacy và trust in AI; đánh dấu pain point trên journey.
- Viết problem statement không chứa tên giải pháp, rồi xếp cơ hội vào Efficiency / Personalization / Innovation.

## Ý chính (Ghi nhớ của chương)

1. **02.1** Ba câu hỏi đóng khung: dữ liệu có sẵn và đủ tốt? cần dự đoán/sinh nội dung? người dùng chịu sai tới đâu? IF-THEN giải được với chi phí thấp, đúng 100% → dùng AI là lãng phí.
2. **02.2** Ngưỡng ra mắt đặt **trước** khi build, đo trên eval set có edge case, kèm cơ chế xử lý ngoại lệ.
3. **02.3** Hỏi "người dùng đang cố làm xong việc gì", không hỏi "muốn tính năng gì".
4. **02.4** Hai người cùng chức danh có thể cần hai thiết kế khác nhau nếu mức tin vào AI khác nhau.
5. **02.5** Công thức: *[Người dùng] gặp khó khăn khi [tác vụ, điểm đau], dẫn tới [hậu quả, chi phí], vì [nguyên nhân gốc].* Thấy chữ "chatbot" trong problem statement → viết lại.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 02.1 → 02.5. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường, rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Phân loại 6 tình huống: cần AI hay quy tắc là đủ (tự nghĩ tình huống theo ngành của người học, ví dụ: khóa tài khoản sau 5 lần sai, phân loại email theo ý định, tính VAT, tóm tắt biên bản họp…). | Mỗi câu nêu đúng loại **và** lý do dựa trên 3 câu hỏi đóng khung. |
| L2 | Cho một tính năng AI người học đang nghĩ tới: viết tiêu chí launch readiness (ngưỡng %, 3 edge case, cơ chế xử lý ngoại lệ). | Ngưỡng là con số đặt trước; edge case cụ thể; có đường thoát khi AI sai. |
| L3 | Phân tích JTBD một việc (ví dụ: kế toán đối soát hóa đơn cuối tháng) thành 3 mặt + so cách truyền thống với cách có AI. | Đủ 3 mặt, mặt cảm xúc/xã hội không bị bỏ trống hoặc gượng ép. |
| L4 | Viết 2 persona cùng chức danh nhưng khác trust in AI; nêu thiết kế khác nhau ở đâu. | Có tech literacy, trust in AI, độ khắt khe khi AI sai; khác biệt thiết kế cụ thể (ví dụ: duyệt trước khi gửi vs tự gửi). |
| L5 | Viết problem statement theo công thức cho một vấn đề thật; sau đó xếp cơ hội vào 1 trong 3 nhóm. | Không có tên giải pháp/công nghệ; có hậu quả đo được; nguyên nhân gốc rõ. |
| L6 | **Sửa bài:** viết lại "Chúng ta cần một chatbot RAG cho nhân viên" thành problem statement đúng. | Bỏ giải pháp, thêm ai/khó gì/hậu quả/nguyên nhân. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `02.html` (trường `q`, `o`, `a`, `ex`, `why`), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn. Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-03-market` (Market Research & Opportunity Assessment).
