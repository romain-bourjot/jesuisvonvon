import * as fs from 'fs';
import * as path from 'path';

const args: string[] = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: node string_compiler "string to encode" output_file');
  process.exit();
}

const filename: string = args[1].endsWith('.vonvon') ? args[1] : args[1] + '.vonvon';

const str: Buffer = Buffer.from(args[0], 'ascii');

let compiled: string = 'je ';
let current: number = 0;

for (let i = 0; i < str.length; i++) {
  if (str[i] > 255) {
    console.error('The string to encode must be in ASCII, unable to encode: "' + str[i] + '"');
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

// Write to current working directory instead of __dirname (which would be dist/)
fs.writeFileSync(path.join(process.cwd(), filename), compiled);
