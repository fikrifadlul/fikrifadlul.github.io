# 📖 Cara Menggunakan Form Konfirmasi Kehadiran

## 🎯 Akses Form

### Tombol Floating (Pojok Kanan Bawah)
Form konfirmasi dapat diakses melalui **tombol floating** di pojok kanan bawah layar:

```
┌─────────────────────────┐
│                         │
│                         │
│    Konten Undangan      │
│                         │
│                    ┌──┐ │ ← Tombol Amplop (✉️)
│                    │✉️│ │   Warna: Emas (#a3834e)
│                    └──┘ │   Animasi: Pulse
│                    ┌──┐ │
│                    │🔊│ │ ← Tombol Music
│                    └──┘ │
│                    ┌──┐ │
│                    │▶️│ │ ← Tombol Autoplay
│                    └──┘ │
└─────────────────────────┘
```

### Fitur Tombol
- **Warna Emas**: Berbeda dari tombol lain untuk menarik perhatian
- **Animasi Pulse**: Efek berkedip halus untuk menarik perhatian
- **Icon Amplop**: Simbol yang jelas untuk konfirmasi/undangan
- **Posisi Teratas**: Di atas tombol music dan autoplay

## 📝 Mengisi Form

### 1. Klik Tombol Amplop
Modal akan muncul dengan form konfirmasi kehadiran

### 2. Isi Data yang Diperlukan

**Field Wajib (*):**
- **Nama Lengkap**: Nama tamu undangan
- **Email**: Alamat email yang valid
- **Kehadiran**: Pilih salah satu:
  - Hadir
  - Tidak Hadir
  - Masih Ragu

**Field Opsional:**
- **No. Telepon**: Nomor WhatsApp/HP
- **Jumlah Tamu**: Default 1 orang (max 10)
- **Ucapan & Doa**: Pesan untuk pengantin

### 3. Submit Form
- Klik tombol **"Kirim Konfirmasi"**
- Tombol akan menampilkan loading: "Mengirim..."
- Tunggu notifikasi sukses
- Modal akan otomatis tertutup setelah 2 detik

### 4. Konfirmasi Berhasil
Data Anda akan tersimpan di Google Sheets dengan format:

| Timestamp | Nama | Email | Telepon | Kehadiran | Jumlah Tamu | Pesan |
|-----------|------|-------|---------|-----------|-------------|-------|
| 08/10/2025 13:30:45 | John Doe | john@email.com | 08123456789 | Hadir | 2 | Selamat... |

## ⚠️ Troubleshooting

### Modal Tidak Muncul?
1. **Refresh halaman** (F5)
2. Pastikan JavaScript tidak diblock
3. Cek Console browser (F12) untuk error
4. Pastikan fungsi `showModal()` ada di `themesv2.js` atau `theme-app.js`

### Tombol Tidak Terlihat?
1. Scroll ke bagian bawah halaman
2. Pastikan CSS sudah load dengan benar
3. Cek apakah ada CSS yang override `.floating-action`

### Data Tidak Masuk ke Google Sheets?
1. Pastikan sudah setup Google Apps Script
2. Cek URL Web App di baris 2500 `index.html`
3. Pastikan deployment "Who has access" = **Anyone**
4. Lihat panduan lengkap di `GOOGLE_SHEETS_SETUP.md`

### Form Submit Tapi Tidak Ada Notifikasi?
1. Cek Console browser (F12) untuk error
2. Pastikan element dengan ID `formMessage` ada
3. Cek network tab untuk melihat request ke Google Apps Script

## 🎨 Customisasi

### Ubah Warna Tombol
Edit CSS di `index.html` baris ~108-124:
```css
#btnKonfirmasi {
  background-color: #your-color !important;
}

#btnKonfirmasi::before {
  background-color: #your-color;
}
```

### Ubah Icon Tombol
Ganti SVG di baris ~1995-2005 dengan icon lain dari [Phosphor Icons](https://phosphoricons.com/)

### Ubah Posisi Tombol
Edit inline style di baris ~1992:
```html
style="margin-bottom: 8px; margin-right: 20px;"
```

### Nonaktifkan Animasi Pulse
Hapus atau comment CSS di baris ~113-124

## 💡 Tips

### Untuk Pengguna
- Isi data dengan benar, tidak bisa edit setelah submit
- Email digunakan untuk konfirmasi (jika ada fitur email notifikasi)
- Jumlah tamu membantu persiapan acara

### Untuk Developer
- Backup Google Sheets secara berkala
- Monitor submissions melalui Google Sheets
- Tambahkan validasi duplikat email jika perlu
- Pertimbangkan CAPTCHA untuk mencegah spam

## 📞 Bantuan Lebih Lanjut

- **Setup Google Sheets**: Lihat `GOOGLE_SHEETS_SETUP.md`
- **Quick Start**: Lihat `README_FORM_KONFIRMASI.md`
- **Testing**: Gunakan `test-form.html`
- **Google Apps Script**: Lihat `google-apps-script.js`

---

**Dibuat oleh:** Fikrifadlul  
**Terakhir diupdate:** 2025-10-08
