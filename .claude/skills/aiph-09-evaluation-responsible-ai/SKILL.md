---
name: aiph-09-evaluation-responsible-ai
description: Học, ôn trắc nghiệm và luyện áp dụng chương 09 của AI Product Handbook — Đánh giá AI, độ tin cậy và Responsible AI. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-09-evaluation-responsible-ai.
---

# Chương 09 · Đánh giá AI, độ tin cậy và Responsible AI

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/09.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Xây dựng bộ đánh giá có tiêu chí chấm và quản lý phiên bản; phân biệt bối cảnh đánh giá với phương pháp chấm; kiểm tra căn cứ của câu trả lời và kết hợp các biện pháp kiểm soát rủi ro.

## Trọng tâm cần nắm

- **09.1 · Eval set và golden dataset:** Lấy mẫu theo nhóm tác vụ và tách báo cáo ca rủi ro. Có đáp án/tiêu chí chấm được kiểm định và cách xử lý bất đồng. Duy trì bộ kiểm thử hồi quy, holdout và mẫu mới có quản lý phiên bản.
- **09.2 · Bối cảnh đánh giá và cách chấm:** Offline/online là bối cảnh, không phải hai bộ chấm duy nhất. Code, chuyên gia và LLM judge có thể kết hợp. Kiểm định judge bằng chuyên gia; A/B chỉ là một dạng đánh giá online.
- **09.3 · Đúng với nguồn và đúng với thực tế:** Groundedness và faithfulness có thể chồng lấn theo bộ đo. Đúng với nguồn chưa chắc đúng ngoài thực tế. Chốt tiêu chí chấm, mẫu số và ngưỡng theo tác vụ.
- **09.4 · Guardrails, prompt injection và trách nhiệm:** Guardrails giảm một số rủi ro, cần kết hợp quyền truy cập và kiểm tra công cụ. Phân loại nghĩa vụ pháp lý theo mục đích sử dụng. Trách nhiệm bảo mật tùy dịch vụ, doanh nghiệp vẫn chịu trách nhiệm ứng dụng.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Soạn tiêu chí chấm kiểm từng khẳng định được nguồn hỗ trợ, mâu thuẫn hay thiếu căn cứ; thiết kế mẫu eval.

**Tiêu chí đạt:** Không ép hallucination/groundedness/faithfulness thành ba ngăn loại trừ; có holdout, version, kiểm định judge và mẫu thuộc nhóm rủi ro.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 10 · Product Analytics & Decision-Making.
