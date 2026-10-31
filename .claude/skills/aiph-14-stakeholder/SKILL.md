---
name: aiph-14-stakeholder
description: Học và luyện tập Chương 14 của AI Product Handbook — Stakeholder và giao tiếp (influencing without authority, chia vai AI PM và AI Engineer theo swyx, làm việc với kỹ sư / kinh doanh / pháp lý, decision log), có bài nhập vai Claude đóng stakeholder. Dùng khi người dùng muốn học, ôn, làm quiz, tập thuyết phục stakeholder hoặc luyện bài tập chương 14, hoặc gõ /aiph-14-stakeholder.
---

# Chương 14 · Stakeholder và giao tiếp

Nguồn gốc: `content/ai-product-handbook/14.html` (đọc phần văn bản; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, mảng `terms` là thuật ngữ, mảng `SH` là cách làm việc / cái bẫy / gợi ý cho ba nhóm của Hình 1). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Thuyết phục bằng ngôn ngữ của người nghe (chi phí, rủi ro, thời gian, tác động khách hàng) thay vì quyền chức vụ.
- Phân biệt việc của AI PM và AI Engineer theo bảng swyx, và vị trí của AI Product Engineer.
- Tránh đúng cái bẫy của từng nhóm: kỹ sư, kinh doanh, pháp lý.
- Viết một mục decision log đủ bốn ý.

## Ý chính (Ghi nhớ của chương)

1. **14.1** AI PM là người phiên dịch: nói với kỹ sư bằng tác động người dùng, nói với kinh doanh bằng giới hạn thật của AI, nói với pháp lý từ ngày đầu. Lập luận kỹ thuật đúng chưa đủ để thuyết phục.
2. **14.2** AI PM: bài toán thật, giá trị thương mại, PMF; discovery, backlog, eval criteria, roadmap; đo bằng adoption, retention, CSAT, tỷ lệ tác vụ thành công, doanh thu; không bắt buộc code production. AI Engineer: code, RAG, prompt, test, log; đo bằng accuracy/precision/recall, latency, uptime, inference cost. AI Product Engineer đứng giữa: viết code production nhưng chịu cả chỉ số cột PM.
3. **14.3** Kỹ sư: bẫy tối ưu độ chính xác vô hạn → đặt ngưỡng "đủ tốt" bằng số từ đầu kèm ngân sách latency, chi phí. Kinh doanh: bẫy hứa quá mức → chia sẻ eval và giới hạn bằng ví dụ trước khi họ hứa với khách. Pháp lý: bẫy gọi sát ngày ra mắt → đưa vào từ scoping, phân loại EU AI Act và kế hoạch PII ngay khi đóng khung bài toán.
4. **14.4** Decision log ghi bốn ý: bối cảnh, giả định ban đầu, dữ liệu thực nghiệm lúc đó, lý do chấp nhận rủi ro (mẫu: đổi ngưỡng handoff 70% → 75%, eval 300 câu, 9/11 câu sai ở 70–75%, handoff tăng 6%; số giả định). Nếu sáu tháng sau không ai nhớ vì sao chọn model này, nghĩa là đã thiếu decision log.

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 14.1 → 14.4. Mỗi mục: giải thích ý chính trong 3–5 câu, cho một ví dụ đời thường, rồi hỏi **một** câu kiểm tra hiểu (dạng "vì sao", không phải "là gì"). Ở 14.3, đi qua cả ba nhóm trong `SH`. Trả lời sai → gợi ý, không đưa đáp án ngay.

### Luyện
Chọn bài theo mục người học yếu (hoặc lần lượt). Chấm theo rubric, chỉ ra một điểm làm tốt và một điểm cần sửa, cho viết lại một lần.

| # | Bài tập | Rubric đạt |
|---|---|---|
| L1 | Viết lại một lập luận kỹ thuật ("RAG cần thêm reranker vì recall@5 chỉ 0,72") thành ba phiên bản cho ba người nghe: giám đốc kinh doanh, kế toán trưởng (người dùng), pháp chế. | Mỗi bản dùng đúng ngôn ngữ người nghe: chi phí/thời gian, tác động lên việc của họ, rủi ro; không còn thuật ngữ khó hiểu. |
| L2 | Cho 10 việc (viết eval criteria, dựng pipeline RAG, ưu tiên backlog, tối ưu latency, theo dõi log, định nghĩa chỉ số adoption, nối API model, phỏng vấn người dùng, viết test tự động, theo dõi inference cost). Xếp vào cột AI PM hay AI Engineer, và chỉ ra việc nào AI Product Engineer chịu cả hai phía. | Xếp đúng theo bảng 14.2; giải thích inference cost là chỉ số của engineer nhưng PM vẫn phải hiểu. |
| L3 | **Nhập vai.** Claude đóng một stakeholder (người học chọn, hoặc Claude chọn ngẫu nhiên): (a) Trưởng phòng kinh doanh muốn hứa với khách "AI trả lời đúng 99%, thay được nhân viên CSKH"; (b) Lead AI Engineer muốn hoãn ra mắt 2 tháng để tăng accuracy từ 91% lên 95%; (c) Pháp chế được gọi 1 tuần trước ra mắt, đòi dừng vì chưa biết dữ liệu khách đi đâu. Claude giữ vai, phản bác thực tế, tối đa 6 lượt; người học thuyết phục để đạt một thỏa thuận cụ thể. Sau đó Claude ra khỏi vai và chấm. | Dùng ngôn ngữ người nghe (14.1); gọi tên và xử lý đúng cái bẫy của nhóm đó theo `SH`; đưa ra con số (ngưỡng, eval, ngân sách latency/chi phí) hoặc ví dụ lỗi cụ thể; kết thúc bằng thỏa thuận có hành động tiếp theo, không chỉ "để em xem lại". |
| L4 | Viết decision log cho quyết định "chuyển từ model lớn sang routing model nhỏ cho câu phân loại intent" theo định dạng mẫu 14.4. | Đủ bốn ý; dữ liệu là con số eval cụ thể; lý do chấp nhận rủi ro nói rõ đánh đổi gì. |
| L5 | Lập lịch làm việc với ba nhóm cho một tính năng AI mới từ scoping tới ra mắt: mỗi nhóm vào lúc nào, mang tài liệu gì. | Pháp lý vào từ scoping; kinh doanh xem eval và giới hạn trước khi bán; kỹ sư có ngưỡng "đủ tốt" từ đầu. |
| L6 | **Sửa bài:** decision log "12/10: chọn model X vì tốt hơn. Cả team đồng ý." Viết lại. | Thêm bối cảnh, giả định, dữ liệu thực nghiệm, lý do chấp nhận rủi ro; bỏ "tốt hơn" mơ hồ. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `14.html` (trường `q`, `o`, `a`, `ex`; câu `type: "multi"` có nhiều đáp án đúng), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn (ví dụ: CEO hỏi vì sao 6 tháng trước chọn model hiện tại mà không ai trả lời được, thiếu gì; kỹ sư đề xuất thêm 3 tuần để tăng 1% accuracy, PM cần đặt câu hỏi gì). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục, 0 = 14.1).

## Kết thúc buổi

Tóm tắt 3 điều người học đã nắm, 1 điều cần ôn, và gợi ý chương tiếp theo: `/aiph-15-advanced-strategy` (Advanced Product Strategy).
