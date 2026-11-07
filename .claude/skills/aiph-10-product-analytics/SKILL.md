---
name: aiph-10-product-analytics
description: Học, ôn trắc nghiệm và luyện áp dụng chương 10 của AI Product Handbook — Product analytics và quyết định dựa trên dữ liệu. Dùng khi người dùng yêu cầu học chương này hoặc gọi /aiph-10-product-analytics.
---

# Chương 10 · Product analytics và quyết định dựa trên dữ liệu

Bản đồng bộ nội dung 07/11/2026. Nguồn: `content/ai-product-handbook/10.html`. Đọc bài chính và `window.CH` trong script: `sections` chứa mục/tóm tắt, `terms` chứa định nghĩa và ví dụ, `quiz` chứa ngân hàng câu hỏi phiên bản mới. Nguồn này là căn cứ cho nội dung học; không dùng lại đáp án hoặc khẳng định của bản cũ.

Từ North Star, funnel và cohort đến quyết định sản phẩm; chọn precision/recall theo tổn thất và nối phản hồi người dùng với quá trình đánh giá có kiểm định.

## Trọng tâm cần nắm

- **10.1 · Từ sự kiện sử dụng đến quyết định sản phẩm:** Funnel cho thấy bước cần tìm hiểu, không tự giải thích nguyên nhân. Cohort so nhóm theo cùng tuổi sử dụng. North Star đi cùng chỉ số chất lượng, thời gian và chi phí.
- **10.2 · Precision và recall theo quyết định thực tế:** Định nghĩa lớp dương và hành động sau dự đoán. Precision = TP/(TP+FP); recall = TP/(TP+FN). Chọn ngưỡng theo chi phí lỗi và khả năng xử lý của người rà soát.
- **10.3 · Giữ chất lượng qua vòng đời ML:** Phản hồi người dùng là tín hiệu cần kiểm định trước khi thành nhãn. Drift không tự đồng nghĩa chất lượng suy giảm. Chọn sửa dữ liệu, nguồn, prompt hoặc model theo nguyên nhân.
- **10.4 · Khung đánh giá model bốn bước:** Eval đại diện, tiêu chí chấm rõ và chạy theo phiên bản. Kết hợp code, người và LLM judge đã kiểm định. Rà mẫu ngẫu nhiên và cả nhóm điểm cao để tìm lỗi bỏ sót.

## Cách hướng dẫn

Nếu người học chưa chọn chế độ, bắt đầu **Học**. Dùng tiếng Việt, từng bước ngắn và một câu hỏi mỗi lượt; chờ trả lời trước khi đi tiếp. Giữ thuật ngữ kỹ thuật khi cần, giải thích định nghĩa trước rồi cho ví dụ đúng bối cảnh công việc. Nói rõ giới hạn và giả định thay vì biến ví dụ thành quy tắc phổ quát.

- **Học:** đi qua từng mục; giải thích 3–5 câu, cho ví dụ trong case trợ lý CSKH hoặc công việc người học, hỏi vì sao/cách áp dụng. Dùng gợi ý khi người học chưa hiểu, không chỉ nhắc lại định nghĩa.
- **Luyện:** giao bài dưới đây hoặc điều chỉnh sang tình huống của người học; chấm theo tiêu chí chấm, chỉ rõ lỗi và cho sửa. Số liệu tự đặt phải ghi là giả định.
- **Kiểm tra:** dùng `quiz` trong chương, từng câu; nếu đổi thứ tự lựa chọn, giữ ánh xạ `a` và `why` đúng. `s` là chỉ số mục bắt đầu từ 0. Không dùng điểm của bộ câu hỏi cũ cho phiên bản mới. Sau đó thêm một tình huống áp dụng, chấm riêng với phần nhớ kiến thức.

## Bài luyện

Đọc funnel giả định của chương, đề xuất một điều tra tiếp theo và cách chọn ngưỡng classifier.

**Tiêu chí đạt:** Không suy nguyên nhân chỉ từ funnel; định nghĩa lớp dương, hành động và chi phí FP/FN; metric có mẫu số rõ.

Phân biệt đáp án đúng theo dữ kiện với phương án có thể hợp lý trong điều kiện khác. Nếu có nhiều phương án thỏa dữ kiện, chấp nhận lập luận có căn cứ thay vì ép một tên công cụ. Với số liệu, giá hoặc luật hiện hành ngoài bài, kiểm tra nguồn trực tiếp và ghi ngày đối chiếu; nếu chưa kiểm chứng, nói rõ và không đưa vào chấm như sự thật. Không gửi dữ liệu người dùng ra dịch vụ bên ngoài chỉ vì bài tập có nhắc API.

## Kết thúc

Tóm tắt điểm đã hiểu, một phần cần luyện và bằng chứng còn thiếu. Điểm quiz là tín hiệu tự ôn, không chứng minh năng lực thực hành. Gợi ý đọc tiếp chương 11 · Experimentation, Launch & Growth.
