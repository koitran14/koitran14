# Tư duy Product ở kỹ sư: chủ động thôi đã đủ?

*Kỹ sư có thể tự rèn luyện tư duy Product từ công việc hằng ngày. Nhưng để chịu trách nhiệm cho kết quả sản phẩm, họ còn cần bối cảnh, cơ hội thực hành và quyền quyết định rõ ràng.*

Trần Ngọc Đăng Khôi · Ghi chép & suy ngẫm · 20 phút đọc · 05.11.2026

URL: https://koitran14.vercel.app/blog/khi-ky-su-duoc-ky-vong-co-tu-duy-product

Bài trước: [AI có thay thế kỹ sư? Giá trị của engineering sẽ đi về đâu?](/blog/ai-co-thay-the-ky-su-phan-mem). Bài này đi sâu vào tư duy Product như một hướng phát triển của kỹ sư.

Giả sử bạn nhận một ticket (yêu cầu công việc) làm dashboard, tức trang tổng hợp số liệu: thêm bộ lọc, hiển thị vài cột số liệu và cho phép xuất tệp. Yêu cầu đã rõ, ngày bàn giao cũng có. Bạn ước lượng, viết code, kiểm thử rồi bàn giao. Nhưng làm xong từng ấy việc đã đủ để biết người dùng làm báo cáo nhanh hơn chưa?

Đây là chỗ yêu cầu có tư duy Product dễ trở nên khó hiểu. Kỹ sư được mong đợi quan tâm đến kết quả sau khi bàn giao, nhưng không phải lúc nào cũng được gặp người dùng, biết lý do chọn tính năng hay có quyền đổi yêu cầu. Vậy trong phần việc của mình, họ chủ động được đến đâu?

Mình là kỹ sư phần mềm và muốn trở thành AI Product Engineer. Điều mình muốn hiểu là khoảng cách giữa hai việc: làm tốt một tính năng được giao và biết tính năng đó có đáng làm hay không.

Tình huống dashboard và cách phân công công việc trong bài đều là giả định. Các tài liệu được dẫn giúp soi rõ từng bước: hiểu yêu cầu, chọn cách giải quyết, theo dõi kết quả và xác định ai được quyết định điều gì.

## Mục lục

