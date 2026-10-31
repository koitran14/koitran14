---
name: aiph-16-pm-glossary
description: Học và luyện tập Chương 16 của AI Product Handbook — Thuật ngữ quản lý sản phẩm (PMF, JTBD, ICP, TAM/SAM/SOM, moat, PRD, RICE, MoSCoW, POC/MVP/pilot/GA, output/outcome/impact, North Star, retention, cohort, A/B test, LTV, unit economics) kèm lưu ý riêng cho sản phẩm AI. Dùng khi người dùng muốn học, ôn, luyện flashcard, làm quiz thuật ngữ chương 16, hoặc gõ /aiph-16-pm-glossary.
---

# Chương 16 · Thuật ngữ quản lý sản phẩm

Nguồn gốc: `content/ai-product-handbook/16.html` (đọc các bảng thuật ngữ `dt`/`dd` và hộp "Lưu ý"; mảng `quiz` trong script cuối file là ngân hàng câu hỏi trắc nghiệm, object `terms` chứa định nghĩa kèm ví dụ đời thường cho các thuật ngữ chính). Mọi giải thích phải bám nội dung chương; nếu bổ sung kiến thức ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau chương

- Giải thích đúng và phân biệt được các cặp hay nhầm: persona / buyer persona / ICP, POC / prototype / MVP / pilot / GA, output / outcome / impact, retention / churn.
- Dùng đúng thuật ngữ trong câu nói, email, tài liệu công việc thật.
- Nêu được lưu ý riêng khi áp dụng thuật ngữ cho sản phẩm AI.

## Ý chính (lưu ý của chương)

1. **Chung** Một ngôn ngữ chung giữa kinh doanh, sản phẩm và kỹ thuật giúp bớt hiểu lầm. Chương dùng để tra, không cần đọc theo thứ tự.
2. **16.1** Với AI, PMF chỉ bền khi giải được bài toán với inference cost thấp hơn số tiền khách sẵn lòng trả. Moat phải giữ được khi đối thủ dùng cùng foundation model.
3. **16.2** PRD cho AI cần thêm ba mục: mức lỗi chấp nhận được, thiết kế fallback, eval set. Gắn mốc roadmap với ngưỡng chất lượng thay vì chỉ ngày cố định.
4. **16.2** Đặt điểm thu phản hồi (thích/không thích, sửa câu trả lời) ngay trên customer journey để có dữ liệu cải tiến.
5. **16.3** Output là thứ đội làm ra, outcome là hành vi/hiệu năng thay đổi, impact là giá trị kinh doanh dài hạn.

## Nhóm thuật ngữ

| Nhóm | Thuật ngữ |
|---|---|
| 16.1 Chiến lược và thị trường | product-market fit, Jobs to Be Done, persona, ICP, buyer persona, TAM / SAM / SOM, ACV, moat, Value Proposition Canvas, desirability / feasibility / viability |
| 16.2 Yêu cầu, lộ trình, phát hành | PRD, acceptance criteria, roadmap, RICE, MoSCoW, POC, prototype, MVP, pilot, GA, customer journey |
| 16.3 Đo lường và tăng trưởng | output, outcome, impact, North Star Metric, retention, churn, cohort analysis, funnel, A/B test, AARRR, adoption, LTV, unit economics |

## Cách chạy skill

Hỏi người học muốn chế độ nào (mặc định **Học**). Luôn dạy bằng tiếng Việt, giữ nguyên thuật ngữ tiếng Anh, mỗi lượt một bước, chờ người học trả lời rồi mới đi tiếp.

### Học
Đi lần lượt 3 nhóm, mỗi lượt 2–3 thuật ngữ. Mỗi thuật ngữ: định nghĩa theo chương trong 1–2 câu, ví dụ đời thường (dùng ví dụ trong `terms` nếu có, như "quán ngon tới mức khách tự kéo bạn bè đến" cho PMF; nếu không thì tự đặt một ví dụ ngắn), thêm lưu ý AI nếu chương có. Sau đó yêu cầu người học **giải thích lại bằng lời của mình** một thuật ngữ vừa học; chấm: đúng ý cốt lõi chưa, có lẫn với thuật ngữ gần nó không. Sai → gợi ý, không đưa đáp án ngay. Cuối mỗi nhóm hỏi một câu phân biệt (ví dụ: "persona và buyer persona khác nhau ở đâu trong một deal B2B?").

### Luyện
Chạy một phiên flashcard 10–15 thẻ, trộn ba dạng:

| Dạng | Cách hỏi | Đạt khi |
|---|---|---|
| Định nghĩa → thuật ngữ | Đọc định nghĩa (diễn đạt lại, không đọc nguyên văn), người học gọi tên. | Đúng tên; chấp nhận alias (PMF, JTBD…). |
| Thuật ngữ → định nghĩa | Đưa tên, người học nêu nghĩa. | Có ý cốt lõi; với PRD/roadmap/PMF phải nhắc được lưu ý AI. |
| Dùng trong câu | Đưa tình huống công việc (họp sprint, email gửi sếp, review PRD), người học viết một câu dùng thuật ngữ đúng. | Thuật ngữ đúng nghĩa, đúng ngữ cảnh; không dùng outcome khi ý là output. |

Lặp lại có giãn cách trong buổi: ghi thẻ trả lời sai vào danh sách "ôn lại", hỏi lại sau 2–3 thẻ khác, đổi dạng hỏi; thẻ chỉ ra khỏi danh sách khi đúng 2 lần liên tiếp. Ưu tiên các cặp dễ nhầm. Cuối phiên báo số thẻ đúng lần đầu và các thẻ còn trong danh sách.

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `16.html` (trường `q`, `o`, `a`, `ex`; `type: "multi"` thì `a` là mảng, người học phải chọn đủ), hỏi từng câu, xáo thứ tự đáp án. Sau đó thêm 2 câu tình huống tự soạn, ví dụ: "Đội báo cáo đã ship 5 tính năng AI trong quý, sếp hỏi vẫn chưa thấy retention tăng — đội đang nói về output, outcome hay impact?" và "Một khách hàng có 200 người dùng nhưng CFO mới là người ký — gọi CFO là gì, và nên ghi vào đâu?". Cuối cùng báo điểm, liệt kê nhóm cần ôn lại (theo trường `s` = chỉ số mục).

## Kết thúc buổi

Tóm tắt 3 thuật ngữ người học đã nắm chắc, các thuật ngữ còn trong danh sách ôn lại, và gợi ý chương tiếp theo: `/aiph-17-ai-glossary` (Thuật ngữ kỹ thuật AI). Thuật ngữ nào người học muốn hiểu sâu hơn thì chỉ về chương gốc: JTBD/persona → `/aiph-02-problem-discovery`, TAM/SAM/SOM → `/aiph-03-market`, PRD/RICE/MoSCoW/roadmap → `/aiph-06-requirements-roadmap`, North Star/funnel/cohort → `/aiph-10-product-analytics`, LTV/unit economics → `/aiph-12-product-economics`.
