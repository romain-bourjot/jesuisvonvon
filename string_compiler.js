'use strict';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: node string_compiler "string to encode" output_file');
  process.exit();
}

const filename = args[1].endsWith('.vonvon') ? args[1] : args[1]+'.vonvon';

let str = new Buffer.from(args[0], 'ascii');

let compiled = 'je ';
let current = 0;

for (let i = 0; i < str.length; i++) {

  if (str[i] > 255) {
    console.error('The string to encode must be in ASCII, unable to encode: "'+str.charAt(i)+'"');
    process.exit();
  }

  if (str[i] > current) {
    for (let j = 0; j < str[i] - current; j++) {
      compiled += 'vonvon ';
    }
  } else {
    for (let j = 0; j < current - str[i]; j++) {
      compiled += 'suis ';
    }
  }

  current = str[i];

  compiled += '\r\nbonjour ';
}

const fs = require('fs');
const path = require('path');

fs.writeFileSync(path.join(__dirname, filename), compiled);
