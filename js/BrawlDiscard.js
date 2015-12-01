var BrawlCard = require('./BrawlCard.js');

function BrawlDiscard() {
  var _private = {
    discard: [],
    cardLocation: 0
  };

  Object.defineProperties(this,{
    'setCard': {
      value: _setCard.bind(_private),
      enumerable: true
    },
    'getCard': {
      value: _getCard.bind(_private),
      enumerable: true
    },
    'playCard': {
      value: _playCard.bind(_private),
      enumerable: true
    }
  });
}

function _setCard(card) {
  this.discard[this.cardLocation] = card;
  this.cardLocation++;
}
function _getCard() {
  if(cardLocation >= 0) {
    return this.discard[cardLocation - 1];
  } else {
    return new BrawlCard(-1);
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