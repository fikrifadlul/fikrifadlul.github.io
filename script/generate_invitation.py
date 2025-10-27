import csv
import re
from pathlib import Path

def generate_invitation_message(name, uuid):
    return f'''Assalamu'alaikum warahmatullahi wabarakatuh

{name}

Bismillahirrahmanirrahim 🕌
Alhamdulillah, dengan izin Allah SWT kami akan menempuh jalan baru dalam hidup kami 💍✨
Dengan penuh kegembiraan dan rendah hati kami mengundang panjenengan untuk hadir dan memberikan doa restu pada hari bahagia kami 🤲😊

Link undangan digitalnya ada di bawah ini ya ⬇
https://fikrifadlul.github.io/undangan-pernikahan/?penerima={uuid}

بَارَكَ اللهُ لَكُماَ وَبَارَكَ عَلَيْكُماَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ 🤲✨ 
Semoga Allah memberkahi kami, menyatukan kita dalam kebaikan 🌸

Wassalamu'alaikum warahmatullahi wabarakatuh'''

def main():
    # Define file paths
    csv_path = Path(__file__).parent / 'tamu-undangan.csv'
    output_dir = Path(__file__).parent / 'undangan'
    output_dir.mkdir(exist_ok=True)
    
    # Read CSV file
    with open(csv_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['Nama'] and row['Undangan'] == 'Digital':  # Only process rows with a name and Digital invitation
                # Generate message
                message = generate_invitation_message(row['Nama'], row['UUID'])
                
                # Create a safe filename from the name
                safe_name = re.sub(r'[<>:"/\\|?*]', '_', row['Nama'])  # Replace invalid filename characters with underscore
                safe_name = safe_name.replace(' ', '_')
                filename = f"undangan_{safe_name}.txt"
                filepath = output_dir / filename
                
                # Write to file
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(message)
                
                print(f"Generated invitation for: {row['Nama']}")
    
    print("\nAll invitation messages have been generated successfully!")
    print(f"Location: {output_dir}")

if __name__ == "__main__":
    main()