01. [Ticket đã rõ, vấn đề đã rõ chưa?](#s1)
02. [Chưa được đổi yêu cầu, vẫn có việc để làm](#s2)
03. [Thấy cách tốt hơn, ai được quyền đổi?](#s3)
04. [Chưa được thử, đã bị đánh giá?](#s4)
05. [Bắt đầu từ lần nhận việc tiếp theo](#s5)

<a id="s1"></a>

## 01 · Ticket đã rõ, vấn đề đã rõ chưa?

Với ticket trên, kỹ sư đã biết cần xây những chức năng nào. Nhưng lý do làm dashboard mới chỉ dừng ở mong muốn xuất báo cáo nhanh hơn. Chưa ai xác định người dùng mất thời gian ở bước nào.

Người dùng cần báo cáo để gửi quản lý, tìm dữ liệu sai hay chuyển sang hệ thống khác? Họ mất thời gian lúc tải tệp, đối chiếu số liệu hay chờ phê duyệt? Câu trả lời sẽ quyết định nhóm nên xử lý ở đâu.

Giả sử người dùng mất nhiều thời gian đối chiếu hai nguồn dữ liệu. Nếu quan sát thực tế xác nhận điều đó, nhóm có thể cân nhắc làm nổi bật các dòng chênh lệch. Còn nếu họ phải chờ truy vấn hoặc chờ phê duyệt, cách giải quyết sẽ khác. Khi chưa biết nguyên nhân, chưa có cơ sở nói dashboard hay cảnh báo là lựa chọn tốt hơn.

Nếu chỉ hỏi thêm về bộ lọc hay định dạng tệp, nhóm đang hoàn thiện yêu cầu làm dashboard. Hỏi người dùng đang vướng ở đâu mở ra khả năng chọn cách khác. Dashboard vẫn có thể là lựa chọn cuối cùng, nhưng lúc đó nhóm biết nó giải quyết việc gì và sẽ kiểm tra kết quả ra sao.

Trong [Product vs. Feature Teams](https://www.svpg.com/product-vs-feature-teams/), Marty Cagan phân biệt nhóm được giao danh sách tính năng cần làm với nhóm được giao một vấn đề và kết quả cần đạt.

Cả hai nhóm đều có thể dùng ticket để chia việc. Điểm khác nằm ở chỗ nhóm chỉ thực hiện giải pháp đã chốt, hay được tìm hiểu và chọn giải pháp. Muốn lựa chọn, nhóm phải có thông tin về vấn đề và biết giới hạn của những gì được phép thay đổi. Đây là mô hình tổ chức Cagan bàn đến, không phải yêu cầu áp dụng cho mọi nhóm.

> Trong bài này, tư duy Product là cách làm việc bắt đầu từ vấn đề của người dùng: tìm hiểu họ đang vướng ở đâu, chọn cách giải quyết rồi kiểm tra xem cách đó có giúp được họ không.

Làm xong dashboard là bàn giao một tính năng (output). Người dùng làm báo cáo nhanh hơn mà không tăng sai sót mới là kết quả mong muốn (outcome). Muốn biết có đạt kết quả đó hay không, nhóm phải đo sau khi đưa tính năng vào sử dụng. Hoàn thành đúng yêu cầu chưa trả lời được điều này.

<a id="s2"></a>

## 02 · Chưa được đổi yêu cầu, vẫn có việc để làm

Không phải kỹ sư nào cũng được tự bỏ yêu cầu làm dashboard để chọn cách khác. Nhưng ngay trong ticket đang nhận, họ vẫn có thể hỏi vì sao cần tính năng này và ai sẽ dùng nó. Đó là một việc cụ thể để bắt đầu, không cần chờ đổi chức danh.

[Drew Hoskins](https://productengineers.com/episodes/season2/how-to-become-a-product-minded-engineer-in-the-ai-era/) gợi ý tìm hiểu nhu cầu qua những nguồn có sẵn: cuộc gọi bán hàng, trao đổi hỗ trợ khách hàng, yêu cầu trên GitHub và dữ liệu sử dụng.

Với ví dụ dashboard, ticket có thể ghi rõ: “Người dùng muốn xuất báo cáo nhanh hơn; chưa rõ bước nào gây chậm.” Ghi rõ điều chưa biết giúp xác định cần hỏi thêm điều gì, thay vì mặc định việc đối chiếu dữ liệu là nguyên nhân.

Để biết bước nào gây chậm, kỹ sư có thể cùng người phụ trách quan sát người dùng làm báo cáo hoặc xin tham gia một buổi trao đổi. Nếu vướng mắc chính là đối chiếu số liệu, nhóm mới có cơ sở thử làm nổi bật các dòng chênh lệch. Trước khi thử, cần thống nhất sẽ đo gì và kết quả nào cho thấy nhận định ban đầu không đúng.

Nhóm có thể đặt vài phương án cạnh nhau: sửa chức năng xuất tệp hiện tại, thêm cảnh báo hoặc làm dashboard. Mỗi phương án tốn bao nhiêu công sức và giải quyết được phần nào của vấn đề? Sau khi đưa vào sử dụng, số liệu và phản hồi sẽ giúp quyết định sửa tiếp hay dừng. Đây là ví dụ minh họa cách áp dụng các gợi ý, chưa phải kết quả thử nghiệm hay một chương trình đào tạo.

Cách suy nghĩ này cũng dùng được khi bảo trì hệ thống. Nếu lỗi xuất báo cáo lặp lại, ngoài sửa lỗi, kỹ sư có thể tìm hiểu ai bị ảnh hưởng, họ phải làm lại những bước nào và làm sao để lỗi ít tái diễn hơn. Với công cụ nội bộ, người dùng có thể là các đồng nghiệp; khó khăn của họ cũng đáng được tìm hiểu.

Hỏi rõ yêu cầu và ghi lại điều chưa biết thường là những việc kỹ sư tự làm được. Còn gặp khách hàng, lấy thêm dữ liệu hay đổi yêu cầu thường cần người phụ trách hỗ trợ. Đề nghị sẽ dễ trao đổi hơn nếu nói rõ muốn biết điều gì, định tìm hiểu bằng cách nào và cần ai tham gia.

> **Video liên quan.** [How to become a product-minded engineer](https://www.youtube.com/watch?v=JtUfbaVdP_M) · Drew Hoskins · The Product Engineers Podcast. Học từ phản hồi và dữ liệu có sẵn trong công việc.

<a id="s3"></a>

## 03 · Thấy cách tốt hơn, ai được quyền đổi?

Giả sử sau khi tìm hiểu, kỹ sư cho rằng chỉ cần sửa chức năng xuất tệp hiện tại. Họ có nên tự bỏ yêu cầu làm dashboard không? Chưa thể quyết định như vậy nếu chưa biết ai đã chốt yêu cầu và vì sao. Đề xuất một phương án khác là phần chủ động của kỹ sư; duyệt thay đổi thuộc về ai là việc nhóm phải thống nhất.

Bài viết dùng **Product Ownership** để nói về việc chịu trách nhiệm cho kết quả sản phẩm, đi cùng quyền tham gia những quyết định ảnh hưởng đến kết quả ấy. Đây không phải chức danh Product Owner trong Scrum.

Trong [The Four Big Risks](https://www.svpg.com/four-big-risks/), Cagan nêu bốn điều cần xem xét: người dùng có cần giải pháp không, có biết cách dùng không, nhóm có đủ khả năng xây dựng giải pháp không và giải pháp có phù hợp với hoạt động kinh doanh không.

Theo cách phân chia của Cagan, người phụ trách sản phẩm (Product Manager, hay PM) chịu trách nhiệm chính về nhu cầu người dùng và sự phù hợp với hoạt động kinh doanh; người thiết kế phụ trách trải nghiệm sử dụng; kỹ sư xem xét khả năng xây dựng giải pháp về mặt kỹ thuật. Các bên vẫn cần phối hợp với nhau.

Chẳng hạn, muốn thay dashboard bằng cách khác, nhóm còn phải biết đã hứa gì với khách hàng, có yêu cầu kiểm toán nào và việc này liên quan đến kế hoạch kinh doanh ra sao. Ví dụ đang xét chưa có các thông tin đó. Phương án ít code hơn chưa chắc đáp ứng được những yêu cầu này.

Nhóm nên thống nhất việc nào kỹ sư được tự quyết, việc nào phải bàn chung và việc nào cần người có thẩm quyền duyệt. Chẳng hạn, kỹ sư có thể tự chọn cách triển khai trong giới hạn đã thỏa thuận. Đổi phạm vi tính năng thường cần bàn với PM và người thiết kế; đổi cam kết hợp đồng hay ngân sách cần người có thẩm quyền quyết định. Mỗi nơi sẽ phân chia khác nhau, kể cả quyền quyết định về kỹ thuật.

Kết quả kinh doanh còn phụ thuộc vào giá bán, cách phân phối, vận hành và thời điểm ra mắt. Những việc này có thể do người khác quyết định dù kỹ sư đã làm tốt phần được giao. Vì thế, khi giao thêm trách nhiệm về sản phẩm, cần nói rõ mục tiêu, những gì kỹ sư được phép thay đổi, ai cùng làm và thời gian dành cho công việc đó.

> **Video liên quan.** [Product-minded engineers in an AI-native world](https://www.youtube.com/watch?v=0Cv5763UX70&t=1925s) · The Pragmatic Engineer · từ 32:05. Trao đổi về vai trò của kỹ sư và Product Manager.

<a id="s4"></a>

## 04 · Chưa được thử, đã bị đánh giá?

Giới hạn này còn ảnh hưởng đến cách đánh giá kỹ sư. Giả sử một nhóm dành phần lớn thời gian vận hành hệ thống cũ và làm những ticket đã chốt giải pháp. Nhóm khác được tìm hiểu nhu cầu, thử ý tưởng cho sản phẩm mới. Sau một thời gian, nhóm vận hành bị nhận xét là chưa thể hiện khả năng chịu trách nhiệm về sản phẩm.

Nhận xét đó có thể đúng, nhưng thông tin hiện có chưa đủ để kết luận. Nhóm vận hành có thể thiếu năng lực, thiếu cơ hội thể hiện hoặc cả hai. Việc giao sản phẩm mới cho nhóm khác cũng có lý do hợp lý: chuyên môn phù hợp hơn, cần kịp hợp đồng hoặc phải để nhóm hiện tại tập trung giữ hệ thống ổn định.

Làm tốt công việc bảo trì cho thấy năng lực trong phần việc đó. Để nhận xét về khả năng tìm hiểu người dùng và chọn giải pháp, cần xem nhóm đã được thử những việc ấy chưa, được quyết định gì và đã làm ra sao. Nếu chưa có cơ hội thử, chưa thể kết luận họ không làm được sản phẩm mới.

Cách chia việc ảnh hưởng đến cơ hội tham gia tìm hiểu người dùng của kỹ sư. [Mô hình product trio của Teresa Torres](https://www.producttalk.org/product-trio/) đề xuất PM, người thiết kế và kỹ sư cùng tìm hiểu nhu cầu.

Trong nghiên cứu về nhóm Scrum, [Verwijs và Russo](https://arxiv.org/abs/2105.12439) xem xét hiệu quả làm việc của nhóm, bao gồm quyền quyết định và sự hỗ trợ từ người quản lý. Hai tác giả dùng khảo sát để kiểm tra mô hình nghiên cứu, với khoảng 5.000 lập trình viên trong 2.000 nhóm. [DORA](https://dora.dev/capabilities/user-centric-focus/) nhấn mạnh việc kỹ sư được đọc phản hồi và xem dữ liệu người dùng.

Các tài liệu này nói về cách làm việc của nhóm, không đủ để giải thích kết quả của từng người. Khi đánh giá một kỹ sư, vẫn cần xem họ có biết mục tiêu, được góp ý trước khi chốt giải pháp và được phép thay đổi những gì. Thời gian dành cho công việc và sự phối hợp của người khác cũng phải được tính đến.

Nếu số người hoặc thời gian giảm mà trách nhiệm tăng, nhóm phải thống nhất việc nào làm gọn, việc nào bớt đi hoặc để sau. AI có bù được phần thiếu hụt hay không cần được đo trong công việc thực tế, tính cả thời gian kiểm tra và sửa những gì AI làm sai.

Một tổ chức có thể để nhóm khác chọn hướng phát triển sản phẩm, còn kỹ sư tập trung thực hiện yêu cầu. Khi đó, việc đánh giá nên dựa vào cách kỹ sư hiểu yêu cầu, triển khai, báo rủi ro và góp ý. Nếu muốn họ chịu trách nhiệm cả về kết quả sản phẩm, tổ chức cũng phải xem lại cách giao việc và quyền tham gia quyết định.

> Chưa được thử không có nghĩa là không làm được. Nhưng thiếu cơ hội cũng không giải thích được mọi kết quả. Đánh giá năng lực cần xem cả công việc đã làm và điều kiện để làm công việc ấy.

<a id="s5"></a>

## 05 · Bắt đầu từ lần nhận việc tiếp theo

Với ticket dashboard tiếp theo, điểm bắt đầu không nhất thiết là một kế hoạch học mới. Trước khi viết code, kỹ sư có thể hỏi người dùng đang mất thời gian ở đâu. Khi bàn giao, nhóm hẹn lúc xem lại họ có làm báo cáo nhanh hơn không. Để làm được thường xuyên, những việc này cần có thời gian và người phối hợp.

[Hoskins](https://productengineers.com/episodes/season2/how-to-become-a-product-minded-engineer-in-the-ai-era/) gợi ý viết rõ người dùng sẽ thao tác từng bước như thế nào, tìm những chỗ yêu cầu còn thiếu và đưa tình huống quan trọng vào kiểm thử. Nhờ vậy, nhóm kiểm tra được tính năng theo cách người dùng thực sự thao tác, thay vì chỉ kiểm tra từng chức năng riêng lẻ.

[Teresa Torres](https://www.producttalk.org/glossary-discovery-continuous-discovery/) đề xuất chính nhóm làm sản phẩm trao đổi trực tiếp với khách hàng hằng tuần, qua những hoạt động nghiên cứu nhỏ. Nhóm vẫn phát triển sản phẩm, đồng thời dành thời gian tìm hiểu nhu cầu để có thông tin mới khi quyết định. Lịch hằng tuần là cách làm Torres đề xuất cho nhóm, không phải số buổi dùng để chấm năng lực từng kỹ sư.

Khi tính năng đã được sử dụng, nhóm cần xem người dùng có làm việc thuận lợi hơn không và quá trình triển khai phần mềm có ổn định không.

Về quá trình triển khai, [DORA](https://dora.dev/guides/dora-metrics/) hướng dẫn ghi nhận số liệu trước khi cải tiến, tìm chỗ đang gây khó khăn, thay đổi rồi đo lại. Thời gian đưa thay đổi vào sử dụng và tỷ lệ triển khai gây lỗi là những chỉ số dành cho một ứng dụng hoặc dịch vụ. Nhóm dùng các chỉ số này để theo dõi tốc độ và độ ổn định, không dùng để xếp hạng từng người. Muốn biết tính năng có giúp ích hay không, vẫn phải xem phản hồi và kết quả công việc của người dùng.

Có thể dùng những gợi ý này để tập cách làm việc, nhưng không nên coi chúng là bộ tiêu chí chung để chấm tư duy Product. Bài viết rút ra rằng kỹ sư cần cả sự chủ động, quyền tham gia quyết định và cơ hội thực hành. Đây là nhận định tổng hợp từ các nguồn, chưa được một nghiên cứu trực tiếp kiểm chứng đầy đủ.

Với một tính năng sắp làm, kỹ sư có thể ghi rõ điều muốn kiểm tra và hẹn thời điểm xem lại kết quả sau khi đưa vào sử dụng. Nhóm thống nhất sẽ cung cấp thông tin gì, kỹ sư tham gia từ lúc nào, có bao nhiêu thời gian tìm hiểu và dựa vào đâu để đánh giá kết quả.

**Kỹ sư có thể chủ động rèn luyện tư duy Product từ công việc hằng ngày. Để làm tốt hơn và được đánh giá công bằng, họ còn cần hiểu mục tiêu sản phẩm, có người phối hợp và biết rõ phạm vi được quyết định.**

**Đọc tiếp:** [AI Product Handbook · Product Thinking & Lifecycle](https://koitran14.vercel.app/blog/ai-product-handbook/01)

<details>
<summary>Đọc thêm: kỳ vọng nghề nghiệp và các nghiên cứu về AI</summary>

### Ngoài code, kỹ sư còn được kỳ vọng điều gì?

Kỳ vọng kỹ sư hiểu sản phẩm đã có từ trước khi các công cụ AI viết code phổ biến. Từ năm 2019, [Gergely Orosz đã viết về product-minded engineer](https://blog.pragmaticengineer.com/the-product-minded-engineer/): những kỹ sư quan tâm đến sản phẩm, hỏi vì sao cần làm một tính năng, góp ý về yêu cầu và theo dõi tính năng sau khi ra mắt.

Một số mô tả công việc cũng nêu yêu cầu này. Trong tin tuyển dụng được đối chiếu ngày 05/11/2026, [vị trí Product Engineer của Linear](https://linear.app/careers/0c7c2e26-0a98-42cf-a47c-9a3999fb513b) yêu cầu kỹ sư cùng làm rõ vấn đề và theo sát tính năng từ ý tưởng đến phát hành. [Tài liệu nội bộ của PostHog](https://posthog.com/handbook/engineering/product-engineering) mô tả cách kỹ sư tìm hiểu nhu cầu, phát hành một phần tính năng rồi sửa tiếp dựa trên phản hồi.

Hai ví dụ trên cho thấy yêu cầu này có trong thực tế, nhưng chưa nói được nó phổ biến đến đâu hay đang tăng lên. Các khảo sát dưới đây cung cấp thêm thông tin về kỹ năng và việc dùng AI. Chúng không đo nhu cầu tuyển kỹ sư có tư duy Product.

| Số liệu | Ý nghĩa | Nguồn |
|---|---|---|
| **39%** | Kỹ năng hiện có được nhà tuyển dụng dự báo thay đổi hoặc lỗi thời trong giai đoạn 2025–2030. | [WEF · Future of Jobs 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/) |
| **63%** | Nhà tuyển dụng được khảo sát xem việc người lao động chưa có đủ kỹ năng cần thiết là rào cản lớn với chuyển đổi kinh doanh. | [WEF · Thông cáo 01/2025](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/) |
| **83%** | Người trả lời câu hỏi về việc dùng AI đã dùng ít nhất một công cụ AI trong công việc (n = 17.464). | [Stack Overflow · 2026](https://survey.stackoverflow.co/2026/ai/data) |
| **90%** | Người trả lời khảo sát DORA 2025 dùng AI trong công việc. | [Google Cloud · DORA 2025](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report) |

*Hình 1. Bối cảnh về kỹ năng và việc dùng AI. Mỗi khảo sát có nhóm người tham gia và cách hỏi riêng; các số liệu này không đo nhu cầu tuyển kỹ sư có tư duy Product.*

Theo DORA 2025, AI có thể làm điểm mạnh lẫn điểm yếu sẵn có của tổ chức rõ hơn. Khi liên hệ với việc làm sản phẩm, có thể hiểu thế này: nếu nhóm chọn một tính năng ít người cần, viết code nhanh hơn cũng không khiến tính năng ấy hữu ích hơn. Đây là cách diễn giải nhận định của DORA, không phải kết quả nghiên cứu về nhu cầu tuyển Product Engineer.

Với kỹ sư muốn tham gia sâu hơn vào việc làm sản phẩm, học cách tìm hiểu người dùng và chọn giải pháp là hướng đáng cân nhắc. Những người muốn chuyên sâu về hạ tầng, bảo mật, hiệu năng hay hệ thống vẫn có vai trò quan trọng. Có tư duy Product cũng không có nghĩa phải chuyển sang làm Product Manager.

> **Video liên quan.** [DORA Community Discussion: State of AI-assisted Software Development](https://www.youtube.com/watch?v=Sz8NWaTiWfE) · DORA. Cách làm việc sẵn có ảnh hưởng đến việc sử dụng AI ra sao.

### Code nhanh hơn, sản phẩm có tốt hơn?

AI giúp lập trình viên làm nhanh hơn đến đâu còn tùy công việc và cách sử dụng. Trong một [nghiên cứu về tác động của AI đến năng suất lập trình](https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/), Zheyuan (Kevin) Cui cùng các tác giả khác tổng hợp kết quả từ ba thử nghiệm với 4.867 lập trình viên. Nhóm nghiên cứu ghi nhận những người dùng trợ lý viết code hoàn thành nhiều công việc hơn.

Trong một nghiên cứu khác, METR ghi nhận 16 lập trình viên giàu kinh nghiệm mất nhiều thời gian hơn khi dùng công cụ đầu năm 2025 trên những kho mã nguồn họ đã quen.

Các nghiên cứu này không thử cùng một công cụ trên cùng một nhóm người và loại công việc. Cách đo cũng khác nhau. Vì vậy, kết quả trái chiều chưa đủ để kết luận nghiên cứu nào sai. Khi đọc bảng dưới đây, cũng cần tách ba chuyện: người dùng tin AI đến đâu, AI ảnh hưởng thế nào đến năng suất và những công việc nào có thể chịu tác động.

| Số liệu | Ý nghĩa | Nguồn |
|---|---|---|
| **48%** | Chỉ tin kết quả AI tạo ra khi dễ kiểm chứng (n = 14.304). | [Stack Overflow · 2026](https://survey.stackoverflow.co/2026/ai/data) |
| **6,6%** | Tin AI khi làm nhiều loại công việc, kể cả quyết định công việc quan trọng, trong cùng câu hỏi. | [Stack Overflow · 2026](https://survey.stackoverflow.co/2026/ai/data) |
| **+26,08%** | Số công việc hoàn thành khi tổng hợp kết quả từ ba thử nghiệm, 4.867 lập trình viên; sai số chuẩn 10,3%. | [Zheyuan (Kevin) Cui và các tác giả · Microsoft Research](https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/) |
| **+19%** | Thời gian hoàn thành khi dùng AI trong thí nghiệm đầu năm 2025, 16 lập trình viên, 246 công việc. | [METR · 07/2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) |
| **~25%** | Việc làm trên toàn cầu thuộc các nghề có phần việc có thể chịu tác động của AI tạo sinh (GenAI). Đây không phải tỷ lệ việc làm sẽ mất đi. | [ILO–NASK · 05/2025](https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure) |
| **49%** | Nhóm nghề có ghi nhận Claude được dùng cho ít nhất 1/4 số loại công việc, tổng hợp qua các báo cáo. | [Anthropic · 01/2026](https://www.anthropic.com/research/anthropic-economic-index-january-2026-report) |

*Hình 2. Niềm tin, năng suất và khả năng công việc chịu tác động của AI là những cách đo khác nhau. Chúng không thể cộng hay lấy trung bình với nhau.*

Kết quả nghiên cứu còn phụ thuộc vào thời điểm công cụ được thử nghiệm. Trong [cập nhật tháng 2/2026](https://metr.org/blog/2026-02-24-uplift-update/), METR cho rằng công cụ mới có thể đã giúp lập trình viên làm nhanh hơn. Tuy nhiên, dữ liệu mới chưa đáng tin cậy: người tham gia tự chọn công việc đưa vào nghiên cứu, còn thời gian làm việc khó đo chính xác. Vì vậy, kết quả năm 2025 không thể dùng để kết luận về mọi công cụ AI hiện nay.

Điểm benchmark, tức điểm trên các bộ bài kiểm tra năng lực AI, cũng có giới hạn. Khi rà soát [SWE-bench Verified](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/) và [SWE-bench Pro](https://openai.com/index/separating-signal-from-noise-coding-evaluations/), OpenAI chỉ ra các vấn đề về dữ liệu và bài kiểm thử. Làm tốt một bài sửa lỗi chưa cho biết công cụ sẽ xử lý ra sao khi yêu cầu còn mơ hồ, gặp tình huống ngoại lệ hoặc phải hỗ trợ vận hành sản phẩm lâu dài.

AI làm được một phần công việc chưa có nghĩa sẽ thay được người đang làm công việc đó. Số liệu của ILO nói về những phần việc có thể chịu tác động của AI. Anthropic cũng phân biệt giữa có sử dụng AI và AI thực sự hoàn thành việc được giao với chất lượng đạt yêu cầu. Muốn tự động hóa cả quy trình hoặc thay đổi số nhân sự cần thiết, doanh nghiệp còn phải tính chất lượng, chi phí và phần việc vẫn cần con người.

**Tốc độ hoàn thành công việc và ích lợi của sản phẩm là hai chuyện khác nhau.** Khung [SPACE](https://www.microsoft.com/en-us/research/publication/the-space-of-developer-productivity-theres-more-to-it-than-you-think/) cũng lưu ý không thể chỉ nhìn lượng công việc hoàn thành để đánh giá năng suất. Các nghiên cứu này chưa cho biết học tư duy Product có tốt hơn những hướng phát triển nghề nghiệp khác hay không. Nhưng trong công việc làm sản phẩm, ngoài chuyện làm nhanh, nhóm vẫn phải quyết định tính năng nào đáng làm. Quyết định đó cần dựa vào nhu cầu thực tế của người dùng.

> **Video liên quan.** [Build the Right Thing: Product Engineering (Part 1)](https://www.youtube.com/watch?v=_fHTqOs5wQA&t=943s) · Kent C. Dodds · AI Engineer · từ 15:43. Góc nhìn về việc chọn bài toán khi triển khai ngày càng nhanh.

</details>

---

**Ghi chú.** Bài viết có AI hỗ trợ soạn và biên tập, kèm nguồn để đối chiếu. Các tình huống minh họa là giả định; phần diễn giải là quan điểm của mình.

## Nguồn tham khảo

1. [WEF · The Future of Jobs Report 2025](https://www.weforum.org/publications/the-future-of-jobs-report-2025/).
2. [WEF · Thông cáo Future of Jobs 2025](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/).
3. [Stack Overflow · Developer Survey 2026 — AI data](https://survey.stackoverflow.co/2026/ai/data).
4. [DORA · State of AI-assisted Software Development 2025](https://dora.dev/research/2025/dora-report/).
5. [Google Cloud · Announcing the 2025 DORA Report](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report).
6. [Linear · Product Engineer — mô tả tuyển dụng](https://linear.app/careers/0c7c2e26-0a98-42cf-a47c-9a3999fb513b), đối chiếu 05/11/2026; nội dung tuyển dụng có thể thay đổi.
7. [Linear · Careers — nguyên tắc làm việc](https://linear.app/careers), đối chiếu 05/11/2026.
8. [PostHog · How to do product, as an engineer](https://posthog.com/handbook/engineering/product-engineering), handbook thực hành.
9. [Zheyuan (Kevin) Cui và các tác giả · The Effects of Generative AI on High-Skilled Work](https://www.microsoft.com/en-us/research/publication/the-effects-of-generative-ai-on-high-skilled-work-evidence-from-three-field-experiments-with-software-developers/) · [Bản Management Science, 2026](https://doi.org/10.1287/mnsc.2025.00535).
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
