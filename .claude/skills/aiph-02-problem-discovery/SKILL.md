---
name: aiph-02-problem-discovery
description: Học, ôn trắc nghiệm và luyện áp dụng chương 02 của AI Product Handbook — Problem Discovery và nghiên cứu người dùng. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-02-problem-discovery.
---

# Chương 02 · Problem Discovery và nghiên cứu người dùng

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/02.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Tránh bẫy “có AI rồi mới đi tìm bài toán”: đóng khung vấn đề, dùng Jobs to Be Done, persona, customer journey, và viết problem statement trước khi nghĩ tới giải pháp.

## Trọng tâm cần nắm

- **02.1 · Chọn công nghệ trước khi hiểu vấn đề:** Đừng chọn công nghệ trước rồi mới tìm vấn đề. Ba câu hỏi: dữ liệu, loại bài toán, ngưỡng lỗi. Quy tắc cố định đủ dùng thì không cần AI.
- **02.2 · Chuẩn bị điều kiện ra mắt ngay từ giai đoạn khám phá vấn đề:** Eval là một điều kiện phát hành, không thay kiểm tra quyền truy cập và vận hành. Bộ mẫu có ca thông thường, ca khó và tiêu chí chấm rõ. Soạn eval sớm giúp kiểm tra lại giả định về vấn đề.
- **02.3 · Jobs to Be Done:** JTBD: khách hàng thuê sản phẩm để làm một việc. Ba mặt: chức năng, cảm xúc, xã hội. AI giải lại các việc cũ theo cách mới: hội thoại, IDP, RAG.
- **02.4 · Persona, customer journey và pain point:** Persona dựa trên bằng chứng; kiểm tra mức độ quen thuộc với công nghệ và niềm tin vào AI. Phỏng vấn về lần làm việc gần nhất, tránh gợi ý giải pháp. Quan sát quy trình và ghi giả thuyết cần kiểm chứng tiếp.
- **02.5 · Problem statement và cơ hội tạo giá trị:** Công thức: ai, gặp khó gì, hậu quả, nguyên nhân. Không nhắc giải pháp trong problem statement. Ba nhóm cơ hội: Efficiency, Personalization, Innovation.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Viết năm câu hỏi phỏng vấn về lần gần nhất nhân viên tra quy trình, rồi soạn problem statement.

**Tiêu chí đạt:** Không dẫn dắt bằng tên giải pháp; hỏi hành vi thật, nguồn và hậu quả, nêu giả thuyết cần kiểm chứng.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 03 · Market Research & Opportunity Assessment.
