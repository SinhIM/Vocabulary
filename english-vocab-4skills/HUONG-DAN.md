# Sổ Từ Mỗi Ngày — hướng dẫn dùng

App tự học từ vựng cho 2 con: **10 từ/ngày**, học đủ **3 ngày thì kiểm tra** 4 kỹ năng (nghe, nói, đọc, viết) trên 30 từ vừa học, rồi **gửi báo cáo về Telegram của bố mẹ**.

- 1 file duy nhất: `index.html` (không cần cài gì, không cần internet trừ lúc gửi Telegram).
- Tiến độ lưu trong máy/điện thoại của từng con (localStorage) — mỗi điện thoại là một tiến độ riêng.
- Bộ từ: **Movers (A1) 1.344 từ = 134 ngày** · **B1 (PET) 889 từ = 88 ngày** — tổng **2.233 từ**. Nguồn: danh sách Oxford 3000 phân theo CEFR (A1+A2 cho hồ sơ Movers, B1 cho hồ sơ B1), cộng bộ từ theo chủ đề kiểu đề Cambridge. Nghĩa Việt và câu ví dụ do em soạn, đã kiểm tự động 100%.

## 1. Link cho 2 con (đã phát hành xong)

### 👉 https://sinhim.github.io/Vocabulary/english-vocab-4skills/

Đó là link gửi cho hai con. Trên điện thoại con: mở link → bấm **Chia sẻ → Thêm vào màn hình chính** để thành icon như một app thật.

App nằm trong repo **SinhIM/Vocabulary** (public), thư mục `english-vocab-4skills/`. App IELTS cũ ở `https://sinhim.github.io/Vocabulary/` vẫn chạy bình thường, không bị ảnh hưởng.

**Khi nào cần dùng link này chứ không phải bản demo:** micro (kỹ năng Nói) và việc gửi Telegram chỉ chạy trên trang HTTPS thật. Bản demo `https://claude.ai/artifact/8bF92FdtG1knXD9Znm99FJ` chỉ để xem nhanh giao diện — trong khung demo micro và Telegram bị chặn.

### Sửa app rồi đưa bản mới lên

Sửa file trong `C:\Agent_company\app-tu-vung-con` (hoặc nhờ Claude sửa), rồi **bấm đúp vào `dua-len-github.cmd`** trong thư mục đó. Script sẽ: kiểm bộ từ → nếu có lỗi thì dừng và báo → nếu sạch thì đưa lên GitHub. Đợi khoảng 1 phút rồi tải lại trang trên điện thoại.

**Tiến độ học của con không bị mất khi cập nhật app** — tiến độ nằm trong bộ nhớ trình duyệt của điện thoại, không nằm trong file.

## 2. Cài bot Telegram để nhận báo cáo

1. Trong Telegram, chat với **@BotFather** → `/newbot` → đặt tên → BotFather trả về **token** (dạng `8123456789:AAH...`).
   *Anh đã có bot ở `C:\Agent_company\telegram-bot-sinh` — dùng lại token đó cũng được.*
2. Bố mẹ nhắn một tin bất kỳ cho bot (để bot được phép gửi lại).
3. Mở trên trình duyệt: `https://api.telegram.org/bot<TOKEN>/getUpdates` → tìm `"chat":{"id":123456789` → đó là **Chat ID**.
   - Muốn cả bố và mẹ nhận: tạo một group, thêm bot vào, lấy Chat ID của group (số âm, có dấu trừ).
4. Trong app: **Cài đặt** → dán Token + Chat ID → bấm **Gửi tin thử** → thấy tin trong Telegram là xong → **Lưu cài đặt**.

Cài trên điện thoại của **mỗi con một lần**. Sau đó mỗi bài kiểm tra tự gửi báo cáo, không cần làm gì thêm.

## 3. Hai hồ sơ

Vào **Cài đặt** đổi tên "Con lớn" / "Con nhỏ" thành tên thật, và chọn trình độ:
- Con đang **Movers** → chọn Movers (A1)
- Con đang **B1** → chọn B1 (PET)

Đổi trình độ sẽ **xóa tiến độ** của hồ sơ đó (vì đổi luôn bộ từ), nên chọn đúng ngay từ đầu.

## 4. Con học mỗi ngày thế nào

1. Mở app → bấm **Chọn chủ đề học** ở hồ sơ của mình.
2. Màn hình chủ đề hiện **21 chủ đề** (Động vật, Ăn uống, Thể thao, Cơ thể & sức khoẻ, Trường học…). Mỗi thẻ cho thấy đã học bao nhiêu / còn bao nhiêu từ và một vạch tiến độ. Chủ đề nào học hết thì thẻ đó khoá lại.
   - Thẻ đầu tiên **Trộn tất cả chủ đề** dành cho hôm nào con không muốn chọn.
