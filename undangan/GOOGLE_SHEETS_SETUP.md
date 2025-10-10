# Setup Google Sheets API untuk Form Konfirmasi Kehadiran

## Langkah 1: Buat Google Spreadsheet

1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru dengan nama "Konfirmasi Kehadiran Undangan"
3. Di Sheet1, buat header di baris pertama dengan kolom berikut:
   - A1: `Timestamp`
   - B1: `Nama`
   - C1: `Email`
   - D1: `Telepon`
   - E1: `Kehadiran`
   - F1: `Jumlah Tamu`
   - G1: `Pesan`

## Langkah 2: Buat Google Apps Script

1. Di Google Sheets, klik **Extensions** > **Apps Script**
2. Hapus kode default dan ganti dengan kode berikut:

```javascript
function doPost(e) {
  try {
    // Ambil spreadsheet aktif
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse data dari request
    var data = JSON.parse(e.postData.contents);
    
    // Format timestamp ke zona waktu Indonesia
    var timestamp = new Date(data.timestamp);
    var formattedTimestamp = Utilities.formatDate(timestamp, "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");
    
    // Tambahkan data ke baris baru
    sheet.appendRow([
      formattedTimestamp,
      data.nama,
      data.email,
      data.telepon,
      data.kehadiran,
      data.jumlahTamu,
      data.pesan
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Google Sheets API is running!");
}
```

3. Klik **Save** (ikon disket) dan beri nama project, misalnya "Konfirmasi Kehadiran API"

## Langkah 3: Deploy Web App

1. Klik tombol **Deploy** > **New deployment**
2. Klik ikon gear (⚙️) di sebelah "Select type" dan pilih **Web app**
3. Isi konfigurasi:
   - **Description**: "Konfirmasi Kehadiran API v1"
   - **Execute as**: **Me** (email Anda)
   - **Who has access**: **Anyone** (Penting: pilih Anyone agar form bisa diakses publik)
4. Klik **Deploy**
5. Klik **Authorize access** dan pilih akun Google Anda
6. Jika muncul warning "Google hasn't verified this app":
   - Klik **Advanced**
   - Klik **Go to [Project Name] (unsafe)**
   - Klik **Allow**
7. **COPY URL WEB APP** yang muncul (format: `https://script.google.com/macros/s/xxxxx/exec`)

## Langkah 4: Update Kode HTML

1. Buka file `index.html`
2. Cari baris berikut (sekitar baris 2500):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Ganti `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` dengan URL Web App yang Anda copy, contoh:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxxxxxxx/exec';
   ```
4. Save file

## Langkah 5: Cek Nama Spreadsheet

**PENTING: Pastikan Anda tahu spreadsheet mana yang menerima data!**

### Cara 1: Jalankan Fungsi getSpreadsheetInfo()
1. Di Google Apps Script, pilih fungsi **`getSpreadsheetInfo`** dari dropdown
2. Klik **Run** (▶️)
3. Alert akan muncul dengan **Nama dan URL spreadsheet**
4. **Bookmark URL tersebut** untuk akses cepat!

### Cara 2: Akses URL Web App di Browser
1. Buka URL Web App Anda di browser (yang Anda copy saat deploy)
2. Akan muncul JSON dengan info spreadsheet:
```json
{
  "status": "Google Sheets API is running! ✓",
  "spreadsheetName": "Konfirmasi Kehadiran Undangan",
  "spreadsheetUrl": "https://docs.google.com/spreadsheets/d/xxxxx/edit",
  "spreadsheetId": "xxxxx",
  "activeSheet": "Sheet1",
  "lastRow": 1
}
```
3. **Copy `spreadsheetUrl`** dan buka di browser

### Cara 3: Dari Apps Script Editor
1. Di Apps Script, klik icon **spreadsheet** (📊) di toolbar
2. Akan langsung membuka spreadsheet yang terhubung

## Langkah 6: Testing

1. Buka file `test-form.html` atau `index.html` di browser
2. Isi form dan klik "Kirim Konfirmasi"
3. **Buka spreadsheet** (gunakan URL dari langkah 5)
4. Data harus muncul di baris baru

## Troubleshooting

### Error: "Cannot read properties of undefined (reading 'postData')"
**Solusi:**
1. Update kode Google Apps Script dengan versi terbaru dari `google-apps-script.js`
2. Kode sudah diperbaiki untuk handle berbagai format request
3. Re-deploy Web App setelah update:
   - Deploy > Manage deployments
   - Klik ikon pensil di deployment aktif
   - Pilih "New version"
   - Deploy
4. **PENTING:** Gunakan URL deployment yang BARU (URL akan berubah)
5. Update URL di `index.html` baris 2500

### Error: "Script function not found: doPost"
- Pastikan Anda sudah save script di Apps Script
- Pastikan nama fungsi adalah `doPost` (case-sensitive)

### Data tidak masuk ke Google Sheets
- Pastikan URL Web App sudah benar
- Pastikan "Who has access" diset ke **Anyone**
- Cek Console browser (F12) untuk melihat error
- Pastikan header kolom di Sheet sesuai urutan
- Coba re-deploy dengan "New version"

### Error: "Authorization required"
- Re-deploy Web App dengan konfigurasi yang benar
- Pastikan sudah authorize akses saat deploy

### Form submit tapi data tidak muncul
- Tunggu 2-3 detik, kadang ada delay
- Refresh Google Sheets
- Cek Executions log di Apps Script (View > Executions)
- Pastikan tidak ada error di log

## Tips Tambahan

### Menambahkan Notifikasi Email
Tambahkan kode berikut di dalam fungsi `doPost` setelah `sheet.appendRow`:

```javascript
// Kirim email notifikasi
MailApp.sendEmail({
  to: "your-email@gmail.com",
  subject: "Konfirmasi Kehadiran Baru: " + data.nama,
  body: "Nama: " + data.nama + "\n" +
        "Email: " + data.email + "\n" +
        "Kehadiran: " + data.kehadiran + "\n" +
        "Jumlah Tamu: " + data.jumlahTamu + "\n" +
        "Pesan: " + data.pesan
});
```

### Menambahkan Validasi Duplikat
Tambahkan kode berikut sebelum `sheet.appendRow`:

```javascript
// Cek duplikat email
var dataRange = sheet.getDataRange();
var values = dataRange.getValues();
for (var i = 1; i < values.length; i++) {
  if (values[i][2] === data.email) { // Kolom C (index 2) adalah email
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Email sudah terdaftar' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Keamanan

- URL Web App bersifat publik, jangan share jika tidak perlu
- Jika ingin update script, buat deployment baru dan update URL di HTML
- Pertimbangkan menambahkan CAPTCHA untuk mencegah spam
- Backup data Google Sheets secara berkala

## Support

Jika ada masalah, cek:
1. Console browser (F12 > Console)
2. Execution log di Apps Script (View > Executions)
3. Pastikan Google Sheets tidak terkunci atau restricted

---

**Dibuat oleh:** Fikrifadlul  
**Terakhir diupdate:** 2025-10-08
