# Tư duy Product ở kỹ sư: chủ động thôi đã đủ?

*Kỹ sư có thể tự rèn luyện tư duy Product từ công việc hằng ngày. Nhưng để chịu trách nhiệm cho kết quả sản phẩm, họ còn cần bối cảnh, cơ hội thực hành và quyền quyết định rõ ràng.*

Trần Ngọc Đăng Khôi · Ghi chép & suy ngẫm · 14 phút đọc · 05.11.2026

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

Cả hai nhóm đều có thể dùng ticket để chia việc. Khác biệt Cagan nêu giúp nhận ra rằng hỏi kỹ yêu cầu chưa đồng nghĩa với được chọn giải pháp. Với dashboard, kỹ sư có thể hiểu nguyên nhân gây chậm nhưng vẫn chỉ được triển khai phương án đã chốt. Vì vậy, cần phân biệt năng lực tìm hiểu vấn đề với quyền quyết định dùng hiểu biết đó để thay đổi công việc. Đây là cách vận dụng mô hình Cagan vào ví dụ, không phải yêu cầu mọi nhóm phải tổ chức giống nhau.

> Trong bài này, tư duy Product là cách làm việc bắt đầu từ vấn đề của người dùng: tìm hiểu họ đang vướng ở đâu, chọn cách giải quyết rồi kiểm tra xem cách đó có giúp được họ không.

Làm xong dashboard là bàn giao một tính năng (output). Người dùng làm báo cáo nhanh hơn mà không tăng sai sót mới là kết quả mong muốn (outcome). Muốn biết có đạt kết quả đó hay không, nhóm phải đo sau khi đưa tính năng vào sử dụng. Hoàn thành đúng yêu cầu chưa trả lời được điều này.

<a id="s2"></a>

## 02 · Chưa được đổi yêu cầu, vẫn có việc để làm

Không phải kỹ sư nào cũng được tự bỏ yêu cầu làm dashboard để chọn cách khác. Nhưng ngay trong ticket đang nhận, họ vẫn có thể hỏi vì sao cần tính năng này và ai sẽ dùng nó. Đó là một việc cụ thể để bắt đầu, không cần chờ đổi chức danh.

