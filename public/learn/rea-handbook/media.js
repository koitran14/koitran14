// Media mapped onto handbook sections (keyed by section number, e.g. '03.3').
// demo: clips of Nick Saraev's REA video, an outside review rather than REA's own material.
// audio: start/end (seconds) inside the overview audio; filled in with the mapping tool (add ?map=1 to a chapter URL).
window.MEDIA = {
 yt: {id: 'dAzs_rU6080', title: 'I Tested The Viral Github Repo That Reverse Engineers Anything (Nick Saraev, 11 phút)',
  note: 'trong video của Nick Saraev, một bài thử nghiệm và nhận xét độc lập, không phải tài liệu của REA. Video thuộc tác giả, nhúng từ YouTube.',
  credit: 'Các đoạn demo trích từ video của Nick Saraev trên YouTube; bản quyền video thuộc tác giả.'},
 audio: {src: '/learn/rea-handbook/media/overview.m4a', title: 'REA giúp AI dịch ngược phần mềm', marks: {
  // from a Whisper transcript of the overview; the audio is a discussion, so it skips the hands-on and checklist sections
  '00.1': [100, 161], '01.1': [176, 249], '01.2': [249, 346], '01.3': [718, 781],
  '02.1': [346, 388], '02.3': [743, 781],
  '03.1': [388, 410], '03.3': [410, 565], '03.4': [0, 100],
  '04.1': [565, 653], '04.3': [653, 718],
  '06.1': [781, 837], '06.3': [837, 891], '06.4': [891, 913],
  '07.1': [913, 946], '07.2': [946, 968],
  '08.1': [968, 992], '08.3': [992, 1037], '08.4': [1113, 1148],
  '09.2': [1037, 1085], '10.2': [1085, 1153]}},
 demo: {
  '01.2': [[67, 111, 'Agent gọi REA MCP, REA gọi Ghidra, Hopper, IDA'], [326, 367, 'Ghidra, Hopper, IDA đã có từ lâu; REA nối chúng với agent']],
  '01.3': [[111, 128, 'Kết quả gồm pseudocode, bằng chứng và phần chưa biết']],
  '02.1': [[67, 111, 'Luồng: người dùng → agent → REA MCP → bộ công cụ']],
  '03.1': [[164, 256, 'Demo: dựng lại app Preview của macOS bằng REA'], [256, 326, 'So sánh bản dùng REA với bản không dùng']],
  '04.2': [[176, 216, 'Muốn có tính năng giống Preview: tái triển khai một tính năng']],
  '05.1': [[613, 639, 'Ghidra, IDA giúp nhanh hơn, nhưng agent thường cũng đi được khá xa']],
  '07.2': [[530, 552, 'Bán bản sao sẽ vướng rào cản sở hữu trí tuệ']],
  '08.1': [[0, 67, 'Làn sóng “software is done”'], [408, 449, 'Đồ thị GitHub stars và lời cảnh báo về hype']],
  '08.3': [[449, 530, 'Phần mềm bị hàng hóa hóa, giá trị dịch chuyển']],
  '08.4': [[552, 612, 'Không cần REA, agent vẫn tự dịch ngược qua screenshot']],
  '09.2': [[128, 164, 'Cài REA: bảo agent tự tải và cài đặt']]}
};
