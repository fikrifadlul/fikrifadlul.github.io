# 🧪 Test Form - Panduan Penggunaan

## 📖 Tentang File Ini

`test-form.html` adalah halaman testing standalone untuk form konfirmasi kehadiran yang:
- ✅ **Mengirim data ke Google Sheets** (sama seperti form di undangan)
- ✅ **Menampilkan data** yang dikirim untuk verifikasi
- ✅ **Memberikan feedback** sukses/gagal secara real-time
- ✅ **Mudah di-debug** dengan console log lengkap

## 🎯 Kapan Menggunakan File Ini?

### Gunakan `test-form.html` untuk:
1. **Testing awal** sebelum deploy ke undangan
2. **Debugging** jika ada masalah dengan form
3. **Verifikasi** bahwa Google Sheets API berfungsi
4. **Melihat data** yang dikirim sebelum masuk ke sheet

### Gunakan `index.html` untuk:
1. **Production** - undangan yang sebenarnya
2. **Testing UI** dalam konteks undangan lengkap

## 🚀 Cara Menggunakan

### 1. Setup Google Sheets API
Pastikan Anda sudah setup Google Apps Script (lihat `GOOGLE_SHEETS_SETUP.md`)

### 2. Update URL
Buka `test-form.html` baris 171 dan ganti URL:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

### 3. Buka di Browser
```bash
# Langsung double-click file atau
# Buka dengan browser favorit
test-form.html
```

### 4. Isi Form dan Submit
- Isi semua field yang required (*)
- Klik "Kirim Konfirmasi"
- Tunggu loading selesai

### 5. Verifikasi
**Di Browser:**
- ✅ Alert hijau "Berhasil!" muncul
- ✅ Data ditampilkan di bawah form
- ✅ Form ter-reset otomatis

**Di Google Sheets:**
- ✅ Buka spreadsheet Anda
- ✅ Data muncul di baris baru
- ✅ Timestamp dalam format Indonesia

**Di Console (F12):**
- ✅ Log "Mengirim data ke Google Sheets..."
- ✅ Log "✅ Data berhasil dikirim"
- ✅ Object data lengkap

## 📊 Fitur Test Form

### 1. Status Message
Alert box yang menampilkan:
- **Sukses (Hijau)**: "✅ Berhasil! Data telah dikirim ke Google Sheets..."
- **Error (Merah)**: "❌ Gagal! Terjadi kesalahan..."

### 2. Data Preview
Menampilkan JSON data yang dikirim:
```json
{
  "timestamp": "2025-10-08T07:30:00.000Z",
  "timestampFormatted": "08/10/2025 14:30:00",
  "nama": "John Doe",
  "email": "john@example.com",
  "telepon": "08123456789",
  "kehadiran": "Hadir",
  "jumlahTamu": "2",
  "pesan": "Selamat menempuh hidup baru!"
}
```

### 3. Loading State
- Button disabled saat submit
- Spinner muncul
- Text berubah "Mengirim..."

### 4. Console Logging
Semua aktivitas di-log ke console untuk debugging:
```
Mengirim data ke Google Sheets... {timestamp: "...", nama: "..."}
✅ Data berhasil dikirim: {timestamp: "...", nama: "..."}
```

## 🔍 Debugging

### Jika Data Tidak Terkirim

**1. Cek Console (F12)**
```javascript
// Lihat error message
Error: Failed to fetch
// atau
Error: Network request failed
```

**2. Cek URL Google Apps Script**
- Pastikan URL benar dan lengkap
- Harus diawali `https://script.google.com/macros/s/`
- Harus diakhiri `/exec`

**3. Cek Deployment**
- Buka Google Apps Script
- View > Executions
- Lihat apakah ada request masuk
- Cek error log jika ada

**4. Cek Network Tab (F12)**
- Tab Network
- Submit form
- Lihat request ke Google Apps Script
- Status harus 200 atau 302 (redirect)

### Jika Data Preview Tidak Muncul

**1. Cek Element ID**
```javascript
// Pastikan element ada
document.getElementById('dataPreview') // harus ada
document.getElementById('dataOutput')  // harus ada
```

**2. Cek JavaScript Error**
- Buka Console (F12)
- Lihat error merah
- Fix error tersebut

### Jika Alert Tidak Muncul

**1. Cek Element ID**
```javascript
document.getElementById('statusMessage') // harus ada
```

**2. Cek CSS**
- Pastikan `.alert-success` dan `.alert-danger` ada
- Cek `display: none` tidak di-override

## 📝 Perbedaan dengan index.html

| Fitur | test-form.html | index.html |
|-------|----------------|------------|
| **UI** | Simple, standalone | Full undangan dengan modal |
| **Data Preview** | ✅ Ditampilkan | ❌ Tidak |
| **Console Log** | ✅ Verbose | ✅ Basic |
| **Status Alert** | ✅ Persistent | ✅ Auto-hide |
| **Reset Form** | ✅ Otomatis | ✅ Otomatis |
| **Modal** | ❌ Tidak ada | ✅ Ada |
| **Floating Button** | ❌ Tidak ada | ✅ Ada |

## 💡 Tips Testing

### 1. Test Berbagai Skenario
```
✅ Semua field diisi
✅ Hanya field required diisi
✅ Email tidak valid
✅ Jumlah tamu = 0 atau > 10
✅ Nama dengan karakter spesial
✅ Pesan sangat panjang
```

### 2. Test Error Handling
```
❌ URL Google Apps Script salah
❌ Internet terputus
❌ Google Sheets penuh
❌ Permission denied
```

### 3. Test Performance
```
⏱️ Berapa lama submit?
⏱️ Apakah ada delay?
⏱️ Multiple submit cepat?
```

### 4. Test di Berbagai Browser
```
🌐 Chrome
🌐 Firefox
🌐 Safari
🌐 Edge
📱 Mobile browsers
```

## 🔐 Keamanan

### Data yang Dikirim
- Timestamp (ISO 8601)
- Nama, Email, Telepon
- Kehadiran, Jumlah Tamu
- Pesan/Ucapan

### Data yang TIDAK Dikirim
- Password
- Data sensitif lainnya
- Cookie/Session

### Best Practices
1. **Jangan hardcode** data sensitif
2. **Validasi** di client dan server
3. **Sanitize** input sebelum simpan
4. **Backup** Google Sheets berkala

## 📞 Troubleshooting Cepat

| Problem | Solution |
|---------|----------|
| Data tidak masuk sheet | Cek URL, cek deployment "Anyone" |
| Error CORS | Normal untuk no-cors mode |
| Form tidak reset | Cek `this.reset()` di code |
| Preview tidak muncul | Cek element ID `dataPreview` |
| Loading stuck | Cek network, timeout |

## 🎓 Untuk Developer

### Modifikasi Form
Edit HTML di baris 78-152

### Modifikasi Logic
Edit JavaScript di baris 169-278

### Tambah Field Baru
1. Tambah input di HTML
2. Tambah ke `formData` object
3. Update Google Apps Script
4. Update header di Google Sheets

### Custom Styling
Edit CSS di baris 8-62

## 📚 Referensi

- **Setup lengkap**: `GOOGLE_SHEETS_SETUP.md`
- **Quick start**: `README_FORM_KONFIRMASI.md`
- **Cara pakai**: `CARA_MENGGUNAKAN.md`
- **Apps Script**: `google-apps-script.js`

---

**File:** test-form.html  
**Purpose:** Testing & Debugging  
**Status:** Production Ready  
**Last Update:** 2025-10-08
