# Cài Supabase cho lưu nông trại

Làm trong Supabase Dashboard, đúng project trang đang dùng để đếm lượt xem
(Project Settings → Data API: URL trùng `SUPABASE_URL` trong `.env.local`).

## 1. Tạo bảng
- **SQL Editor → + New query**, dán toàn bộ `supabase/farm-saves.sql`, bấm **Run**.
- Thêm một query nữa với `supabase/farm-events.sql` (nhật ký sử dụng), bấm **Run**. Cuối file có sẵn các câu truy vấn để xem số người chơi, lượt mở, việc làm, món mua.
- Kiểm tra: **Table Editor** có bảng `farm_saves` và `farm_events`, cả hai "RLS enabled".

## 2. Đăng nhập bằng email
- Người chơi phải nhập email và mã (hoặc bấm nút trong thư) mới vào được nông trại; lần đầu là một nông trại trống.
- **Authentication → Sign In / Providers**, mục User Signups: **tắt** **Allow anonymous sign-ins** (game không còn dùng tài khoản khách).
- Kiểm tra **Allow new users to sign up** và **Email** đang bật. **Save changes**.
- Bấm vào dòng **Email**: **Email OTP Length**: 6 đến 10 đều được (game nhận cả), 6 dễ gõ nhất, **Email OTP Expiration = 3600**. **Save**.

## 3. Địa chỉ trang
- **Authentication → URL Configuration**:
  - **Site URL**: `https://koitran14.vercel.app`
  - **Redirect URLs**, bấm **Add URL** cho từng dòng:
    - `https://koitran14.vercel.app`
    - `http://localhost:3011`
  - Nút trong email quay về đúng trang người chơi đang dùng; địa chỉ không có trong danh sách sẽ bị đưa về Site URL.

## 4. Mẫu email
**Authentication → Emails → Templates**. Với mỗi mẫu: điền Subject, xoá hết Body, dán nội dung file, bấm **Save**.

| Mẫu | Subject | Body |
|---|---|---|
| **Confirm signup** (email mới, lần đầu vào) | `Your new farm: {{ .Token }}` | `supabase/email-confirm-signup.html` |
| **Magic Link** (người chơi quay lại) | `Your farm sign-in code: {{ .Token }}` | `supabase/email-magic-link.html` |

Mẫu **Change Email Address** không còn dùng.

Mỗi email có:
- nút **Open my farm**: bấm là mở nông trại và đăng nhập luôn, trên bất kỳ máy nào;
- mã số: chạm một lần là chọn cả mã để copy; trong game có nút **Paste** và tự xác nhận khi dán cả mã.

Email không chạy được JavaScript nên không có nút copy thật; nút mở nông trại thay cho việc copy.

## 5. SMTP riêng (nên làm)
- **Authentication → Emails → SMTP Settings**, bật **Enable Custom SMTP**:
  - Sender email: địa chỉ trong `EMAIL_FROM`; Sender name: `Khôi's farm`
  - Host / Port / Username / Password: `EMAIL_HOST` / `EMAIL_PORT` / `EMAIL_USER` / `EMAIL_PASSWORD`

## 6. Giới hạn (nên làm)
- **Authentication → Rate Limits**: Emails sent khoảng 30/giờ (cần SMTP riêng).

## 7. Máy local
```bash
cp "D:/Main Disk/Personal/koitran14/.env.local" "D:/Main Disk/Personal/koitran14/.claude/worktrees/feat+homepage-3d-farm/.env.local"
```
Rồi tắt và chạy lại dev server cổng 3011. Vercel không cần làm gì thêm.

## Kiểm tra
1. Mở nông trại khi chưa đăng nhập: chỉ thấy khung nhập email.
2. Nhập email mới, nhập mã: vào một nông trại trống; bảng `farm_saves` có thêm một dòng.
3. Mở trình duyệt khác, nhập cùng email, bấm **Open my farm** trong thư: nông trại giống hệt.
4. **Table Editor → farm_events**: có các dòng `sign_in`, `farm_open`, `job`...
