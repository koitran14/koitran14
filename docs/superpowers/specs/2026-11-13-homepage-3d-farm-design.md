# Homepage mode 3D: nông trại voxel 4 mùa — bản thiết kế

Ngày: 2026-11-13 · Trạng thái: chờ duyệt

## 1. Mục đích

Homepage có hai mode. Mode 1 là trang hiện tại, giữ nguyên. Mode 2 là một "wallpaper sống": một hộp cảnh 16:9 kiểu cozy isometric, có nhân vật voxel chibi là chủ trang (Khôi) sống trong một nông trại nhỏ trên đảo. Cảnh đổi theo mùa và giờ thật. Người xem chơi được vài việc nông trại nhỏ, và việc đọc, xem nội dung của trang cho họ phiếu để mở thêm đồ trong nông trại.

Lý do: biến trang cá nhân thành một nơi người xem muốn quay lại. Phần game là phần thưởng kéo người xem đọc blog và xem dự án, không phải một trò chơi tách rời.

## 2. Mục tiêu, ngoài phạm vi, điều phải tránh

**Mục tiêu**
- Bật mode 3D từ homepage, phủ kín cửa sổ, quay lại mode thường bằng một nút.
- Cảnh tự đổi theo mùa (theo ngày) và theo giờ (theo đồng hồ máy người xem).
- Nhân vật tự hoạt động trong cảnh, phản ứng khi được bấm.
- Trò chơi nhỏ: hái rau, nhặt trứng, ấp trứng nở gà con.
- Phiếu từ việc đọc bài blog, xem dự án, quay lại mỗi ngày; giữ chuỗi ngày (streak).
- Dùng phiếu mở asset mới và mở rộng đảo.
- Chơi thử không cần đăng nhập; đăng nhập Google để lưu và đồng bộ.

**Ngoài phạm vi (bản này)**
- Nhiều người chơi, xem nông trại người khác, bảng xếp hạng.
- Mua bán bằng tiền thật.
- Âm thanh, nhạc nền (có thể thêm sau).
- Ứng dụng di động riêng.

**Phải tránh (dù chạy đúng vẫn coi là hỏng)**
- Mode 3D làm chậm hay che homepage thường. Mode 1 vẫn là mặc định, mode 3D tải lười khi người xem bật.
- Cảm giác "phải cày": không giới hạn năng lượng, không phạt khi bỏ lâu, rau chín thì nằm chờ.
- Ai cũng tự cộng phiếu được từ trình duyệt.
- Nhìn rối: quá nhiều ô vuông nhỏ, chi tiết li ti. Phong cách đã chốt là mảng phẳng lớn, rõ nét (xem mục 4).

## 3. Ràng buộc

- Next.js 14 (App Router), React 18, Tailwind, Chakra; deploy Vercel.
- Đã cài sẵn `three@0.175`, `@react-three/fiber@8`, `@react-three/rapier`. Lanyard card ở hero đang dùng R3F.
- Supabase đã dùng cho lượt xem (`lib/views.ts`, gọi PostgREST trực tiếp bằng anon key) và đăng ký nhận bài (`lib/blog-alerts.ts`, bảng có RLS, secret key ở server). Chưa có hệ thống đăng nhập.
- Repo có hook chặn sửa trên `main`: làm việc trên branch hoặc worktree riêng.
- Phải chạy ổn trên laptop phổ thông và điện thoại; tôn trọng `prefers-reduced-motion`.

## 4. Những gì đã chốt

### 4.1 Nhân vật
- Voxel chibi: đầu khoảng 55% chiều cao, mặt phẳng ở giữa để vẽ mắt, miệng; tóc đen ánh tím có mái dày răng cưa và vài lọn rối trên đỉnh; má hồng; hai chân tách rời, giày to.
- Nét riêng từ ảnh thật: mắt cười híp ^^, cười rộng lộ răng, lắc tay bạc, sơ mi tím lavender.
  - Dáng che nắng trên trán đã bỏ vì nhìn kỳ ở cỡ nhỏ. Thay bằng dáng giơ tay vẫy chào (chủ trang duyệt).
- 4 bộ theo mùa, chủ đề nông trại (chủ trang duyệt):
  - Xuân: sơ mi tím, yếm jean, kẹp hoa, xách bình tưới, tay kia vẫy chào.
  - Hạ: nón lá, sơ mi xanh ngọc ngắn tay, quần short, dép, xách giỏ cà chua.
  - Thu: cardigan nâu, khăn vàng mù tạt, boots, kẹp lá phong, ôm bí ngô.
  - Đông: áo phao, khăn và mũ len đỏ, găng, boots viền lông, cầm xẻng xúc tuyết.
