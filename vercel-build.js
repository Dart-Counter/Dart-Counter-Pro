#!/usr/bin/env node

// This script is executed by Vercel during the build process
console.log('Starting Vercel build process...');

// Import the required modules
const { execSync } = require('child_process');

try {
  // Run the build command
  console.log('Building client and server...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Vercel build completed successfully!');
} catch (error) {
  console.error('Vercel build failed:', error);
  process.exit(1);
}