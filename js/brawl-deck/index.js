var  BrawlCard = require('brawl-card'),
  xtag = require('x-tag');

var BENNETT = [7,8,0,1,3,0,1,4,0,1,6,1,3],
    CHRIS =   [4,7,0,2,5,0,2,8,0,2,2,0,3],
    DARWIN =  [3,4,1,3,4,0,1,8,1,3,1,3,3],
    HALE =    [6,5,1,0,8,1,1,4,1,1,4,0,3],
    MORGAN =  [5,8,0,4,6,0,2,2,0,1,4,0,3],
    PEARL =   [5,7,1,1,7,1,1,1,0,1,5,2,3];
var DECKSIZE = 35;

xtag.register('brawl-deck',{
  accessors: {
    deck: {
      get: function() {
        return this._deck;
      },
      set: function(deck) {
        this._deck = deck;
      }
    },
    cardUsed: {
      get: function() {
        return this._cardUsed;
      },
      set: function(used) {
        this._cardUsed = used;
      }
    }
  },
  lifecycle: {
    created: function() {
      this.deck = [];
    },
    inserted: function() {
      this.shuffle();
      this.getDeck().forEach(function(card) {
        this.appendChild(card);
      }.bind(this));
      Array.prototype.forEach.call(this.children, function(card,i) {
        var lt;
        if (i < 7){
          lt = 20;
        } else if (i < 14) {
          lt = 15;
        } else if (i < 21) {
          lt = 10;
        } else if (i < 28) {
          lt = 5;
        } else if (i < 35) {
          lt = 0;
        }
        setTimeout(function(){
          card.style.zIndex = 170-i*5;
          card.style.left = this.offsetLeft+5-lt+'px';
          card.style.top = this.offsetTop + 8 + 'px';
          card.style.boxShadow = '0 0 0 black';
          card.style.opacity = 1;
          card.style.transform = '';
        }.bind(this),50*(36-i));
      }.bind(this));
      setTimeout(function(){this.children[0].dispatchEvent(new Event('click'));}.bind(this),3650);
    }
  },
  methods: {
    shuffle: _shuffle,
    cardsLeft: _cardsLeft,
    dealCard: _dealCard,
    getDeck: _getDeck,
    getDeckSize: _getDeckSize
  }
});


function buildDeck(deckBuilt, who) {
  this.deck = [DECKSIZE];
  var cardCt = 0, i;
  for(var type = 0; type < 13 ; type++) {
      for(i = 1; i <= deckBuilt[type]; i++) {
        this.deck[cardCt] = new BrawlCard(type, who);
        cardCt++;
      }
  }
  this.cardUsed = 0;
}


function BrawlDeck(character) {
  var deck = document.createElement('brawl-deck');
  switch(character) {
    case 'bennett':  buildDeck.bind(deck)(BENNETT, character);console.log('Bennett');break;
    case 'chris':    buildDeck.bind(deck)(CHRIS, character);console.log('Chris');break;
    case 'darwin':   buildDeck.bind(deck)(DARWIN, character);console.log('Darwin');break;
    case 'hale':     buildDeck.bind(deck)(HALE, character);console.log('Hale');break;
    case 'morgan':   buildDeck.bind(deck)(MORGAN, character);console.log('Morgan');break;
    case 'pearl':    buildDeck.bind(deck)(PEARL, character);console.log('Pearl');break;
  }
  return deck;
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
function _getDeck() {
  return this.deck;
}
function _getDeckSize() {
  return DECKSIZE;
}

module.exports = BrawlDeck;