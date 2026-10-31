---
name: aiph-00-roadmap
description: Điểm bắt đầu của AI Product Handbook — Chương 00, lộ trình học (handbook dành cho ai, bảy phần, thứ tự đọc P1–P3). Chẩn đoán trình độ người học, đề xuất lộ trình qua 22 skill aiph-00 đến aiph-21, và làm quiz chương 00. Dùng khi người dùng muốn bắt đầu học handbook, hỏi nên học chương nào trước, cần danh sách các skill AI Product Handbook, hoặc gõ /aiph-00-roadmap.
---

# Chương 00 · AI Product Engineer: lộ trình học

Nguồn gốc: `content/ai-product-handbook/00.html` (đọc phần văn bản; hằng `MAP` là bản đồ 21 chương theo phần; mảng `quiz` trong script cuối file là ngân hàng câu hỏi). Đây là skill **trung tâm**: không dạy sâu từng mục mà giúp người học chọn đường đi. Mọi gợi ý phải bám nội dung chương; nếu bổ sung ngoài chương, nói rõ "ngoài sách".

## Mục tiêu sau buổi

- Người học hiểu handbook dành cho ai: Software Engineer muốn chuyển từ "làm đúng task" sang "chọn đúng task và chứng minh nó có giá trị".
- Nắm bảy phần và vị trí của từng chương.
- Có một lộ trình cá nhân (thứ tự skill cụ thể) phù hợp trình độ và mục tiêu.

## Ý chính (Ghi nhớ của chương)

1. **00.1** Mục tiêu của handbook: chuyển từ "làm đúng task" sang "chọn đúng task và chứng minh nó có giá trị". 21 chương, bảy phần; ba vai trò AI Product Engineer, AI Product Builder, AI Product Manager (ranh giới không cứng, xem chương 14, 18).
2. **00.2** Phần I–II: vấn đề, người dùng, thị trường, chiến lược, yêu cầu, roadmap. Phần III: LLM, kiến trúc, đánh giá (tận dụng nền kỹ sư nhiều nhất). Phần IV: đo lường, tăng trưởng. Phần V: kinh tế, rủi ro, các bên, chiến lược dài hạn. Phần VI: tra cứu. Phần VII: dự án tổng hợp.
3. **00.3** P1 trước: 02 → 05 → 06 → 09 → 10. P2: 03, 04, 11, 12, 14. P3: 13, 15–20. Phần tra cứu (16–20) để dành lúc làm dự án. Đây là gợi ý cho người có nền Software Engineering, không bắt buộc.
4. **00.4** Video và audio để học thêm sau khi đọc, không thay cho phần đọc; audio do AI tạo không phải nguồn chính xác tuyệt đối. Capstone (21) phải tự làm mới học được.

## Cách chạy skill

Luôn dạy bằng tiếng Việt, mỗi lượt một câu hỏi, chờ người học trả lời rồi mới đi tiếp. Hỏi người học muốn **Chẩn đoán lộ trình** (mặc định), **Xem danh sách skill** hay **Kiểm tra** chương 00.

### Chẩn đoán lộ trình
Hỏi lần lượt 4 câu (cho lựa chọn gợi ý, người học trả lời tự do cũng được):

1. **Vai trò hiện tại:** Software Engineer / đã làm ứng dụng AI / PM hoặc BA / người mới.
2. **Kinh nghiệm với sản phẩm:** đã từng tự quyết phạm vi, đặt chỉ số thành công, nói chuyện với người dùng chưa?
3. **Kinh nghiệm với AI:** đã gọi API LLM, dựng RAG, viết eval set chưa?
4. **Mục tiêu gần nhất:** đổi tư duy sản phẩm / chuẩn bị ra mắt một tính năng AI / làm dự án capstone / chỉ cần tra cứu.

Đề xuất lộ trình theo quy tắc, nêu lý do trong 1–2 câu:

