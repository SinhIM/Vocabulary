# Sổ Từ Mỗi Ngày

🔗 **Bản đang chạy:** https://sinhim.github.io/Vocabulary/english-vocab-4skills/

App web tự học từ vựng tiếng Anh cho hai trình độ **Cambridge A1 Movers** và **B1 (PET)**: mỗi ngày 10 từ theo chủ đề người học tự chọn, **học xong là kiểm tra ngay 4 kỹ năng** nghe – nói – đọc – viết trên đúng 10 từ đó, rồi **cứ 3 ngày kiểm tra lại** 30 từ của cả ba ngày. Mỗi lần kiểm tra đều gửi báo cáo kết quả về Telegram cho bố mẹ.

👉 **Dùng ngay:** mở `index.html` trên điện thoại hoặc truy cập bản đã phát hành (xem phần *Phát hành*).
📘 **Hướng dẫn từng bước cho bố mẹ:** [HUONG-DAN.md](HUONG-DAN.md)

## Có gì bên trong

- **2.233 từ** có nghĩa tiếng Việt và câu ví dụ riêng cho từng từ: Movers 1.344 từ (134 ngày), B1 889 từ (88 ngày).
- **21 chủ đề** (Động vật, Ăn uống, Cơ thể & sức khoẻ, Trường học, Giao thông, Cảm xúc & tính cách…). Chọn chủ đề nào thì app lấy 10 từ **chưa học** của chủ đề đó, nên nhảy chủ đề mỗi ngày cũng không bao giờ gặp lại từ cũ.
- **Hai hồ sơ** riêng cho hai con, đổi tên và đổi trình độ được.
- **Hai vòng kiểm tra 4 kỹ năng**, đều chia đều 5 câu mỗi kỹ năng: **mỗi ngày** 20 câu trên đúng 10 từ vừa học (mỗi từ bị hỏi 2 lần ở 2 kỹ năng khác nhau; đổi được thành 10 câu trong Cài đặt), và **sau 3 ngày** 20 câu bốc ngẫu nhiên trong 30 từ của cả ba ngày. Chưa làm xong bài kiểm tra thì app khoá việc học bài mới.

  | Kỹ năng | Dạng câu hỏi |
  |---|---|
  | Nghe | App đọc từ, không hiện chữ → chọn nghĩa đúng trong 4 đáp án |
  | Nói | Hiện từ → đọc to vào micro → app so giọng với từ gốc (đạt từ 75%) |
  | Đọc | Câu ví dụ bị khuyết một từ → chọn từ đúng trong 4 đáp án |
  | Viết | Nghe từ + thấy nghĩa tiếng Việt → tự gõ lại từ tiếng Anh |

- **Báo cáo Telegram** tự gửi sau mỗi bài: điểm từng kỹ năng, tổng phần trăm, đạt/chưa đạt, chủ đề đã học và danh sách từ sai kèm kỹ năng sai.
- Máy nào không nhận giọng nói thì câu "Nói" chuyển sang **tự chấm** (nghe mẫu, đọc to, bấm Đọc đúng / Đọc chưa đúng) — không chặn bài thi.

## Kỹ thuật

Một file HTML duy nhất, vanilla JS/CSS, **không build, không phụ thuộc thư viện ngoài** (chỉ tải font từ Google Fonts). Chạy được cả khi mở trực tiếp từ máy.

| Thành phần | Dùng gì |
|---|---|
| Đọc tiếng Anh | Web Speech API — `speechSynthesis` |
| Nhận giọng nói | Web Speech API — `SpeechRecognition`, so khớp bằng khoảng cách Levenshtein |
| Lưu tiến độ | `localStorage` của trình duyệt |
| Gửi báo cáo | Telegram Bot API, gọi trực tiếp từ trình duyệt |

**Dữ liệu người học không rời khỏi máy.** Tiến độ nằm trong `localStorage` của chính trình duyệt đó; token bot Telegram do người dùng tự nhập trong phần Cài đặt và cũng chỉ lưu tại máy — **repo này không chứa token hay dữ liệu cá nhân nào**. Hệ quả: tiến độ không đồng bộ giữa các máy, và xoá dữ liệu trình duyệt là mất tiến độ.

## Phát hành

Vì chỉ có một file tĩnh nên cách nào cũng được:

- **GitHub Pages** — Settings → Pages → Source: `Deploy from a branch`, branch `main`, folder `/ (root)`. Vài phút sau có link `https://<tên-tài-khoản>.github.io/<tên-repo>/`.
- **Netlify Drop** — kéo cả thư mục vào https://app.netlify.com/drop, có link ngay.

Lưu ý: **micro và việc gửi Telegram cần trang chạy qua HTTPS**, nên phải phát hành thật rồi mới thử được hai tính năng đó (mở file bằng `file://` hoặc xem trong khung preview sẽ không gọi được micro).

## Thêm từ

Mỗi từ là một mảng 4 phần tử:

```js
["word", "nghĩa tiếng Việt", "Câu ví dụ có chứa đúng từ word.", "topic"]
```

Thêm vào mảng `MOVERS2` (hồ sơ Movers) hoặc `B1X` (hồ sơ B1) trong `index.html`. Hai ràng buộc:

1. **Câu ví dụ phải chứa đúng dạng từ đó** — câu hỏi kỹ năng Đọc khoét chính từ này ra khỏi câu ví dụ.
2. **`topic` phải là id có trong bảng `TOPICS`** ở đầu khối `<script>`.

Sau khi thêm, chạy script kiểm tra (cần Node.js):

```bash
node kiem-tra-tu-vung.js
```

Script báo lỗi cú pháp, từ trùng, thiếu trường, chủ đề không hợp lệ, câu ví dụ không chứa đúng dạng từ, và in số từ / số ngày học của từng chủ đề.

## Nguồn từ vựng

Bộ từ theo chủ đề được soạn theo nội dung thường gặp trong đề Cambridge Movers; phần mở rộng chọn từ danh sách [Oxford 3000 phân theo CEFR](https://github.com/Kolia951/The_Oxford_3000_CEFR) (A1 + A2 cho hồ sơ Movers, B1 cho hồ sơ B1), đã lọc bỏ hư từ, đại từ và các từ không phù hợp với trẻ em. **Toàn bộ nghĩa tiếng Việt và câu ví dụ trong repo này là nội dung tự soạn.**

## Giấy phép

MIT — xem [LICENSE](LICENSE).
