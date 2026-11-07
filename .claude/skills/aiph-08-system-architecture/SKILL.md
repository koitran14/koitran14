---
name: aiph-08-system-architecture
description: Học, ôn trắc nghiệm và luyện áp dụng chương 08 của AI Product Handbook — Kiến trúc hệ thống AI cho production. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-08-system-architecture.
---

# Chương 08 · Kiến trúc hệ thống AI cho production

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/08.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Bốn lớp của một hệ thống AI production, model gateway với fallback khi nhà cung cấp lỗi, orchestration, hạ tầng đám mây, và các chỉ số vận hành: TTFT, throughput, error rate, uptime.

## Trọng tâm cần nắm

- **08.1 · Bốn lớp kiến trúc:** Frontend: nhận tương tác, hiển thị kết quả. Orchestration: luồng, prompt, công cụ. Model và data/messaging: suy luận, lưu trữ, hàng chờ.
- **08.2 · Model gateway và orchestration:** Gateway quản lý key, quota và chính sách retry/fallback. 429 có thể backoff, queue hoặc fallback tùy điều kiện. Model phụ cần eval, quyền dữ liệu và ngân sách phù hợp.
- **08.3 · API, database, queue và tích hợp:** S3 lưu dữ liệu, Bedrock/SageMaker suy luận. SQS/EventBridge đệm request, kiểm soát rate limit. IAM phân quyền, PrivateLink giữ dữ liệu khỏi internet công cộng.
- **08.4 · Observability, latency và mở rộng:** Tách TTFT và độ trễ hoàn thành; đo phân vị theo tải. Prompt cache tái sử dụng đầu vào; response cache tái sử dụng câu trả lời. Trace có che dữ liệu nhạy cảm và chính sách lưu giữ.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Thiết kế chính sách khi provider trả 429, cùng các metric và trace cần theo dõi.

**Tiêu chí đạt:** Có backoff/queue/fallback theo điều kiện; mô hình dự phòng đáp ứng tiêu chí đánh giá và phù hợp quyền dữ liệu; tách TTFT khỏi thời gian hoàn thành, che dữ liệu log.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 09 · AI Evaluation, Reliability & Responsible AI.