[Drew Hoskins](https://productengineers.com/episodes/season2/how-to-become-a-product-minded-engineer-in-the-ai-era/) gợi ý tìm hiểu nhu cầu qua cuộc gọi bán hàng, trao đổi hỗ trợ, yêu cầu trên GitHub và dữ liệu sử dụng. Những nguồn này giúp kỹ sư tìm dấu hiệu để hỏi tiếp: ai gặp khó khăn, xảy ra lúc nào, đã thử xử lý ra sao. Một yêu cầu hỗ trợ đơn lẻ chưa đại diện cho toàn bộ người dùng; giá trị của nó là giúp bớt đoán khi làm rõ yêu cầu.

Với ví dụ dashboard, ticket có thể ghi rõ: “Người dùng muốn xuất báo cáo nhanh hơn; chưa rõ bước nào gây chậm.” Ghi rõ điều chưa biết giúp xác định cần hỏi thêm điều gì, thay vì mặc định việc đối chiếu dữ liệu là nguyên nhân.

Để biết bước nào gây chậm, kỹ sư có thể cùng người phụ trách quan sát người dùng làm báo cáo hoặc tham gia một buổi trao đổi. Nếu vướng mắc chính là đối chiếu số liệu, nhóm mới có cơ sở thử làm nổi bật các dòng chênh lệch.

Trước khi thử, cần ghi nhận cách người dùng đang làm, thời gian cho bước đối chiếu và số sai sót. Sau khi thay đổi, xem lại chính các kết quả ấy trong điều kiện có thể đối chiếu. Cảnh báo được bấm nhiều chưa đủ để nói báo cáo nhanh hơn; còn phải biết người dùng có bớt công đối chiếu mà không bỏ sót lỗi không. Đây là cách kiểm tra giả thuyết trong ví dụ, chưa phải kết quả đo thực tế.

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

Chẳng hạn, sửa chức năng xuất tệp có thể giảm công sức đối chiếu nhưng chưa đáp ứng cam kết hiển thị dữ liệu cho quản lý hoặc yêu cầu kiểm toán. Ví dụ này chưa cho biết có những ràng buộc ấy không, nên phải hỏi trước khi đổi giải pháp. Ý nghĩa của việc hiểu thêm nghiệp vụ nằm ở chỗ đó: đánh giá được phương án tiết kiệm code có thực sự thay được phương án đã giao hay không.

Nhóm nên thống nhất việc nào kỹ sư được tự quyết, việc nào phải bàn chung và việc nào cần người có thẩm quyền duyệt. Kỹ sư có thể tự chọn cách triển khai trong giới hạn đã thỏa thuận; đổi phạm vi tính năng thường cần PM và người thiết kế cùng bàn; đổi cam kết hợp đồng hay ngân sách cần người có thẩm quyền quyết định. Cách phân chia tùy nơi, kể cả quyết định kỹ thuật.

Làm rõ quyền hạn không có nghĩa mọi góp ý đều phải được chấp nhận. Một đề xuất vẫn phải chứng minh nó giải quyết được vấn đề và đáp ứng ràng buộc. Nhưng nếu kỹ sư bị đánh giá qua kết quả mà mọi quyết định ảnh hưởng đến kết quả đều nằm ngoài phạm vi tham gia, nhóm cần xem lại sự tương xứng giữa trách nhiệm và quyền hạn.

Kết quả kinh doanh còn phụ thuộc vào giá bán, cách phân phối, vận hành và thời điểm ra mắt. Những việc này có thể do người khác quyết định dù kỹ sư đã làm tốt phần được giao. Vì thế, khi giao thêm trách nhiệm về sản phẩm, cần nói rõ mục tiêu, những gì kỹ sư được phép thay đổi, ai cùng làm và thời gian dành cho công việc đó.

> **Video liên quan.** [Product-minded engineers in an AI-native world](https://www.youtube.com/watch?v=0Cv5763UX70&t=1925s) · The Pragmatic Engineer · từ 32:05. Trao đổi về vai trò của kỹ sư và Product Manager.

<a id="s4"></a>

## 04 · Chưa được thử, đã bị đánh giá?

Giới hạn này còn ảnh hưởng đến cách đánh giá kỹ sư. Giả sử một nhóm dành phần lớn thời gian vận hành hệ thống cũ và làm những ticket đã chốt giải pháp. Nhóm khác được tìm hiểu nhu cầu, thử ý tưởng cho sản phẩm mới. Sau một thời gian, nhóm vận hành bị nhận xét là chưa thể hiện khả năng chịu trách nhiệm về sản phẩm.

Nhận xét đó có thể đúng, nhưng thông tin hiện có chưa đủ để kết luận. Nhóm vận hành có thể thiếu năng lực, thiếu cơ hội thể hiện hoặc cả hai. Việc giao sản phẩm mới cho nhóm khác cũng có lý do hợp lý: chuyên môn phù hợp hơn, cần kịp hợp đồng hoặc phải để nhóm hiện tại tập trung giữ hệ thống ổn định.

Làm tốt công việc bảo trì cho thấy năng lực trong phần việc đó. Để nhận xét về khả năng tìm hiểu người dùng và chọn giải pháp, cần xem nhóm đã được thử những việc ấy chưa, được quyết định gì và đã làm ra sao. Nếu chưa có cơ hội thử, chưa thể kết luận họ không làm được sản phẩm mới.

Cách chia việc ảnh hưởng đến cơ hội tham gia tìm hiểu người dùng của kỹ sư. [Mô hình product trio của Teresa Torres](https://www.producttalk.org/product-trio/) đề xuất PM, người thiết kế và kỹ sư cùng tìm hiểu nhu cầu.

Trong nghiên cứu về nhóm Scrum, [Verwijs và Russo](https://arxiv.org/abs/2105.12439) xem xét hiệu quả làm việc của nhóm, bao gồm quyền quyết định và sự hỗ trợ từ người quản lý. Hai tác giả dùng khảo sát để kiểm tra mô hình nghiên cứu, với khoảng 5.000 lập trình viên trong 2.000 nhóm. [DORA](https://dora.dev/capabilities/user-centric-focus/) nhấn mạnh việc kỹ sư được đọc phản hồi và xem dữ liệu người dùng.

Product trio gợi ý một cách tạo cơ hội thực hành: kỹ sư cùng PM và người thiết kế tham gia tìm hiểu nhu cầu, thay vì chỉ nhận kết quả sau khi đã chọn giải pháp. Nghiên cứu Scrum và tài liệu DORA bổ sung góc nhìn về điều kiện làm việc của nhóm. Chúng không chứng minh rằng cứ trao quyền là một cá nhân sẽ làm tốt.

Khi đánh giá người kỹ sư trong ví dụ, cần tách hai điều: họ đã có cơ hội làm chưa, và khi có cơ hội thì đã làm ra sao. Cơ hội có thể được ghi nhận qua phần việc và quyết định được giao; năng lực phải nhìn qua cách đặt câu hỏi, cân nhắc phương án và xem lại kết quả. Cách tách này tránh cả hai kết luận vội: quy mọi hạn chế cho cá nhân hoặc quy mọi kết quả chưa tốt cho tổ chức.

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

Lần nhận việc tiếp theo có thể dùng để làm rõ một thỏa thuận nhỏ: vấn đề nào cần tìm hiểu, kỹ sư được tham gia từ đâu, ai cung cấp thông tin và lúc nào cả nhóm xem lại kết quả. Từ lần thực hành đó, nhóm có thêm căn cứ để bàn kỹ sư cần học gì và cần được giao thêm phạm vi nào. Trách nhiệm lớn hơn nên đi cùng những cơ hội cụ thể để thể hiện và học, thay vì chỉ thêm một kỳ vọng vào nhận xét cuối kỳ.

**Kỹ sư có thể chủ động rèn luyện tư duy Product từ công việc hằng ngày. Để làm tốt hơn và được đánh giá công bằng, họ còn cần hiểu mục tiêu sản phẩm, có người phối hợp và biết rõ phạm vi được quyết định.**

**Đọc tiếp:** [AI Product Handbook · Product Thinking & Lifecycle](https://koitran14.vercel.app/blog/ai-product-handbook/01)



---

**Ghi chú.** Bài viết có AI hỗ trợ soạn và biên tập, kèm nguồn để đối chiếu. Các tình huống minh họa là giả định; phần diễn giải là quan điểm của mình.

## Nguồn tham khảo

1. [Marty Cagan · Product vs. Feature Teams, 2019](https://www.svpg.com/product-vs-feature-teams/).
2. [Marty Cagan · The Four Big Risks, 2017](https://www.svpg.com/four-big-risks/).
3. [Teresa Torres · Continuous Discovery](https://www.producttalk.org/glossary-discovery-continuous-discovery/).
4. [Teresa Torres · The Product Trio](https://www.producttalk.org/product-trio/).
5. [Drew Hoskins · How to Become a Product-Minded Engineer in the AI Era, 09/2026](https://productengineers.com/episodes/season2/how-to-become-a-product-minded-engineer-in-the-ai-era/).
6. [Verwijs và Russo · A Theory of Scrum Team Effectiveness](https://arxiv.org/abs/2105.12439), bản sửa 2022; nghiên cứu ở cấp team.
7. [DORA · User-centric focus](https://dora.dev/capabilities/user-centric-focus/).
8. [DORA · Software delivery performance metrics](https://dora.dev/guides/dora-metrics/).
