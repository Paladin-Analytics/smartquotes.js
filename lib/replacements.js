const pL = 'a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ';
const word = `[${pL}_0-9]`;
const nonWord = `[^${pL}_0-9]`;

// /([a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ_0-9 ])"([a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\[\(\{_—'.0-9])/g

module.exports = [
  // triple prime
  [/'''/g, retainLength => '\u2034' + (retainLength ? '\u2063\u2063' : '')],
  // beginning "
  [new RegExp(`([${word} ])"([${pL}\[\(\{_—'.0-9])`, 'g'), '$1\u201c$2'],
  // ending "
  [/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2'],
  // remaining " at end of word
  [/([^0-9])"/g, '$1\u201d'],
  // double prime as two single quotes
  [/''/g, retainLength => '\u2033' + (retainLength ? '\u2063' : '')],
  // beginning '
  [new RegExp(`(${nonWord}|^)'(\\S)`, 'g'), '$1\u2018$2'],
  // conjunction's possession
  [new RegExp(`(${word})'([${pL}])`, 'ig'), '$1\u2019$2'],
  // abbrev. years like '93
  [new RegExp(`(\\u2018)([0-9]{2}[^\\u2019]*)(\\u2018([^0-9]|$)|$|\\u2019[${pL}])`, 'ig'), '\u2019$2$3'],
  // ending '
  [new RegExp(`((\\u2018[^']*)|[${pL}])'([^0-9]|$)`, 'ig'), '$1\u2019$3'],
  // backwards apostrophe
  [new RegExp(`(\\B|^)\\u2018(?=([^\\u2018\\u2019]*\\u2019\\b)*([^\\u2018\\u2019]*\\B${nonWord}[\\u2018\\u2019]\\b|[^\\u2018\\u2019]*$))`, 'ig'), '$1\u2019'],
  // double straigt quotes -> closing curly quote
  [/"/g, '\u201d'],
  // closing curly quote preceding number -> double prime quote
  [/([1-9]{1,})(”)/g, '$1\u2033'],
  // prime
  [/'/g, '\u2032']
];
