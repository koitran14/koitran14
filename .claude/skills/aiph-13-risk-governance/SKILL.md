---
name: aiph-13-risk-governance
description: Học, ôn trắc nghiệm và luyện áp dụng chương 13 của AI Product Handbook — Rủi ro và quản trị sản phẩm AI. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-13-risk-governance.
---

# Chương 13 · Rủi ro và quản trị sản phẩm AI

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/13.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Quản lý rủi ro, phân loại nghĩa vụ EU AI Act theo mục đích sử dụng, hiểu trách nhiệm cloud và kết hợp kiểm tra quyền truy cập, dữ liệu, công cụ, giám sát.

## Trọng tâm cần nắm

- **13.1 · Các loại rủi ro mới:** Hallucination, bias, lộ PII, không tuân thủ. Mỗi rủi ro cần chủ sở hữu, cách đo, biện pháp. Đưa vào roadmap từ đầu.
- **13.2 · Lộ trình và phạm vi EU AI Act:** Có hiệu lực 01/08/2024; sửa đổi Omnibus có hiệu lực 27/07/2026. Annex III: 02/12/2027; Annex I: 02/08/2028; nghĩa vụ khác có lịch riêng. Phân loại theo intended use, vai trò và phạm vi áp dụng.
- **13.3 · Shared responsibility model:** Ranh giới cloud tùy dịch vụ và hợp đồng. Khách hàng kiểm soát dữ liệu, IAM, cấu hình và ứng dụng. Không dùng guardrails thay kiểm tra quyền truy cập hoặc chính sách dữ liệu.
- **13.4 · Các lớp bảo vệ dữ liệu:** Phát hiện PII khác che dữ liệu và phê duyệt bản đưa vào index. PrivateLink bảo vệ đường mạng, không thay IAM hay redaction. Guardrails giảm một số rủi ro theo cấu hình và có giới hạn.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Lập bảng rủi ro cho trợ lý: quyền, PII, injection, nguồn; ghi người phụ trách và bằng chứng cần có.

**Tiêu chí đạt:** Không hứa guardrails chặn mọi lỗi; Macie phát hiện khác che dữ liệu; phân loại pháp lý theo intended use và nguồn có ngày đối chiếu.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 14 · Stakeholder Management & Communication.
