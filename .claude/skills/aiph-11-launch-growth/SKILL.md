---
name: aiph-11-launch-growth
description: Học và luyện tập Chương 11 của AI Product Handbook — Ra mắt, adoption và tăng trưởng (khoanh phạm vi tự động hóa và handoff, RAG hay fine-tuning khi ra mắt, ba cơ chế UX giúp người dùng chấp nhận, A/B test và AARRR). Dùng khi người dùng muốn học, ôn, làm quiz hoặc luyện bài tập chương 11, hoặc gõ /aiph-11-launch-growth.
---

# Chương 11 · Ra mắt, adoption và tăng trưởng

Nguồn gốc: `content/ai-product-handbook/11.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ, hàm `sorter(...)` chứa 5 câu phân loại của Hình 1). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Từ lịch sử ticket, tách được việc AI xử lý trọn với việc phải handoff cho người.
- Thiết kế handoff mang theo ngữ cảnh, người dùng không phải nhập lại.
- Chọn RAG hay fine-tuning theo bốn tiêu chí: chi phí, latency, độ chính xác, ngữ cảnh dùng.
- Áp dụng đủ ba cơ chế adoption: human-in-the-loop, confidence/trích nguồn, fallback theo ngưỡng.
- Đặt giả thuyết A/B test cho tính năng AI và chỉ ra chặng AARRR đang rơi người dùng.

## Ý chính (Ghi nhớ của chương)

1. **11.1** Việc lặp lại, rủi ro thấp (đặt lại mật khẩu, tải hóa đơn GTGT) → AI xử lý trọn. Việc nhạy cảm (khiếu nại sai lệch số liệu, hoàn tiền) → guardrails chặn, AI tóm tắt rồi handoff. Handoff tốt là khi nhân viên nhận ca đã biết khách cần gì, không phải hỏi lại từ đầu.
2. **11.2** RAG: rẻ lúc đầu, latency cao hơn (mã hóa truy vấn → tìm vector → nạp ngữ cảnh → gọi model), sửa sai bằng cập nhật dữ liệu, trích được nguồn. Fine-tuning: đắt lúc đầu (GPU, dữ liệu gán nhãn, data science), nhanh và ổn định, hợp văn phong/định dạng (JSON schema), dễ lạc hậu tri thức.
3. **11.3** Ba cơ chế: người duyệt hành động tác động lớn (email hàng loạt, chuyển tiền); nói rõ là AI + hiển thị confidence hoặc trích nguồn; fallback khi confidence dưới ngưỡng (ví dụ < 75%) về tra cứu theo quy tắc, gợi ý câu hỏi hoặc nối tư vấn viên. Đây là change management.
4. **11.4** A/B test so phiên bản prompt, model, cách hiển thị confidence (chính là online evaluation ở chương 9). AARRR: Acquisition, Activation, Retention, Referral, Revenue. Với tính năng AI, những câu trả lời đầu tiên quyết định retention: đầu tư vào trải nghiệm lần đầu.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 11.1 → 11.4. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường, rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Ở 11.1, cho người học làm 5 câu phân loại của Hình 1 (lấy từ `sorter(...)`) trước khi giải thích. Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Cho 8 yêu cầu CSKH của phần mềm kế toán (5 câu trong Hình 1 + 3 câu tự soạn, ví dụ: "đổi email đăng nhập", "xuất lại hóa đơn đã ký sai mã số thuế", "hỏi giá gói doanh nghiệp"). Xếp vào "AI tự xử lý" / "Chuyển cho người". | Mỗi câu xếp đúng **và** lý do dựa trên hai trục: lặp lại hay không, rủi ro tài chính/pháp lý khi sai. |
| L2 | Viết gói handoff cho ca "Số dư báo cáo quý sai lệch 120 triệu so với sổ cái": AI tóm tắt gì, chuyển những trường nào cho nhân viên, nói gì với khách. | Có tóm tắt sự cố, dữ liệu đã thu (kỳ báo cáo, số tiền, tài khoản), câu thông báo cho khách; nhân viên không phải hỏi lại. |
| L3 | Ba bài toán ra mắt: (a) CSKH tra chính sách đổi mỗi quý, (b) chuyển phiếu nhập kho tự do thành JSON schema cố định, (c) trợ lý pháp chế cần trích điều khoản. Chọn RAG hay fine-tuning cho từng bài. | Chọn đúng (a) RAG, (b) fine-tuning, (c) RAG; lý do nêu ít nhất 2 trong 4 tiêu chí của bảng 11.2. |
| L4 | Thiết kế UX cho tính năng AI "tự gửi email nhắc nợ cho khách" đủ ba cơ chế 11.3, có ngưỡng fallback bằng số. | Có bước người duyệt trước khi gửi hàng loạt; hiển thị confidence hoặc nguồn; ngưỡng cụ thể (ví dụ 75%) và đường fallback rõ. |
| L5 | Cho phễu giả định (số liệu ngoài sách) của trợ lý AI: 10.000 người biết tới, 4.000 dùng thử, 900 thấy giá trị lần đầu, 500 quay lại tuần 2. Chỉ ra chặng rơi nhiều nhất theo AARRR và viết một giả thuyết A/B test để sửa. | Gọi đúng tên chặng (Activation); giả thuyết có biến thể cụ thể (prompt/model/cách hiện confidence), chỉ số chính và hướng kỳ vọng. |
| L6 | **Sửa bài:** "Ra mắt chatbot cho toàn bộ yêu cầu, kể cả hoàn tiền; ẩn mọi thông báo lỗi để AI trông chuyên nghiệp; đo thành công bằng số lượt chat." Viết lại kế hoạch ra mắt. | Khoanh phạm vi + handoff cho hoàn tiền; không ẩn lỗi mà hiện confidence/fallback; chỉ số đổi sang Activation/Retention. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `11.html` (trường `q`, `o`, `a`, `ex`; câu `type: "multi"` có nhiều đáp án đúng), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: confidence 72% với ngưỡng 75% thì giao diện nên làm gì; chính sách giá đổi hằng tháng mà đội muốn fine-tune thì phản biện thế nào). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục, 0 = 11.1).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-12-product-economics` (Product Economics & Business Strategy).
