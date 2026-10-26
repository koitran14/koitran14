// Sources behind the AI Product handbook. Video titles checked against YouTube on 2026-10-26.
window.NOTICE = 'Handbook này biên tập lại từ ba báo cáo tổng hợp về AI Product Engineering & Management do AI hỗ trợ soạn, kèm danh sách video YouTube để học tiếp; bản nháp được viết với sự hỗ trợ của công cụ AI. Các số liệu (lương, chi phí, mốc pháp lý, kết quả dự án mẫu) lấy từ báo cáo và chưa được kiểm chứng độc lập; hãy đối chiếu nguồn gốc trước khi dùng cho quyết định thật.';
window.SOURCES = [
 {id: 'ai-p1', g: 'Báo cáo nguồn (do AI hỗ trợ soạn)', title: 'Báo cáo chuyên sâu: AI Product Engineering & Management, Phần I: Product Foundations', by: 'dùng cho chương 01–03'},
 {id: 'ai-p23', g: 'Báo cáo nguồn (do AI hỗ trợ soạn)', title: 'Báo cáo toàn diện: phát triển, chiến lược và kỹ thuật sản phẩm AI (AI Product Design, Strategy & Engineering)', by: 'dùng cho chương 04–09'},
 {id: 'ai-p47', g: 'Báo cáo nguồn (do AI hỗ trợ soạn)', title: 'Báo cáo toàn diện về quản trị sản phẩm AI: từ chiến lược, phát triển năng lực đến thi công hệ thống (Phần IV–VII)', by: 'dùng cho chương 10–21'},
 {id: 'ai-plan', g: 'Báo cáo nguồn (do AI hỗ trợ soạn)', title: 'Mục lục 21 chương và danh sách video YouTube theo chương, kèm gợi ý thứ tự học', by: 'dùng làm khung handbook'},
 {id: 'ai-audio', g: 'Báo cáo nguồn (do AI hỗ trợ soạn)', title: 'Tám audio tổng quan về tư duy, chiến lược, kỹ thuật và nghề quản lý sản phẩm AI', by: 'audio do AI tạo, phát ở trang mục lục'},
 {id: 'r-euaiact', g: 'Văn bản và tài liệu tham khảo', title: 'Regulation (EU) 2024/1689 (Artificial Intelligence Act)', by: 'EUR-Lex', url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj'},
 {id: 'r-swyx', g: 'Văn bản và tài liệu tham khảo', title: 'The Rise of the AI Engineer', by: 'Shawn “swyx” Wang, Latent Space', url: 'https://www.latent.space/p/ai-engineer'},
 {id: 'r-pair', g: 'Văn bản và tài liệu tham khảo', title: 'People + AI Guidebook', by: 'Google PAIR', url: 'https://pair.withgoogle.com/guidebook/'},
 {id: 'r-aws-srm', g: 'Văn bản và tài liệu tham khảo', title: 'Shared Responsibility Model', by: 'Amazon Web Services', url: 'https://aws.amazon.com/compliance/shared-responsibility-model/'},
 {id: 'v-jtbd', g: 'Video được nhúng', title: 'The proven way to get customers to switch to your product, with Chris Spiek', by: 'Product Mastery Now, YouTube', url: 'https://www.youtube.com/watch?v=m-zNZo1-OpM'},
 {id: 'v-comp', g: 'Video được nhúng', title: 'How to Identify Your Real Competition (It’s Not Who You Think)', by: 'Series of Thoughts, YouTube', url: 'https://www.youtube.com/watch?v=A_Wb1eFqA5Q'},
 {id: 'v-yc', g: 'Video được nhúng', title: 'How to Get and Evaluate Startup Ideas | Startup School', by: 'Y Combinator, YouTube', url: 'https://www.youtube.com/watch?v=Th8JoIan4dg'},
 {id: 'v-ansh', g: 'Video được nhúng', title: 'AI TUTORIAL For Data Domain (AI Agents, LLMs, RAG, Vector DB)', by: 'Ansh Lamba, YouTube', url: 'https://www.youtube.com/watch?v=kHq77-I1ZjE'},
 {id: 'v-jam', g: 'Video được nhúng', title: 'How a Production AI Agent System Actually Works', by: 'Jam With AI, YouTube', url: 'https://www.youtube.com/watch?v=sKzL0wSN9vQ'},
 {id: 'v-arize', g: 'Video được nhúng', title: 'From Vibes to Production: Evaluating and Shipping AI Agents That Work 101', by: 'Laurie Voss (Arize AI), AI Engineer, YouTube', url: 'https://www.youtube.com/watch?v=qZj7sqmidqA'}];
// which sources each chapter leans on (keys are chapter numbers)
window.CH_SOURCES = {
 '00': ['ai-plan', 'ai-p1', 'ai-p23', 'ai-p47', 'ai-audio'],
 '01': ['ai-p1'], '02': ['ai-p1', 'v-jtbd'], '03': ['ai-p1', 'v-comp', 'v-yc', 'r-euaiact'],
 '04': ['ai-p23', 'r-pair'], '05': ['ai-p23'], '06': ['ai-p23'],
 '07': ['ai-p23', 'v-ansh'], '08': ['ai-p23', 'v-jam'], '09': ['ai-p23', 'v-arize', 'r-euaiact', 'r-aws-srm'],
 '10': ['ai-p47'], '11': ['ai-p47'], '12': ['ai-p47'], '13': ['ai-p47', 'r-euaiact', 'r-aws-srm'], '14': ['ai-p47', 'r-swyx'], '15': ['ai-p47'],
 '16': ['ai-p47'], '17': ['ai-p47', 'v-ansh'], '18': ['ai-p47'], '19': ['ai-p47', 'r-aws-srm'], '20': ['ai-p47'], '21': ['ai-p47', 'v-arize', 'r-euaiact']};
