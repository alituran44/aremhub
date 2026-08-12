import fs from 'fs';
import path from 'path';

const distIndex = 'c:/Users/Hp/Desktop/Antigravity Proje/AremSoft/dist/index.html';

if (fs.existsSync(distIndex)) {
  const htmlContent = fs.readFileSync(distIndex, 'utf-8');

  const targetHtmlFiles = [
    'c:/Users/Hp/Desktop/Antigravity Proje/AremSoft/AremHub_Kurumsal_Ajans.html',
    'c:/Users/Hp/Desktop/Antigravity Proje/AremSoft/AremHub_Sitesi.html',
    'c:/Users/Hp/Desktop/Antigravity Proje/AremSoft/AremHub_Ajans_Yonetim.html',
    'c:/Users/Hp/Desktop/Antigravity Proje/AremSoft/AremHub_TekDosya.html',
    'c:/Users/Hp/Desktop/Antigravity Proje/AremSoft/AremHub_DiNapoli_Ajans.html',
    'c:/Users/Hp/Desktop/Antigravity Proje/AremSoft/aremhub.html',
    'c:/Users/Hp/Desktop/Antigravity Proje/AremSoft/index.html'
  ];

  targetHtmlFiles.forEach(filePath => {
    fs.writeFileSync(filePath, htmlContent);
    console.log(`Updated ${path.basename(filePath)} (${(htmlContent.length / 1024).toFixed(1)} KB)`);
  });

  console.log('Single-file bundle successfully synced to all HTML targets!');
} else {
  console.error('Error: dist/index.html not found!');
}
