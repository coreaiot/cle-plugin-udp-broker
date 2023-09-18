#!/usr/bin/env node

const { readFileSync, writeFileSync, mkdirSync } = require('fs');
const { join } = require('path');
const { deflate } = require('zlib');

const cwd = process.cwd();
const p = require(cwd + '/package.json');

const configFields = require(cwd + '/build/plugin').config.fields;

const config = {};
for (const f of configFields) {
  config[f.name] = f.value;
}
const json5 = Buffer.from(JSON.stringify({
  name: p.name,
  version: p.version,
  enabled: true,
  debug: false,
  config,
}, null, 2));

console.log(json5.toString())

const js = readFileSync(cwd + '/build/plugin.js');

const magic = Buffer.from('CLE_PLUGIN');

const head = Buffer.alloc(4);
head.writeUint32LE(json5.length);

const buffer = Buffer.concat([magic, head, json5, js]);
deflate(buffer, (err, out) => {
  const dir = join(cwd, 'release');
  const savedTo = join(dir, `${p.name}-${p.version}.cp`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(savedTo, out);
  console.log('File saved to', savedTo);
});