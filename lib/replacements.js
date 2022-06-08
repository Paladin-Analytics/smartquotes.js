const pL = "a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ";
const word = `[${pL}_0-9]`;
const nonWord = `[^${pL}_0-9]`;

module.exports = [
  [
    /'n'/g,
    "\u2019n\u2019",
  ],
  [
    /(')(cause|em|nother|cept|fraid|nuff|bout|im|ir|fore|round|n|til)([.,!? \\s\\n\\r]|$)/gm,
    "\u2019$2$3",
  ],
  [/([a-z.,?!])'([a-z]{0,2})(\n|\r|\s| )/g, "$1\u2019$2$3"],
  [/^'(\s| )/, "\u2019$1"],
  [
    // triple prime
    (/'''/g, (retainLength) => "\u2034" + (retainLength ? "\u2063\u2063" : "")),
  ],
  // EMDASH support
  [/(—)"/, "$1\u201c"],
  [/"(—)/, "\u201d$1"],

  // Triple dot support
  [/"(...)/, "\u201c$1"], // triple dots
  [/'(...|\u2026)/, "\u2018$1"],
  // beginning "
  [
    new RegExp(`([${pL}_0-9 ]|^)"(?!\\s)([${pL}_—\u2026\{\[\('0-9]{1,}])`, "g"),
    "$1\u201c$2",
  ],
  [new RegExp(`(\\n|\\r|\\s| )"`, "g"), "$1\u201c"],
  // ending "
  [new RegExp(`"`, "g"), "\u201d"],
  // [/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, "$1\u201d$2"],
  // // remaining " at end of word
  // [/([^0-9])"/g, "$1\u201d"],
  // double prime as two single quotes
  [/''/g, (retainLength) => "\u2033" + (retainLength ? "\u2063" : "")],
  // prime
  [/([0-9]{1,})'([0-9]{1,})/g, "$1\u2032$2"],
  // conjunction's possession
  // [new RegExp(`(${word})'([${pL}])`, "ig"), "$1\u2019$2"],
  // New Conjunction Test:
  // [
  //   new RegExp(`([a-z]{0,}| )'([a-z]{1,}| )`, "g"),
  //   "$1\u2019$2",
  // ],

  // beginning '
  // [new RegExp(`(\s ]|^)'(?!\s)(${word})`, "g"), "$1\u2018$2"],
  [/([\s ]|^)'(?!([\n\r\s\u0020 g]))/gm, "$1\u2018"],

  // abbrev. years like '93
  [
    new RegExp(
      `(\\u2018)([0-9]{2}[^\\u2019]*)(\\u2018([^0-9]|$)|$|\\u2019[${pL}])`,
      "ig"
    ),
    "\u2019$2$3",
  ],

  // ending '
  // [new RegExp(`((\\u2018[^']*)|[${pL}])'([^0-9]|$)`, "ig"), "$1\u2019$3"],
  // backwards apostrophe
  // [
  //   new RegExp(
  //     `(\\B|^)\\u2018(?=([^\\u2018\\u2019]*\\u2019\\b)*([^\\u2018\\u2019]*\\B${nonWord}[\\u2018\\u2019]\\b|[^\\u2018\\u2019]*$))`,
  //     "ig"
  //   ),
  //   "$1\u2019",
  // ],
  // closing curly quote preceding number -> double prime quote
  [/([0-9]{1,})(”)/g, "$1\u2033"],
  // double straigt quotes -> closing curly quote
  [/"/g, "\u201d"],
  //single closing quote
  [/'/g, "\u2019"],
];
