/**
 * Content Report Stub / Utility
 * Scans content directory and reports verified items vs active placeholders.
 */

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content');

console.log('\n========================================');
console.log('📊 CONTENT VERIFICATION REPORT');
console.log('========================================\n');

if (!fs.existsSync(contentDir)) {
  console.error('Error: content directory not found.');
  process.exit(1);
}

const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.ts'));

let totalPlaceholders = 0;

files.forEach((file) => {
  const filePath = path.join(contentDir, file);
  const text = fs.readFileSync(filePath, 'utf-8');

  const todoMatches = text.match(/\[TODO:[^\]]+\]/g) || [];
  const placeholderFlags = text.match(/isPlaceholder:\s*true/g) || [];

  totalPlaceholders += todoMatches.length;

  console.log(`📄 content/${file}`);
  console.log(`   - [TODO] markers: ${todoMatches.length}`);
  console.log(`   - isPlaceholder flags: ${placeholderFlags.length}`);
});

console.log('\n----------------------------------------');
console.log(`Total unresolved [TODO] placeholders: ${totalPlaceholders}`);
console.log('Status: Single source of truth active.\n');
