const fs = require('fs');
const { performance } = require('perf_hooks');

let regexpOrigin = /[A-Z][a-z]{0,4}(\s[a-z]+)+\./;
let regexpLookAhead = /[A-Z][a-z]{0,4}(?=(\s[a-z]+))\1+\./;
let regexpLetterDiap = /[ABCDEFGHIJKLMNOPQRSTUVWQYZ][abcdefghijklmnopqrstuvwxyz]{0,4}(\s[abcdefghijklmnopqrstuvwxyz]+)+\./;
let regexpUnicode = /\p{Lu}\p{Ll}{0,4}(\s\p{Ll}+)+\./;
let regexpDiapToQuestions = /[A-Z][a-z]?[a-z]?[a-z]?[a-z]?(\s[a-z]+)+\./;
let regexpSToSpaces = /[A-Z][a-z]{0,4}( [a-z]+)+\./;


if (process.argv.length !== 4) {
  console.log('Usage: node benchmark.js <filename> <iteration>')
  process.exit(1)
}

function measure(data, pattern, iteration) {

  const regex = new RegExp(pattern, 'gu');
  let time = 0;
  for(let k = 0; k < 10 ; k++) {
  	for(let i = 0; i < iteration; i++) {
	  	const start = performance.now();

	  	const matches = data.match(regex);

	  	const end = performance.now();

	  	time += (end - start)/10;
  	}
  }

  console.log(pattern + '\n\t' + time);
}

const data = fs.readFileSync(process.argv[2], 'utf8');
const iter = process.argv[3];

measure(data, regexpOrigin, iter);
measure(data, regexpLetterDiap, iter);
measure(data, regexpUnicode, iter);
measure(data, regexpDiapToQuestions, iter);
measure(data, regexpSToSpaces, iter);




