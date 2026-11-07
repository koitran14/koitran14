---
name: aiph-19-frameworks
description: Học, ôn trắc nghiệm và luyện áp dụng chương 19 của AI Product Handbook — Framework và bảng tra quyết định. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-19-frameworks.
---

# Chương 19 · Framework và bảng tra quyết định

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/19.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

JTBD, Opportunity Solution Tree, RICE/ICE/MoSCoW và Business Model Canvas; bảng tra các yếu tố cần cân nhắc trong quyết định AI.

## Trọng tâm cần nắm

- **19.1 · Khám phá và mô hình kinh doanh:** JTBD: việc khách hàng cần làm. Opportunity Solution Tree liên kết kết quả mong muốn với các cơ hội cần giải quyết, giải pháp và thử nghiệm. Business Model Canvas: chín ô, nhớ inference cost.
- **19.2 · RICE, ICE và MoSCoW:** RICE so các ước tính theo cùng thang và kỳ. ICE dùng impact, confidence và ease; không phải RICE rút gọn. MoSCoW chốt nhóm phạm vi một lần phát hành.
- **19.3 · Ba cặp quyết định trong sản phẩm AI:** RAG, fine-tuning và schema-constrained output có thể kết hợp theo nhu cầu. Precision/recall theo lớp dương, hành động và tổn thất. Trách nhiệm cloud cùng tồn tại, không phải chọn giao hết một bên.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Tính RICE trên hai hạng mục, kiểm bằng chứng Confidence; chọn kiến trúc cần nguồn mới và JSON schema.

**Tiêu chí đạt:** Đúng phép tính và cùng thang; có bằng chứng nhu cầu/tác động; RAG có thể kết hợp structured outputs/fine-tuning theo lỗi cần sửa.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 20 · Product Documentation & Communication Reference.
