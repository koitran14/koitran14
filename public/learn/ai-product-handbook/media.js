// Media for the AI Product handbook.
// No single overview audio is mapped onto sections here, so the chapter engine's media rows stay off;
// setting MEDIA to null also clears whatever another handbook left on window during client navigation.
window.MEDIA = null;
// AI-generated audio overviews, played on the hub page. Not mapped to sections yet.
window.AUDIO = [
 {src: '/learn/ai-product-handbook/media/tu-duy-lam-san-pham-ai-1.m4a', title: 'Tư duy làm sản phẩm AI (bản 1)'},
 {src: '/learn/ai-product-handbook/media/tu-duy-lam-san-pham-ai-2.m4a', title: 'Tư duy làm sản phẩm AI (bản 2)'},
 {src: '/learn/ai-product-handbook/media/tu-duy-quan-tri-san-pham-ai.m4a', title: 'Tư duy quản trị sản phẩm AI'},
 {src: '/learn/ai-product-handbook/media/chien-luoc-quan-ly-san-pham-ai.m4a', title: 'Chiến lược quản lý sản phẩm AI'},
 {src: '/learn/ai-product-handbook/media/quan-ly-san-pham-ai-thuc-te.m4a', title: 'Quản lý sản phẩm AI thực tế'},
 {src: '/learn/ai-product-handbook/media/ky-thuat-san-pham-ai-dac-vu.m4a', title: 'Kỹ thuật sản phẩm AI đặc vụ'},
 {src: '/learn/ai-product-handbook/media/vi-sao-du-an-ai-that-bai.m4a', title: 'Vì sao dự án AI thất bại'},
 {src: '/learn/ai-product-handbook/media/nghe-quan-ly-san-pham-ai.m4a', title: 'Nghề quản lý sản phẩm AI'}];