- **Software Engineer, đã chạm tới AI (đối tượng chính của sách):** P1 theo đúng chương 00.3: `/aiph-02-problem-discovery` → `/aiph-05-vision-strategy` → `/aiph-06-requirements-roadmap` → `/aiph-09-evaluation-responsible-ai` → `/aiph-10-product-analytics`; sau đó P2 (03, 04, 11, 12, 14), rồi P3.
- **Người mới với tư duy sản phẩm:** bắt đầu `/aiph-01-product-thinking` rồi vào P1.
- **PM/BA chưa vững kỹ thuật AI:** 01 → P1 nhưng chen Phần III sớm: `/aiph-07-ai-llm-fundamentals` → `/aiph-08-system-architecture` trước 09.
- **Sắp ra mắt một tính năng AI:** 09 → 10 → 11 → 13, tra cứu 19–20 khi cần.
- **Muốn làm dự án:** đi P1 rồi `/aiph-21-capstone`; dùng 16–20 làm tài liệu tra cứu trong lúc làm.

Chốt lại bằng một danh sách có thứ tự (tối đa 6 skill cho chặng đầu), và gợi ý mở skill đầu tiên ngay.

### Danh sách 22 skill

| Skill | Phần | Nội dung |
|---|---|---|
| `/aiph-00-roadmap` | Mở đầu | Lộ trình học, chẩn đoán trình độ, danh sách skill (skill này). |
| `/aiph-01-product-thinking` | I | Product thinking, output–outcome–impact, vòng đời sản phẩm AI. |
| `/aiph-02-problem-discovery` | I · P1 | Tìm đúng vấn đề, JTBD, persona, problem statement. |
| `/aiph-03-market` | I · P2 | Phân khúc, ICP, TAM/SAM/SOM, moat, desirability–feasibility–viability. |
| `/aiph-04-product-design` | II · P2 | UX cho đầu ra không cố định, fallback, human-in-the-loop. |
| `/aiph-05-vision-strategy` | II · P1 | Vision, value proposition, tam giác chất lượng–chi phí–latency. |
| `/aiph-06-requirements-roadmap` | II · P1 | Yêu cầu, ưu tiên và roadmap. |
| `/aiph-07-ai-llm-fundamentals` | III | Nền tảng AI và LLM. |
| `/aiph-08-system-architecture` | III | Kiến trúc hệ thống AI. |
| `/aiph-09-evaluation-responsible-ai` | III · P1 | Đánh giá AI và Responsible AI. |
| `/aiph-10-product-analytics` | IV · P1 | Product analytics, đo tác động. |
| `/aiph-11-launch-growth` | IV · P2 | Ra mắt, adoption và tăng trưởng. |
| `/aiph-12-product-economics` | V · P2 | Kinh tế sản phẩm AI. |
| `/aiph-13-risk-governance` | V · P3 | Rủi ro và quản trị. |
| `/aiph-14-stakeholder` | V · P2 | Làm việc với các bên và lãnh đạo. |
| `/aiph-15-advanced-strategy` | V · P3 | Chiến lược nâng cao. |
| `/aiph-16-pm-glossary` | VI · P3 | Thuật ngữ Product Management. |
| `/aiph-17-ai-glossary` | VI · P3 | Thuật ngữ AI Engineering. |
| `/aiph-18-builder-glossary` | VI · P3 | Thuật ngữ Builder và FDE. |
| `/aiph-19-frameworks` | VI · P3 | Cheat sheet các framework. |
| `/aiph-20-documentation` | VI · P3 | Tham khảo tài liệu sản phẩm. |
| `/aiph-21-capstone` | VII | Capstone: từ vấn đề đến launch. |

### Kiểm tra
Lấy câu hỏi từ mảng `quiz` trong `00.html` (trường `q`, `o`, `a`, `ex`, `why`), hỏi từng câu, xáo thứ tự đáp án (câu `type: "multi"` phải chọn đủ). Sau đó thêm 2 câu tình huống tự soạn (ví dụ: một kỹ sư chỉ có 2 tuần trước khi ra mắt tính năng AI nên mở chương nào trước; vì sao không nên đọc chương 16–20 tuần tự từ đầu). Cuối cùng báo điểm, liệt kê mục cần ôn lại (theo trường `s` = chỉ số mục).

## Kết thúc buổi

Nhắc lại lộ trình đã chốt (danh sách skill theo thứ tự) và mời bắt đầu ngay skill đầu tiên; nếu người học không chọn gì, gợi ý chương tiếp theo: `/aiph-01-product-thinking` (Product Thinking & Product Development Lifecycle).
