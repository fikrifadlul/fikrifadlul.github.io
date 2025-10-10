# 🔍 Cara Cek Spreadsheet Anda

## 🎯 3 Cara Mudah Menemukan Spreadsheet

### ✅ Cara 1: Jalankan Fungsi (PALING MUDAH)

1. **Buka Google Apps Script** Anda
2. **Pilih fungsi** dari dropdown: `getSpreadsheetInfo`
3. **Klik Run** (▶️)
4. **Alert muncul** dengan info lengkap:
   ```
   Nama: Konfirmasi Kehadiran Undangan
   URL: https://docs.google.com/spreadsheets/d/xxxxx/edit
   Sheet: Sheet1
   Total Data: 5 baris
   ```
5. **Klik OK** dan **bookmark URL** tersebut!

### ✅ Cara 2: Buka URL Web App di Browser

1. **Copy URL Web App** Anda (yang digunakan di kode)
   ```
   https://script.google.com/macros/s/AKfycbwGRycOn-0HbgI6kULALmrAUWMVOQE57nXJQfUHvSHObfaJvVhQNxLS_M6D8Ge8AR-d/exec
   ```

2. **Paste di browser** dan tekan Enter

3. **Lihat JSON** yang muncul:
   ```json
   {
     "status": "Google Sheets API is running! ✓",
     "spreadsheetName": "Konfirmasi Kehadiran Undangan",
     "spreadsheetUrl": "https://docs.google.com/spreadsheets/d/1abc...xyz/edit",
     "spreadsheetId": "1abc...xyz",
     "activeSheet": "Sheet1",
     "lastRow": 6
   }
   ```

4. **Copy `spreadsheetUrl`** dan buka di tab baru

5. **Voila!** Ini spreadsheet Anda! 🎉

### ✅ Cara 3: Dari Apps Script Editor

1. **Buka Google Apps Script** Anda
2. **Lihat toolbar** di atas editor
3. **Klik icon spreadsheet** (📊) 
4. **Spreadsheet terbuka** otomatis!

## 📊 Struktur Data di Spreadsheet

Setelah menemukan spreadsheet, Anda akan melihat data seperti ini:

| Timestamp | Nama | Email | Telepon | Kehadiran | Jumlah Tamu | Pesan |
|-----------|------|-------|---------|-----------|-------------|-------|
| 08/10/2025 14:30:45 | John Doe | john@email.com | 08123456789 | Hadir | 2 | Selamat menempuh hidup baru! |
| 08/10/2025 14:35:12 | Jane Smith | jane@email.com | 08198765432 | Hadir | 1 | Bahagia selalu! |

## 🔖 Tips: Bookmark Spreadsheet

Setelah menemukan URL spreadsheet:

1. **Buka spreadsheet** di browser
2. **Tekan Ctrl+D** (atau Cmd+D di Mac)
3. **Simpan bookmark** dengan nama: "Konfirmasi Kehadiran - [Nama Event]"
4. **Akses cepat** kapan saja!

## 🚀 Quick Access Links

Simpan link-link ini untuk akses cepat:

### Google Apps Script
```
https://script.google.com/home
```

### Google Drive (cari spreadsheet)
```
https://drive.google.com
```

### Spreadsheet Anda (setelah dapat URL)
```
[PASTE URL SPREADSHEET ANDA DI SINI]
```

## 🔍 Cara Cari Spreadsheet di Google Drive

Jika lupa nama spreadsheet:

1. **Buka Google Drive**: https://drive.google.com
2. **Ketik di search box**: 
   - `type:spreadsheet` (semua spreadsheet)
   - `type:spreadsheet modified:today` (yang diubah hari ini)
   - `Konfirmasi` (cari berdasarkan nama)
3. **Sort by**: "Last modified" untuk lihat yang terbaru
4. **Klik** spreadsheet yang sesuai

## 📱 Akses dari Mobile

### Android/iOS:
1. **Install Google Sheets app**
2. **Login** dengan akun yang sama
3. **Cari spreadsheet** berdasarkan nama
4. **Buka** dan lihat data real-time!

## ⚡ Verifikasi Cepat

Untuk memastikan spreadsheet yang benar:

### Test 1: Submit Form
1. Buka `test-form.html`
2. Isi data test (nama: "TEST")
3. Submit
4. Cek spreadsheet - harus ada baris baru dengan nama "TEST"

### Test 2: Cek Timestamp
1. Lihat kolom Timestamp di spreadsheet
2. Harus sesuai dengan waktu submit form
3. Format: `DD/MM/YYYY HH:MM:SS`

### Test 3: Cek Jumlah Baris
1. Lihat `lastRow` di JSON (Cara 2)
2. Harus sama dengan jumlah baris di spreadsheet
3. Jika berbeda, mungkin bukan spreadsheet yang benar

## 🆘 Troubleshooting

### "Tidak bisa menemukan spreadsheet"
- Cek apakah Anda login dengan akun Google yang benar
- Coba Cara 1 (jalankan fungsi `getSpreadsheetInfo`)
- Cek Google Drive dengan filter `type:spreadsheet`

### "Spreadsheet kosong"
- Pastikan header sudah dibuat di baris 1
- Coba submit form test
- Cek Apps Script Executions untuk error

### "URL tidak bisa dibuka"
- Pastikan Anda login dengan akun yang sama
- Cek permission spreadsheet (harus Anda yang punya)
- Coba akses dari Google Drive dulu

### "Data tidak muncul"
- Tunggu 2-3 detik, kadang ada delay
- Refresh spreadsheet (F5)
- Cek sheet yang benar (Sheet1 atau lainnya)
- Cek Apps Script Executions log

## 💡 Pro Tips

### 1. Rename Spreadsheet
Beri nama yang jelas:
```
Konfirmasi Kehadiran - Pernikahan Fikri & Fitri - 2025
```

### 2. Buat Folder Khusus
Di Google Drive:
```
📁 Undangan Pernikahan
  └─ 📊 Konfirmasi Kehadiran
  └─ 📄 Daftar Tamu
  └─ 📄 Budget
```

### 3. Share dengan Tim
Jika ada tim yang perlu akses:
1. Klik **Share** di spreadsheet
2. Tambahkan email mereka
3. Set permission: **Editor** atau **Viewer**

### 4. Setup Notifikasi
Agar tahu saat ada data baru:
1. Tools > Notification rules
2. "Notify me when: A user submits a form"
3. Email: Immediately

### 5. Backup Otomatis
Setup backup berkala:
1. File > Version history > See version history
2. Atau export ke Excel secara berkala
3. Atau gunakan Google Takeout

## 📞 Butuh Bantuan?

Jika masih bingung, cek:
- **Setup lengkap**: `GOOGLE_SHEETS_SETUP.md`
- **Troubleshooting**: Bagian Troubleshooting di `GOOGLE_SHEETS_SETUP.md`
- **Apps Script**: `google-apps-script.js`

---

**Quick Command:**
```javascript
// Paste di Apps Script Console dan Run
function quickInfo() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('URL: ' + ss.getUrl());
}
```

**Dibuat oleh:** Fikrifadlul  
**Terakhir diupdate:** 2025-10-08
