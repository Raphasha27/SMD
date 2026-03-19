const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Safer exclusion using absolute paths to avoid accidental matches in src/
const exclusionList = [
  path.resolve(__dirname, '.venv'),
  path.resolve(__dirname, 'backend'),
  path.resolve(__dirname, 'scripts'),
  path.resolve(__dirname, 'web'),
  path.resolve(__dirname, '.git'),
];

config.resolver.blockList = exclusionList.map(
  (p) => new RegExp(p.replace(/[\\\/]/g, '[\\\\/]') + '.*')
);

module.exports = config;
