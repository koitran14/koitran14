---
name: aiph-15-advanced-strategy
description: Học, ôn trắc nghiệm và luyện áp dụng chương 15 của AI Product Handbook — Chiến lược nâng cao: nền tảng và danh mục. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-15-advanced-strategy.
---

# Chương 15 · Chiến lược nâng cao: nền tảng và danh mục

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/15.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Khi nào đầu tư các thành phần và dịch vụ dùng chung, đo giá trị cho đội ứng dụng và kiểm tra chi phí vận hành; dùng điểm ưu tiên như công cụ thảo luận có giới hạn.

## Trọng tâm cần nắm

- **15.1 · Platform strategy:** Rút các thành phần và dịch vụ dùng chung từ nhu cầu lặp lại đã có bằng chứng. Đo thời gian tích hợp, adoption nội bộ và chi phí vận hành platform. Gateway giảm một phần phụ thuộc, không loại bỏ lock-in.
- **15.2 · Bản đồ dịch vụ AI trên AWS:** GenAI: Bedrock, Knowledge Bases, Guardrails, Q. Chuyên biệt: Textract, Lex, Transcribe, Polly, Comprehend, Translate. Hạ tầng: SageMaker AI, Macie, PrivateLink, IAM.
- **15.3 · Ưu tiên danh mục:** Công thức điểm chỉ là heuristic minh họa. Điểm nhạy với thang và phép nhân; không tự đo lợi nhuận. Thử thay giả định và đối chiếu TCO, rủi ro trước quyết định.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Hai đội muốn dựng gateway và trace chung. Nêu điều kiện đáng đầu tư platform và cách đo.

**Tiêu chí đạt:** Có nhu cầu lặp lại, khách hàng nội bộ, chủ sở hữu, SLA/version và chi phí hỗ trợ; công thức điểm chỉ là heuristic, gateway không xóa lock-in.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 16 · Product Management Glossary.
