# Hướng dẫn biến app thành ứng dụng cài được (PWA)

App đã được chuẩn bị đầy đủ để cài như một ứng dụng thật trên điện thoại — **không cần** qua App Store / Google Play. Gồm 6 file, phải giữ chung một thư mục:

- `ielts-vocab-band-4-5.html` — app chính
- `manifest.json` — thông tin app (tên, icon, màu)
- `sw.js` — cho phép chạy offline
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` — icon app

## Vì sao cần "host" (đưa lên mạng)?

Nếu chỉ mở file HTML trực tiếp trên máy (đường dẫn kiểu `file:///...`), trình duyệt sẽ **chặn** service worker và một phần tính năng cài đặt vì lý do bảo mật. Cần một địa chỉ `https://` thật — nhưng không cần mua server, có vài lựa chọn **miễn phí**:

### Cách nhanh nhất: GitHub Pages (miễn phí, ~5 phút)
1. Tạo tài khoản tại github.com (nếu chưa có).
2. Tạo repository mới, đặt tên bất kỳ (vd `tu-vung-ielts`), để chế độ Public.
3. Bấm "uploading an existing file", kéo thả cả 6 file trên vào, bấm Commit.
4. Vào Settings → Pages → chọn nhánh `main`, bấm Save.
5. Sau 1–2 phút, GitHub cấp cho anh một địa chỉ dạng:
   `https://<tên-tài-khoản>.github.io/tu-vung-ielts/ielts-vocab-band-4-5.html`
6. Mở địa chỉ đó trên điện thoại (Chrome/Safari) → xem hướng dẫn cài bên dưới.

### Cách khác: Netlify Drop (không cần tài khoản)
1. Vào app.netlify.com/drop
2. Kéo cả thư mục chứa 6 file vào trang đó
3. Netlify tự cấp một địa chỉ `https://...netlify.app` dùng ngay

## Cài vào điện thoại sau khi có địa chỉ https://

**Android (Chrome):**
1. Mở địa chỉ app bằng Chrome
2. Chrome tự hiện banner "Thêm vào Màn hình chính" (hoặc vào menu ⋮ → "Cài đặt ứng dụng")
3. App xuất hiện như app thật, có icon riêng, mở toàn màn hình, dùng offline được

**iPhone (Safari):**
1. Mở địa chỉ app bằng Safari (không dùng Chrome trên iOS vì Apple giới hạn)
2. Bấm nút Chia sẻ (hình vuông có mũi tên) → "Thêm vào MH chính"
3. App xuất hiện như app thật với icon riêng

## Lưu ý

- Mỗi lần anh sửa nội dung app (thêm từ, đổi tính năng...), chỉ cần upload lại đúng file đó lên GitHub/Netlify là app trên điện thoại tự cập nhật ở lần mở tiếp theo.
- Đây là cách nhanh nhất để có "app thật" dùng ngay. Muốn lên chính thức App Store/Google Play (có trang riêng, tìm thấy khi search trong store) thì cần thêm bước đóng gói bằng Capacitor + tài khoản Developer — nói với em khi anh sẵn sàng làm bước đó.
