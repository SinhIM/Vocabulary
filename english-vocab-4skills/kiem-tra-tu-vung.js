/* Kiểm tra bộ từ trong index.html — chạy sau mỗi lần thêm từ hoặc sửa chủ đề.
   Máy này không có node riêng, dùng node bên trong VS Code:
     $env:ELECTRON_RUN_AS_NODE=1
     & "C:\Users\Admin\AppData\Local\Programs\Microsoft VS Code\Code.exe" "C:\Agent_company\app-tu-vung-con\kiem-tra-tu-vung.js"
   Báo: lỗi cú pháp JS, từ trùng, thiếu trường, chủ đề sai, câu ví dụ không chứa đúng dạng từ. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const src = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>'));
try { new vm.Script(src); console.log('Cu phap JS: OK'); }
catch (e) { console.log('Cu phap JS LOI: ' + e.message); process.exit(1); }

function grab(name) {
  const i = html.indexOf('const ' + name + '=[');
  if (i < 0) { console.log('Khong thay mang ' + name); process.exit(1); }
  const j = html.indexOf('\n];', i);
  return JSON.parse(html.slice(i + ('const ' + name + '=').length, j + 2));
}
// danh sách id chủ đề lấy ngay từ bảng TOPICS trong app
const TID = new Set(Array.from(src.matchAll(/^\s*\['([a-z]+)', '/gm)).map(m => m[1]).concat(['etc']));
const TLABEL = {};
Array.from(src.matchAll(/^\s*\['([a-z]+)', '([^']+)'/gm)).forEach(m => TLABEL[m[1]] = m[2]);
console.log('So chu de khai bao: ' + (TID.size - 1));

const prof = { 'Movers': grab('MOVERS').concat(grab('MOVERS2')), 'B1': grab('B1').concat(grab('B1X')) };
let loi = 0;
Object.keys(prof).forEach(p => {
  const L = prof[p], seen = new Set(), dup = [], nb = [], bad = [], notopic = [], cnt = {};
  L.forEach(w => {
    if (!Array.isArray(w) || w.length !== 4 || w.some(x => typeof x !== 'string' || !x.trim())) bad.push(String(w && w[0]));
    const k = String(w[0]).toLowerCase();
    if (seen.has(k)) dup.push(w[0]);
    seen.add(k);
    if (!TID.has(w[3])) notopic.push(w[0] + '(' + w[3] + ')');
    cnt[w[3]] = (cnt[w[3]] || 0) + 1;
    const re = new RegExp('\\b' + String(w[0]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
    if (!re.test(w[2])) nb.push(w[0]);
  });
  loi += dup.length + nb.length + bad.length + notopic.length;
  console.log('\n=== ' + p + ': ' + L.length + ' tu = ' + Math.floor(L.length / 10) + ' ngay hoc ===');
  console.log('  tu trung: ' + (dup.join(', ') || 'khong'));
  console.log('  thieu truong: ' + (bad.join(', ') || 'khong'));
  console.log('  chu de khong hop le: ' + (notopic.join(', ') || 'khong'));
  console.log('  vi du khong chua dung dang tu: ' + (nb.join(', ') || 'khong'));
  Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a]).forEach(t =>
    console.log('    ' + (TLABEL[t] || t) + ': ' + cnt[t] + ' tu (' + Math.floor(cnt[t] / 10) + ' ngay)'));
});
console.log('\nTONG: ' + (prof['Movers'].length + prof['B1'].length) + ' tu | so loi: ' + loi);
process.exit(loi ? 1 : 0);
