/**
 * Content Status & Placeholder Audit Report
 *
 * Scans all /content modules and prints every pending placeholder
 * grouped by chapter, along with overall status metrics.
 */

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content');

console.log('\n===============================================================');
console.log('📊 DOCUMENTARY CONTENT AUDIT & PLACEHOLDER REGISTRY');
console.log('===============================================================\n');

if (!fs.existsSync(contentDir)) {
  console.error('Error: /content directory not found.');
  process.exit(1);
}

const files = [
  'narration.ts',
  'chapters.ts',
  'projects.ts',
  'designWork.ts',
  'aiWork.ts',
  'timeline.ts',
  'beyond.ts',
  'contact.ts',
  'commentary.ts',
  'sound.ts',
];

const chapterGroups = {
  Prologue: [],
  'Chapter 01 (Curiosity)': [],
  'Chapter 02 (Discovery)': [],
  'Chapter 03 (Creation)': [],
  'Chapter 04 (Expression)': [],
  'Chapter 05 (Exploration)': [],
  'Chapter 06 (Growth)': [],
  'Chapter 07 (Possibility)': [],
  Epilogue: [],
  'General / Site-Wide': [],
};

let totalConfirmed = 0;
let totalDraft = 0;
let totalPlaceholder = 0;

function classifyChapter(filePath, contextStr, key) {
  const lower = (filePath + ' ' + contextStr + ' ' + key).toLowerCase();
  if (lower.includes('prologue')) return 'Prologue';
  if (lower.includes('chapter-01') || lower.includes('ch01') || lower.includes('curiosity')) return 'Chapter 01 (Curiosity)';
  if (lower.includes('chapter-02') || lower.includes('ch02') || lower.includes('worlds') || lower.includes('discovery')) return 'Chapter 02 (Discovery)';
  if (lower.includes('chapter-03') || lower.includes('ch03') || lower.includes('projects') || lower.includes('sahyog') || lower.includes('librarium') || lower.includes('campus') || lower.includes('irdms') || lower.includes('creation')) return 'Chapter 03 (Creation)';
  if (lower.includes('chapter-04') || lower.includes('ch04') || lower.includes('design') || lower.includes('typography') || lower.includes('expression')) return 'Chapter 04 (Expression)';
  if (lower.includes('chapter-05') || lower.includes('ch05') || lower.includes('ai') || lower.includes('intelligence') || lower.includes('exploration')) return 'Chapter 05 (Exploration)';
  if (lower.includes('chapter-06') || lower.includes('ch06') || lower.includes('scale') || lower.includes('growth')) return 'Chapter 06 (Growth)';
  if (lower.includes('chapter-07') || lower.includes('ch07') || lower.includes('beyond') || lower.includes('possibility')) return 'Chapter 07 (Possibility)';
  if (lower.includes('epilogue') || lower.includes('contact')) return 'Epilogue';
  return 'General / Site-Wide';
}

files.forEach((file) => {
  const fullPath = path.join(contentDir, file);
  if (!fs.existsSync(fullPath)) return;

  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    // Count statuses
    const confirmedMatches = (line.match(/confirmed\(/g) || []).length;
    const draftMatches = (line.match(/draft\(/g) || []).length;
    const placeholderMatches = (line.match(/placeholder\(/g) || []).length;

    totalConfirmed += confirmedMatches;
    totalDraft += draftMatches;
    totalPlaceholder += placeholderMatches;

    // Detect placeholder items
    if (line.includes('placeholder(') || line.includes("'placeholder'") || line.includes('"placeholder"')) {
      // Extract hint / text
      const match = line.match(/placeholder\(\s*(['"`])(.*?)\1(?:\s*,\s*(['"`])(.*?)\3)?\s*\)/);
      let desc = '';
      if (match) {
        desc = match[4] || match[2] || 'Unspecified placeholder';
      } else {
        desc = line.trim();
      }

      // Look back a few lines for context
      const prevContext = lines.slice(Math.max(0, idx - 6), idx + 1).join(' ');
      const group = classifyChapter(file, prevContext, line);
      chapterGroups[group].push({
        file: `content/${file}`,
        line: idx + 1,
        description: desc,
      });
    }
  });
});

for (const [groupName, items] of Object.entries(chapterGroups)) {
  console.log(`\n📌 ${groupName} [${items.length} pending]:`);
  if (items.length === 0) {
    console.log('   ✓ All content fields verified and ready.');
  } else {
    items.forEach((item) => {
      console.log(`   - [${item.file}:${item.line}] ${item.description}`);
    });
  }
}

console.log('\n---------------------------------------------------------------');
console.log('📈 CONTENT METRICS SUMMARY:');
console.log(`   - Confirmed fields : ${totalConfirmed}`);
console.log(`   - Verified Drafts  : ${totalDraft}`);
console.log(`   - Open Placeholders: ${totalPlaceholder}`);
console.log('---------------------------------------------------------------');
console.log('Production Policy: Placeholders render nothing in production.');
console.log('Dev Policy: Quiet [TODO] chip rendered only when NEXT_PUBLIC_DEBUG_CONTENT=1.');
console.log('===============================================================\n');
