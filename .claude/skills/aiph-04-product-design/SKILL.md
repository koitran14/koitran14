---
name: aiph-04-product-design
description: Học, ôn trắc nghiệm và luyện áp dụng chương 04 của AI Product Handbook — Product Design và UX cho sản phẩm AI. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-04-product-design.
---

# Chương 04 · Product Design và UX cho sản phẩm AI

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/04.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Thiết kế quyền kiểm soát, nguồn dễ kiểm tra và luồng phục hồi khi AI sai; dùng tín hiệu đã kiểm định để điều phối, giúp người dùng tin ở mức phù hợp.

## Trọng tâm cần nắm

- **04.1 · UX khi đầu ra có thể sai:** Đánh giá chất lượng trên tập mẫu cùng kiểm thử các ràng buộc phần mềm. Phân biệt câu trả lời, nguồn và phiên bản tài liệu. Cho phép sửa, từ chối và báo lỗi.
- **04.2 · User flow, wireframe và prototype:** Vẽ đầu vào, nhánh lỗi và đường duyệt/chuyển ca. Điều phối theo kiểm tra hoặc điểm đã kiểm định, không dùng confidence tự khai. Prototype giúp học luồng, chưa chứng minh production readiness.
- **04.3 · Design thinking như một bộ lọc:** Lọc 1: cần AI hay quy tắc là đủ. Lọc 2: dữ liệu thực tế từ ticket và phỏng vấn. Tác vụ lặp lại, rủi ro thấp là ứng viên tốt.
- **04.4 · Human-in-the-loop và trust calibration:** Trust calibration là niềm tin phù hợp năng lực và giới hạn. Người có thẩm quyền duyệt hành động vượt phạm vi tự động. Cho kiểm tra nguồn; chỉ hiển thị xác suất khi có ý nghĩa đã kiểm định.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Vẽ luồng có nguồn, sửa/báo lỗi và chuyển ca; giải thích có nên hiển thị confidence không.

**Tiêu chí đạt:** Phân biệt điểm tự khai với điểm hiệu chỉnh; quyền kiểm soát cụ thể và xử lý yêu cầu ngoài phạm vi.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 05 · Product Vision, Strategy & Positioning.
