# Form Konfirmasi Kehadiran - Quick Start Guide

## 📋 Fitur
- ✅ Form konfirmasi kehadiran terintegrasi dengan Google Sheets
- ✅ Tombol floating dengan animasi pulse untuk membuka form
- ✅ Validasi input otomatis
- ✅ Loading state saat submit
- ✅ Notifikasi sukses/error
- ✅ Responsive design
- ✅ Auto-close modal setelah submit

## 🎯 Cara Mengakses Form
Klik **tombol amplop (✉️)** di pojok kanan bawah layar (floating button dengan warna emas dan animasi pulse)

## 🚀 Setup Cepat (5 Menit)

### 1. Buat Google Spreadsheet
```
Kolom A: Timestamp
Kolom B: Nama
Kolom C: Email
Kolom D: Telepon
Kolom E: Kehadiran
Kolom F: Jumlah Tamu
Kolom G: Pesan
```

### 2. Setup Apps Script
1. Di Google Sheets: **Extensions** > **Apps Script**
2. Copy paste kode dari file `google-apps-script.js`
3. Save project

### 3. Deploy Web App
1. **Deploy** > **New deployment** > **Web app**
2. Execute as: **Me**
3. Who has access: **Anyone**
4. **Deploy** dan copy URL

### 4. Update HTML
Buka `index.html`, cari baris ~2500:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```
Ganti dengan URL Web App Anda.

### 5. Test!
- **Testing dengan data preview**: Buka `test-form.html` - data akan dikirim ke Google Sheets DAN ditampilkan
- **Testing di undangan**: Buka `index.html` - klik menu RSVP atau tombol amplop floating

## 📁 File yang Dibuat

- **`index.html`** - File utama dengan modal form (sudah dimodifikasi)
- **`test-form.html`** - Form testing dengan preview data
- **`google-apps-script.js`** - Kode untuk Google Apps Script
- **`GOOGLE_SHEETS_SETUP.md`** - Dokumentasi lengkap dengan troubleshooting
- **`CEK_SPREADSHEET.md`** - Panduan menemukan spreadsheet Anda ⭐
- **`TEST_FORM_README.md`** - Panduan test-form.html
- **`CARA_MENGGUNAKAN.md`** - Panduan penggunaan untuk user

## 🎨 Customisasi

### Ubah Field Form
Edit bagian form di `index.html` (baris ~2130-2235)

### Ubah Warna Button
Edit CSS inline di button submit (baris ~2218):
```css
background-color: var(--inv-accent); /* Ganti dengan warna lain */
```

### Tambah Validasi
Edit JavaScript di bagian form validation (baris ~2533-2537)

## 🔧 Troubleshooting

**Data tidak masuk ke Google Sheets?**
- Cek URL Web App sudah benar
- Pastikan "Who has access" = **Anyone**
- Buka Console browser (F12) untuk lihat error

**Error "Authorization required"?**
- Re-deploy Web App
- Authorize ulang saat deploy

**Form tidak muncul?**
- Cek modal dengan ID `qrModal` sudah ada
- Pastikan Bootstrap JS sudah load

## 📞 Support

Lihat dokumentasi lengkap di `GOOGLE_SHEETS_SETUP.md`

---

**Created by:** Fikrifadlul  
**Date:** 2025-10-08
