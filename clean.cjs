const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/portfolio.json', 'utf8'));

function htmlToMarkdown(html) {
    if (!html) return '';
    let md = html.replace(/&nbsp;/g, ' ');
    md = md.replace(/<h2>/gi, '\n\n## ');
    md = md.replace(/<\/h2>/gi, '\n\n');
    md = md.replace(/<h3>/gi, '\n\n### ');
    md = md.replace(/<\/h3>/gi, '\n\n');
    md = md.replace(/<p>/gi, '\n\n');
    md = md.replace(/<\/p>/gi, '\n\n');
    md = md.replace(/<strong>/gi, '**');
    md = md.replace(/<\/strong>/gi, '**');
    md = md.replace(/<em>/gi, '*');
    md = md.replace(/<\/em>/gi, '*');
    md = md.replace(/<ul>/gi, '\n\n');
    md = md.replace(/<\/ul>/gi, '\n\n');
    md = md.replace(/<ol>/gi, '\n\n');
    md = md.replace(/<\/ol>/gi, '\n\n');
    md = md.replace(/<li>/gi, '* ');
    md = md.replace(/<\/li>/gi, '\n');
    md = md.replace(/<br\s*\/?>/gi, '\n');
    // Remove any remaining tags
    md = md.replace(/<[^>]+>/g, '');
    // Clean up extra newlines
    md = md.replace(/\n{3,}/g, '\n\n');
    return md.trim();
}

data.forEach(p => {
    p.content = htmlToMarkdown(p.content);
    p.desc = htmlToMarkdown(p.desc);
    p.challenge = htmlToMarkdown(p.challenge);
    p.solution = htmlToMarkdown(p.solution);
});

fs.writeFileSync('src/data/portfolio.json', JSON.stringify(data, null, 2));
console.log('Cleaned HTML to Markdown in portfolio.json');
