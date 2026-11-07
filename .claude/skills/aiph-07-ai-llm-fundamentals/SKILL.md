---
name: aiph-07-ai-llm-fundamentals
description: Học, ôn trắc nghiệm và luyện áp dụng chương 07 của AI Product Handbook — AI và LLM từ nền tảng. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-07-ai-llm-fundamentals.
---

# Chương 07 · AI và LLM từ nền tảng

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/07.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Nền tảng AI và các cách học; token, embedding và context; RAG, fine-tuning, structured outputs, tool calling, agent và model routing.

## Trọng tâm cần nắm

- **07.1 · AI, machine learning, deep learning, foundation model:** AI, ML, deep learning và foundation model: sơ đồ nhập môn. Có supervised, unsupervised, self-supervised và reinforcement learning. LLM thường được huấn luyện trước bằng self-supervised learning.
- **07.2 · Token, embedding và context window:** Token hỗ trợ dự toán phí; đo theo tokenizer và tách input/output. Vector gần nhau hỗ trợ retrieval, không bảo đảm tính đúng đắn và đầy đủ. Context và output có giới hạn tùy model/API.
- **07.3 · Prompt engineering và context engineering:** System prompt hướng dẫn hành vi, không thay kiểm tra quyền truy cập. Few-shot cung cấp ví dụ; context engineering chọn và quản lý ngữ cảnh. Nguồn bổ sung có thể sai hoặc chứa injection; vẫn cần kiểm tra.
- **07.4 · RAG, fine-tuning, công cụ và agent:** RAG bổ sung ngữ cảnh; fine-tuning thay đổi trọng số; có thể kết hợp. Structured outputs cùng validation cho yêu cầu schema. Tool calling cần ứng dụng thực thi; agent khác model routing.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Chọn cách sửa cho ba lỗi: nguồn lỗi thời, JSON thiếu trường và giọng văn lệch; phác vòng tool calling có kiểm tra quyền truy cập.

**Tiêu chí đạt:** RAG cho dữ liệu, structured outputs/validation cho schema, fine-tuning khi có bằng chứng; phân biệt agent với routing.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 08 · AI System Architecture & Production Engineering.
