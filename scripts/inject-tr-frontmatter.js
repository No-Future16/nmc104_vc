const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Turkish translations extracted from script.js manually mapped
const trDict = {
    1: { title: "Tanışma ve Müfredat Tanıtımı", week: "1. Hafta", date: "27 Şub", description: "Dijital tasarım nedir? Müfredatın incelenmesi ve dersten beklentiler." },
    2: { title: "Tasarım Temelleri & Gestalt", week: "2. Hafta", date: "6 Mar", description: "Çizgi, şekil, renk, doku. İnsan beyni görsel öğeleri nasıl algılar?" },
    3: { title: "Prensipler ve Renk Teorisi", week: "3. Hafta", date: "13 Mar", description: "Denge, hiyerarşi, zıtlık. Renk çemberi, psikoloji ve uyumlu paletler oluşturma." },
    4: { title: "Tipografi", week: "4. Hafta", date: "20 Mar", description: "Yazı tipi anatomisi, eşleştirme stratejileri, boyutlandırma ve tipografik hiyerarşi." },
    5: { title: "Ramazan Bayramı", week: "5. Hafta", date: "27 Mar", description: "Ramazan Bayramı nedeniyle ders yapılmayacaktır." },
    6: { title: "Sosyal Medya & Hareket", week: "6. Hafta", date: "3 Nis", description: "İnfografikler, arayüz animasyonu ve sosyal medya formatları. İlgi çekici görsel hikayeler nasıl anlatılır?" },
    7: { title: "VİZE: Dijital Kampanya Kiti", week: "7. Hafta", date: "10 Nis", description: "Yüzyüze ders yok. Sosyal medya kiti ve infografiğinizi teslim edin." },
    8: { title: "UX/UI'a Giriş", week: "8. Hafta", date: "17 Nis", description: "Tasarım odaklı düşünme. Kullanıcı akışı, telkafes ve prototip kavramları." },
    9: { title: "Figma'da Prototipleme", week: "9. Hafta", date: "24 Nis", description: "Komponentler, oto-düzen ve interaktif prototip oluşturma." },
    10: { title: "1 Mayıs İşçi Bayramı", week: "10. Hafta", date: "1 May", description: "İşçi Bayramı tatili, ders yapılmayacaktır." },
    11: { title: "Yapay Zeka Destekli Tasarım", week: "11. Hafta", date: "8 May", description: "Yapay zeka araçları ile prompt mühendisliği ve etik kurallar." },
    12: { title: "13. İFİG Sempozyumu", week: "12. Hafta", date: "15 May", description: "Sempozyum nedeniyle ders yapılmayacaktır. Sempozyuma katılım beklenir." },
    13: { title: "Portfolyo ve Kişisel Marka", week: "13. Hafta", date: "22 May", description: "Kürasyon, vaka analizi ve kişisel görsel kimliğinizi tanımlama." },
    14: { title: "Kurban Bayramı", week: "14. Hafta", date: "29 May", description: "Kurban Bayramı nedeniyle ders yapılmayacaktır." },
    15: { title: "FİNAL PORTFOLYOSU", week: "15. Hafta", date: "5 Haz", description: "Final dijital portfolyonuzun çevrimiçi teslimi." }
};

const mdxDir = path.join(process.cwd(), 'content/weeks');
const files = fs.readdirSync(mdxDir).filter(f => f.endsWith('.mdx'));

for (const file of files) {
    const weekMatch = file.match(/week-(\d+)\.mdx/);
    if (!weekMatch) continue;

    const weekNum = parseInt(weekMatch[1], 10);
    const trData = trDict[weekNum];

    if (trData) {
        const filePath = path.join(mdxDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContent);

        // Inject TR frontmatter
        parsed.data.title_tr = trData.title;
        parsed.data.week_tr = trData.week;
        parsed.data.date_tr = trData.date;
        parsed.data.description_tr = trData.description;

        // Write back
        const newMdx = matter.stringify(parsed.content, parsed.data);
        fs.writeFileSync(filePath, newMdx);
        console.log(`Updated frontmatter for ${file}`);
    }
}
