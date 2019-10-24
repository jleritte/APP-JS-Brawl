var BrawlCard = require('brawl-card'),
  BrawlDeck = require('brawl-deck'),
  xtag = require('x-tag');

xtag.register('brawl-discard',{
  accessors: {
    discard: {
      get: function() {
        return this._discard;
      },
      set: function(discard) {
        this._discard = discard;
      }
    }
  },
  lifecycle: {
    created: function() {
      this.discard = [];
      this.cardLocation = 0;
    },
    inserted: function() {
      var deck = BrawlDeck(this.getAttribute('who'));
      this.removeAttribute('who');
      this.appendChild(deck);
    }
  },
  methods: {
    setCard: _setCard.bind,
    getCard: _getCard.bind,
    playCard: _playCard.bind
  }
});

function BrawlDiscard(player,who) {
  var discard = document.createElement('brawl-discard');
  discard.className = 'p'+(++player);
  discard.setAttribute('who',who);
  return discard;
}

function _setCard(card) {
  this.discard[this.cardLocation] = card;
  this.cardLocation++;
}
function _getCard() {
  if(cardLocation >= 0) {
    return this.discard[cardLocation - 1];
  } else {
    return BrawlCard(-1);
  }
}
function _playCard() {
  this.cardLocation--;
  if(this.cardLocation < 0) {
    this.cardLocation = 0;
  }
  return this.discard[this.cardLocation];
}

module.exports = BrawlDiscard;