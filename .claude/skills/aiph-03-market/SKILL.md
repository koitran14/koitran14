---
name: aiph-03-market
description: Học và luyện tập Chương 03 của AI Product Handbook — Market Research và đánh giá cơ hội (phân khúc, ICP, buyer persona, TAM/SAM/SOM, đối thủ và moat, Value Proposition Canvas, desirability–feasibility–viability, EU AI Act). Dùng khi người dùng muốn học, ôn, làm quiz hoặc luyện bài tập chương 03, hoặc gõ /aiph-03-market.
---

# Chương 03 · Market Research và đánh giá cơ hội

Nguồn gốc: `content/ai-product-handbook/03.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ; hằng `DVF` chứa checklist 9 câu của ba trụ). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách". Các con số TAM/SAM/SOM, mức giảm 80% và mốc EU AI Act là minh họa từ báo cáo nguồn, nhắc người học đối chiếu trước khi dùng thật.

## Mục tiêu sau chương

- Tách ICP (loại tổ chức hợp nhất) với buyer persona (người duyệt tiền hoặc có quyền chặn: CDO, CISO…).
- Ước SOM từ dưới lên và giải thích vì sao đáng tin hơn TAM từ báo cáo ngành.
- Chỉ ra moat của sản phẩm AI khi model nền ai cũng thuê được; điền Value Proposition Canvas.
- Thẩm định cơ hội theo ba trụ desirability, feasibility, viability, gồm cả chi phí suy luận và rủi ro pháp lý.

## Ý chính (Ghi nhớ của chương)

1. **03.1** Bán sản phẩm AI cho doanh nghiệp là thuyết phục cả CISO, không chỉ người dùng cuối. Trong B2B, người dùng và người duyệt tiền thường là hai người khác nhau.
2. **03.2** SOM từ dưới lên = số khách hàng ICP tiếp cận được × ACV (× tỷ lệ chốt). Ví dụ minh họa: TAM 10 tỷ USD, SAM 2 tỷ USD, SOM = 200 khách × 100.000 USD = 20 triệu USD. Với AI phải cập nhật thường xuyên vì inference cost giảm và tỷ lệ chấp nhận AI tăng.
3. **03.3** Câu hỏi moat: nếu đối thủ dùng đúng model của bạn từ ngày mai, họ còn thiếu gì? Ba nguồn: dữ liệu độc quyền, gắn sâu vào quy trình (chi phí chuyển đổi), UX tốt cho sự không chắc chắn.
4. **03.4** Ba trụ cùng "có" mới duyệt. Viability của AI khác SaaS thường: chi phí biên không gần 0, phải tính chi phí suy luận trên mỗi người dùng so với LTV ngay từ đầu. EU AI Act hiệu lực 01/08/2024; nghĩa vụ hệ thống rủi ro cao từ 02/12/2027, AI gắn trong sản phẩm có luật chuyên ngành từ 02/08/2028 (theo báo cáo nguồn).

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 03.1 → 03.4. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường, rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Cho một sản phẩm AI B2B (ví dụ RAG + IDP cho phòng pháp chế): viết ICP và 3 buyer persona (người dùng, người duyệt tiền, người có quyền chặn), mỗi người một mối lo chính. | ICP có tiêu chí cụ thể (quy mô, data readiness, ngân sách, áp lực chi phí); có CISO hoặc CDO với mối lo PII/tuân thủ/ROI. |
| L2 | Tính SOM bằng công thức của Hình 1: bắt đầu từ mặc định 200 khách × 100.000 USD × 100%, rồi đổi tỷ lệ chốt thành 20% và ACV thành 30.000 USD. Nêu SOM mới và giả định nào nhạy nhất. | Phép tính đúng (20 triệu → 4 triệu → 1,2 triệu USD); nhận ra tỷ lệ chốt 100% là phi thực tế; nói rõ khách là ai và trả bao nhiêu. |
| L3 | Liệt kê 1 incumbent và 1 startup AI-native trong mảng của người học; trả lời câu hỏi moat cho sản phẩm của mình theo 3 nguồn. | Moat không phải "model tốt hơn"; mỗi nguồn có bằng chứng cụ thể (dữ liệu gì, gắn vào bước nào của quy trình, xử lý lỗi ra sao). |
| L4 | Điền Value Proposition Canvas (customer jobs, pains, pain relievers, gain creators) cho sản phẩm của người học, theo mẫu ví dụ RAG + IDP của chương. | Mỗi pain có pain reliever tương ứng; con số lợi ích (kiểu "giảm 80% thời gian") được đánh dấu là giả thuyết cần đo lại. |
| L5 | Chấm cơ hội theo checklist 9 câu của Hình 2 (3 câu × desirability/feasibility/viability); với câu chưa "có", nêu cách kiểm trong 2 tuần. Phân loại mức rủi ro theo EU AI Act. | Kết luận "chưa nên duyệt" nếu thiếu bất kỳ trụ nào; viability có chi phí suy luận/người dùng vs LTV; nêu sản phẩm có rơi vào nhóm rủi ro cao (tuyển dụng, giáo dục, sinh trắc học, hạ tầng thiết yếu) không. |
| L6 | **Sửa bài:** viết lại đề xuất "Thị trường AI toàn cầu 200 tỷ USD, chỉ cần 1% là ta có 2 tỷ, model của ta mạnh nhất" thành đánh giá cơ hội đúng. | Thay TAM top-down bằng SOM từ dưới lên; thay "model mạnh nhất" bằng moat thật; thêm viability có chi phí suy luận. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `03.html` (trường `q`, `o`, `a`, `ex`, `why`), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: người dùng cuối rất thích bản demo nhưng CISO chặn, thiếu trụ nào và làm gì tiếp; giá token giảm một nửa thì SOM và viability đổi ra sao). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-04-product-design` (Product Design & UX cho sản phẩm AI).
