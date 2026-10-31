---
name: aiph-08-system-architecture
description: Học và luyện tập Chương 08 của AI Product Handbook — Kiến trúc hệ thống AI và vận hành production (bốn lớp kiến trúc, model gateway và fallback khi HTTP 429, orchestration, API/database/queue/tích hợp trên cloud, observability, latency, throughput, prompt caching, trace agent). Dùng khi người dùng muốn học, ôn, làm quiz hoặc luyện bài tập chương 08, hoặc gõ /aiph-08-system-architecture.
---

# Chương 08 · Kiến trúc hệ thống AI và vận hành production

Nguồn gốc: `content/ai-product-handbook/08.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ; mảng `STACK` là bốn lớp ở Hình 1, object `GW` là bốn trạng thái mô phỏng gateway ở Hình 2). Mọi giải thích phải bám nội dung chương; ví dụ trong chương dùng AWS, khi người học dùng cloud khác thì nói rõ dịch vụ tương đương là "ngoài sách".

## Mục tiêu sau chương

- Vẽ được bốn lớp (frontend, orchestration, model, data & messaging) cho một sản phẩm AI và nói mỗi lớp lo rủi ro gì.
- Giải thích model gateway làm gì và khi nào kích hoạt fallback; biết điều kiện để fallback an toàn.
- Chọn thành phần lưu trữ, suy luận, hàng chờ, phân quyền, kết nối riêng; biết khi nào cần queue.
- Đặt bộ chỉ số vận hành (TTFT, throughput, error rate, uptime) cùng theo dõi token, và thiết kế trace cho agent.

## Ý chính (Ghi nhớ của chương)

1. **08.1** Bốn lớp: Frontend/UI → Orchestration (luồng, prompt, gọi công cụ) → Model (qua model gateway) → Data & messaging (dữ liệu thô, vector DB, hàng chờ). Tách lớp rõ thì đổi nhà cung cấp model chỉ chạm lớp model, đổi vector DB chỉ chạm lớp dữ liệu. *(Mục này không có hộp Ghi nhớ; ý rút từ văn bản.)*
2. **08.2** Gateway giữ API key tập trung, load balancing, rate limiting; gặp HTTP 429, nhà cung cấp chính chậm bất thường hoặc gián đoạn → fallback sang nhà cung cấp phụ. Fallback chỉ an toàn khi đã chấm model phụ trên cùng eval set với model chính. Với agent nhiều bước, quản lý state và chạy lại từ bước lỗi quan trọng hơn chọn framework.
3. **08.3** Ví dụ AWS: S3 (lưu trữ), Bedrock / SageMaker AI (suy luận), SQS / EventBridge (hàng chờ), IAM (phân quyền), PrivateLink (kết nối riêng). Queue hay bị quên ở prototype: gọi LLM đồng bộ trực tiếp từ request người dùng dễ đụng rate limit khi lưu lượng tăng. *(Không có hộp Ghi nhớ; ý rút từ văn bản.)*
4. **08.4** Bốn chỉ số: latency (TTFT), throughput (TPS, RPS), error rate, uptime; cộng theo dõi token thời gian thực và prompt caching cho phần lặp lại. Không có trace thì không debug được agent: ghi lại prompt, tool call và kết quả của từng bước.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 08.1 → 08.4. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường, rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Ở 08.2, đi qua bốn trạng thái của Hình 2 (bình thường / 429 / chậm bất thường / gián đoạn) và hỏi gateway gửi request đi đâu. Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | **Phác kiến trúc** (dạng danh sách hoặc sơ đồ chữ) cho trợ lý tra quy trình CSKH dùng RAG: đặt từng thành phần vào 4 lớp, ghi công cụ ví dụ cho mỗi lớp. | Đủ 4 lớp đúng vai trò; model đi qua gateway; vector DB và hàng chờ nằm ở lớp data & messaging; nói được đổi nhà cung cấp model chạm lớp nào. |
| L2 | Cho 4 sự cố, nói gateway làm gì và người dùng thấy gì: nhà cung cấp chính trả 429 lúc cao điểm; TTFT tăng từ 1 s lên 8 s; nhà cung cấp chính sập 30 phút; một developer muốn gọi model trực tiếp bằng key riêng. | 3 sự cố đầu → fallback, người dùng không thấy lỗi; câu cuối → phản đối vì mất quản lý key tập trung và rate limit; có nhắc điều kiện model phụ đã chấm trên cùng eval set. |
| L3 | Một tính năng "tóm tắt 500 hợp đồng mỗi đêm" và một tính năng "chat trả lời khách tức thì". Với mỗi cái, quyết định gọi LLM đồng bộ hay qua queue (SQS/EventBridge), và chọn dịch vụ cho lưu trữ, phân quyền, kết nối riêng. | Tóm tắt hàng loạt → queue; chat tức thì → đồng bộ có stream; lý do nhắc rate limit và tải backend; IAM bảo vệ key, PrivateLink giữ dữ liệu ngoài internet công cộng. |
| L4 | Thiết kế dashboard vận hành cho tính năng ở L1: chọn ngưỡng cảnh báo cho TTFT, throughput, error rate, uptime, token/ngày; nêu phần prompt nào nên cache. | Đủ 4 chỉ số + token, mỗi cái có ngưỡng số; cache phần lặp lại (system prompt, câu hỏi thường gặp) và giải thích lợi về chi phí lẫn latency. |
| L5 | **Viết trace mẫu** cho một agent 3 bước trả lời sai (ví dụ: tra đơn hàng → gọi API hoàn tiền → soạn email): mỗi bước ghi prompt gửi đi, tool call, kết quả trả về; rồi chỉ ra bước hỏng. | Mỗi bước đủ 3 trường; lần ra được bước hỏng từ trace; đề xuất chạy lại từ bước lỗi thay vì từ đầu. |
| L6 | **Sửa bài:** "Prototype chạy tốt: frontend gọi thẳng API model bằng key để trong code, không log, khi lỗi thì báo người dùng thử lại. Lên production giữ nguyên." Viết lại kiến trúc tối thiểu. | Thêm gateway (key tập trung, rate limit, fallback đã eval), queue cho tác vụ không cần tức thì, IAM cho key, trace + 4 chỉ số vận hành + theo dõi token. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `08.html` (trường `q`, `o`, `a`, `ex`, `why` nếu có), hỏi từng câu, xáo thứ tự đáp án. Câu `type: "multi"` có nhiều đáp án đúng, báo trước cho người học. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: "Fallback sang model phụ chạy êm, nhưng tuần sau CSAT giảm. Bạn kiểm tra gì trước?"; "Hóa đơn token tháng này gấp 3 dù lượng người dùng không đổi. Chỉ số và công cụ nào trong chương giúp tìm nguyên nhân?"). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục, 0 = 08.1).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-09-evaluation-responsible-ai` (AI Evaluation, Reliability & Responsible AI).