- Khớp: mỗi file `khoi-<mùa>.glb` có một node gốc `khoi` với 6 node con `head`, `body`, `armL`, `armR`, `legL`, `legR`.
  - Gốc toạ độ của mỗi phần đặt ở khớp, tính bằng voxel: hông `y=8`, vai `y=14.5`, cổ `y=16`.
  - Đồ cầm một tay đi theo tay đó. Bí ngô ôm hai tay gắn vào thân. Tay vẫy của Xuân là `armR`.
  - Mỗi file nặng khoảng 1–2 MB, vì phần bo cạnh đã áp thẳng vào mesh.
- Phong cách dựng: các mặt cùng màu gộp thành mảng phẳng, chỉ bo nhẹ cạnh thật (bevel theo góc), không lưới từng khối, không viền nét, không họa tiết caro hay sọc.
- Bản thử đã có: script sinh voxel `figures.mjs` và script Blender `blender_build.py` (đang ở thư mục tạm của phiên, chuyển vào repo khi bắt đầu làm). Mỗi nhân vật xuất `.glb` khoảng 0.4 MB.

### 4.2 Cảnh
- Hộp cảnh 16:9 phủ kín cửa sổ: một đảo nông trại hình chữ nhật nằm ngang (khoảng 2:1) đặt trên nền màu trơn, nhìn chéo từ trên xuống, camera xoay khoảng 25° để cạnh dài gần nằm ngang. Phép chiếu song song (orthographic).
- Đảo ghép 4 kiểu đã chọn:
  - Hai tầng: tầng trên phía sau có nhà kho đỏ, cây táo, ghế gỗ; tầng dưới phía trước có luống rau và bù nhìn, đống rơm, chuồng gà; bậc thang gỗ nối hai tầng.
  - Suối: bắt nguồn từ hốc đá trên tầng trên, đổ một bậc xuống, chảy qua giữa tầng dưới, có cầu gỗ.
  - Thác: suối đổ ra mép trước thành thác.
  - Mép sứt mẻ, vài khối đá bay quanh đảo.
- Đảo gốc 32 × 24 ô (6 voxel một ô), vừa khít khung 16:9 ở góc camera trên. Tầng trên chiếm 10 hàng ô phía sau, nhà kho đặt giữa nên có chỗ trống ở cả phía sau lẫn phía trước nhà. Tầng dưới chiếm 14 hàng phía trước. Chủ trang chốt sau khi thấy bản 32 × 14 và 32 × 20 còn chật.
- Hai đầu đảo có hai khu mở rộng, mỗi khu khoảng 12 ô, ban đầu bị mây voxel che và mở bằng phiếu. Khi đã mở, người xem kéo ngang để đi dọc đảo.
- Mùa:
  - Xuân: mầm non, cánh hoa rơi, suối chảy mạnh.
  - Hạ: cây xanh đậm, cà chua và bắp, nắng gắt.
  - Thu: cây cam đỏ, bí ngô, lá rơi, lá trôi trên suối.
  - Đông: tuyết phủ, cây trụi, suối và thác đóng băng.
- Mùa và giờ luôn theo lịch và đồng hồ thật (yêu cầu của chủ trang). Không có nút tự đổi mùa.
  - Mùa theo tháng: Xuân 2–4, Hạ 5–7, Thu 8–10, Đông 11–1.
  - Giờ theo đồng hồ máy người xem, chia sáng, trưa, chiều, tối. Ánh sáng và màu nền chuyển dần theo giờ; buổi tối cửa sổ nhà kho sáng đèn.
- Một ô lịch nhỏ ở góc màn hình hiện ngày, tháng, mùa và giờ hiện tại, kiểu đồng hồ trong game nông trại.
- Lịch và giờ quyết định cả luật chơi: loại rau nào trồng được theo mùa thật, rau chín và trứng nở theo số giờ thật.

### 4.3 Nhân vật hoạt động
- Tự đi dạo theo lối đi và bậc thang, làm việc theo mùa: tưới cây (Xuân), hái rau (Hạ), ôm bí ngô về kho (Thu), đắp người tuyết (Đông).
- Bấm vào nhân vật thì nó dừng lại, quay ra và vẫy tay, mắt đổi biểu cảm.

### 4.4 Trò chơi và phiếu
- Hai nguồn tiến triển (yêu cầu của chủ trang):
  - Đọc, xem nội dung trên trang thì nhận phiếu.
  - Chơi trò nhỏ trong cảnh: hái rau, nhặt trứng đi ấp.
