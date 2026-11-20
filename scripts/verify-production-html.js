/**
 * Production HTML & Content Leak Scanner
 * 
 * Scans prerendered HTML and RSC payloads in .next/server/app to ensure:
 * 1. Zero "TODO" or "[TODO" strings leaked to clients.
 * 2. Zero "Draft Content" debug labels leaked to clients.
 * 3. Zero "GOLD" raw debug chips leaked to clients.
 * 4. Zero un-rendered placeholder values or raw function artifacts.
 * 
 * Fails the build (exit code 1) if any forbidden string is detected.
 */

const fs = require('fs');
const path = require('path');

const FORBIDDEN_PATTERNS = [
  { name: 'TODO Marker', regex: /\[TODO[:\s]|TODO:/i },
  { name: 'Draft Content Label', regex: /Draft Content/i },
  { name: 'Raw GOLD Debug Chip', regex: />\s*GOLD\s*<|["']GOLD["']/ },
  { name: 'Raw placeholder function artifact', regex: /placeholder\(/ },
];

const APP_DIR = path.resolve(__dirname, '../.next/server/app');

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];

  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.regex.test(content)) {
      // Find line number
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (pattern.regex.test(line)) {
          violations.push({
            pattern: pattern.name,
            line: idx + 1,
            snippet: line.trim().substring(0, 120),
          });
        }
      });
    }
  }

  return violations;
}

function scanDirectory(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (/\.(html|rsc)$/.test(entry.name)) {
      fileList.push(fullPath);
    }
  }

  return fileList;
}

console.log('--- Scanning Production HTML / RSC Payloads for Forbidden Content ---');

if (!fs.existsSync(APP_DIR)) {
  console.log(`Notice: ${APP_DIR} does not exist yet. Run 'next build' first to generate static pages.`);
  process.exit(0);
}

const files = scanDirectory(APP_DIR);
console.log(`Scanning ${files.length} prerendered files in .next/server/app...`);

let totalViolations = 0;

for (const file of files) {
  const relPath = path.relative(path.resolve(__dirname, '..'), file);
  const violations = scanFile(file);

  if (violations.length > 0) {
    console.error(`\n❌ Violation detected in ${relPath}:`);
    violations.forEach((v) => {
      console.error(`   - [${v.pattern}] Line ${v.line}: "${v.snippet}"`);
      totalViolations++;
    });
  }
}

if (totalViolations > 0) {
  console.error(`\nFAILED: Found ${totalViolations} content leak(s) in production payloads.`);
  process.exit(1);
} else {
  console.log(`✓ ALL SCANS PASSED: 0 forbidden strings found across ${files.length} production files.`);
  process.exit(0);
}
