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


//var generateTests = function() {
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
//};

/**
describe('Diner\'s Club', function() {
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  var prefixes = ['38', '39'];
  var validLengths = [14];

  validLengths.forEach(function(length) {
    prefixes.forEach(function(prefix) {
      var cardNum = generateCardNum(prefix, length);
      it('has a prefix of ' + prefix + ' and a length of ' + length + '', function() {
        detectNetwork(cardNum, cardNetworks).should.equal('Diner\'s Club');
      });
    });
  });
});

describe('American Express', function() {
  // The American Express network always starts with a 34 or 37 and is 15 digits long
  var prefixes = ['34', '37'];
  var validLengths = [15];

  validLengths.forEach(function(length) {
    prefixes.forEach(function(prefix) {
      var cardNum = generateCardNum(prefix, length);
      it('has a prefix of ' + prefix + ' and a length of ' + length + '', function() {
        detectNetwork(cardNum).should.equal('American Express');
      });
    });
  });
});

describe('Visa', function() {
  // Visa always has a prefix of 4 and a length of 13, 16, or 19.
  var prefixes = ['4'];
  var validLengths = [13, 16, 19];

  validLengths.forEach(function(length) {
    prefixes.forEach(function(prefix) {
      var cardNum = generateCardNum(prefix, length);
      it('has a prefix of ' + prefix + ' and a length of ' + length + '', function() {
        detectNetwork(cardNum).should.equal('Visa');
      });
    });
  });
});

describe('MasterCard', function() {
  // MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16
  var prefixes = ['51', '52', '53', '54', '55'];
  var validLengths = [16];

  validLengths.forEach(function(length) {
    prefixes.forEach(function(prefix) {
      var cardNum = generateCardNum(prefix, length);
      it('has a prefix of ' + prefix + ' and a length of ' + length + '', function() {
        detectNetwork(cardNum).should.equal('MasterCard');
      });
    });
  });
});

describe('Discover', function() {
  // Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
  var prefixes = ['6011', '644', '645', '646', '647', '648', '649', '65'];
  var validLengths = [16, 19];

  validLengths.forEach(function(length) {
    prefixes.forEach(function(prefix) {
      var cardNum = generateCardNum(prefix, length);
      it('has a prefix of ' + prefix + ' and a length of ' + length + '', function() {
        detectNetwork(cardNum).should.equal('Discover');
      });
    });
  });
});

describe('Maestro', function() {
  // Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
  var prefixes = ['5018', '5020', '5038', '6304'];
  var validLengths = [12, 13, 14, 15, 16, 17, 18, 19];

  validLengths.forEach(function(length) {
    prefixes.forEach(function(prefix) {
      var cardNum = generateCardNum(prefix, length);
      it('has a prefix of ' + prefix + ' and a length of ' + length + '', function() {
        detectNetwork(cardNum).should.equal('Maestro');
      });
    });
  });
});

describe('should support China UnionPay')
describe('should support Switch')
**/


