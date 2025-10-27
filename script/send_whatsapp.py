import time
import csv
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import NoSuchElementException, TimeoutException

def wait_for_element(driver, by, value, timeout=10):
    return WebDriverWait(driver, timeout).until(
        EC.presence_of_element_located((by, value))
    )

def send_whatsapp_message(phone_number, message):
    try:
        # Buka chat dengan nomor tujuan
        driver.get(f"https://web.whatsapp.com/send?phone={phone_number}")
        
        # Tunggu hingga input pesan muncul
        input_box = wait_for_element(driver, By.XPATH, '//div[@title="Ketik pesan"]', 30)
        
        # Kirim pesan per baris
        for line in message.split('\n'):
            input_box.send_keys(line)
            input_box.send_keys(Keys.SHIFT + Keys.ENTER)
            time.sleep(0.5)
        
        # Hapus SHIFT+ENTER terakhir dan kirim pesan
        input_box.send_keys(Keys.BACKSPACE)
        input_box.send_keys(Keys.ENTER)
        
        print(f"Pesan terkirim ke {phone_number}")
        time.sleep(2)  # Tunggu sebentar sebelum mengirim pesan berikutnya
        
    except (NoSuchElementException, TimeoutException) as e:
        print(f"Gagal mengirim ke {phone_number}: {str(e)}")
        # Simpan ke file log jika gagal
        with open('failed_send.log', 'a', encoding='utf-8') as f:
            f.write(f"{phone_number},{str(e)}\n")

def main():
    global driver
    
    # Inisialisasi Chrome WebDriver
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument('--start-maximized')
    options.add_argument('--user-data-dir=C:\\Users\\USERNAME\\AppData\\Local\\Google\\Chrome\\User Data')
    options.add_argument('--profile-directory=Default')
    
    driver = webdriver.Chrome(service=service, options=options)
    
    try:
        # Buka WhatsApp Web
        print("Membuka WhatsApp Web...")
        driver.get("https://web.whatsapp.com")
        
        # Tunggu hingga pengguna melakukan scan QR code
        print("Silakan scan kode QR WhatsApp Web...")
        wait_for_element(driver, By.XPATH, '//div[@title="Daftar Obrolan"]', 120)
        print("Berhasil terhubung ke WhatsApp Web")
        
        # Baca file CSV
        csv_path = Path(__file__).parent / 'tamu-undangan.csv'
        with open(csv_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row['Nama'] and row['Undangan'] == 'Digital' and 'No. HP' in row and row['No. HP']:
                    phone = row['No. HP'].strip()
                    if not phone.startswith('+'):
                        phone = f"+62{phone.lstrip('0')}"  # Asumsi nomor Indonesia
                    
                    # Buat pesan
                    message = f"Assalamu'alaikum warahmatullahi wabarakatuh\n\n{row['Nama']}\n\nBismillahirrahmanirrahim 🕌\nAlhamdulillah, dengan izin Allah SWT kami akan menempuh jalan baru dalam hidup kami 💍✨\nDengan penuh kegembiraan dan rendah hati kami mengundang panjenengan untuk hadir dan memberikan doa restu pada hari bahagia kami 🤲😊\n\nLink undangan digitalnya ada di bawah ini ya ⬇\nhttps://fikrifadlul.github.io/undangan-pernikahan/?penerima={row['UUID']}\n\nبَارَكَ اللهُ لَكُماَ وَبَارَكَ عَلَيْكُماَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ 🤲✨ \nSemoga Allah memberkahi kami, menyatukan kita dalam kebaikan 🌸\n\nWassalamu'alaikum warahmatullahi wabarakatuh"
                    
                    print(f"\nMengirim undangan ke: {row['Nama']} ({phone})")
                    send_whatsapp_message(phone, message)
        
    except Exception as e:
        print(f"Terjadi kesalahan: {str(e)}")
    finally:
        input("Tekan Enter untuk menutup browser...")
        driver.quit()

if __name__ == "__main__":
    main()
