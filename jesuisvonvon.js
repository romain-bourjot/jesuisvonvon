'use strict';


const fs = require('fs');
const path = require('path');


let CIA = 0; // CURRENT INSTRUCTION ADDRESS
let EAX = 0; // CURRENT MEMORY ADDRESS
const DATA = [ 0 ]; // Memory
let NSA = 0; // NOT SAFE AFTER THIS POINT
let INS = [];

let READING = false;
let READING_CB = () => { return; };
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function( key ){
  if (key === '\u0003') {
    process.exit();
  }

  if (READING === true) {
    READING_CB(key);
    READING = false;
  }
});


// CORE LANG
function move_left() {
  if (EAX === 0) { throw new Error('SYNTAXERRRSYNTAXERRR !!!!!!NOMORESPACEONTHELEFT!!!!!! SYNTAXERRRSYNTAXERRR'); }

  EAX--; if (typeof DATA[EAX] === 'undefined') { DATA[EAX] = 0; }

  return Promise.resolve();
}

function move_right() {
  if (EAX === 32000) { throw new Error('SYNTAXERRRSYNTAXERRR !!!!!!NOMORESPACEONTHERIGHT!!!!!! SYNTAXERRRSYNTAXERRR'); }

  EAX++; if (typeof DATA[EAX] === 'undefined') { DATA[EAX] = 0; }

  return Promise.resolve();
}

function plus_plus() {
  DATA[EAX]++;

  if (DATA[EAX] === 256) { DATA[EAX] = 0; }

  return Promise.resolve();
}

function moins_moins() {
  DATA[EAX]--;

  if (DATA[EAX] === -1) { DATA[EAX] = 255; }

  return Promise.resolve();
}

function point() {
  if (DATA[EAX] === 0) {
    console.log(' ');
  } else {
    process.stdout.write(String.fromCharCode(DATA[EAX]));
  }

  return Promise.resolve();
}

function begin_loop() {
  if (DATA[EAX] !== 0) { return Promise.resolve(); }

  let EBX = 1;

  while (CIA < NSA) {
    CIA++;

    if (INS[CIA] === 7) {
      EBX++;
    } else if (INS[CIA] === 8) {
      EBX--;
    }

    if (EBX === 0) { return Promise.resolve(); }
  }

  throw Promise.reject('SYNTAXERRRSYNTAXERRR !!!!!!LOOP NOT ENDED!!!!!! SYNTAXERRRSYNTAXERRR');
}

function end_loop() {
  if (DATA[EAX] === 0) { return Promise.resolve(); }

  let EBX = 1;

  while (CIA > 0) {
    CIA--;

    if (INS[CIA] === 8) {
      EBX++;
    } else if (INS[CIA] === 7) {
      EBX--;
    }

    if (EBX === 0) { return Promise.resolve(); }
  }

  return Promise.reject('SYNTAXERRRSYNTAXERRR !!!!!!LOOP NOT ENDED!!!!!! SYNTAXERRRSYNTAXERRR');
}

function comma() {
  return new Promise((resolve) => {
    READING_CB = (key) => {
      let code = key.charCodeAt(0);
      DATA[EAX] = code === 13 ? 0 : code;
      return resolve();
    };
    READING = true;
  });
}





// WIZARD
const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error('Usage: node jesuisvonvon file.vonvon');
  process.exit();
}

const filename_arg = args[0].endsWith('.vonvon') ? args[0] : args[0]+'.vonvon';
const FILE = filename_arg.endsWith('.vonvon') ? path.join(__dirname, filename_arg) : path.join(__dirname, filename_arg)+'.vonvon';

if (!fs.existsSync(FILE)) { throw new Error('FILE "'+filename_arg+'" DOES NOT EXIST !!!!'); }

// MAGIC
const FILECONTENT = fs.readFileSync(FILE, 'utf8');
let processed = FILECONTENT.replace(/[0-9]/ig, '');

processed = processed.replace(/o+/gi, 'o');
processed = processed.replace(/vonvon/gi, '1');
processed = processed.replace(/je/gi, '2');
processed = processed.replace(/suis/gi, '3');
processed = processed.replace(/bonjour/gi, '4');
processed = processed.replace(/!/gi, '5');
processed = processed.replace(/,/gi, '6');
processed = processed.replace(/\[/gi, '7');
processed = processed.replace(/]/gi, '8');
processed = processed.replace(/[^0-9]/gi, '');

// MOAR MAGIC
for (let i = 0; i < processed.length; i++) {
  INS.push(Number.parseInt(processed.charAt(i)));
}

NSA = INS.length;




// SORCERY
function dostuff() {
  if (CIA >= NSA) { return Promise.resolve(); }

  let fn;

  if (INS[CIA] === 1) {
    fn = plus_plus();
  } else if (INS[CIA] === 2) {
    fn = move_right();
  } else if (INS[CIA] === 3) {
    fn = moins_moins();
  } else if (INS[CIA] === 4) {
    fn = point();
  } else if (INS[CIA] === 5) {
    fn = move_left();
  } else if (INS[CIA] === 6) {
    fn = comma();
  } else if (INS[CIA] === 7) {
    fn = begin_loop();
  } else if (INS[CIA] === 8) {
    fn = end_loop();
  }

  return fn.then(() => {
    CIA++;

    return dostuff();
  });
}

dostuff()
.then(() => { process.exit(0); })
.catch((err) => {
  console.log('');
  console.error(err.message);
  process.exit();
});
