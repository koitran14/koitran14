# Biên tập AI Product Handbook · 07/11/2026

## Rà lại cách diễn đạt tiếng Việt

Theo góp ý tiếp theo của người dùng, đã biên tập lại câu văn trong chương 00–21, phần tóm tắt, giải thích thuật ngữ và câu hỏi/lời giải. Câu mở đầu được đổi thành “Biết xây dựng AI là chưa đủ”. Các cụm rút gọn như “kiểm quyền”, “đạt eval”, “công rà” được viết đầy đủ theo ngữ cảnh; các khẩu hiệu hoặc cách ví von gượng được thay bằng diễn giải và ví dụ trong công việc thực tế. Các ví dụ thuật ngữ chủ yếu dùng cùng bối cảnh trợ lý CSKH để dễ liên hệ với bài đọc.

Đã đồng bộ mục lục, hướng dẫn học và các ZIP tải xuống. Giữ nguyên ID câu hỏi, ánh xạ đáp án, số liệu, công thức, đường dẫn và mã của các mô phỏng. Các đoạn mẫu mã/decision log được giữ nguyên.

Đã sửa chương 00–21, mục lục, tóm tắt, glossary/popup, các bài phân loại tương tác và 105 câu trắc nghiệm theo báo cáo rà soát trước đó.

## Nội dung đã sửa

- Tách prompt caching, response caching và embedding caching; agent, tool calling và model routing; bối cảnh offline/online với cách chấm bằng code/người/LLM.
- Thêm structured outputs và self-supervised learning; sửa các diễn giải quá tuyệt đối về AI, confidence, drift, guardrails và precision/recall.
- Chốt rubric bám nguồn thay vì ép hallucination/groundedness/faithfulness thành các loại lỗi loại trừ nhau.
- Làm rõ đơn vị SOM, ACV, LTV, TCO và chi phí mỗi tác vụ; thay bảng lương chưa kiểm chứng bằng giá bán và biên đóng góp.
- Bổ sung phương pháp phỏng vấn, chiến lược/định vị, funnel/cohort, thiết kế A/B test, bất đồng stakeholder và vận hành platform.
- Dùng case trợ lý tra quy trình CSKH xuyên suốt, thu gọn capstone thành pilot tra cứu nội bộ có baseline, quyền dữ liệu, eval và điều kiện mở rộng.
- Bổ sung nguồn trực tiếp; đối chiếu mốc EU AI Act với nguồn EU theo ngày biên tập và ghi rõ intended use/nhóm nghĩa vụ.
- Giảm ví von nhân hóa và khẳng định suy đoán về năng lực độc giả.

## Quiz và bản tải xuống

- Viết lại 105 câu: 88 câu một đáp án và 17 câu nhiều đáp án. Các câu quyết định nêu thêm điều kiện và giải thích phạm vi áp dụng.
- Vị trí đáp án đúng của câu một đáp án được cân A/B/C/D: 22/22/22/22 và xếp theo thứ tự trộn cố định, không theo vòng A→B→C→D.
- Câu hỏi dùng ID phiên bản `-v2`, giữ điểm đã lưu của bộ cũ tách khỏi bộ mới, không thay đổi engine dùng chung của các handbook khác.
- Đồng bộ 22 skill học tập và đóng gói lại 22 ZIP chương cùng ZIP tổng. Kiểm tra nội dung chương và hướng dẫn trong ZIP khớp nguồn.

## Kiểm tra đã chạy

- `python -X utf8 scripts/check_aiph_content.py --packages`: đạt; kiểm số câu, đáp án, ID phiên bản, tham chiếu mục/thuật ngữ, đồng bộ mục lục, phân bố đáp án và ZIP.
- Kiểm cú pháp toàn bộ script inline trong 23 trang HTML và `sources.js`: đạt.
- Chrome headless: 22 trang chương trả HTTP 200; kiểm mục lục và chấm câu đầu của mỗi chương, gồm câu một/nhiều đáp án; điểm cũ không áp vào câu mới.
- Kiểm tương tác mới: chọn structured outputs trong bài phân loại, popup thuật ngữ, bài bám nguồn và bộ tính chi phí. Kiểm trang mục lục và nguồn trực tiếp.
- Xem ảnh desktop/mobile; trang kiểm tra mobile rộng 390px không tràn ngang. Không có lỗi JavaScript trang trong lượt kiểm cuối.
- `npm run lint`: đạt, còn cảnh báo `<img>` có sẵn tại `components/custom/commandSearch.tsx:73`.
- `npm run build`: đạt, tạo 68 trang; có cảnh báo Browserslist cũ và cảnh báo ảnh nói trên. Không hạ tiêu chuẩn hay bỏ kiểm tra để build qua.
- `git diff --check` cho nội dung handbook, skill và gói liên quan: đạt.

## Phạm vi còn giữ nguyên

Tám audio chưa được nghe/biên tập hay tái tạo trong lượt này. Trang mục lục, chương mở đầu và thông báo nguồn ghi rõ audio chưa đồng bộ với bản 07/11/2026; ưu tiên bài đọc và nguồn trực tiếp khi có khác biệt. Video giữ nguyên, không tuyên bố đã xem lại toàn bộ transcript.

Chưa commit, push hoặc deploy. Các thay đổi có sẵn của người dùng ngoài phạm vi handbook được giữ nguyên.
