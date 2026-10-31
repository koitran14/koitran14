---
name: aiph-15-advanced-strategy
description: Học và luyện tập Chương 15 của AI Product Handbook — Chiến lược nâng cao: nền tảng và danh mục (platform strategy với năng lực dùng chung, bản đồ dịch vụ AI trên AWS, công thức điểm ưu tiên danh mục). Dùng khi người dùng muốn học, ôn, làm quiz hoặc luyện bài tập chương 15, hoặc gõ /aiph-15-advanced-strategy.
---

# Chương 15 · Chiến lược nâng cao: nền tảng và danh mục

Nguồn gốc: `content/ai-product-handbook/15.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ, mảng `F` là điểm mặc định của hai tính năng trong Hình 1). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách". Mức "rút ngắn 70% thời gian ra mắt" và công thức điểm ưu tiên lấy từ báo cáo nguồn, chưa kiểm chứng.

## Mục tiêu sau chương

- Nêu các năng lực dùng chung (RAG, prompt cache, guardrails, gateway) và ba lợi ích của platform.
- Nhận ra khi nào làm platform là quá sớm.
- Trước khi tự xây, tra xem đã có dịch vụ chuyên biệt giải sẵn bài toán chưa.
- Tính điểm ưu tiên danh mục và biết vì sao không để công thức quyết định thay người.

## Ý chính (Ghi nhớ của chương)

1. **15.1** Platform strategy: dựng shared AI capabilities một lần. Lợi ích: chiết khấu theo khối lượng, tránh vendor lock-in nhờ gateway, ra mắt sản phẩm sau nhanh hơn (báo cáo ước tới 70%). Rút platform từ hai, ba sản phẩm đã chạy, đừng xây platform rồi mới đi tìm sản phẩm.
2. **15.2** Ba lớp AWS: nền tảng GenAI (Bedrock, Bedrock Knowledge Bases, Bedrock Guardrails, Amazon Q); AI chuyên biệt (Textract cho IDP, Lex chatbot, Transcribe giọng → chữ, Polly chữ → giọng, Comprehend NLP, Translate); hạ tầng, bảo mật (SageMaker AI + Ground Truth, Macie, PrivateLink, IAM). Ý dùng được cho mọi nhà cung cấp: kiểm tra dịch vụ chuyên biệt trước khi tự xây.
3. **15.3** **Điểm ưu tiên = (Business Value × Adoption) / (Inference Cost × Latency × Technical Complexity)**, chấm 1–5. Mặc định Hình 1: Trợ lý tra quy trình (RAG) 4×4/(3×2×3) ≈ 0,89; Phân loại ticket tự động 3×2/(1×1×2) = 3,00. Công thức rất nhạy với điểm 1 ở mẫu số; chỉ để so sánh tương đối. Điểm số giúp đặt câu hỏi đúng; quyết định vẫn cần người chịu trách nhiệm.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 15.1 → 15.3. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường, rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Ở 15.3, cho người học tự tính hai điểm mặc định của Hình 1 trước. Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Công ty có 3 đội đang tự làm AI riêng: CSKH (RAG + guardrails), pháp chế (RAG tra hợp đồng), bán hàng (gọi thẳng API một nhà cung cấp). Đề xuất lớp nào nên rút thành platform, lớp nào để mỗi đội tự giữ. | Chọn đúng năng lực dùng chung (RAG, cache, guardrails, gateway); gắn mỗi lớp với một lợi ích của 15.1; giữ riêng phần đặc thù nghiệp vụ. |
| L2 | Startup có 0 sản phẩm AI chạy thật, CTO muốn dành 6 tháng dựng "AI platform" trước. Viết 5 câu phản hồi. | Dẫn đúng rủi ro "làm platform quá sớm"; đề xuất ra mắt sản phẩm trước rồi rút platform; có tiêu chí khi nào bắt đầu (2–3 sản phẩm đã chạy). |
| L3 | Ghép 6 bài toán với dịch vụ AWS: đọc hóa đơn scan, chatbot đặt lịch, chuyển ghi âm cuộc gọi thành văn bản, đọc thông báo bằng giọng nói, dịch tài liệu, phát hiện CCCD bị lộ trong S3. | Textract, Lex, Transcribe, Polly, Translate, Macie; nêu được vì sao không cần foundation model cho các bài này. |
| L4 | Dùng Hình 1: (a) tính lại hai điểm mặc định; (b) đổi Inference cost của trợ lý RAG từ 3 xuống 1 (nhờ cache), tính lại; (c) bình luận vì sao một thay đổi nhỏ đổi thứ hạng nhiều thế. | (a) 0,89 và 3,00; (b) 16/(1×2×3) ≈ 2,67; (c) chỉ ra độ nhạy của mẫu số, kết luận dùng điểm để mở thảo luận. |
| L5 | Chấm 1–5 cho 3 tính năng AI người học đang nghĩ tới, tính điểm, rồi nêu một câu hỏi mà điểm số làm lộ ra (ví dụ: vì sao adoption chỉ 2?). | Có lý do cho từng điểm chấm; xếp hạng đúng theo công thức; câu hỏi mở thảo luận cụ thể, không coi điểm là quyết định. |
| L6 | **Sửa bài:** "Phân loại ticket được 3,00 điểm, trợ lý RAG 0,89, vậy ta hủy trợ lý RAG. Công thức đã chứng minh." Viết lại kết luận. | Nói rõ công thức chỉ so sánh tương đối, nhạy với điểm 1; nêu câu hỏi cần trả lời trước khi hủy (giá trị chiến lược, TCO, rủi ro); có người chịu trách nhiệm quyết định. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `15.html` (trường `q`, `o`, `a`, `ex`; câu `type: "multi"` có nhiều đáp án đúng), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: nhà cung cấp model tăng giá 40%, đội có gateway và đội không có gateway khác nhau thế nào; đội muốn fine-tune model để OCR hóa đơn thì PM hỏi lại gì). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục, 0 = 15.1).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-16-pm-glossary` (Product Management Glossary).
