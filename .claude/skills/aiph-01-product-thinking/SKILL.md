---
name: aiph-01-product-thinking
description: Học, ôn trắc nghiệm và luyện áp dụng chương 01 của AI Product Handbook — Product Thinking và vòng đời sản phẩm AI. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-01-product-thinking.
---

# Chương 01 · Product Thinking và vòng đời sản phẩm AI

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/01.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Phân biệt sản phẩm, dự án, tính năng và dịch vụ AI; đánh giá sản phẩm bàn giao, kết quả sử dụng và tác động kinh doanh; quản lý sự không chắc chắn trong suốt vòng đời sản phẩm.

## Trọng tâm cần nắm

- **01.1 · Product, project, feature và service:** LLM sinh nội dung có thể biến thiên; không phải mọi AI đều ngẫu nhiên. Phân biệt phạm vi product, project, feature và service. Bàn giao cần kèm trách nhiệm vận hành và ngân sách.
- **01.2 · Từ output đến outcome và impact:** Output là thứ bàn giao; outcome là thay đổi; impact là giá trị dài hạn. Precision giảm báo nhầm, recall giảm bỏ sót. Chọn ưu tiên precision hay recall dựa trên chi phí và hậu quả của từng loại lỗi.
- **01.3 · Quản lý sự không chắc chắn của AI:** Kết quả trên mẫu không bảo đảm mọi tình huống; xác định mức lỗi theo tác vụ. Viết rõ ngưỡng lỗi chấp nhận được cho từng loại tác vụ. Guardrails, phương án dự phòng và sự tham gia của con người giúp kiểm soát hậu quả khi AI mắc lỗi.
- **01.4 · Vòng đời sản phẩm AI và đội ngũ:** Vòng đời sản phẩm gồm hình thành ý tưởng, khám phá vấn đề, đánh giá, triển khai và giám sát. Kết quả giám sát là cơ sở cho vòng cải tiến tiếp theo. Đội gồm PM, ML Engineer, Data Engineer, UX, pháp lý và bảo mật. AI PM dịch kỳ vọng kinh doanh thành tiêu chí đo được.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Từ một API đã bàn giao, viết một outcome đo được và một giả thuyết impact; thêm trách nhiệm vận hành.

**Tiêu chí đạt:** Phân biệt sản phẩm bàn giao với thay đổi công việc; có baseline, kỳ đo và không suy nhân quả khi chưa đủ dữ liệu.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 02 · Problem Discovery & User Research.