- Phiếu (đề xuất, chủ trang có thể chỉnh số):
  - đọc hết một bài blog: +3
  - xem một trang dự án hoặc một trang kinh nghiệm: +2
  - quay lại vào một ngày mới: +1
  - mỗi bài hoặc trang chỉ tính một lần cho mỗi tài khoản
- Streak: số ngày liên tiếp có ghé. Ngày tính theo giờ Việt Nam (Asia/Ho_Chi_Minh). Mốc streak (3, 7, 30 ngày) tặng thêm phiếu.
- Trò chơi nhỏ:
  - Rau chín theo thời gian thật, bấm vào để hái, rau vào giỏ.
  - Gà đẻ trứng; nhặt trứng bỏ vào ổ ấp, khoảng 24 giờ sau nở gà con, gà con lớn thành gà đẻ.
  - Không có giới hạn năng lượng hay hình phạt.
- **Rau và trứng đổi ra phiếu** (chủ trang chốt). Chỉ có một loại tiền là phiếu.
  - Tỉ giá đề xuất: 10 rau hoặc 3 trứng đổi được 1 phiếu.
  - Phiếu đổi từ nông sản tối đa 5 phiếu một ngày, để việc đọc bài vẫn là cách chính kiếm phiếu.
  - Việc đổi do server làm. Server tính lại số rau và trứng có thể có theo giờ thật trước khi cộng phiếu.
  - Nông sản từ lúc chơi thử được gộp vào tài khoản khi đăng nhập (giới hạn theo thời gian thật, xem 5b), sau đó mới đổi ra phiếu được.
- Dùng phiếu để mở (giá đề xuất):

  | Món | Giá |
  |---|---|
  | Hàng rào hoa | 5 |
  | Tổ ong | 10 |
  | Cối xay gió | 12 |
  | Bò sữa | 15 |
  | Nhà kính (trồng rau trái mùa) | 20 |
  | Khu đảo bên trái: vườn cây ăn quả | 25 |
  | Khu đảo bên phải: đồng cỏ và ao cá | 30 |

  Hai khu đảo mở rộng nằm ở hai đầu đảo chính, ban đầu bị sương che.

### 4.4b Cây, hoa, pet (chủ trang yêu cầu; danh sách cụ thể là đề xuất)

**Rau theo mùa thật**

| Mùa | Rau và thời gian chín |
|---|---|
| Xuân | cà rốt 4 giờ, củ cải 6 giờ, dâu tây 12 giờ |
| Hạ | cà chua 4 giờ, bắp 8 giờ, dưa hấu 24 giờ |
| Thu | bí ngô 12 giờ, khoai lang 8 giờ, cải bắp 6 giờ |
| Đông | ngoài trời chỉ có cải bó xôi; muốn trồng loại khác phải có nhà kính |

Rau chín càng lâu thì ra càng nhiều rau.

**Cây ăn quả:** mở bằng phiếu, mỗi cây ra quả theo mùa.
- Táo: có sẵn, ra quả mùa thu.
- Đào: nở hoa mùa xuân.
- Lê: ra quả mùa hạ.
- Cam: ra quả mùa đông.

**Hoa:** đồ trang trí, nở theo mùa thật.
- Tulip (xuân), hướng dương (hạ), cúc (thu), hoa trà (đông).
- Oải hương tím: hợp với áo sơ mi tím của nhân vật.

**Pet:** mở bằng phiếu.
- Chó shiba, mèo mướp, thỏ trắng, vịt con.
- Pet đi theo nhân vật và tự chơi quanh nông trại; bấm vào thì pet phản ứng.
- Mỗi ngày vuốt ve pet được tính vào streak.

Giá mở khoá cho cây, hoa và pet do mình đặt theo cùng thang với bảng ở mục 4.4.

### 4.4c Tự trang trí đảo (chủ trang chốt)

Người xem tự đặt luống rau, hoa, cây ăn quả và đồ trang trí lên đảo.
- Mặt đảo chia thành lưới ô. Mỗi món chiếm một số ô cố định, ví dụ luống rau 2×1, cây 2×2.
- Có chế độ chỉnh sửa: chọn món trong kho đồ, đặt vào ô trống, xoay, nhấc lên hoặc cất lại vào kho.
- Những chỗ không đặt được: nhà kho, suối, cầu, bậc thang và lối đi chính, để đảo không bao giờ bị chặn đường.
- Vị trí từng món lưu vào tài khoản. Lúc chơi thử thì lưu trong trình duyệt.
- Đảo mặc định do chủ trang sắp sẵn. Người xem mới vào luôn thấy một bố cục đẹp.
- Hàng rào là một món trang trí như mọi món khác (chủ trang xác nhận). Bố cục mặc định chỉ có rào quanh cánh đồng, không có chuồng quây gà.

