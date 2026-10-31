---
name: aiph-05-vision-strategy
description: Học và luyện tập Chương 05 của AI Product Handbook — Product Vision, Strategy và Positioning (vision/mission, chia việc AI PM và AI Engineer, value proposition không dùng chữ "AI", tam giác chất lượng–chi phí–latency, ước tính chi phí theo token, chọn model trên eval set). Dùng khi người dùng muốn học, ôn, làm quiz hoặc luyện bài tập chương 05, hoặc gõ /aiph-05-vision-strategy.
---

# Chương 05 · Product Vision, Strategy và Positioning

Nguồn gốc: `content/ai-product-handbook/05.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ; hàm `cost()` và các nút `data-t` chứa công thức và giá giả định của Hình 1). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách". Giá token, mức 90–95% và số lương là minh họa từ báo cáo nguồn, không phải số liệu hiện hành.

## Mục tiêu sau chương

- Chia đúng "cái gì/tại sao" (AI PM) và "làm thế nào" (AI Engineer); khi đề xuất kỹ thuật, nói được nó phục vụ mục tiêu nào và cái giá là gì.
- So sánh hai vai trò theo mục tiêu, việc hằng ngày, kỹ năng và cách đo thành công.
- Viết value proposition nói được người dùng làm gì nhanh hơn, rẻ hơn hoặc trước đây không làm được.
- Ước chi phí suy luận theo token và chọn model rẻ nhất vẫn vượt ngưỡng chất lượng.

## Ý chính (Ghi nhớ của chương)

1. **05.1** (mục không có Ghi nhớ, tóm từ nội dung) AI PM lo "cái gì" và "tại sao", đặt tiêu chuẩn thành công, ngân sách, phạm vi; AI Engineer lo "làm thế nào". Kỹ sư cần tập đứng ở cả hai phía.
2. **05.2** Hai cột đo thành công khác nhau: PM đo adoption, CSAT, doanh thu, chi phí mỗi giao dịch; Engineer đo độ chính xác, latency, uptime, chi phí hạ tầng. Sản phẩm tốt cần cả hai cột cùng đạt.
3. **05.3** Viết value proposition mà không dùng chữ "AI". Không viết được → giá trị chưa rõ.
4. **05.4** Tam giác chất lượng – inference cost – latency: kéo một đỉnh lên thường làm hai đỉnh kia xấu đi. Chi phí = request × (input × giá input + output × giá output) / 1.000.000. Model nhỏ/fine-tune có thể đạt ~90–95% chất lượng model lớn trên tác vụ hẹp. Đừng chọn theo bảng xếp hạng; chọn model rẻ nhất mà vẫn vượt ngưỡng trên eval set của bạn.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 05.1 → 05.4. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường, rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Cho 8 việc (đặt ngưỡng chất lượng cho eval, chọn kiến trúc RAG, quyết định phạm vi MVP, giảm latency truy xuất, đặt ngân sách token/tháng, viết test tự động, phỏng vấn người dùng, giữ uptime): xếp vào AI PM hay AI Engineer. | Đúng theo bảng 05.2; việc chung (như ngưỡng chất lượng) nói rõ ai quyết, ai thực hiện. |
| L2 | Người học đề xuất một hướng kỹ thuật (ví dụ chuyển sang model lớn hơn): viết 3 câu nói nó phục vụ mục tiêu nào, chỉ số ở cột PM và cột Engineer đổi ra sao, cái giá phải trả. | Có ít nhất 1 chỉ số mỗi cột; nêu cái giá cụ thể (chi phí, latency) chứ không chỉ lợi ích. |
| L3 | Viết value proposition cho sản phẩm của người học, không dùng chữ "AI", theo dạng: người dùng làm gì nhanh hơn / rẻ hơn / trước đây không làm được. | Không có chữ "AI", "thông minh", "LLM"; có bài toán cụ thể và so sánh với cách làm cũ hoặc phần mềm quy tắc. |
| L4 | Tính chi phí bằng công thức Hình 1: 1.000.000 request, 1.000 input + 500 output token. So model lớn giả định (3 / 15 USD mỗi 1M token) với model nhỏ giả định (0,8 / 4 USD). Nêu tỷ trọng chi phí output. | Model lớn 10.500 USD, model nhỏ 2.800 USD; output chiếm ~71% ở model lớn; nhận ra cắt output token là đòn bẩy chi phí. |
| L5 | Cho 4 tác vụ (phân loại ticket, tóm tắt email ngắn, tư vấn hợp đồng pháp lý, phân tích dữ liệu y tế nhạy cảm): chọn model nhỏ hay lớn và viết cách kiểm chứng trên eval set. | Tác vụ đơn giản/tần suất cao → model nhỏ; pháp lý/nhạy cảm → model lớn; mọi lựa chọn đều kèm "chấm cả hai trên eval set của mình" và ngưỡng đạt. |
| L6 | **Sửa bài:** viết lại "Sản phẩm của chúng tôi dùng model đứng đầu bảng xếp hạng, ứng dụng AI tiên tiến nhất để tối ưu mọi quy trình". | Bỏ chữ AI và bảng xếp hạng; thêm bài toán cụ thể, lợi ích đo được; nếu nói tới model thì chọn theo eval set và chi phí. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `05.html` (trường `q`, `o`, `a`, `ex`, `why`), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: model nhỏ đạt 92% so với model lớn trên eval set, ngưỡng là 90%, latency yêu cầu dưới 1 giây, chọn gì và vì sao; CSAT tăng nhưng chi phí mỗi giao dịch gấp đôi, cột nào đang hỏng). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-06-requirements-roadmap` (Requirements, Prioritization & Roadmapping).
