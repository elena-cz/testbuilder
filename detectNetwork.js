// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long
  // Visa always has a prefix of 4 and a length of 13, 16, or 19.
  // MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16
  // Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
  // Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
  // China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  // Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.
  //Heads up! Switch and Visa seem to have some overlapping card numbers - in any apparent conflict, you should choose the network with the longer prefix.


  // Once you've read this, go ahead and try to implement this function, then return to the console.

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



var detectNetwork = function(cardNumber) {
  var matchingPrefixes = [];
  var matchingNetworks = [];

  cardNetworks.forEach(function(card) {
    var matchingPrefix = getMatchingPrefix(card.validPrefixes, cardNumber);
    if (matchingPrefix.length > 0 && isLengthMatch(card.validLengths, cardNumber.length)) {
    	matchingPrefixes.push(Number(matchingPrefix[0]));
    	matchingNetworks.push(card.network);
    };
    if (card.hasOwnProperty('rangePrefixes')) {
    	var prefixLength = card.rangePrefixes[0].length;
    	var cardPrefix = Number(cardNumber.substr(0, prefixLength));
    	if (cardPrefix >= Number(card.rangePrefixes[0]) && cardPrefix <= Number(card.rangePrefixes[1]) && isLengthMatch(card.validLengths, cardNumber.length)) {
		  matchingPrefixes.push(Number(matchingPrefix[0]));
    	  matchingNetworks.push(card.network);
    	};
    }
  });

  if (matchingPrefixes.length === 1) {
  	return matchingNetworks[0];
  } else if (matchingPrefixes.length > 1) {
  	return matchingNetworks[matchingPrefixes.indexOf(Math.max.apply(null, matchingPrefixes))];
  } else {
  	return 'Card not recognized';
  }
};

var getMatchingPrefix = function(validPrefixes, cardNumber) {
  return validPrefixes.filter(function(validPrefix) {
  	return cardNumber.startsWith(validPrefix);
  })
}

var isLengthMatch = function(validLengths, cardLength) {
  return validLengths.includes(cardLength);
};



