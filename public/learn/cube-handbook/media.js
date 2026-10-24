// Media mapped onto handbook sections (keyed by section number, e.g. '02.3').
// demo: clips of Cube's own workshop video; the workshop runs on Cube Cloud, so some steps differ from the self-hosted path in the handbook.
// audio: start/end (seconds) inside the overview audio; filled in with the mapping tool (add ?map=1 to a chapter URL).
window.MEDIA = {
 yt: {id: '7ZQGGepDjUQ', title: 'Building Agentic Analytics with Cube (workshop, 39 phút)'},
 audio: {src: 'media/overview.m4a', title: 'Kiến trúc tầng ngữ nghĩa Cube', marks: {
  // from a Whisper transcript of the overview; the audio is a discussion, so it covers the conceptual sections and skips the hands-on ones
  '01.1': [63, 92], '01.2': [42, 92], '01.3': [0, 42], '01.5': [770, 860],
  '02.1': [92, 177], '02.2': [177, 210], '02.3': [638, 690],
  '04.1': [210, 233], '04.4': [177, 210], '04.5': [233, 383], '04.6': [383, 436], '04.7': [436, 594], '04.8': [594, 721], '04.10': [770, 830],
  '05.3': [600, 628], '07.7': [721, 770]}},
 demo: {
  '01.1': [[0, 82, 'Cube là gì: nền tảng phân tích xây trên semantic layer']],
  '01.2': [[41, 82, 'Semantic layer là xương sống của mọi trải nghiệm'], [482, 560, 'Semantic SQL: cân bằng quản trị và linh hoạt']],
  '01.4': [[241, 362, 'Cubes, views, measures, dimensions và joins']],
  '01.5': [[1042, 1130, 'BI nội bộ: workbook'], [1641, 1762, 'Embedded: nhúng chat và biểu đồ'], [1920, 2050, 'AI: kết nối Claude qua MCP']],
  '01.6': [[643, 720, 'Chuyển model LookML sang Cube bằng AI']],
  '02.3': [[482, 600, 'AI gửi Semantic SQL, Cube dịch ra SQL cho Snowflake']],
  '02.5': [[122, 200, 'Kết nối Snowflake']],
  '03.1': [[82, 122, 'Tạo deployment trên Cube Cloud']],
  '03.2': [[122, 200, 'Điền thông tin kết nối Snowflake']],
  '03.3': [[200, 241, 'Chọn bảng, AI sinh data model đầu tiên'], [362, 402, 'Model và dashboard đầu tiên được deploy']],
  '03.4': [[443, 482, 'Hỏi “orders monthly” trong Analytics Chat']],
  '03.6': [[1042, 1130, 'Tạo workbook từ view'], [1444, 1601, 'Dựng dashboard, KPI và bộ lọc']],
  '03.7': [[880, 960, 'Chạy thử truy vấn trước khi merge']],
  '04.1': [[601, 760, 'Mô hình hóa cùng AI: thêm join và view'], [842, 900, 'Thêm drill members']],
  '04.2': [[760, 842, 'Thêm dimension và measure thuế'], [1321, 1444, 'Filtered measure, change from previous']],
  '04.3': [[321, 362, 'Join: một user có nhiều order']],
  '04.4': [[482, 600, 'Semantic SQL thành SQL của kho dữ liệu'], [562, 640, 'Tạo chỉ số tăng trưởng tại chỗ']],
  '04.8': [[1762, 1880, 'External ID, nhóm và RLS cho người dùng nhúng']],
  '05.7': [[940, 1042, 'Commit, merge, deploy không downtime'], [1601, 1641, 'Version cho model và dashboard']],
  '07.1': [[1641, 1762, 'Ứng dụng nhúng'], [2200, 2281, 'Hỏi số liệu từ Slack']],
  '07.4': [[2281, 2338, 'Tổng kết: từ Snowflake tới Slack, Claude, embedded']],
  '07.5': [[1920, 2200, 'Cấu hình MCP và hỏi dữ liệu từ Claude']]}
};
