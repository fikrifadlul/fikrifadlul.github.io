/**
 * Google Apps Script untuk Konfirmasi Kehadiran Undangan
 * 
 * Cara Deploy:
 * 1. Buka Google Sheets
 * 2. Extensions > Apps Script
 * 3. Copy paste kode ini
 * 4. Deploy > New deployment > Web app
 * 5. Execute as: Me
 * 6. Who has access: Anyone
 * 7. Copy URL dan paste ke index.html
 */

function doPost(e) {
  try {
    // Ambil spreadsheet aktif
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse data dari request - handle berbagai format
    var data;
    // Cek e.parameter dulu (untuk URLSearchParams/form-encoded)
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      // Coba parse sebagai JSON jika ada postData
      // try {
      //   data = JSON.parse(e.postData.contents);
      // } catch (parseError) {
        // Jika bukan JSON, gunakan parameter
        data = e.parameter || {};
      // }
    } else {
      throw new Error('No data received');
    }
    
    // Format timestamp ke zona waktu Indonesia
    var timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    var formattedTimestamp = Utilities.formatDate(timestamp, "Asia/Jakarta", "dd/MM/yyyy HH:mm:ss");
    
    // Tambahkan data ke baris baru
    sheet.appendRow([
      formattedTimestamp,
      data.nama || '',
      data.email || '',
      data.telepon || '-',
      data.kehadiran || '',
      data.jumlahTamu || '1',
      data.pesan || '-'
    ]);
    
    // Optional: Kirim email notifikasi (uncomment jika ingin digunakan)
    /*
    MailApp.sendEmail({
      to: "your-email@gmail.com",
      subject: "Konfirmasi Kehadiran Baru: " + data.nama,
      body: "Nama: " + data.nama + "\n" +
            "Email: " + data.email + "\n" +
            "Telepon: " + data.telepon + "\n" +
            "Kehadiran: " + data.kehadiran + "\n" +
            "Jumlah Tamu: " + data.jumlahTamu + "\n" +
            "Pesan: " + data.pesan + "\n\n" +
            "Timestamp: " + formattedTimestamp
    });
    */
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success', 
        'row': sheet.getLastRow(),
        'message': 'Data berhasil disimpan'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error untuk debugging
    Logger.log('Error: ' + error.toString());
    Logger.log('Request data: ' + JSON.stringify(e));
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'error': error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Endpoint untuk testing - menampilkan info spreadsheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var info = {
    status: "Google Sheets API is running! ✓",
    spreadsheetName: sheet.getName(),
    spreadsheetUrl: sheet.getUrl(),
    spreadsheetId: sheet.getId(),
    activeSheet: sheet.getActiveSheet().getName(),
    lastRow: sheet.getActiveSheet().getLastRow()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(info, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Fungsi untuk validasi duplikat email (Optional)
 * Uncomment bagian ini jika ingin mencegah duplikat email
 */
/*
function checkDuplicateEmail(sheet, email) {
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  
  // Mulai dari baris 2 (skip header)
  for (var i = 1; i < values.length; i++) {
    if (values[i][2] === email) { // Kolom C (index 2) adalah email
      return true; // Email sudah ada
    }
  }
  return false; // Email belum ada
}

// Gunakan di dalam doPost sebelum appendRow:
if (checkDuplicateEmail(sheet, data.email)) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      'result': 'error', 
      'error': 'Email sudah terdaftar sebelumnya' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
*/

/**
 * Fungsi untuk auto-format sheet (Optional)
 * Jalankan sekali untuk format header
 */
function formatSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Format header
  var headerRange = sheet.getRange(1, 1, 1, 7);
  headerRange.setBackground('#a3834e');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  
  // Auto-resize columns
  for (var i = 1; i <= 7; i++) {
    sheet.autoResizeColumn(i);
  }
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  Logger.log('Sheet formatted successfully!');
}

/**
 * Fungsi untuk mendapatkan info spreadsheet
 * Jalankan untuk melihat nama dan URL spreadsheet Anda
 */
function getSpreadsheetInfo() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  
  var info = {
    'Nama Spreadsheet': spreadsheet.getName(),
    'URL Spreadsheet': spreadsheet.getUrl(),
    'ID Spreadsheet': spreadsheet.getId(),
    'Nama Sheet Aktif': sheet.getName(),
    'Jumlah Baris': sheet.getLastRow(),
    'Jumlah Kolom': sheet.getLastColumn()
  };
  
  // Log ke console
  Logger.log('=== INFO SPREADSHEET ===');
  for (var key in info) {
    Logger.log(key + ': ' + info[key]);
  }
  Logger.log('========================');
  
  // Tampilkan alert dengan URL
  var ui = SpreadsheetApp.getUi();
  ui.alert(
    'Info Spreadsheet',
    'Nama: ' + info['Nama Spreadsheet'] + '\n\n' +
    'URL: ' + info['URL Spreadsheet'] + '\n\n' +
    'Sheet: ' + info['Nama Sheet Aktif'] + '\n' +
    'Total Data: ' + (info['Jumlah Baris'] - 1) + ' baris',
    ui.ButtonSet.OK
  );
  
  return info;
}
