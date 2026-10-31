---
name: aiph-12-product-economics
description: Học và luyện tập Chương 12 của AI Product Handbook — Kinh tế học của sản phẩm AI (chi phí biên không về 0, cost per successful task, TCO, ba cách tối ưu token, build vs. buy vs. partner, thu nhập AI PM). Dùng khi người dùng muốn học, ôn, làm quiz, tính unit economics hoặc luyện bài tập chương 12, hoặc gõ /aiph-12-product-economics.
---

# Chương 12 · Kinh tế học của sản phẩm AI

Nguồn gốc: `content/ai-product-handbook/12.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ, hàm `kpu()` là mô hình chi phí của Hình 1 với giá trị mặc định 0,01 USD/lần gọi, 70% dùng được, 1,5 lần gọi/tác vụ). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Giải thích vì sao chi phí biên của AI không về 0 như SaaS thường.
- Tính cost per successful task và phân biệt nó với giá mỗi lần gọi API.
- Liệt kê bốn thành phần chi phí: inference, cost per successful task, chi phí ngữ cảnh, TCO.
- Chọn cách tối ưu token phù hợp (compression, caching, routing) và biết rủi ro chất lượng của routing.
- Ra quyết định build / buy / partner theo giai đoạn sản phẩm.
- Đọc bảng lương AI PM như tín hiệu thị trường, không phải số chính xác.

## Ý chính (Ghi nhớ của chương)

1. **12.1** Mỗi truy vấn là một hóa đơn nhỏ; sản phẩm được yêu thích vẫn có thể lỗ. Công thức Hình 1: **chi phí mỗi tác vụ thành công = giá mỗi lần gọi × số lần gọi mỗi tác vụ ÷ tỷ lệ dùng được** (mặc định: 0,01 × 1,5 ÷ 0,7 ≈ 0,0214 USD, gấp 2,1× giá một lần gọi). Đo chi phí trên mỗi tác vụ thành công, không phải trên mỗi lần gọi API.
2. **12.2** Ba cách cộng dồn được: prompt compression, embedding/prompt caching, model routing. CSKH nhiều câu lặp lại → cache thường hiệu quả nhất với ít công sức nhất. Routing cần eval để model nhỏ không làm tụt chất lượng ở câu khó bị phân loại nhầm là dễ.
3. **12.3** Buy/partner (ví dụ Amazon Bedrock) cho validation, POC, tính năng không phải lợi thế cốt lõi. Build (ví dụ model mã nguồn mở trên SageMaker AI) khi cần kiểm soát dữ liệu, tùy biến trọng số, lưu lượng rất lớn; tốn CapEx và cần đội MLOps. Bắt đầu bằng buy, đo lưu lượng và chi phí thật, rồi mới cân nhắc build phần ổn định và tốn tiền nhất.
4. **12.4** Số lương (Mỹ: ZipRecruiter TB 159.405 USD, Glassdoor trung vị 200.000 USD; Bluecoders Pháp trung vị 60.000 EUR trên mẫu chỉ 5 hợp đồng) chưa kiểm chứng. Thông điệp: thị trường trả cao cho người nối được sản phẩm và kỹ thuật.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 12.1 → 12.4. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường, rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Ở 12.1, cho người học tự tính số mặc định của Hình 1 trước khi đưa công thức. Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần. Số trong bài là giả định, nói rõ với người học.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | **Unit economics.** Trợ lý AI bán gói 10 USD/người/tháng, mỗi người làm 300 tác vụ/tháng, dùng tham số mặc định Hình 1 (0,01 USD; 70%; 1,5 lần gọi). (a) Tính chi phí mỗi tác vụ thành công và chi phí model mỗi người/tháng. (b) Biên lợi nhuận gộp trên chi phí model là bao nhiêu? (c) Thêm cache: 40% lần gọi trúng cache, coi như 0 đồng → giá gọi hiệu dụng 0,006 USD; tính lại. (d) Thêm routing nhưng tỷ lệ dùng được tụt còn 60%; tính lại và kết luận. | (a) ≈ 0,0214 USD; ≈ 6,43 USD/người. (b) ≈ 36%. (c) ≈ 3,86 USD, biên ≈ 61%. (d) 0,006 × 1,5 ÷ 0,6 = 0,015 → 4,50 USD, biên 55%: routing làm *xấu* đi nếu không eval. Trình bày công thức từng bước. |
| L2 | So hai model: A 0,004 USD/lần gọi, dùng được 50%, 2 lần gọi/tác vụ; B 0,01 USD/lần gọi, 90%, 1,1 lần gọi. Model nào rẻ hơn tính trên tác vụ thành công? | A = 0,016; B ≈ 0,0122 → B rẻ hơn dù giá gọi gấp 2,5×. Nêu đúng bài học "giá mỗi lần gọi rẻ chưa chắc tác vụ rẻ". |
| L3 | Liệt kê TCO cho một trợ lý tra quy trình nội bộ, xếp vào bốn thành phần chi phí của 12.1. | Có ít nhất một mục cho mỗi thành phần; TCO có cả gán nhãn, nhân sự, kiểm định an toàn, rủi ro pháp lý, không chỉ hạ tầng. |
| L4 | Cho hệ thống CSKH phần mềm kế toán: chọn thứ tự áp dụng compression / caching / routing, kèm chỉ số cần theo dõi để biết có làm tụt chất lượng. | Cache đi trước (nhiều câu lặp lại); routing có eval trên câu khó; nêu chỉ số chất lượng song song với chi phí. |
| L5 | Ba tình huống: (a) startup đang POC, (b) ngân hàng cần dữ liệu không rời hạ tầng, lưu lượng hàng triệu lượt/ngày đã ổn định, (c) tính năng tóm tắt email không phải lợi thế cốt lõi. Build, buy hay partner? | (a) buy, (b) cân nhắc build cho phần ổn định, (c) buy/partner; lý do theo giai đoạn, kiểm soát dữ liệu, quy mô, năng lực MLOps. |
| L6 | **Sửa bài:** "Chi phí API chỉ 0,002 USD/lần gọi nên sản phẩm gần như miễn phí khi scale; ta sẽ tự host model ngay từ POC để tiết kiệm; lương AI PM ở Pháp chắc chắn là 60.000 EUR." Viết lại. | Đổi sang cost per successful task + TCO; POC thì buy trước; số lương là tín hiệu, mẫu 5 hợp đồng. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `12.html` (trường `q`, `o`, `a`, `ex`), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: lưu lượng tăng gấp 3 thì chi phí biên của SaaS và của AI khác nhau thế nào; đội đề xuất routing toàn bộ sang model nhỏ để giảm 70% chi phí thì PM hỏi lại gì). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục, 0 = 12.1).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-13-risk-governance` (AI Product Risk & Governance).
