const fs = require('fs');
const path = require('path');

const weeksData = [
    { week: 'Week 4', date: 'Mar 20', title: 'Typography', desc: 'Font anatomy, pairing strategies, sizing, and building typographic hierarchy.', reading: 'Thinking with Type (Excerpt)' },
    { week: 'Week 5', date: 'Mar 27', title: 'Eid al-Fitr', desc: 'No class. Happy Eid! Enjoy the holiday with your friends and family.', reading: '' },
    { week: 'Week 6', date: 'Apr 3', title: 'Social Visuals & Motion', desc: 'Infographics, UI animation, and social media formats. How to tell compelling visual stories.', reading: 'Principles of Motion & Social Media Storytelling' },
    { week: 'Week 7', date: 'Apr 10', title: 'MIDTERM: Digital Campaign Kit', desc: 'No class session. Submit your 5-piece social media kit and infographic online by 23:59.', reading: '' },
    { week: 'Week 8', date: 'Apr 17', title: 'Intro to UX/UI', desc: 'Design thinking process. User flow vs. wireframe vs. prototype. Intro to Figma.', reading: 'The Design of Everyday Things (Chapter 1)' },
    { week: 'Week 9', date: 'Apr 24', title: 'Prototyping in Figma', desc: 'Components, auto layout, and linking screens to build an interactive high-fidelity prototype.', reading: 'Atomic Design (Excerpt)' },
    { week: 'Week 10', date: 'May 1', title: 'Labor Day', desc: 'No class. The workers are resting today, and so should you.', reading: '' },
    { week: 'Week 11', date: 'May 8', title: 'AI-Powered Design & Ethics', desc: 'Exploring Google Imagen, Gemini, and Antigravity. Prompt engineering combined with human design choices.', reading: 'AI and the Future of Design' },
    { week: 'Week 12', date: 'May 15', title: '13th IFIG Symposium', desc: 'No class. Due to the 13th International Communication Days Symposium, regular classes are suspended.', reading: '' },
    { week: 'Week 13', date: 'May 22', title: 'Portfolio & Personal Brand', desc: 'Curation, case study writing, and defining your personal visual identity (logo, colors).', reading: 'Building a UX Portfolio' },
    { week: 'Week 14', date: 'May 29', title: 'Eid al-Adha', desc: 'No class. Happy Eid! Have a wonderful and peaceful holiday with your loved ones.', reading: '' },
    { week: 'Week 15', date: 'Jun 5', title: 'FINAL PORTFOLIO', desc: 'Submit your finalized digital portfolio showcasing your best work.', reading: '' },
];

const contentDir = path.join(__dirname, '..', 'content', 'weeks');

weeksData.forEach((w, i) => {
    const filePath = path.join(contentDir, `week-${i + 4}.mdx`);
    const content = `---
title: "${w.title}"
week: "${w.week}"
date: "${w.date}"
description: "${w.desc}"
---

${w.desc}

${w.reading ? `## 📚 Weekly Reading\n- [${w.reading}](#)` : ''}
`;
    fs.writeFileSync(filePath, content);
});

console.log('Successfully generated missing MDX weeks.');
