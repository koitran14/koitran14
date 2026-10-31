---
name: aiph-04-product-design
description: Học và luyện tập Chương 04 của AI Product Handbook — Product Design và UX cho sản phẩm AI (UX khi đầu ra không cố định, user flow có nhánh fallback và ngưỡng confidence, prototype sớm, design thinking như bộ lọc, human-in-the-loop và trust calibration). Dùng khi người dùng muốn học, ôn, làm quiz hoặc luyện bài tập chương 04, hoặc gõ /aiph-04-product-design.
---

# Chương 04 · Product Design và UX cho sản phẩm AI

Nguồn gốc: `content/ai-product-handbook/04.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ; hằng `LANE` chứa ba ngưỡng confidence của Hình 1). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Giải thích vì sao tính năng AI được đo bằng tỷ lệ câu trả lời chấp nhận được trên tập mẫu, không phải pass/fail.
- Thiết kế màn hình cho người dùng đánh giá, sửa, duyệt hoặc từ chối đầu ra AI.
- Vẽ user flow có điểm nhập, nhánh fallback theo ngưỡng confidence và điểm duyệt cho dữ liệu nhạy cảm.
- Dùng design thinking để loại chỗ không cần AI và tìm tác vụ lặp lại từ dữ liệu thật.
- Căn chỉnh niềm tin bằng human-in-the-loop, minh bạch và cảnh báo.

## Ý chính (Ghi nhớ của chương)

1. **04.1** Mỗi đầu ra AI trên màn hình nên đi kèm một cách để người dùng sửa hoặc bỏ nó. Information architecture hiển thị kết quả theo lớp kèm tín hiệu độ tin cậy.
2. **04.2** Vẽ nhánh lỗi trước nhánh thành công; nhánh lỗi quyết định người dùng có tin sản phẩm không. Ví dụ ngưỡng: ≥ 75% hiển thị kèm nguồn, 50–75% hỏi lại người dùng, < 50% chuyển cho người (chỉ là ví dụ). Dựng prototype sớm bằng no-code hoặc gọi thẳng API.
3. **04.3** (mục không có Ghi nhớ, tóm từ nội dung) Hai bộ lọc: IF-THEN giải được với chi phí thấp và đúng 100% → AI là thừa; thấu cảm bằng dữ liệu thật (support ticket, phỏng vấn sâu) để tìm tác vụ lặp lại như đặt lại mật khẩu, tải hóa đơn.
4. **04.4** AI đề xuất, người quyết định, ở mọi chỗ mà một lần sai là quá đắt. Trust calibration: không quá tin mà chủ quan, không quá nghi mà bỏ dùng.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 04.1 → 04.4. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường, rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Lấy một tính năng (ví dụ gợi ý trả lời email cho CSKH): viết lại 3 hàng của bảng 04.1 (cách chạy, hành vi, kiểm thử) cho bản truyền thống và bản AI, rồi đặt tiêu chí kiểm thử cho bản AI. | Tiêu chí là tỷ lệ chấp nhận được trên tập mẫu có số (ví dụ "≥ 90% trên 200 email mẫu"), không phải pass/fail. |
| L2 | Mô tả wireframe một màn hình hiển thị đầu ra AI: người dùng sửa, duyệt, từ chối ở đâu; tín hiệu độ tin cậy hiển thị thế nào. | Có đủ hành động sửa/bỏ cho mỗi đầu ra; có tín hiệu tin cậy hoặc trích nguồn; có nhãn cho biết đang làm việc với AI. |
| L3 | Vẽ user flow (dạng danh sách bước) cho trợ lý tra cứu chính sách nội bộ với 3 phần: điểm nhập, nhánh fallback theo 3 ngưỡng của Hình 1, điểm duyệt. Thử 3 giá trị confidence 82%, 60%, 35% và nói luồng đi đâu. | 82% → hiển thị kèm nguồn; 60% → hỏi lại; 35% → chuyển cho người kèm tóm tắt ngữ cảnh, không đoán; ngưỡng được ghi là có thể chỉnh. |
| L4 | Cho danh sách 6 yêu cầu lấy từ support ticket (đặt lại mật khẩu, tải hóa đơn, tính phí trễ hạn theo bảng giá, tóm tắt khiếu nại dài, phân loại ý định email, đổi email đăng nhập): lọc cái nào dùng quy tắc, cái nào đáng dùng AI. | Mỗi mục có lý do theo bộ lọc 1 (IF-THEN đủ chưa) và bộ lọc 2 (tần suất, lặp lại); không gắn AI cho việc tính phí theo bảng. |
| L5 | Thiết kế trust calibration cho luồng hoàn tiền hoặc phê duyệt truy cập dữ liệu cá nhân: AI làm gì, người làm gì, cảnh báo nào hiển thị. | AI chỉ phân tích, tổng hợp, đề xuất; người quyết định; nêu cả rủi ro quá tin lẫn quá nghi và cách thiết kế chống từng cái. |
| L6 | **Sửa bài:** sửa thiết kế "Chatbot trả lời tự động mọi câu hỏi về hoàn tiền, luôn đưa ra câu trả lời, không hiện nguồn, không có nút chuyển nhân viên". | Thêm nhánh fallback theo confidence, review checkpoint trước khi hoàn tiền, trích nguồn, nút sửa/từ chối, nhãn AI. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `04.html` (trường `q`, `o`, `a`, `ex`, `why`), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: sau ra mắt người dùng chấp nhận mọi gợi ý AI mà không đọc, đó là lỗi calibration nào và sửa ra sao; model cập nhật làm câu trả lời cho cùng câu hỏi thay đổi, test pass/fail cũ còn dùng được không). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục; mục 04.3 có thể không có câu trong quiz, khi đó dùng câu tình huống để phủ).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-05-vision-strategy` (Product Vision, Strategy & Positioning).
