---
name: aiph-18-builder-glossary
description: Học và luyện tập Chương 18 của AI Product Handbook — AI Product Builder và Forward Deployed Engineer (hai vai trò, vòng sáu bước customer discovery → solution validation → prototyping → production readiness → system integration → outcome measurement). Dùng khi người dùng muốn học, ôn, luyện flashcard, làm quiz chương 18, hoặc gõ /aiph-18-builder-glossary.
---

# Chương 18 · AI Product Builder và Forward Deployed Engineer

Nguồn gốc: `content/ai-product-handbook/18.html` (đọc bảng thuật ngữ, danh sách vòng sáu bước và hộp "Ghi nhớ"; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, object `terms` chứa định nghĩa kèm ví dụ đời thường). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Phân biệt AI Product Builder với Forward Deployed Engineer: làm ở đâu, bắt đầu từ đâu, mang gì về cho đội.
- Kể lại đúng thứ tự sáu bước của vòng làm việc và nêu đầu ra của từng bước.
- Tự đánh giá mình mạnh, yếu ở bước nào và chọn bước cần tập.

## Ý chính (Ghi nhớ của chương)

1. **Chung** Builder và FDE gần với người đã quen viết phần mềm nhất: họ code, nhưng thước đo là vấn đề của khách hàng có được giải không.
2. **18.1** Builder làm từ con số 0: tự tìm vấn đề, dựng prototype, đưa người dùng thử, đo kết quả. FDE làm ở phía khách hàng: hiểu quy trình và dữ liệu, tích hợp, tùy biến, rồi mang bài học về.
3. **18.2** Vòng sáu bước lặp lại: outcome measurement chỉ ra chỗ cần discovery tiếp.
4. **18.2** Người xuất thân Software Engineer đã giỏi bước 4 và 5. Đầu tư vào bước 1, 2 và 6.

## Nhóm thuật ngữ

| Nhóm | Thuật ngữ |
|---|---|
| 18.1 Hai vai trò | AI Product Builder ("thợ cả vừa vẽ bản vẽ vừa dựng nhà mẫu"), Forward Deployed Engineer ("kỹ sư công trường") |
| 18.2 Vòng làm việc | 1 Customer discovery, 2 Solution validation, 3 Prototyping, 4 Production readiness, 5 System integration, 6 Outcome measurement |

Thuật ngữ phụ trong `terms`: prototype ("mô hình giấy của căn nhà"), latency ("thời gian chờ món sau khi gọi").

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, giữ nguyên thuật ngữ tiếng Anh, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Mở đầu bằng hai vai trò: định nghĩa, ví dụ đời thường trong `terms`, rồi yêu cầu người học **giải thích lại bằng lời của mình** khác biệt giữa hai vai trò. Sau đó đi qua sáu bước theo thứ tự, mỗi lượt 2 bước: định nghĩa, ví dụ một việc cụ thể ở bước đó (ví dụ bước 2: thử prompt trên 20 hồ sơ thật xem có trích đúng không), và hỏi người học đầu ra của bước là gì, bước sau dùng nó thế nào. Kết thúc phần Học bằng câu hỏi tự đánh giá: "Bạn mạnh nhất ở bước nào, yếu nhất ở bước nào, vì sao?" và đối chiếu với Ghi nhớ.

### Luyện
Chạy một phiên flashcard 8–12 thẻ (chương ít thuật ngữ nên lặp nhiều dạng), trộn bốn dạng:

| Dạng | Cách hỏi | Đạt khi |
|---|---|---|
| Định nghĩa → thuật ngữ | Mô tả một bước hoặc vai trò, người học gọi tên. | Đúng tên. |
| Thuật ngữ → định nghĩa | Đưa tên, người học nêu nghĩa và số thứ tự trong vòng. | Đúng ý và đúng vị trí. |
| Xếp bước | Đưa một hoạt động thật (đo latency dưới tải, phỏng vấn 5 kế toán, đo số giờ tiết kiệm sau 1 tháng, nối API vào ERP của khách…), người học xếp vào bước nào. | Đúng bước, giải thích được vì sao không phải bước kề bên. |
| Dùng trong câu | Đưa tình huống (viết bản tự giới thiệu khi ứng tuyển FDE, báo cáo cho sếp sau pilot), người học viết một câu dùng thuật ngữ đúng. | Đúng nghĩa và ngữ cảnh; không nhầm solution validation với production readiness. |

Lặp lại có giãn cách trong buổi: ghi thẻ sai vào danh sách "ôn lại", hỏi lại sau 2–3 thẻ khác, đổi dạng hỏi; thẻ chỉ ra khỏi danh sách khi đúng 2 lần liên tiếp. Cuối phiên báo số thẻ đúng lần đầu và các thẻ còn lại.

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `18.html` (trường `q`, `o`, `a`, `ex`), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn, ví dụ: "Một kỹ sư ngồi tại văn phòng ngân hàng khách hàng ba tháng để nối trợ lý AI vào core banking và gửi về đội sản phẩm danh sách yêu cầu lặp lại — đó là vai trò nào, đang ở bước nào?" và "Bản prototype chạy tốt với 10 người nhưng chưa ai đo đội khách hàng tiết kiệm được bao nhiêu giờ — vòng đang thiếu bước nào, hậu quả là gì?". Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, bước yếu nhất của họ, và gợi ý chương tiếp theo: `/aiph-19-frameworks` (Framework và bảng tra quyết định). Để tập các bước yếu: bước 1–2 → `/aiph-02-problem-discovery`, bước 3 → `/aiph-04-product-design`, bước 4–5 → `/aiph-08-system-architecture`, bước 6 → `/aiph-10-product-analytics`.
