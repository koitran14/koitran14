---
name: aiph-07-ai-llm-fundamentals
description: Học và luyện tập Chương 07 của AI Product Handbook — AI và LLM từ nền tảng (AI ⊃ ML ⊃ deep learning ⊃ foundation model, token, embedding, context window, prompt và context engineering, RAG vs fine-tuning, tool calling, agent, model routing). Dùng khi người dùng muốn học, ôn, làm quiz hoặc luyện bài tập chương 07, hoặc gõ /aiph-07-ai-llm-fundamentals.
---

# Chương 07 · AI và LLM từ nền tảng

Nguồn gốc: `content/ai-product-handbook/07.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ; mảng `NEST` là bốn tầng ở Hình 1, dữ liệu `sorter(... 'rftQ' ...)` là 5 tình huống RAG/fine-tuning ở Hình 2). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương (ví dụ giá token của một model cụ thể), nói rõ "ngoài sách".

## Mục tiêu sau chương

- Đặt đúng một khái niệm vào bốn tầng AI ⊃ ML ⊃ deep learning ⊃ foundation model; phân biệt supervised, unsupervised, reinforcement learning.
- Ước lượng token và chi phí cho một tính năng; hiểu context window tính cả prompt lẫn câu trả lời.
- Viết prompt có system prompt, few-shot và context injection; nói được context engineering thêm gì so với prompt engineering.
- Chọn RAG hay fine-tuning bằng hai câu hỏi của chương; nhận ra khi nào cần tool calling hoặc model routing.

## Ý chính (Ghi nhớ của chương)

1. **07.1** Bốn tầng lồng nhau: AI ⊃ machine learning ⊃ deep learning ⊃ foundation model. ML có ba kiểu học: supervised (dữ liệu có nhãn), unsupervised (tự tìm cấu trúc ẩn), reinforcement (thưởng/phạt). LLM là foundation model: huấn luyện trước trên dữ liệu khổng lồ, dùng lại cho nhiều tác vụ. *(Mục này không có hộp Ghi nhớ; ý rút từ văn bản.)*
2. **07.2** Token là đơn vị tiền tệ của LLM; quản lý token là quản lý chi phí sản phẩm. Tiếng Anh ~1.000 token ≈ 750 từ; tiếng Việt tốn nhiều token hơn cho cùng lượng chữ. Embedding đặt các đoạn gần nghĩa gần nhau (vector DB → semantic search); context window tính cả prompt và câu trả lời.
3. **07.3** Điều khiển đầu ra bằng system prompt, few-shot, context injection, không đụng trọng số. Với sản phẩm thật, chọn thông tin nào vào context window, theo thứ tự nào, cắt bớt gì (context engineering) thường quyết định chất lượng nhiều hơn câu chữ của prompt. *(Không có hộp Ghi nhớ; ý rút từ văn bản.)*
4. **07.4** Câu hỏi đầu tiên khi chọn RAG hay fine-tuning: tri thức có thay đổi hằng tuần không, và người dùng có cần thấy nguồn không? RAG: dữ liệu đổi thường xuyên, trích được nguồn, chi phí thấp–trung bình. Fine-tuning: cố định định dạng/văn phong, tốn GPU và bảo trì phiên bản. Model routing: model nhỏ, rẻ cho việc đơn giản; model lớn khi cần suy luận phức tạp.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 07.1 → 07.4. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường (có thể dùng phép so sánh trong `terms`, ví dụ "context window là mặt bàn làm việc"), rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Ở 07.4, đi qua bảng so sánh 4 tiêu chí (dữ liệu thay đổi, truy nguồn, định dạng/văn phong, chi phí). Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Xếp 5 ví dụ vào tầng hẹp nhất đúng và kiểu học nếu là ML: bộ lọc spam học từ email đã gắn nhãn, phân cụm khách hàng theo hành vi, robot học đi bằng thưởng/phạt, nhận diện khuôn mặt bằng mạng neural nhiều lớp, trợ lý viết dùng LLM. | Đúng tầng và kiểu học; giải thích được vì sao LLM thuộc foundation model (huấn luyện trước, dùng lại nhiều tác vụ). |
| L2 | **Ước lượng token và chi phí:** trợ lý CSKH nhận 2.000 câu hỏi/ngày; mỗi lượt gồm system prompt 300 từ + 3 đoạn tài liệu RAG ~250 từ/đoạn + câu hỏi 40 từ, trả lời ~150 từ. Dùng tỉ lệ 1.000 token ≈ 750 từ, ước lượng token vào/ra mỗi ngày; cho một mức giá giả định theo 1 triệu token rồi tính chi phí/tháng. Nêu 2 cách giảm. | Tách input/output; phép tính đúng thứ tự độ lớn (~1.450 token vào, ~200 token ra mỗi lượt → ~2,9 triệu vào, ~0,4 triệu ra mỗi ngày); nhắc tiếng Việt tốn token hơn nên số thật cao hơn; cách giảm cụ thể (cắt system prompt, bớt đoạn RAG, routing sang model nhỏ, caching). Giá ghi rõ là giả định. |
| L3 | Viết prompt cho một tác vụ (ví dụ: phân loại email khách hàng thành 4 nhãn) có đủ system prompt (vai trò, văn phong, điều cấm), 2 ví dụ few-shot, và chỗ chèn context. | Đủ 3 thành phần; điều cấm cụ thể; few-shot cùng định dạng đầu ra mong muốn; nói rõ dữ liệu nào được inject và vì sao giảm hallucination. |
| L4 | Làm lại 5 tình huống của Hình 2 (chính sách bảo hiểm đổi mỗi quý cần trích điều khoản; JSON theo schema nội bộ phức tạp; tin tức nội bộ cập nhật hằng ngày; mô tả sản phẩm đúng giọng thương hiệu, giảm token prompt; tài liệu kỹ thuật cần bấm vào nguồn), rồi tự nghĩ thêm 1 tình huống theo ngành của mình. | Đúng 5/5 (RAG, fine-tuning, RAG, fine-tuning, RAG), lý do dựa trên hai câu hỏi của 07.4; tình huống tự nghĩ có lập luận rõ. |
| L5 | Phác luồng cho "trợ lý tra đơn hàng và tạo phiếu đổi trả": bước nào dùng RAG, bước nào tool calling (gọi API nào), quy tắc model routing (việc gì sang model nhỏ, việc gì sang model lớn). | Tool calling gắn với hành động thật (truy vấn đơn, tạo phiếu); routing có tiêu chí rõ; không fine-tune cho dữ liệu đổi liên tục. |
| L6 | **Sửa bài:** "Chúng ta fine-tune model trên toàn bộ wiki nội bộ (cập nhật hằng ngày) để nhân viên hỏi đáp và xem được nguồn." Viết lại phương án. | Chỉ ra 2 lỗi (dữ liệu đổi hằng ngày → bản fine-tune lạc hậu ngay; kiến thức trong trọng số không trích nguồn được); đề xuất RAG + vector DB, chỉ giữ fine-tune nếu cần cố định văn phong/định dạng. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `07.html` (trường `q`, `o`, `a`, `ex`, `why` nếu có), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: "Hội thoại dài, model quên yêu cầu người dùng nêu ở đầu. Nguyên nhân và hướng xử lý?"; "Đội muốn đẩy mọi câu hỏi sang model lớn nhất cho chắc. Bạn phản biện bằng khái niệm nào?"). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục, 0 = 07.1).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-08-system-architecture` (AI System Architecture & Production Engineering).
