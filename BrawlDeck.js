import 'BrawlCard.js';

var BENNETT = [7,8,0,1,3,0,1,4,0,1,6,1,3],
    CHRIS = [4,7,0,2,5,0,2,8,0,2,2,0,3],
    DARWIN = [3,4,1,3,4,0,1,8,1,3,1,3,3],
    HALE = [6,5,1,0,8,1,1,4,1,1,4,0,3],
    MORGAN = [5,8,0,4,6,0,2,2,0,1,4,0,3],
    PEARL = [5,7,1,1,7,1,1,1,0,1,5,2,3];
var DECKSIZE = 35;

function BrawlDeck(character,x) {
  var _private = {
    deck: undefined,
    cardUsed: undefined
  };
  function buildDeck(deckBuilt, player) {
    _private.deck = [DECKSIZE];
    var cardCt = 0, i;
    for(var type = 0; type < 13 ; type++) {
        for(i = 1; i <= deckBuilt[type]; i++) {
          _private.deck[cardCt] = new BrawlCard(type,player);
          cardCt++;
        }
    }
    _private.cardUsed = 0;
  };

  switch(character) {
    case 'Bennett':  buildDeck(BENNETT,x);console.log('Bennett');break;
    case 'Chris':    buildDeck(CHRIS,x);console.log('Chris');break;
    case 'Darwin':   buildDeck(DARWIN,x);console.log('Darwin');break;
    case 'Hale':     buildDeck(HALE,x);console.log('Hale');break;
    case 'Morgan':   buildDeck(MORGAN,x);console.log('Morgan');break;
    case 'Pearl':    buildDeck(PEARL,x);console.log('Pearl');break;
  }

  Object.defineProperties(this,{
    'shuffle': {
      value: _shuffle.bind(_private),
      enumerable: true
    },
    'cardsLeft': {
      value: _cardsLeft.bind(_private),
      enumerable: true
    },
    'dealCard': {
      value: _dealCard.bind(_private),
      enumerable: true
    },
    'getDeckSize': {
      value: _getDeckSize.bind(_private),
      enumerable: true
    }
  });
}

function _shuffle() {
  for(var i = 31; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    if(rand > 0) {
      temp = this.deck[i];
      this.deck[i] = this.deck[rand];
      this.deck[rand] = temp;
    }
  }
  this.cardUsed = 0;
}
function _cardsLeft() {
  return DECKSIZE-this.cardUsed;
}
function _dealCard() {
  this.cardUsed++;
  return this.deck[this.cardUsed - 1];
}
function _getDeckSize() {
  return DECKSIZE;
}

module.exports = BrawlDeck;