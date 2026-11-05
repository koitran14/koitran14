# Tư duy Product ở kỹ sư: chủ động thôi đã đủ?

*Hiểu vấn đề là điều mình có thể học. Chịu trách nhiệm cho kết quả còn cần biết mình được tham gia và quyết định những gì.*

Trần Ngọc Đăng Khôi · Ghi chép & suy ngẫm · 20 phút đọc · 05.11.2026

URL: https://koitran14.vercel.app/blog/khi-ky-su-duoc-ky-vong-co-tu-duy-product

Một yêu cầu làm dashboard có thể rất rõ: cần những bộ lọc nào, hiển thị dữ liệu gì, xuất ra định dạng nào và khi nào phải bàn giao. Nhưng có một câu hỏi đôi khi vẫn chưa có lời đáp: người dùng cần bảng số liệu ấy để làm gì?

Mình nghĩ đó là một điểm bắt đầu gần gũi để nói về Product Thinking. Kỹ sư không chỉ cần biết làm một tính năng như thế nào, mà còn muốn hiểu vì sao nó đáng làm. Khi AI hỗ trợ ngày càng nhiều phần việc lập trình, kỳ vọng ấy càng đáng để bàn. Dù vậy, hiểu vấn đề và chịu trách nhiệm cho toàn bộ kết quả sản phẩm là hai việc khác nhau.

Mình viết bài này từ góc nhìn một kỹ sư phần mềm đang phát triển theo hướng AI Product Engineer. Điều mình muốn tìm hiểu là: kỳ vọng có tư duy Product hợp lý đến đâu, mình có thể tự học những gì, và phần nào cần được thống nhất với những người cùng làm sản phẩm?

Bài dựa trên tài liệu và suy ngẫm của mình. Dashboard và các tình huống làm việc bên dưới là ví dụ giả định, không phải câu chuyện hay kết quả của một dự án mình đã thực hiện.

## Mục lục

