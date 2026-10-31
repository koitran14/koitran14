---
name: aiph-10-product-analytics
description: Học và luyện tập Chương 10 của AI Product Handbook — Product analytics và ra quyết định (đo phần mềm thường vs sản phẩm AI, drift, North Star, funnel, cohort, precision và recall, ngưỡng quyết định, feedback loop và human-in-the-loop, khung đánh giá model bốn bước với eval trong CI/CD). Dùng khi người dùng muốn học, ôn, làm quiz hoặc luyện bài tập chương 10, hoặc gõ /aiph-10-product-analytics.
---

# Chương 10 · Product analytics và ra quyết định

Nguồn gốc: `content/ai-product-handbook/10.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ; hàm `cmu` và `CASES` là mô phỏng Hình 1: 200 mẫu giả lập, 40 mẫu dương tính thật, kéo ngưỡng quyết định). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Liệt kê chỉ số riêng của sản phẩm AI (tỷ lệ đúng khi đầu ra mở, drift, latency suy luận, chi phí trên mỗi tác vụ thành công) và đặt chúng cạnh North Star, funnel, cohort.
- Tính precision, recall từ TP/FP/FN và chọn ưu tiên theo chi phí của mỗi loại sai.
- Thiết kế feedback loop trong sản phẩm biến hành động người dùng thành dữ liệu có nhãn.
- Áp dụng khung đánh giá bốn bước và coi mỗi lần đổi prompt là một lần release.

## Ý chính (Ghi nhớ của chương)

1. **10.1** Phần mềm thường đo đúng/sai theo thiết kế (uptime, lỗi HTTP, số bug, thời gian tải trang). Sản phẩm AI đo thêm tỷ lệ phản hồi đúng khi đầu ra mở, data drift / concept drift, latency suy luận, chi phí điện toán trên mỗi tác vụ thành công. Chỉ số kỹ thuật (độ chính xác, latency) và chỉ số sản phẩm (retention, North Star) phải nằm cạnh nhau trên cùng một dashboard.
2. **10.2** Precision = TP / (TP + FP); Recall = TP / (TP + FN). Ưu tiên precision khi false positive đắt (tự duyệt khoản vay, gian lận giao dịch lớn, tự ký hợp đồng); ưu tiên recall khi false negative nghiêm trọng (ảnh y khoa, quét mã độc, nội dung vi phạm pháp luật). Trước khi chỉnh ngưỡng, hỏi: một false positive tốn bao nhiêu, một false negative tốn bao nhiêu?
3. **10.3** Giữ hiệu năng cần gán nhãn liên tục, kết hợp tự động với người (human-in-the-loop, ví dụ SageMaker Ground Truth) và feedback loop để cập nhật model khi lệch thực tế. Ở phía sản phẩm, nút thích/không thích hoặc cho người dùng sửa câu trả lời: mỗi lần sửa là một mẫu có nhãn. *(Mục này không có hộp Ghi nhớ; ý rút từ văn bản.)*
4. **10.4** Bốn bước: eval set đại diện (có edge case nguy hiểm, adversarial prompt) → tiêu chí tường minh (factuality, completeness, latency, format compliance, tone & style, hallucination rate) → đo tự động qua mỗi phiên bản trong CI/CD → chuyên gia chấm định kỳ câu confidence thấp hoặc nhạy cảm. Đổi prompt cũng là một lần release: chạy eval trước khi merge, như unit test.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 10.1 → 10.4. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường, rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Ở 10.2, mô tả lại Hình 1 bằng lời (200 mẫu, 40 dương tính; ngưỡng cao → ít báo nhầm, sót nhiều; ngưỡng thấp → bắt nhiều, báo nhầm tăng) và hỏi người học dự đoán precision/recall đổi chiều nào khi hạ ngưỡng. Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Thiết kế một dashboard cho trợ lý CSKH: chọn 1 North Star (ví dụ số ticket được giải quyết đúng nhờ AI mỗi tuần), 3 bước funnel, 1 phân tích cohort, và 4 chỉ số AI (tỷ lệ đúng, drift, latency, chi phí/tác vụ thành công). | Chỉ số kỹ thuật và sản phẩm nằm cạnh nhau; North Star phản ánh giá trị người dùng nhận được, không phải số lượt gọi model; cohort chỉ rõ nhóm theo thời điểm bắt đầu. |
| L2 | **Tính toán:** trên bộ 200 mẫu, 40 dương tính thật. Ở ngưỡng A: TP = 32, FP = 24. Ở ngưỡng B: TP = 22, FP = 4. Tính precision, recall, FN cho cả hai ngưỡng; ngưỡng nào cao hơn? | A: precision ≈ 57%, recall 80%, FN = 8; B: precision ≈ 85%, recall 55%, FN = 18; B là ngưỡng cao hơn (ít báo nhầm, sót nhiều). Trình bày công thức. |
| L3 | Chọn ưu tiên precision hay recall cho 4 bài toán: tự duyệt khoản vay nhỏ, lọc nội dung vi phạm pháp luật trên mạng xã hội, gợi ý sản phẩm, phát hiện tổn thương trên X-quang. Với mỗi bài, ước lượng chi phí một FP và một FN. | Đúng hướng (vay → precision; vi phạm pháp luật, X-quang → recall; gợi ý sản phẩm lập luận được); nêu quy trình dự phòng đi kèm (thủ công cho precision, người rà soát cho recall). |
| L4 | Thiết kế feedback loop cho trợ lý soạn email: cơ chế trong giao diện, dữ liệu nào được lưu thành mẫu có nhãn, khi nào chuyển cho người gán nhãn, khi nào cập nhật model hoặc eval set. | Có cơ chế cụ thể (thích/không thích, sửa trực tiếp); mỗi lần sửa thành một mẫu có nhãn; có human-in-the-loop; nối được với phát hiện drift. |
| L5 | Viết checklist "trước khi merge một thay đổi prompt" theo khung bốn bước: eval set dùng gì, 6 tiêu chí đo gì và ngưỡng nào, pipeline chạy khi nào, câu nào đẩy cho chuyên gia. | Đủ 4 bước; dùng đúng 6 tiêu chí của chương; pipeline chạy khi đổi model nền, prompt hoặc cấu hình RAG; chuyên gia chấm câu confidence thấp/nhạy cảm. |
| L6 | **Sửa bài:** "Dashboard AI của chúng ta: uptime 99,9%, lỗi HTTP 0,1%, thời gian tải trang 1,2 s. Model đã đạt 90% accuracy lúc launch nên không cần theo dõi thêm. Prompt sửa trực tiếp trên production khi cần." Viết lại. | Thêm chỉ số AI (tỷ lệ đúng theo thời gian, drift, chi phí/tác vụ thành công) và chỉ số sản phẩm (North Star, retention); chỉ ra accuracy lúc launch có thể trôi; đổi prompt phải qua eval trong CI trước khi merge. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `10.html` (trường `q`, `o`, `a`, `ex`, `why` nếu có), hỏi từng câu, xáo thứ tự đáp án. Câu `type: "multi"` có nhiều đáp án đúng, báo trước cho người học. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: "Ba tháng sau launch, tỷ lệ trả lời đúng giảm từ 88% xuống 76% dù không ai đổi model hay prompt. Hiện tượng gì, và bạn làm gì?"; "Hệ thống chống gian lận báo nhầm khiến 5% khách tốt bị khóa thẻ. Bạn chỉnh ngưỡng thế nào và cần biết thêm số liệu gì?"). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục, 0 = 10.1; lưu ý quiz chương này không có câu cho 10.3).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-11-launch-growth` (Experimentation, Launch & Growth).
