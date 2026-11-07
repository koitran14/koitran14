---
name: aiph-21-capstone
description: Học, ôn trắc nghiệm và luyện áp dụng chương 21 của AI Product Handbook — Capstone: từ vấn đề đến launch. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-21-capstone.
---

# Chương 21 · Capstone: từ vấn đề đến launch

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/21.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Một dự án minh họa về trợ lý tra quy trình CSKH: đi từ bằng chứng người dùng đến phạm vi, kiến trúc, eval và quyết định mở rộng. Các con số đều là giả định để luyện tập.

## Trọng tâm cần nắm

- **21.1 · Discovery và phạm vi:** Case và số liệu là giả định để luyện tập. Thu bằng chứng công việc và đo baseline đại diện. Pilot nội bộ, chỉ tra cứu; không tự hành động tài chính.
- **21.2 · Kiến trúc và quyền dữ liệu:** Nguồn được quản lý phiên bản và quyền truy cập. OCR chỉ khi cần; phát hiện PII khác che dữ liệu và phê duyệt. Chỉ index bản đã duyệt, retrieval và nguồn phải đúng quyền.
- **21.3 · Eval, rủi ro và quyết định mở rộng:** Eval có tiêu chí chấm, holdout và bộ rủi ro riêng. Đo tác vụ đúng, thời gian, công sức rà soát, độ trễ và chi phí. Phân loại pháp lý theo intended use; mở rộng theo bằng chứng.
- **21.4 · Tự làm dự án của bạn:** Mười bước từ vấn đề tới product review. Chọn vấn đề nhỏ, thật, có người dùng thử. Đo outcome và chi phí.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Thiết kế pilot trợ lý tra quy trình từ discovery đến quyết định mở rộng; giữ phạm vi tra cứu nội bộ.

**Tiêu chí đạt:** Có baseline, nguồn/quyền, eval/holdout/tiêu chí chấm, mẫu ngẫu nhiên, chi phí và điều kiện dừng; số giả định không được gọi là kết quả thực tế.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý một dự án nhỏ để áp dụng và quay lại các mục còn yếu.