01. [Ngoài code, kỹ sư còn được kỳ vọng điều gì?](#s1)
02. [Code nhanh hơn, sản phẩm có tốt hơn?](#s2)
03. [Làm đúng yêu cầu đã là giải đúng vấn đề?](#s3)
04. [Tư duy Product bắt đầu từ một ticket](#s4)
05. [Trách nhiệm sản phẩm cần quyền quyết định nào?](#s5)
06. [Thiếu năng lực hay thiếu cơ hội thể hiện?](#s6)
07. [90 ngày để thử, đo và học](#s7)

<a id="s1"></a>

## 01 · Ngoài code, kỹ sư còn được kỳ vọng điều gì?

Product Thinking không phải ý tưởng chỉ xuất hiện sau coding agent. Từ năm 2019, [Gergely Orosz đã viết về product-minded engineer](https://blog.pragmaticengineer.com/the-product-minded-engineer/): những kỹ sư quan tâm đến sản phẩm, thường hỏi vì sao, góp ý về yêu cầu và theo dõi tính năng sau khi ra mắt.

Kỳ vọng ấy cũng có trong mô tả công việc. Khi đối chiếu ngày 05/11/2026, [vị trí Product Engineer của Linear](https://linear.app/careers/0c7c2e26-0a98-42cf-a47c-9a3999fb513b) yêu cầu kỹ sư cùng làm rõ vấn đề và theo sát tính năng từ ý tưởng đến phát hành. [Tài liệu nội bộ của PostHog](https://posthog.com/handbook/engineering/product-engineering) mô tả cách kỹ sư tìm hiểu nhu cầu, đưa một phần tính năng vào sử dụng rồi dựa vào phản hồi để sửa tiếp.

Đó là những ví dụ cụ thể, nhưng chưa đại diện cho cả thị trường. Mình chưa có dữ liệu để nói bao nhiêu công ty đang tuyển theo cách này, hay nhu cầu ấy tăng nhanh đến đâu. Các khảo sát về AI và kỹ năng giúp hiểu thêm hoàn cảnh công việc đang thay đổi, nhưng không trả lời thay câu hỏi tuyển dụng đó.

| Số liệu | Ý nghĩa | Nguồn |
|---|---|---|
| **39%** | Kỹ năng hiện có được nhà tuyển dụng dự báo thay đổi hoặc lỗi thời trong giai đoạn 2025–2030. | [WEF · Future of Jobs 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/) |
| **63%** | Nhà tuyển dụng được khảo sát xem việc người lao động chưa có đủ kỹ năng cần thiết là rào cản lớn với chuyển đổi kinh doanh. | [WEF · Thông cáo 01/2025](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/) |
| **83%** | Người trả lời câu hỏi về việc dùng AI đã dùng ít nhất một công cụ AI trong công việc (n = 17.464). | [Stack Overflow · 2026](https://survey.stackoverflow.co/2026/ai/data) |
| **90%** | Người trả lời khảo sát DORA 2025 dùng AI trong công việc. | [Google Cloud · DORA 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) |

*Hình 1. Bối cảnh về kỹ năng và việc dùng AI. Mỗi khảo sát có nhóm người tham gia và cách hỏi riêng; các số liệu này không đo nhu cầu tuyển kỹ sư có tư duy Product.*

Điều khiến mình quan tâm không phải một chức danh mới. Khi có thể làm ra nhiều phần mềm hơn, việc chọn làm gì vẫn đáng được cân nhắc. DORA 2025 cũng mô tả AI như thứ có thể khuếch đại cả điểm mạnh lẫn điểm yếu trong cách tổ chức làm việc. Mình đọc nhận định ấy như một lời nhắc về hướng đi, chứ chưa xem đó là bằng chứng AI làm tăng nhu cầu Product Engineer.

Hiểu người dùng là một hướng phát triển mình muốn theo đuổi. Nó không thay thế giá trị của những người đi sâu về hạ tầng, bảo mật, hiệu năng hay hệ thống, và cũng không có nghĩa mọi kỹ sư cần trở thành Product Manager.

> **Video liên quan.** [DORA Community Discussion: State of AI-assisted Software Development](https://www.youtube.com/watch?v=Sz8NWaTiWfE) · DORA. Cách làm việc sẵn có ảnh hưởng đến việc sử dụng AI ra sao.

<a id="s2"></a>

## 02 · Code nhanh hơn, sản phẩm có tốt hơn?

Các nghiên cứu về AI chưa cho một câu trả lời duy nhất về năng suất. Trong ba thử nghiệm với tổng cộng 4.867 lập trình viên, Cui và cộng sự ghi nhận nhóm dùng trợ lý viết code hoàn thành nhiều công việc hơn. METR lại thấy 16 lập trình viên giàu kinh nghiệm mất nhiều thời gian hơn khi dùng công cụ đầu năm 2025 trên những kho mã nguồn họ đã quen.

Hai kết quả không thể đặt lên cùng một thước đo rồi chọn bên mình muốn tin: người tham gia, công cụ, công việc và cách đo đều khác nhau.

| Số liệu | Ý nghĩa | Nguồn |
|---|---|---|
| **48%** | Chỉ tin kết quả AI tạo ra khi dễ kiểm chứng (n = 14.304). | [Stack Overflow · 2026](https://survey.stackoverflow.co/2026/ai/data) |
| **6,6%** | Tin AI khi làm nhiều loại công việc, kể cả quyết định công việc quan trọng, trong cùng câu hỏi. | [Stack Overflow · 2026](https://survey.stackoverflow.co/2026/ai/data) |
| **+26,08%** | Số công việc hoàn thành khi tổng hợp kết quả từ ba thử nghiệm, 4.867 lập trình viên; sai số chuẩn 10,3%. | [Cui và cộng sự · Microsoft Research](https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/) |
| **+19%** | Thời gian hoàn thành khi dùng AI trong thí nghiệm đầu năm 2025, 16 lập trình viên, 246 công việc. | [METR · 07/2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) |
| **~25%** | Việc làm trên toàn cầu thuộc các nghề có phần việc có thể chịu tác động của AI tạo sinh (GenAI). Đây không phải tỷ lệ việc làm sẽ mất đi. | [ILO–NASK · 05/2025](https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure) |
| **49%** | Nhóm nghề có ghi nhận Claude được dùng cho ít nhất 1/4 số loại công việc, tổng hợp qua các báo cáo. | [Anthropic · 01/2026](https://www.anthropic.com/research/anthropic-economic-index-january-2026-report) |

*Hình 2. Niềm tin, năng suất và khả năng công việc chịu tác động của AI là những cách đo khác nhau. Chúng không thể cộng hay lấy trung bình với nhau.*

Ngay cả con số của một nghiên cứu cũng cần được đọc đúng thời điểm. Trong [cập nhật tháng 2/2026](https://metr.org/blog/2026-02-24-uplift-update/), METR cho rằng công cụ mới có thể đã giúp nhanh hơn, nhưng dữ liệu mới bị ảnh hưởng bởi việc người tham gia chọn công việc đưa vào nghiên cứu và những khó khăn khi đo thời gian. Kết quả năm 2025 vì thế không nên trở thành kết luận cố định về mọi công cụ AI.

Điểm kiểm thử cũng chỉ cho biết một phần. Các đợt rà soát [SWE-bench Verified](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/) và [SWE-bench Pro](https://openai.com/index/separating-signal-from-noise-coding-evaluations/) của OpenAI chỉ ra vấn đề về dữ liệu và bài kiểm thử. Điểm xử lý yêu cầu sửa lỗi chưa tự cho biết một công cụ có thể hiểu nhu cầu chưa rõ, xử lý ngoại lệ hay vận hành một sản phẩm lâu dài.

Tương tự, một công việc có phần AI hỗ trợ được chưa có nghĩa cả vị trí đó sẽ biến mất. ILO đo khả năng công việc chịu tác động; Anthropic phân biệt số loại việc có dùng AI với phần việc AI thực sự làm xong và đạt yêu cầu. Tự động hóa một việc, tự động hóa cả quy trình và thay thế nhân sự có liên quan, nhưng còn cách nhau bởi chất lượng, chi phí và lựa chọn kinh doanh.

Với mình, điểm cần giữ lại khá cụ thể: **làm nhanh hơn chưa cho biết mình đã làm đúng thứ người dùng cần**. Khung [SPACE](https://www.microsoft.com/en-us/research/publication/the-space-of-developer-productivity-theres-more-to-it-than-you-think/) cũng nhắc rằng không thể chỉ nhìn lượng công việc đã làm để đánh giá năng suất. Các nguồn trên chưa kiểm tra Product Thinking có giúp kỹ sư thích nghi tốt hơn các hướng khác; mình quan tâm đến nó như một cách tìm hiểu vấn đề và lựa chọn giải pháp.

> **Video liên quan.** [Build the Right Thing: Product Engineering (Part 1)](https://www.youtube.com/watch?v=_fHTqOs5wQA&t=943s) · Kent C. Dodds · AI Engineer · từ 15:43. Góc nhìn về việc chọn bài toán khi triển khai ngày càng nhanh.

<a id="s3"></a>

## 03 · Làm đúng yêu cầu đã là giải đúng vấn đề?

Quay lại yêu cầu ở đầu bài. Giả sử nhóm được giao làm một trang tổng hợp số liệu — dashboard — để người dùng xuất báo cáo nhanh hơn. Phiếu công việc, hay ticket, ghi đủ bộ lọc, cột dữ liệu và thời hạn. Mình có thể dựa vào đó để ước lượng và bắt đầu viết code.

Nhưng người dùng cần báo cáo để gửi quản lý, tìm dữ liệu sai hay chuyển sang hệ thống khác? Họ mất thời gian lúc tải tệp, đối chiếu số liệu hay chờ phê duyệt? Chưa hỏi những điều ấy, mình mới biết giải pháp được yêu cầu, chưa biết nguyên nhân gây chậm.

Có thể họ mất nhiều thời gian để đối chiếu hai nguồn dữ liệu. Nếu tìm hiểu thực tế xác nhận điều đó, cảnh báo các dòng chênh lệch là một phương án đáng cân nhắc. Nếu nguyên nhân nằm ở truy vấn chậm hoặc bước phê duyệt, hướng xử lý sẽ khác. Ví dụ này chưa có dữ liệu để kết luận dashboard hay cảnh báo tốt hơn.

Sự khác biệt nằm ở cách bắt đầu. Một bên làm rõ chức năng của giải pháp đã chọn; bên kia tìm hiểu vấn đề trước khi quyết định cách giải quyết. Cả hai vẫn có thể dẫn đến cùng một dashboard, nhưng lý do lựa chọn và cách kiểm tra sau đó sẽ rõ hơn.

Trong [Product vs. Feature Teams](https://www.svpg.com/product-vs-feature-teams/), Marty Cagan phân biệt nhóm nhận danh sách tính năng với nhóm được giao vấn đề và kết quả cần đạt. Mình không hiểu điều đó là cứ dùng ticket thì thiếu tư duy Product. Ticket vẫn hữu ích để chia việc; điều cần biết là ai đã chọn giải pháp, dựa trên thông tin nào và nhóm còn có thể thay đổi những gì.

> Product Thinking, theo cách mình dùng trong bài, là hiểu vấn đề của người dùng, dựa vào đó để chọn giải pháp và quay lại kiểm tra xem giải pháp có giúp được họ không.

Dashboard được đưa vào sử dụng là phần đã bàn giao — output. Người dùng làm báo cáo nhanh hơn mà không tăng sai sót là kết quả mong muốn — outcome. Chỉ sau khi đo mình mới biết kết quả thực tế có giống mong muốn hay không. Hai điều đó cần được phân biệt ngay cả khi công việc đã hoàn thành đúng yêu cầu.

<a id="s4"></a>

## 04 · Tư duy Product bắt đầu từ một ticket

Mình không nghĩ phải đợi có chức danh Product Engineer mới bắt đầu học những thói quen này. Một ticket đang làm đã có thể là chỗ để tập hỏi rõ hơn và theo dõi đến cùng hơn.

[Drew Hoskins](https://productengineers.com/episodes/season2/how-to-become-a-product-minded-engineer-in-the-ai-era/) gợi ý tìm hiểu nhu cầu qua những nguồn có sẵn: cuộc gọi bán hàng, trao đổi hỗ trợ khách hàng, yêu cầu trên GitHub và dữ liệu sử dụng. [Teresa Torres](https://www.producttalk.org/glossary-discovery-continuous-discovery/) đề xuất nhóm phát triển sản phẩm duy trì việc trao đổi với khách hàng hằng tuần, qua những hoạt động nghiên cứu nhỏ. Đây là gợi ý thực hành, không phải số buổi bắt buộc để chứng minh một người có năng lực Product.

Với ví dụ dashboard, mình sẽ bắt đầu bằng một đoạn ngắn trong ticket: “Người dùng muốn xuất báo cáo nhanh hơn; chưa rõ bước nào gây chậm.” Cách viết ấy có vẻ chưa đầy đủ, nhưng giúp mình nhận ra cần hỏi gì tiếp, thay vì đưa giả thuyết đối chiếu dữ liệu vào như một sự thật đã biết.

Sau đó có thể đọc lại các yêu cầu hỗ trợ, cùng người phụ trách xem cách người dùng làm việc, hoặc xin tham gia một buổi trao đổi. Nếu đã xác nhận việc đối chiếu là khó khăn chính, mình mới đề xuất thử làm nổi bật những dòng chênh lệch. Trước khi làm, cần thống nhất sẽ ghi nhận số liệu gì và kết quả thế nào thì phải xem lại giả thuyết.

Mình cũng muốn đặt cạnh nhau vài cách xử lý: sửa cách xuất tệp đang có, thêm cảnh báo hay làm dashboard. Mỗi phương án có chi phí và hạn chế riêng. Sau khi đưa vào sử dụng, một lần xem lại số liệu và phản hồi có thể giúp biết có nên tiếp tục sửa hay dừng ở đó. Đây là các bước mình đề xuất để tập, chưa phải một chương trình đào tạo đã được đánh giá kết quả.

Công việc bảo trì cũng có chỗ để thực hành. Một lỗi xuất báo cáo lặp lại đặt ra câu hỏi ai bị ảnh hưởng, họ phải làm lại những gì và sửa thế nào để bớt tái diễn. Với công cụ nội bộ, người dùng có thể là lập trình viên khác; nhu cầu của họ vẫn đáng tìm hiểu.

Mình có thể tự bắt đầu bằng việc hỏi, ghi rõ điều chưa biết và theo dõi phần đã làm. Gặp khách hàng, thu thập thêm dữ liệu hay thay đổi phạm vi thì thường cần người khác cùng tham gia. Sự chủ động của mình nằm ở việc làm tốt phần đang có và đề nghị bước tiếp theo đủ cụ thể.

> **Video liên quan.** [How to become a product-minded engineer](https://www.youtube.com/watch?v=JtUfbaVdP_M) · Drew Hoskins · The Product Engineers Podcast. Học từ phản hồi và dữ liệu có sẵn trong công việc.

<a id="s5"></a>

## 05 · Trách nhiệm sản phẩm cần quyền quyết định nào?

Một kỹ sư có thể hiểu rất rõ vì sao dashboard chưa giải quyết được khó khăn của người dùng, nhưng vẫn không có quyền thay đổi yêu cầu. Điều đó không làm câu hỏi của họ kém giá trị. Nó cho thấy năng lực nhìn ra vấn đề và phạm vi được quyết định là hai chuyện cần nói riêng.

Trong bài, mình dùng **Product Ownership** để nói về việc chịu trách nhiệm cho kết quả sản phẩm cùng quyền tham gia những quyết định liên quan. Cách dùng này không đồng nhất với chức danh Product Owner trong Scrum. Product Thinking có thể thể hiện qua cách mình suy nghĩ và làm việc; còn khi nhận trách nhiệm về kết quả, cần biết mình thực sự được quyết những gì.

[The Four Big Risks](https://www.svpg.com/four-big-risks/) của Cagan giúp nhìn rõ hơn những việc phải cân nhắc: người dùng có cần không, có biết cách dùng không, nhóm có xây được không và giải pháp có phù hợp với hoạt động kinh doanh không. Trong mô hình này, người phụ trách sản phẩm — Product Manager, hay PM — chịu trách nhiệm chính về nhu cầu và kinh doanh; người thiết kế phụ trách trải nghiệm; kỹ sư phụ trách khả năng xây dựng giải pháp. Các bên vẫn cần làm việc cùng nhau.

Với dashboard, mình cần hỏi thêm có cam kết khách hàng, yêu cầu kiểm toán hay kế hoạch kinh doanh liên quan không. Đó là thông tin cần tìm, chưa phải ràng buộc đã có trong tình huống giả định. Biết thêm bối cảnh giúp mình đề xuất sát hơn, thay vì chỉ so hai phương án về độ gọn của code.

Mình thấy một cuộc trao đổi sẽ dễ hơn nếu làm rõ ba phạm vi: việc được tự quyết, việc cần cùng quyết và việc phải đề nghị người có thẩm quyền quyết. Chẳng hạn, sửa cách triển khai trong giới hạn đã thống nhất có thể thuộc phần đầu; đổi phạm vi tính năng cần PM và người thiết kế; thay cam kết hợp đồng hay ngân sách cần người có thẩm quyền. Ranh giới cụ thể tùy nơi, không phải cứ là quyết định kỹ thuật thì một kỹ sư được tự quyết.

Chịu trách nhiệm làm đúng phần việc đã nhận khác với chịu trách nhiệm cho toàn bộ kết quả kinh doanh. Giá bán, phân phối, vận hành và thời điểm thị trường đều có thể nằm ngoài quyền quyết định của mình. Khi được kỳ vọng đóng góp sâu hơn, mình muốn thống nhất rõ: cần đạt kết quả gì, được thay đổi phần nào, có ai và bao nhiêu thời gian để làm, ai cùng chịu trách nhiệm?

> **Video liên quan.** [Product-minded engineers in an AI-native world](https://www.youtube.com/watch?v=0Cv5763UX70&t=1925s) · The Pragmatic Engineer · từ 32:05. Trao đổi về vai trò của kỹ sư và Product Manager.

<a id="s6"></a>

## 06 · Thiếu năng lực hay thiếu cơ hội thể hiện?

Giả sử một nhóm dành phần lớn thời gian vận hành hệ thống cũ và làm các ticket đã chốt giải pháp. Việc tìm hiểu nhu cầu và thử ý tưởng cho sản phẩm mới được giao cho nhóm khác. Sau một thời gian, nhóm đầu tiên bị đánh giá là chưa thể hiện khả năng chịu trách nhiệm về sản phẩm.

Mình sẽ chưa vội kết luận vì sao. Có thể năng lực chưa đủ, cơ hội thể hiện chưa có, hoặc cả hai. Cách phân công cũng có thể có lý do hợp lý: nhóm khác có chuyên môn phù hợp hơn, hợp đồng cần hoàn thành sớm, hoặc hệ thống hiện tại phải có người giữ ổn định. Tình huống giả định này không cho biết lý do nào đúng.

Điều mình muốn hỏi là họ từng được giao bài toán nào, được tham gia quyết định gì và đã làm gì trong phạm vi ấy. Nếu muốn xem khả năng tìm hiểu người dùng và lựa chọn giải pháp, cần có công việc cho phép quan sát những điều đó. Kết quả bảo trì vẫn có giá trị, nhưng không trả lời hết câu hỏi một người sẽ làm ra sao khi chủ trì việc tìm hiểu một sản phẩm mới.

Các tài liệu về cách tổ chức nhóm giúp đặt vấn đề này vào một phạm vi rộng hơn. [Product trio của Torres](https://www.producttalk.org/product-trio/) đề nghị PM, người thiết kế và kỹ sư cùng tìm hiểu nhu cầu. Nghiên cứu của [Verwijs và Russo](https://arxiv.org/abs/2105.12439), kiểm tra mô hình bằng khảo sát khoảng 5.000 lập trình viên trong 2.000 nhóm Scrum, xem xét cả quyền quyết định của nhóm và hỗ trợ từ người quản lý. [DORA](https://dora.dev/capabilities/user-centric-focus/) nhấn mạnh việc kỹ sư được tiếp cận phản hồi và dữ liệu người dùng.

Các nguồn ấy chưa chứng minh nguyên nhân trong trường hợp của một cá nhân. Từ đó, mình đề xuất khi đánh giá nên xem cả việc người đó đã làm lẫn điều kiện họ có để làm: có biết mục tiêu không, có được tham gia trước khi chọn giải pháp không, có thời gian và người phối hợp không, có được thay đổi điều gì không?

Nếu ít người hơn hoặc ít thời gian hơn mà trách nhiệm lại tăng, cần thống nhất việc nào làm gọn, thu hẹp hay để lại sau. Mình không muốn mặc định AI sẽ bù đủ phần thiếu khi chưa biết thời gian tiết kiệm được có lớn hơn công kiểm tra và sửa lỗi hay không.

Tổ chức vẫn có thể chọn để một nhóm quyết định hướng sản phẩm, còn kỹ sư chủ yếu thực hiện yêu cầu. Khi đó, kỳ vọng phù hợp có thể là hiểu đủ vấn đề để làm tốt, báo rủi ro và góp ý cách triển khai. Nếu muốn đánh giá ở mức chịu trách nhiệm cao hơn, cũng cần trao đổi lại cách giao việc và quyền tham gia quyết định.

> Ít cơ hội thể hiện chưa chứng minh một người thiếu năng lực. Nhưng thiếu cơ hội cũng chưa giải thích được mọi kết quả. Mình cần nhìn cả hai trước khi đánh giá.

<a id="s7"></a>

## 07 · 90 ngày để thử, đo và học

Thay vì chỉ nói mình cần “có tư duy Product hơn”, mình muốn thử theo một vấn đề đủ nhỏ từ lúc tìm hiểu đến khi xem lại kết quả. Chẳng hạn, với báo cáo, trước hết cần xác nhận người dùng đang mất thời gian ở đâu. Chỉ khi việc đối chiếu thực sự là khó khăn chính, giảm thời gian đối chiếu mới trở thành mục tiêu phù hợp.

Dưới đây là cách mình đề xuất sắp xếp một thử nghiệm 90 ngày. Nó chưa có dữ liệu thực hiện trong bài; thời lượng thật cần theo chu kỳ sử dụng và công việc đang có. Trước khi bắt đầu, cần thống nhất mục tiêu, số liệu ban đầu, phạm vi được thử, thời gian và người phối hợp.

| Giai đoạn | Việc chính | Điều cần ghi lại |
|---|---|---|
| NGÀY 01–30 | Tìm hiểu | Cách người dùng làm việc, phản hồi, số liệu ban đầu và giả thuyết cần kiểm tra. |
| NGÀY 31–60 | Làm và thử | Một thay đổi nhỏ, phản hồi khi dùng thử, lỗi và chi phí phát sinh. |
| NGÀY 61–90 | Xem lại | So sánh kết quả, xem những vấn đề mới và quyết định sửa tiếp hay dừng. |

*Hình 3. Mốc 90 ngày là ví dụ đề xuất, chưa phải phương pháp đã được kiểm chứng. Có thể sửa hướng đi hoặc dừng sớm khi có đủ thông tin.*

Mình sẽ nhìn kết quả từ bốn mặt, thay vì dùng một con số để đánh giá cả thử nghiệm:

1. **Người dùng có bớt khó khăn không?** Nếu đang giải quyết việc đối chiếu, cần xem thời gian làm, số lỗi bỏ sót và số lần phải làm lại.
2. **Giải pháp có vận hành tốt không?** Xem chất lượng, chi phí, lỗi và công hỗ trợ. Các chỉ số DORA có thể giúp theo dõi việc triển khai của ứng dụng hoặc dịch vụ, không dùng để xếp hạng từng kỹ sư.
3. **Mình hiểu thêm được gì?** Giả thuyết nào được ủng hộ, giả thuyết nào cần bỏ, thông tin nào khiến mình đổi cách làm? Số cuộc gặp người dùng tự nó chưa trả lời được những câu hỏi này.
4. **Có đủ điều kiện để thực hiện không?** Ghi lại thông tin còn thiếu, thời gian thực tế, người phối hợp và những quyết định chưa được tham gia.

Cách chia bốn mặt là đề xuất của mình. Nó tham khảo việc phân biệt tính năng với kết quả của Cagan, cách học từ người dùng của Torres và Hoskins, cùng hướng dẫn đo của [DORA](https://dora.dev/guides/dora-metrics/) và SPACE; các nguồn không kiểm chứng toàn bộ cách đánh giá này.

Nếu sau này thời gian làm báo cáo giảm, vẫn cần xem số lỗi và công hỗ trợ có tăng không, hay báo cáo được thử vốn dễ hơn. Nếu không cải thiện, cần xem lại giả thuyết, cách đo và cách triển khai. Còn nếu chưa thể thử vì thiếu dữ liệu hoặc quyền quyết định, điều có thể ghi nhận là phần nào chưa làm được và vì sao — chưa thể kết luận giải pháp không hiệu quả hay kỹ sư thiếu năng lực.

Mình vẫn cho rằng kỳ vọng kỹ sư hiểu vấn đề và theo dõi kết quả là hợp lý. Nhưng khi đánh giá khả năng chịu trách nhiệm cho sản phẩm, mình muốn nhìn cùng phạm vi được quyết định và cơ hội đã có. Đây là quan điểm mình rút ra từ tài liệu, cần tiếp tục kiểm tra qua thực tế, không phải kết quả của một nghiên cứu trực tiếp về toàn bộ lập luận này.

Về phần mình, có thể bắt đầu bằng một câu hỏi rõ hơn trong ticket, một giả thuyết trước khi làm và một lần xem lại sau khi đưa tính năng vào sử dụng. Phần cần cùng tổ chức thống nhất là mình được biết gì, tham gia từ đâu, dành thời gian ở đâu và được đánh giá bằng những gì đã thực sự có cơ hội làm.

**Product Thinking có thể bắt đầu từ sự chủ động của một kỹ sư. Để sự chủ động ấy trở thành năng lực có thể vận dụng và đánh giá công bằng, cần thêm bối cảnh, người cùng làm và phạm vi trách nhiệm rõ ràng.**

**Đọc tiếp:** [AI Product Handbook · Product Thinking & Lifecycle](https://koitran14.vercel.app/blog/ai-product-handbook/01)

---

**Ghi chú.** Bài viết có công cụ AI hỗ trợ soạn và biên tập. Các tình huống dashboard và phân công công việc đều là giả định. Ba phạm vi quyết định, lịch 90 ngày và cách đánh giá bốn mặt là đề xuất của mình, chưa có dữ liệu kiểm chứng trong bài.

## Nguồn tham khảo

1. [WEF · The Future of Jobs Report 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/).
2. [WEF · Thông cáo Future of Jobs 2025](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/).
3. [Stack Overflow · Developer Survey 2026 — AI data](https://survey.stackoverflow.co/2026/ai/data).
4. [DORA · State of AI-assisted Software Development 2025](https://dora.dev/research/2025/dora-report/).
5. [Google Cloud · Announcing the 2025 DORA Report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report).
6. [Linear · Product Engineer — mô tả tuyển dụng](https://linear.app/careers/0c7c2e26-0a98-42cf-a47c-9a3999fb513b), đối chiếu 05/11/2026; nội dung tuyển dụng có thể thay đổi.
7. [Linear · Careers — nguyên tắc làm việc](https://linear.app/careers), đối chiếu 05/11/2026.
8. [PostHog · How to do product, as an engineer](https://posthog.com/handbook/engineering/product-engineering), handbook thực hành.
9. [Cui và cộng sự · The Effects of Generative AI on High-Skilled Work](https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/) · [Bản Management Science, 2026](https://doi.org/10.1287/mnsc.2025.00535).
10. [METR · Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).
11. [METR · We are Changing our Developer Productivity Experiment Design, 02/2026](https://metr.org/blog/2026-02-24-uplift-update/).
12. [OpenAI · Why SWE-bench Verified no longer measures frontier coding capabilities, 02/2026](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/).
13. [OpenAI · Separating signal from noise in coding evaluations, 07/2026](https://openai.com/index/separating-signal-from-noise-coding-evaluations/).
14. [ILO–NASK · Generative AI and Jobs: A Refined Global Index of Occupational Exposure, 05/2025](https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure).
15. [Anthropic · Economic Index: Economic primitives, 01/2026](https://www.anthropic.com/research/anthropic-economic-index-january-2026-report).
16. [Forsgren và cộng sự · The SPACE of Developer Productivity, 2021](https://www.microsoft.com/en-us/research/publication/the-space-of-developer-productivity-theres-more-to-it-than-you-think/) · [ACM Queue](https://queue.acm.org/detail.cfm?id=3454124).
17. [Marty Cagan · Product vs. Feature Teams, 2019](https://www.svpg.com/product-vs-feature-teams/).
18. [Marty Cagan · The Four Big Risks, 2017](https://www.svpg.com/four-big-risks/).
19. [Gergely Orosz · The Product-Minded Software Engineer, 2019](https://blog.pragmaticengineer.com/the-product-minded-engineer/).
20. [Teresa Torres · Continuous Discovery](https://www.producttalk.org/glossary-discovery-continuous-discovery/).
21. [Teresa Torres · The Product Trio](https://www.producttalk.org/product-trio/).
22. [Drew Hoskins · How to Become a Product-Minded Engineer in the AI Era, 09/2026](https://productengineers.com/episodes/season2/how-to-become-a-product-minded-engineer-in-the-ai-era/).
23. [Verwijs và Russo · A Theory of Scrum Team Effectiveness](https://arxiv.org/abs/2105.12439), bản sửa 2022; nghiên cứu ở cấp team.
24. [DORA · User-centric focus](https://dora.dev/capabilities/user-centric-focus/).
25. [DORA · Software delivery performance metrics](https://dora.dev/guides/dora-metrics/).