3. Bấm một chủ đề → app lấy ngay **10 từ chưa học** của chủ đề đó.
4. Mỗi từ: nghe từ → nghe câu ví dụ → đọc nghĩa → bấm **🎤** đọc to theo (app chấm ngay xem đọc có giống không).
5. Bấm **Từ tiếp theo** cho đến hết 10 từ → app chốt xong ngày đó.
6. Bỏ dở giữa đường vẫn được: lần sau mở lên có nút **Tiếp tục <tên chủ đề>** đúng chỗ đang dở, hoặc **Bỏ dở, chọn chủ đề khác**.

App tự nhớ từ nào đã học rồi, nên **không bao giờ phát lại từ cũ** — dù con nhảy chủ đề mỗi ngày.

## 5. Bài kiểm tra 3 ngày một lần

Học xong ngày 3, 6, 9… app hiện nút **Làm bài kiểm tra** (màu cam). Đề **20 câu, bốc ngẫu nhiên trong 30 từ của 3 ngày vừa học** — tức là **trộn cả 3 chủ đề con đã chọn trong 3 ngày đó** — chia đều 4 kỹ năng:

| Kỹ năng | Dạng câu hỏi |
|---|---|
| Nghe | App đọc từ (không hiện chữ) → con chọn nghĩa đúng trong 4 đáp án |
| Nói  | Hiện từ → con bấm micro đọc to → app so giọng với từ gốc (đạt từ 75% trở lên) |
| Đọc  | Câu ví dụ bị khuyết một từ → chọn từ đúng trong 4 đáp án |
| Viết | App đọc từ + hiện nghĩa tiếng Việt → con **tự gõ** từ tiếng Anh (sai một chữ là sai) |

Mỗi câu trả lời xong hiện đáp án + câu ví dụ để con học lại ngay. Mốc đạt: **80%**.

Báo cáo gửi bố mẹ có dạng:

```
📚 BÁO CÁO HỌC TỪ VỰNG
👦 Minh · B1 (PET)
🗓 03/10/2026 20:15
📖 Kiểm tra ngày 1–3 (30 từ đã học)
🏷 Chủ đề: Động vật, Ăn uống, Thể thao & sở thích

Nghe 5/5 · Nói 4/5 · Đọc 5/5 · Viết 3/5
➡️ Tổng: 17/20 = 85% — ĐẠT ✅

❌ Cần học lại:
• honest (Viết)
• measure (Viết)
• persuade (Nói)
```

Nếu mạng chặn Telegram, app hiện nguyên văn báo cáo kèm nút **Copy báo cáo** để gửi tay.

## 6. Những điểm cần biết

- **Micro**: dùng được trên Chrome Android và Safari iOS (iOS 14.5+), lần đầu phải bấm **Cho phép** micro. Máy nào không nhận giọng thì câu "Nói" chuyển sang **tự chấm** (nghe mẫu, đọc to, bấm Đọc đúng / Đọc chưa đúng) — nên với trẻ nhỏ bố mẹ ngồi cạnh chấm giúp sẽ thật hơn.
- **Giọng đọc**: dùng giọng Anh có sẵn trong điện thoại. Máy nào chưa có giọng tiếng Anh thì vào Cài đặt điện thoại tải thêm giọng (Android: Cài đặt → Ngôn ngữ → Đầu ra văn bản thành giọng nói).
- **Tiến độ không đồng bộ giữa 2 máy.** Con nào học trên điện thoại nào thì giữ nguyên máy đó. Muốn chung dữ liệu thì phải nối Google Sheets (xem mục sau).
- Xóa dữ liệu trình duyệt = **mất tiến độ**. Lịch sử kiểm tra đã gửi Telegram thì vẫn còn trong Telegram.

## 7. Nâng cấp sau này (khi cần)

1. **Nối Google Sheets** (Apps Script như app CS Wind): bố mẹ xem được tiến độ cả 2 con trên một bảng, đổi điện thoại không mất dữ liệu.
2. **Nhắc học hằng ngày**: bot Telegram ở `telegram-bot-sinh` gắn trigger 19h mỗi ngày, con nào chưa học thì nhắc.
3. **Thêm từ**: mở `index.html`, thêm dòng `["word","nghĩa","câu ví dụ có chứa word.","chuđề"],` vào mảng `MOVERS2` (hồ sơ Movers) hoặc `B1X` (hồ sơ B1). Hai điều kiện: câu ví dụ **phải chứa đúng từ đó** (để câu hỏi điền khuyết chạy được) và trường thứ tư phải là **id một chủ đề** có trong bảng `TOPICS` ở đầu file (`animal`, `food`, `sport`, `body`, `home`, `school`, `nature`, `place`, `move`, `art`, `time`, `work`, `money`, `feel`, `verb`, `desc`, `mind`, `tech`, `social`, `family`, `clothes`). Thêm xong chạy `kiem-tra-tu-vung.js` để kiểm. Thêm 10 từ = thêm 1 ngày học.
