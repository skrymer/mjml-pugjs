const pug = require('pug');
const randomstring = require("randomstring");

// Compile the source code
const compiledFunction = pug.compileFile('mjml-template.mjml');

// Render a set of data
console.log(compiledFunction({
  name: 'Timothy'
}));
// "<p>Timothy's Pug source code!</p>"

// Render another set of data
console.log(compiledFunction({
  name: 'Forbes'
}));
// "<p>Forbes's Pug source code!</p>"

console.log(randomstring.generate())