**Gà thả vườn (chủ trang yêu cầu)**
- Gà tự đi lại khắp các ô cỏ và lối đi trên cả hai tầng; đi giữa hai tầng qua bậc thang.
- Gà không đi vào suối, không vào luống rau (để không phá rau), không đi xuyên qua hàng rào. Rào người xem tự đặt có thể dùng để quây gà nếu muốn.
- Ban đêm (theo giờ thật) gà về chuồng ngủ. Ban ngày gà đẻ trứng ở chỗ bất kỳ gần chuồng, người xem đi nhặt.
- Gà con đi theo gà mẹ.

### 4.5 Đăng nhập và lưu tiến trình
- Chọn: Supabase Auth với nhà cung cấp Google, kèm chế độ chơi thử.
- Chơi thử: vào là chơi ngay; tiến trình lưu tạm trong trình duyệt.
- Khi người xem đăng nhập Google, tiến trình tạm được gộp vào tài khoản.
- Phiếu từ việc đọc bài và streak chỉ có giá trị khi đã đăng nhập, vì server phải ghi nhận (xem 4.6).
- Dữ liệu nằm ở Supabase, mỗi bảng có RLS: người dùng chỉ đọc và ghi được dữ liệu của chính mình.

### 4.6 Chống tự cộng phiếu
- Phiếu do server ghi vào một sổ cái (ledger). Mỗi dòng có khoá duy nhất `(user_id, nguồn, mã bài)`, nên một bài không bao giờ được tính hai lần.
- Đọc bài: khi mở trang, server cấp một mã đọc có ký tên và thời điểm bắt đầu. Trình duyệt chỉ đổi được mã này lấy phiếu sau một thời gian tối thiểu, tỉ lệ theo độ dài bài, và khi đã cuộn gần hết bài.
- Kết quả trò chơi nhỏ (rau, trứng) được tính lại ở server theo thời gian thật, không tin con số do trình duyệt gửi lên.

## 5. Các cách đã cân nhắc

**Đăng nhập và lưu tiến trình**
- **A. Supabase Auth với Google (đã chọn).** Đăng nhập và dữ liệu cùng nằm ở một chỗ, RLS lo phần quyền truy cập, khớp với Supabase trang đang dùng. Phải thêm thư viện `@supabase/ssr` và `@supabase/supabase-js`, cấu hình Google OAuth.
- **B. NextAuth với Google, dữ liệu ở Supabase.** Phải chạy hai hệ thống và tự viết toàn bộ phần kiểm quyền. Nhiều việc hơn A mà không có lợi ích thêm.
- **C. Cho chơi thử trước, đăng nhập sau (đã chọn, đi kèm A).** Không bắt khách xem portfolio đăng nhập trước khi kịp thấy cảnh.

**Phong cách nhân vật (đã thử qua nhiều bản)**
- Voxel khối to và thô: bị chê là thô.
- Voxel mịn có rãnh từng khối: bị chê là rối, nhiều ô vuông.
- Chibi toon có mặt vẽ 2D: bị chê là giống art của game khác.
- **Đã chốt:** voxel chibi, mảng phẳng gộp màu, bo cạnh nhẹ.

**Bố cục cảnh**
- Sàn phủ kín khung nhìn chính diện: giống bản đồ.
- Đảo hình tự nhiên: không đúng ý "chữ nhật ngang".
- **Đã chốt:** đảo chữ nhật ngang ghép 4 kiểu (hai tầng, suối, thác, mép vỡ có đá bay).

**Cách đưa asset lên web**
- **(i) Mỗi asset một file `.glb` xuất từ Blender**, đã gộp mặt cùng màu (khoảng 0.4 MB một nhân vật), tải bằng `GLTFLoader` của three.
- **(ii) Gửi dữ liệu voxel dạng JSON, dựng mesh ngay trên trình duyệt.**
- **Đề xuất (i):** giữ đúng ngoại hình đã duyệt trong Blender, không phải viết lại phần gộp mặt cho trình duyệt.

## 5b. Các quyết định thêm sau khi reviewer đọc thử

- **Asset:** mọi asset (đảo, nhà kho, cây, rau, gà, đồ theo mùa, các món mở khoá) dựng bằng cùng một quy trình: script sinh voxel → Blender gộp mặt và bo cạnh → xuất `.glb`.
  - Script dựng đưa vào repo trong `tools/voxel/`. File `.glb` đã xuất cũng commit vào `public/models/`, nên muốn build web thì không cần cài Blender.
  - Script thử hiện có ở thư mục tạm, cần chép vào repo khi bắt đầu.
  - Lúc mở mode 3D, chỉ tải đảo của mùa hiện tại và nhân vật. Mỗi món mở khoá chỉ tải khi người xem đã sở hữu nó.
