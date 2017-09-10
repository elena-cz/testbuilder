var cardNetworks = [
  {
    network: 'Visa',
    validPrefixes: ['4'],
    validLengths: [13, 16, 19]
  },
  {
    network: 'MasterCard',
    validPrefixes: ['51', '52', '53', '54', '55'],
    validLengths: [16]    
  },
  {
    network: 'Diner\'s Club',
    validPrefixes: ['38', '39'],
    validLengths: [14]
  },
  {
    network: 'American Express',
    validPrefixes: ['34', '37'],
    validLengths: [15]
  },
  {
    network: 'Discover',
    validPrefixes: ['6011', '644', '645', '646', '647', '648', '649', '65'],
    validLengths: [16, 19]
  },
  {
    network: 'Maestro',
    validPrefixes: ['5018', '5020', '5038', '6304'],
    validLengths: [12, 13, 14, 15, 16, 17, 18, 19]
  },
  {
    network: 'China UnionPay',
    validPrefixes: ['624', '625', '626', '6282', '6283', '6284', '6285', '6286', '6287', '6288'],
    rangePrefixes: ['622126', '622925'],
    validLengths: [16, 17, 18, 19]
  },
  {
    network: 'Switch',
    validPrefixes: ['4903', '4905', '4911', '4936', '564182', '633110', '6333', '6759'],
    validLengths: [16, 18, 19]
  }
];


// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
if (!String.prototype.padEnd) {
    String.prototype.padEnd = function padEnd(targetLength,padString) {
        targetLength = targetLength>>0; //floor if number or convert non-number to 0;
        padString = String(padString || ' ');
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return String(this) + padString.slice(0,targetLength);
        }
    };
};

var generateCardNum = function(prefix, length) {
  return prefix.padEnd(length, '12345678901234567890');
};


var FILL_ME_IN = 'Fill this value in';
var should = chai.should();



cardNetworks.forEach(function(card){
  describe(card.network, function() {
    let prefixes = card.validPrefixes;
    let validLengths = card.validLengths;

    validLengths.forEach(function(length) {
      prefixes.forEach(function(prefix) {
        let cardNum = generateCardNum(prefix, length);
        it('has a prefix of ' + prefix + ' and a length of ' + length + '', function() {
          detectNetwork(cardNum).should.equal(card.network);
        });
      });
    
      if (card.hasOwnProperty('rangePrefixes')) {
        for (var i = Number(card.rangePrefixes[0]); i <= Number(card.rangePrefixes[1]); i++) {
          let cardNum = generateCardNum(i.toString(), length);
          it('has a prefix of ' + i.toString() + ' and a length of ' + length + '', function() {
            detectNetwork(cardNum).should.equal(card.network);
          });
        };
    };
    });
  });
}); 
