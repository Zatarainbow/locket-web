# Locket Web VIP — 100% Standalone Static SPA (Zero Backend Needed)

Phiên bản web client thuần tĩnh (Static Single Page Application) cho **Locket Camera (Widget)**.
Toàn bộ logic kết nối trực tiếp từ trình duyệt tới máy chủ **Locket Cloud API**, **Firebase Auth/Storage**, và **Cloudflare CDN** (`https://cdn.locketcamera.com`).

---

## ⚡️ Kiến trúc Zero-Server (Serverless)

- **Không cần Python / Node.js server chạy nền**: Ứng dụng chạy hoàn toàn phía client (trình duyệt).
- **100% Direct CDN Streaming**: Mọi hình ảnh và video tải trực tiếp từ edge CDN của Locket với độ trễ 0ms.
- **Client-Side Auth & Storage**: Đăng nhập trực tiếp qua Firebase Auth REST API (`identitytoolkit.googleapis.com`), lưu trữ token bảo mật trên `localStorage` và tự động refresh ngầm.
- **Direct Upload Protocol**: Tải ảnh (`image/webp`) và video (`video/mp4`) trực tiếp lên Google Firebase Storage (`locket-img` / `locket-video`) qua giao thức Resumable Upload từ trình duyệt.
- **Locket Gold VIP**: Mở khóa đăng video dài từ 10s đến 30 phút, đính kèm huy hiệu `💛 Locket Gold` gradient và biểu tượng vương miện `👑`.

---

## 🚀 Hướng dẫn Deploy lên Web (Miễn phí 100%)

Thư mục này là một trang web tĩnh hoàn chỉnh. Bạn có thể deploy lên bất kỳ dịch vụ hosting tĩnh nào chỉ trong 30 giây:

### Cách 1: Deploy lên Vercel (Khuyên dùng — 1 Click)
1. Đăng nhập [Vercel](https://vercel.com).
2. Kéo thả thư mục `locket-web` vào dashboard Vercel (hoặc đẩy lên GitHub rồi import vào Vercel).
3. Vercel tự động nhận diện file `vercel.json` và cấp cho bạn link `https://tên-dự-án.vercel.app` ngay lập tức!

### Cách 2: Deploy lên GitHub Pages
1. Tạo một GitHub Repository mới.
2. Push toàn bộ nội dung thư mục `locket-web` lên repository:
   ```bash
   git init
   git add .
   git commit -m "Deploy Locket Web Static Client"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
3. Vào **Settings** > **Pages** > Chọn Branch `main` và thư mục `/ (root)` > Bấm **Save**.
4. Trang web sẽ trực tiếp hoạt động tại `https://your-username.github.io/your-repo/`.

### Cách 3: Deploy lên Cloudflare Pages
1. Đăng nhập [Cloudflare Dashboard](https://dash.cloudflare.com) > **Workers & Pages** > **Create application** > **Pages**.
2. Chọn **Upload assets** (hoặc liên kết GitHub).
3. Tải lên thư mục `locket-web` > Bấm **Deploy site**.

---

## 💻 Chạy thử nghiệm Local (Không cần Python)

Nếu muốn xem trên máy tính:
- Dùng bất kỳ static server nào như:
  - `npx serve .`
  - Hoặc extension **Live Server** trong VS Code.
  - Hoặc `python -m http.server 8000`
- Hoặc chạy file `start.bat` có sẵn.

---

## 📁 Cấu trúc thư mục sạch (Đã lược bỏ phần thừa)

```
locket-web/
├── index.html        # Giao diện chính, Camera viewfinder, Feed, Home screen widget
├── app.js            # LocketCloud SDK trực tiếp từ browser, Video auto-play, UI controllers
├── style.css         # Stylesheet tùy biến, hiệu ứng mờ kính và hiệu ứng Locket Gold
├── assets/           # Toàn bộ icon Locket Gold VIP, font chữ, âm thanh, preset
├── vercel.json       # Cấu hình routing cho Vercel deployment
├── .gitignore        # Loại trừ các file session/cache tạm thời
└── README.md         # Tài liệu hướng dẫn deploy
```
