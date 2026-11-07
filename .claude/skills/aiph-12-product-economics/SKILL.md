---
name: aiph-12-product-economics
description: Học, ôn trắc nghiệm và luyện áp dụng chương 12 của AI Product Handbook — Kinh tế học của sản phẩm AI. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-12-product-economics.
---

# Chương 12 · Kinh tế học của sản phẩm AI

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/12.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Tách chi phí thành phần khỏi chỉ số tổng hợp; tính chi phí mỗi tác vụ thành công, phân biệt các loại cache, cân nhắc giữa tự xây dựng, mua dịch vụ và hợp tác và thiết kế giá bán.

## Trọng tâm cần nắm

- **12.1 · Chi phí thành phần và chi phí mỗi tác vụ:** Tách chi phí sử dụng mô hình, dữ liệu/ứng dụng và con người/vận hành. TCO là tổng; cost/task là tỷ số, không cộng như các khoản riêng. Tính cả chi phí ca lỗi và thử lại, chỉ chia cho số tác vụ đạt chuẩn.
- **12.2 · Giảm chi phí mà vẫn đạt chất lượng:** Prompt cache khác response cache và embedding cache. Response cache cần phân quyền, version và hạn dùng. Compression và routing đều cần eval và đo tổng chi phí.
- **12.3 · Build, buy và partner:** Build có nhiều mức: ứng dụng, self-host, huấn luyện. Managed API phù hợp khi yêu cầu dữ liệu và tính năng cho phép. Partner cần thỏa thuận trách nhiệm, quyền và phương án chuyển đổi hoặc chấm dứt hợp tác.
- **12.4 · Giá bán và biên đóng góp:** Giá theo seat, tác vụ hoặc gói cần rõ hạn mức và trường hợp lỗi. Biên đóng góp = doanh thu trừ biến phí phục vụ đã định. LTV và CAC cần cùng giả định, phạm vi và thời gian.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Tính cost/success, biên đóng góp và độ nhạy khi lượng dùng tăng; chọn build/buy/partner theo ràng buộc.

**Tiêu chí đạt:** Tính cả ca lỗi; không cộng TCO với thành phần; cùng kỳ và phạm vi; phân biệt prompt/response/embedding cache và OpEx/CapEx.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 13 · AI Product Risk & Governance.
