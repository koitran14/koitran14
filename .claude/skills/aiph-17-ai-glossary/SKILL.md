---
name: aiph-17-ai-glossary
description: Học, ôn trắc nghiệm và luyện áp dụng chương 17 của AI Product Handbook — Thuật ngữ kỹ thuật AI. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-17-ai-glossary.
---

# Chương 17 · Thuật ngữ kỹ thuật AI

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/17.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Từ machine learning tới prompt injection: các thuật ngữ kỹ thuật dùng trong handbook, nhóm theo chủ đề.

## Trọng tâm cần nắm

- **17.1 · Model và cách học:** Phương pháp học các mẫu từ dữ liệu; gồm nhiều cách như supervised, unsupervised, self-supervised và reinforcement learning. Mô hình ngôn ngữ lớn, thường được huấn luyện trước bằng self-supervised learning để xử lý và sinh ngôn ngữ. Không mặc định nhớ chính xác hay tra được nguồn dữ liệu đã học. Model huấn luyện trên dữ liệu rộng, có thể được điều chỉnh hoặc dùng lại cho nhiều tác vụ; các foundation model hiện đại chủ yếu dựa trên deep learning.
- **17.2 · Dữ liệu, ngữ cảnh và kiến trúc:** Đơn vị biểu diễn mà mô hình xử lý; có thể là một phần từ, ký tự hoặc đơn vị dữ liệu khác. Phí API văn bản thường tính theo token; cần đo bằng tokenizer của model. Retrieval-Augmented Generation: truy xuất dữ liệu liên quan rồi cung cấp cho model để sinh câu trả lời. Có thể dẫn nguồn nhưng vẫn cần kiểm tra nguồn hỗ trợ kết luận và quyền truy cập. Biểu diễn dữ liệu bằng vector; độ gần phản ánh sự liên quan theo cách mô hình được huấn luyện, không bảo đảm nội dung đúng hoặc đầy đủ.
- **17.3 · Chất lượng, vận hành và an toàn:** Nội dung mô hình sinh ra sai hoặc thiếu căn cứ trong bối cảnh đánh giá; cần tiêu chí chấm cụ thể. Không nhất thiết chỉ xuất hiện khi model thể hiện tự tin. Các lớp kiểm soát giảm rủi ro: giới hạn phạm vi và quyền, kiểm tra công cụ, lọc nội dung hoặc dữ liệu nhạy cảm. Không bảo đảm chặn mọi lỗi hay prompt injection.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Giải thích self-supervised, RAG, structured outputs, caching và drift bằng các lỗi của trợ lý.

**Tiêu chí đạt:** Định nghĩa trước ví dụ; phân biệt cache input/output, drift/giảm chất lượng và schema/nội dung; không nhân hóa model.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 18 · AI Product Builder & Forward Deployed Engineer Glossary.