// Related YouTube videos per chapter, shown as thumbnails that play inline: [title, channel, video id, why watch].
// Titles and channels checked via YouTube oEmbed on 2026-10-26 and 2026-10-27.
window.VIDEOS = {
 '01': [['Product Management 101: Everything You Need to Know (Full Course)', 'Explained Hub', '5nAeyqNuZYU', 'Khóa tổng quan 40 phút: vòng đời sản phẩm, MVP, roadmap, ưu tiên và ra mắt.'],
  ['Mastering the Problem Space to Achieve Product-Market Fit by Dan Olsen at Mind The Product SF', 'Dan Olsen', 'bDUrQlmwox4', 'Product-market fit bắt đầu từ việc hiểu rõ không gian vấn đề trước khi nghĩ giải pháp.']],
 '02': [['The proven way to get customers to switch to your product, with Chris Spiek', 'Product Mastery Now', 'm-zNZo1-OpM', 'Jobs to Be Done qua góc nhìn vì sao khách hàng đổi sang một sản phẩm.']],
 '03': [['How to Identify Your Real Competition (It’s Not Who You Think)', 'Series of Thoughts', 'A_Wb1eFqA5Q', 'Xác định đối thủ thật và cơ hội tạo khác biệt.'],
  ['How to Get and Evaluate Startup Ideas | Startup School', 'Y Combinator', 'Th8JoIan4dg', 'Đánh giá một ý tưởng trước khi bắt tay làm.']],
 '04': [['Usability Testing 101', 'NNgroup', 'n8MnoJyl3W4', 'Nielsen Norman Group giải thích usability testing trong hai phút.'],
  ['Getting Started with the People + AI Guidebook', 'Google Design', 'n3HsvqBJrlY', 'Giới thiệu bộ hướng dẫn thiết kế sản phẩm AI của Google PAIR.']],
 '05': [['Intro to Product Strategy w/ Gibson Biddle, former VP of Product at Netflix', 'Product Collective (A Mind the Product Community)', '4EQzoXBsktI', 'Khung DHM (delight, hard to copy, margin-enhancing) để chọn chiến lược và lợi thế cạnh tranh.'],
  ['Product Vision vs. Product Strategy: What\'s the Difference?', 'Tim Herbig', 'X4lHDAJhqdI', 'Phân biệt vision và strategy, hai khái niệm hay bị dùng lẫn.']],
 '06': [['Webinar: How to Write Great Product Requirements by Amazon Sr PM, Elly Newell', 'Product School', 'ydHLajgdT4c', 'Cách viết yêu cầu sản phẩm rõ ràng, từ một PM ở Amazon.'],
  ['What is the RICE Scoring Model?', 'ProductPlan', 'pzyRafZJ-0M', 'RICE trong bốn phút, kèm ví dụ chấm điểm.']],
 '07': [['AI TUTORIAL For Data Domain (AI Agents, LLMs, RAG, Vector DB)', 'Ansh Lamba', 'kHq77-I1ZjE', 'Video dài về LLM, embedding, RAG, prompt engineering, tool calling và agent.']],
 '08': [['How a Production AI Agent System Actually Works', 'Jam With AI', 'sKzL0wSN9vQ', 'Kiến trúc agent thực tế: API, database, model routing, observability, evaluation.']],
 '09': [['From Vibes to Production: Evaluating and Shipping AI Agents That Work 101', 'AI Engineer · Laurie Voss (Arize AI)', 'qZj7sqmidqA', 'Evaluation, tracing và triển khai AI agent.']],
 '10': [['How to Set a Great North Star Metric', 'Aced (formerly Exponent)', 'ZwrRJlhJBrE', 'Chọn North Star Metric phản ánh giá trị thật người dùng nhận được.'],
  ['What is a Cohort? How to Read a Cohort Analysis Chart...', 'Peel', 'mb2_kskQDDU', 'Đọc biểu đồ cohort để theo dõi retention theo nhóm người dùng.']],
 '11': [['Startup Metrics for Pirates: AARRR! - Dave McClure', 'Ignite Seattle', 'irjgfW0BIrw', 'Dave McClure tự trình bày AARRR trong năm phút.'],
  ['How To A/B Test a Product', 'Aced (formerly Exponent)', 'jEpwNaHjD68', 'Các bước thiết kế và đọc kết quả một A/B test.']],
 '12': [['The Ultimate SaaS Unit Economics Tutorial', 'Eric Andrews', '8eHInIdNfa0', 'Unit economics, LTV và chi phí phục vụ khách hàng, nền để tính bài toán chi phí AI.'],
  ['The SaaS business model & metrics: Understand the key drivers for success', 'Web Summit', '5RR6M_d6eKc', 'Các chỉ số then chốt của mô hình SaaS.']],
 '13': [['The Importance of AI Governance', 'IBM Technology', 'Q020C-Jw0o8', 'Vì sao cần AI governance và nó gồm những gì.'],
  ['What Is a Prompt Injection Attack?', 'IBM Technology', 'jrHRe9lSqqA', 'Prompt injection hoạt động ra sao và cách phòng.']],
 '14': [['Justify Your Product Decisions and get Stakeholder Buy in - Teresa Torres Mind the Product SF 2019', 'Mind the Product', 't7MWiLvMXXQ', 'Trình bày quyết định sản phẩm để stakeholder đồng thuận.'],
  ['8 Tips for Product Managers Working With Engineers', 'Dianna Yau', '-EIty2Um9A0', 'Làm việc với đội kỹ sư từ góc nhìn PM.']],
 '15': [['How to Build an AI-Native Services Company', 'Y Combinator', 'gSNFJbgoaHI', 'Tư duy AI-native ở cấp chiến lược công ty.'],
  ['How the Product Manager Role is Changing in 2025 | Jiaona Zhang (CPO Linktree)', 'Peter Yang', 'eCBubJftdtU', 'Vai trò PM thay đổi thế nào khi sản phẩm xoay quanh AI.']],
 '16': [['15 Product Management Terms and Concepts Everyone In Tech Should Know', 'Aakash Mehta', 'Se1aTnFD500', 'Ôn nhanh các thuật ngữ quản lý sản phẩm hay gặp.']],
 '17': [['AI TUTORIAL For Data Domain (AI Agents, LLMs, RAG, Vector DB)', 'Ansh Lamba', 'kHq77-I1ZjE', 'Đi qua phần lớn thuật ngữ trong chương.']],
 '18': [['What is a Forward Deployed Engineer (FDE)?', 'Caleb Curry', 'YbeJxi0Ju1A', 'Forward Deployed Engineer làm gì và khác kỹ sư phần mềm thường ở đâu.'],
  ['AI Prototyping in 60 Minutes for Product Managers', 'codebasics', 'ukybbuEgphI', 'Workshop dựng prototype AI từ ý tưởng tới bản chạy được.']],
 '19': [['Introduction to Modern Product Discovery - Teresa Torres', 'Productized', 'l7-5x0ra2tc', 'Continuous discovery và Opportunity Solution Tree, do chính Teresa Torres trình bày.'],
  ['Business Model Canvas Explained', 'Strategyzer', 'QoAOzMTLP5s', 'Business Model Canvas từ chính Strategyzer.']],
 '20': [['Best Practices for Product Roadmap —Jeff Lash', 'Productized', 'J5N56ALJiGQ', 'Roadmap như một công cụ giao tiếp, không phải lịch giao hàng.'],
  ['Unorthodox PM tips: Automating user insights, unselling candidates, decision logs, more | Kevin Yien', 'Lenny\'s Podcast', 'xOTO98MXG9o', 'Có phần về cách dùng decision log trong đội sản phẩm.']],
 '21': [['From Vibes to Production: Evaluating and Shipping AI Agents That Work 101', 'AI Engineer · Laurie Voss (Arize AI)', 'qZj7sqmidqA', 'Đánh giá và đưa agent lên production.']]};
