---
name: aiph-06-requirements-roadmap
description: Học, ôn trắc nghiệm và luyện áp dụng chương 06 của AI Product Handbook — Yêu cầu, ưu tiên và roadmap. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-06-requirements-roadmap.
---

# Chương 06 · Yêu cầu, ưu tiên và roadmap

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/06.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Chương này trình bày cách viết PRD cho tính năng AI, phân biệt POC, prototype, MVP và pilot, cùng cách ưu tiên công việc có rủi ro về dữ liệu và mô hình. Phần cuối đề cập đến quá trình phát hành từ Alpha, qua Beta đến GA.

## Trọng tâm cần nắm

- **06.1 · PRD cho tính năng AI:** PRD nối vấn đề và phạm vi với tiêu chí chấm, eval và điều kiện phát hành. Tách chất lượng, quyền truy cập, độ trễ và ngân sách. Ngưỡng cần mẫu số, điều kiện đo và mức rủi ro cụ thể.
- **06.2 · POC, prototype, MVP và pilot:** POC: khả thi kỹ thuật. Prototype: luồng trải nghiệm. MVP: giá trị thị trường; Pilot: vận hành thật quy mô nhỏ.
- **06.3 · Ưu tiên backlog:** Cân tác động, công sức và rủi ro dữ liệu/model. RICE Confidence phản ánh bằng chứng cho các ước tính ưu tiên. Eval không thay bằng chứng về reach và impact.
- **06.4 · Roadmap và phạm vi phát hành:** Alpha thử nội bộ; Beta/Pilot thử giới hạn với mục tiêu rõ. Kiểm trải nghiệm, chất lượng và vận hành trước khi mở rộng. Roadmap có mốc dự kiến và điều kiện đi tiếp.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Viết PRD ngắn cho pilot: phạm vi, eval tiêu chí chấm, dữ liệu/quyền, độ trễ, chi phí và điều kiện đi tiếp.

**Tiêu chí đạt:** Không coi một kết quả đánh giá là đủ phát hành; phân biệt bằng chứng kỹ thuật với confidence trong RICE.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 07 · AI & LLM Fundamentals.
