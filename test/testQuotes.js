const fs = require('fs');


const convertToSmartQuotes = () => {

    const smartquotes = require('../dist/smartquotes');

    const testString = fs.readFileSync('./input.txt', {encoding: 'utf8', flag: 'r'});

    console.log("before >>>", testString);

    const quotedString = smartquotes(testString);

    console.log("after >>>", quotedString);

    fs.writeFileSync('output.txt', quotedString, {encoding: 'utf-8'});

};


convertToSmartQuotes();



