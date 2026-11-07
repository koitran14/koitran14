---
name: aiph-11-launch-growth
description: Học, ôn trắc nghiệm và luyện áp dụng chương 11 của AI Product Handbook — Ra mắt, adoption và tăng trưởng. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-11-launch-growth.
---

# Chương 11 · Ra mắt, adoption và tăng trưởng

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/11.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Khoanh phạm vi và quyền hành động, xử lý handoff, chọn cách sửa theo nguyên nhân và thiết kế A/B test với chỉ số chính cùng điều kiện dừng.

## Trọng tâm cần nắm

- **11.1 · Khoanh phạm vi và handoff:** Tìm việc lặp lại, rủi ro thấp từ lịch sử ticket. Việc nhạy cảm: AI tóm tắt, chuyển cho người. Người dùng không phải nhập lại thông tin.
- **11.2 · Sửa lỗi trước khi mở rộng:** Chẩn đoán nguyên nhân trước khi chọn RAG hay fine-tuning. Schema cần structured outputs/validation, không chỉ fine-tuning. So chi phí và độ trễ trong cùng điều kiện.
- **11.3 · Ba cơ chế giúp người dùng chấp nhận:** Duyệt hành động lớn theo quyền và chính sách. Hiển thị nguồn; confidence chỉ khi được kiểm định. Fallback có ngữ cảnh, không bắt người dùng kể lại.
- **11.4 · Thử nghiệm và đo tăng trưởng:** A/B là một thiết kế thí nghiệm, không đồng nghĩa online evaluation. Chốt giả thuyết, đơn vị phân nhóm, cỡ mẫu và quy tắc dừng. AARRR giúp chọn chặng cần cải thiện; không có chặng luôn quan trọng nhất.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Thiết kế A/B test cho cách hiển thị nguồn của trợ lý CSKH.

**Tiêu chí đạt:** Có giả thuyết, randomization, metric chính/guardrail, kế hoạch cỡ mẫu và dừng; không đồng nhất online eval với A/B.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 12 · Product Economics & Business Strategy.
