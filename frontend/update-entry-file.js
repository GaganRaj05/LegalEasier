// update-entry-file.js
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const manifestPath = './dist/.vite/manifest.json';

// Check if manifest file exists
if (!existsSync(manifestPath)) {
  console.error('Error: Vite manifest file not found at', manifestPath);
  console.error('Make sure your vite.config.js has build.manifest: true');
  process.exit(1);
}

try {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  
  // Look for the main entry point (could be main.jsx, index.jsx, etc.)
  let entry;
  if (manifest['src/main.jsx']) {
    entry = manifest['src/main.jsx'].file;
  } else if (manifest['main.jsx']) {
    entry = manifest['main.jsx'].file;
  } else if (manifest['src/index.jsx']) {
    entry = manifest['src/index.jsx'].file;
  } else {
    // Find the first entry file
    const entryKey = Object.keys(manifest).find(key => 
      key.includes('main') || key.includes('index') || manifest[key].isEntry
    );
    
    if (entryKey) {
      entry = manifest[entryKey].file;
    } else {
      console.error('Error: Could not find entry point in manifest');
      console.error('Available keys:', Object.keys(manifest));
      process.exit(1);
    }
  }

  // Create a proper JSON file instead of JavaScript export
  // Create a proper JSON file (not JavaScript export)
  writeFileSync('./entry-file.json', JSON.stringify(entry));
  
  console.log('✅ Entry file updated:', entry);
  
} catch (error) {
  console.error('Error processing manifest:', error.message);
  process.exit(1);
}