- **Gộp tiến trình chơi thử:** khi người xem đăng nhập, server nhận tiến trình chơi thử nhưng giới hạn trong mức hợp lý theo thời gian. Không thể có nhiều rau hay trứng hơn số mà thời gian chơi thực tế tạo ra được.
  - Vì vậy, khi chơi thử, trình duyệt lưu nhật ký hành động có kèm thời điểm, không chỉ lưu trạng thái cuối.
  - Chơi thử không bao giờ sinh ra phiếu.
- **Không có nút đổi mùa** (chủ trang chốt). Cả hình ảnh lẫn luật chơi đều theo ngày thật, nên server tính lại được.
  - Luật chơi tính theo giờ server, giờ Việt Nam.
  - Hình ảnh (ánh sáng, giờ trên ô lịch) theo đồng hồ máy người xem.
- **Màn hình dọc (điện thoại):** đảo co lại vừa chiều ngang, phần trống phía trên và dưới phủ bằng màu nền của cảnh.
  - Kéo ngang để đi dọc đảo khi đảo đã mở rộng.
  - Mọi vật bấm được có vùng chạm tối thiểu 44 px.

## 6. Chia giai đoạn

Mỗi giai đoạn ra được một bản dùng được rồi mới làm giai đoạn sau.

1. **Cảnh sống:** nút bật mode 3D, đảo, 4 mùa, giờ trong ngày, nhân vật đi lại và vẫy tay khi bấm. Không có đăng nhập.
   - Xong khi: bật và tắt mode 3D chạy mượt; đổi mùa và giờ đúng; không làm chậm homepage thường.
2. **Trò chơi nhỏ:** hái rau, nhặt và ấp trứng; tiến trình lưu trong trình duyệt.
   - Xong khi: một vòng hái rau và một vòng ấp trứng chạy hết từ đầu tới cuối, đóng tab mở lại không mất tiến trình.
3. **Tài khoản và phiếu:** đăng nhập Google, gộp tiến trình chơi thử vào tài khoản, sổ cái phiếu, mã đọc bài, streak, mở asset và mở rộng đảo.
   - Xong khi: đọc một bài nhận đúng 3 phiếu một lần duy nhất; streak đúng qua mốc nửa đêm giờ Việt Nam; mở được ít nhất một asset và một khu đảo.

4. **Trang trí và mở rộng nội dung:** lưới ô, chế độ chỉnh sửa, kho đồ; đủ bộ rau theo mùa, cây ăn quả, hoa, pet.
   - Xong khi: đặt, xoay, cất được một món; đăng nhập trên máy khác vẫn thấy đúng bố cục; pet đi theo nhân vật.

Giai đoạn 1–3 chỉ dùng chỗ đặt cố định với một vài loại rau, để có bản chạy được sớm. Phần trang trí tự do là giai đoạn 4.

## 7. Để người làm tự quyết

- Cấu trúc thư mục, tên component, cách tổ chức state (zustand đã có sẵn).
- Cách animate nhân vật (tách khớp tay chân trong Blender, hoặc animate theo từng bộ phận).
- Cách chuyển màu giữa các mùa và giữa các giờ.
- Chi tiết bảng Supabase và migration, miễn là đúng mục 4.5 và 4.6.
- Chọn hiệu ứng hạt (cánh hoa, lá, tuyết) và số lượng hạt theo hiệu năng.

## 8. Các quyết định do mình (Claude) đưa ra, cần chủ trang xem lại

- Ranh giới các mùa theo tháng (mục 4.2).
- Số phiếu cho từng việc, các mốc streak (mục 4.4).
- Tỉ giá đổi nông sản, giới hạn 5 phiếu một ngày, bảng giá các món mở khoá, nội dung hai khu đảo mở rộng (mục 4.4).
- Quy trình asset, gộp tiến trình chơi thử, cách hiển thị trên điện thoại dọc (mục 5b).
- Danh sách rau, cây, hoa, pet và thời gian chín (mục 4.4b); pet được tính vào streak.
- Trang trí tự do để sang giai đoạn 4; giai đoạn 1–3 dùng chỗ đặt cố định.
- Thời gian ấp trứng 24 giờ.
- Ngày của streak tính theo giờ Việt Nam.
- Chơi thử thì có trò chơi nhỏ nhưng không sinh phiếu (kể cả từ việc đọc bài) và không có streak.
- Đưa asset lên web bằng `.glb` (mục 5).
