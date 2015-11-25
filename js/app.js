(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BrawlDeck = require('./BrawlDeck.js');
    BrawlDiscard = require('./BrawlDiscard.js');
    BrawlField = require('./BrawlField.js');

function Brawl(){
  var _private = {
    playArea: new BrawlField(1,2),
    deck: [],
    discard: [],
    currentCard: [],
    icons: [],
    count: 0
  };
  function init() {

  }
}

module.exports = Brawl;

// public class Brawl /*extends GameSearch*/ {
//   public static void main(String[] args) {
//     /*Object[] playerNum = {"1","2"};
//     String num = (String)JOptionPane.showInputDialog(null,"Number of Players","PlayMode",JOptionPane.PLAIN_MESSAGE,null,playerNum,playerNum[0]);*/
//     for(short i = 0; i < deck.length; i++) {
//       deck[i] = new BrawlDeck(getChar(),count);
//       discard[i] = new BrawlDiscard(deck[i].getDeckSize());
//       deck[i].shuffle();
//       currentCard[i] = deck[i].dealCard();
//       currentCard[i] = deck[i].dealCard();
//       discard[i].setCard(currentCard[i]);
//     }
//     boolean quit = false,played = false;
//     BrawlPanel bp = new BrawlPanel();
//   }
//   public static boolean exitValue() {
//     boolean quit = playArea.checkDone();
//     return quit;
//   }
//   public static String getChar() {
//     Object[] characters = {"Bennett","Chris","Darwin","Hale","Morgan","Pearl"};
//     String str = (String)JOptionPane.showInputDialog(null,"Please pick character","Character Selection",JOptionPane.PLAIN_MESSAGE,null,characters,characters[0]);
//     icons[count] = new BrawlIcons(str);
//     count++;
//     return str;
//   }
// }
},{"./BrawlDeck.js":4,"./BrawlDiscard.js":5,"./BrawlField.js":6}],2:[function(require,module,exports){
function BrawlBase(x, a) {
  var _private = {
    player: x,
    counts: [0,0],
    sides: [[],[]],
    location: a,
    freeze: false,
    placeCard: placeCard
  };

  function placeCard(card, side) {
    _private.sides[side][_private.counts[side]] = card;
    _private.counts[side]++;
    return true;
  }
  Object.defineProperties(this,{
    'addSide': {
      value: _addSide.bind(_private),
      enumerable: true
    },
    'getSide': {
      value: _getSide.bind(_private),
      enumerable: true
    },
    'scoreSide': {
      value: _scoreSide.bind(_private),
      enumerable: true
    },
    'getFreeze': {
      value: _getFreeze.bind(_private),
      enumerable: true
    },
    'getPlayer': {
      value: _getPlayer.bind(_private),
      enumerable: true
    },
    'getLocation': {
      value: _getLocation.bind(_private),
      enumerable: true
    },
    'setLocation': {
      value: _setLocation.bind(_private),
      enumerable: true
    },
    'getFreezeString': {
      value: _getFreezeString.bind(_private),
      enumerable: true
    }
  });
}

function _addSide(card, side) {
  var rtrn = false;
  if(card.getType() === 12) {freeze = true; rtrn = true;}
  if(this.counts[side] === 0) {
    switch(card.getType()) {
      case 1:
      case 4:
      case 7: rtrn = this.placeCard(card, side);
    }
  }
  else if(this.counts[side] > 0) {
    switch(card.getType()) {
      case 1:
      case 2:
      case 3: {
        if(this.sides[side][this.counts[side] - 1].getType() === 1 || this.sides[side][this.counts[side] - 1].getType() === 2) {
          rtrn = this.placeCard(card, side);
        }
        else if(this.sides[side][this.counts[side] - 1].getType() === 11) {
          if(card.getType() === 1) {
            if(this.sides[side][this.counts[side] - 2].getType() === 3) {
              rtrn = this.placeCard(card, side);
            }
          }
        }
      } break;
      case 4:
      case 5:
      case 6: {
        if(this.sides[side][this.counts[side] - 1].getType() === 4 || this.sides[side][this.counts[side] - 1].getType() === 5) {
          rtrn = this.placeCard(card, side);
        }
        else if(this.sides[side][this.counts[side] - 1].getType() === 11) {
          if(card.getType() === 4) {
            if(this.sides[side][this.counts[side] - 2].getType() === 6) {
              rtrn = this.placeCard(card, side);
            }
          }
        }
      } break;
      case 7:
      case 8:
      case 9: {
        if(this.sides[side][this.counts[side] - 1].getType() === 7 || this.sides[side][this.counts[side] - 1].getType() === 8) {
          rtrn = this.placeCard(card, side);
        }
        else if(this.sides[side][this.counts[side] - 1].getType() === 11) {
          if(card.getType() === 7) {
            if(this.sides[side][this.counts[side] - 2].getType() === 9) {
              rtrn = this.placeCard(card, side);
            }
          }
        }
      } break;
      case 11: {
        switch(this.sides[side][this.counts[side] - 1].getType()) {
          case 3:
          case 6:
          case 9: rtrn = this.placeCard(card, side);
        }
      }
    }
  }
  return rtrn;
}
function _getSide(side) {
  if(this.counts[side] <= 0) {
    return this.sides[side][0];
  } else {
    return this.sides[side][this.counts[side] - 1];
  }
}
function _scoreSide(side) {
  this.counts[side] = 0, j; //jshint ignore:line
  for(j = 0; j < this.sides[side].length; j++) {
    if(this.sides[side][j] !== null) {
      switch(this.sides[side][j].getType()) {
        case 1:
        case 4:
        case 7: this.counts[side] += 1; break;
        case 2:
        case 5:
        case 8: this.counts[side] += 2; break;
      }
    }
  }
  console.log('Base ' + location + ' p' + (side + 1) + ' landed '+ this.counts[side] +' hits');
  return this.counts[side];
}
function _getFreeze() {
  return this.freeze;
}
function _getPlayer() {
  return this.player;
}
function _getLocation() {
  return this.location;
}
function _setLocation(a) {
  this.location = a;
}
function _getFreezeString() {
  var freezeStr = ' ';
  if(this.freeze === true) {
    freezeStr = 'True';
  } else {
    freezeStr = 'False';
  }
  return freezeStr;
}

module.exports = BrawlBase;
},{}],3:[function(require,module,exports){
var BLANK = -1,
    BASE = 0,
    BLUEHIT = 1, BLUEHIT2 = 2, BLUEBLOCK = 3,
    GREENHIT = 4, GREENHIT2 = 5, GREENBLOCK = 6,
    REDHIT = 7, REDHIT2 = 8, REDBLOCK = 9,
    CLEAR = 10,
    PRESS = 11,
    FREEZE = 12;

function BrawlCard(theType,play) {
  var _private = {
    player: play,
    type: theType
  };

  Object.defineProperties(this,{
    'getType': {
      value: _getType.bind(_private),
      emunerable: true
    },
    'toString': {
      value: _toString.bind(_private),
      emunerable: true
    },
    'getPlayer': {
      value: _getPlayer.bind(_private),
      emunerable: true
    }
  });
}

function _getType() {
  return this.type;
}
function _toString() {
  switch(this.type) {
    case BLUEHIT:   return 'Blue Hit';
    case BLUEHIT2:  return 'Blue Hit-2';
    case BLUEBLOCK: return 'Blue Block';
    case GREENHIT:  return 'Green Hit';
    case GREENHIT2: return 'Green Hit-2';
    case GREENBLOCK:return 'Green Block';
    case REDHIT:    return 'Red Hit';
    case REDHIT2:   return 'Red Hit-2';
    case REDBLOCK:  return 'Red Block';
    case BASE:      return 'Base';
    case CLEAR:     return 'Clear';
    case PRESS:     return 'Press';
    case FREEZE:    return 'Freeze';
    default:        return '??';
  }
}
function _getPlayer() {
  return this.player;
}

module.exports = BrawlCard;
},{}],4:[function(require,module,exports){
var  BrawlCard = require('./BrawlCard.js');

var BENNETT = [7,8,0,1,3,0,1,4,0,1,6,1,3],
    CHRIS =   [4,7,0,2,5,0,2,8,0,2,2,0,3],
    DARWIN =  [3,4,1,3,4,0,1,8,1,3,1,3,3],
    HALE =    [6,5,1,0,8,1,1,4,1,1,4,0,3],
    MORGAN =  [5,8,0,4,6,0,2,2,0,1,4,0,3],
    PEARL =   [5,7,1,1,7,1,1,1,0,1,5,2,3];
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
  }

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
},{"./BrawlCard.js":3}],5:[function(require,module,exports){
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
    return new BrawlCard(-1,0);
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
},{"./BrawlCard.js":3}],6:[function(require,module,exports){
var BrawlBase = require('./BrawlBase.js');

function BrawlField(p1, p2) {
  var _private = {
    inPlay: [new BrawlBase(p1,'L'),
            new BrawlBase(p2,'R')],
    p1Score: 0,
    p2Score: 0,
    checkFreeze: checkFreeze,
    findLocation: findLocation
  };
  function checkFreeze(x) {
    return _private.inPlay[x].getFreeze();
  }
  function findLocation(a) {
    var i = -1;
    do {
      i++;
      if(_private.inPlay[i].getLocation() === a) {
        return i;
      }
    }
    while(i < _private.inPlay.length);
    return 3;
  }
  Object.defineProperties(this,{
    'addNewBase': {
      value: _addNewBase.bind(_private),
      enumerable: true
    },
    'clearBase': {
      value: _clearBase.bind(_private),
      enumerable: true
    },
    'playToBase': {
      value: _playToBase.bind(_private),
      enumerable: true
    },
    'checkDone': {
      value: _checkDone.bind(_private),
      enumerable: true
    },
    'calculateScore': {
      value: _calculateScore.bind(_private),
      enumerable: true
    },
    'check': {
      value: _check.bind(_private),
      enumerable: true
    },
    'getSize': {
      value: _getSize.bind(_private),
      enumerable: true
    }
  });
}

function _addNewBase(player, a) {
  var x, rtrn = false;
  if(this.inPlay.length < 3) {
    if(this.inPlay.length > 1) {
      x = this.findLocation(a);
      this.inPlay[x].setLocation('M');
      this.inPlay.push(new BrawlBase(player,a));
    }
    else if(this.inPlay.length === 1) {
      this.inPlay.push(new BrawlBase(player,a));
      switch(a) {
        case 'L': {a = 'R';break;}
        case 'R': {a = 'L';break;}
      }
      x = this.findLocation('M');
      this.inPlay[x].setLocation(a);
    }
    rtrn = true;
  }
  return rtrn;
}
function _clearBase(a) {
  var x, freeze, rtrn = false;
  if(a  !==  'M' && this.inPlay.length  !==  1) {
    x = this.findLocation(a);
    freeze = this.checkFreeze(x);
    if(!freeze) {
      this.inPlay.splice(x,1);
      if(this.inPlay.length > 1) {
        x = this.findLocation('M');
        this.inPlay[x].setLocation(a);
      }
      else if(this.inPlay.length === 1) {
        switch(a) {
          case 'L': {a = 'R';break;}
          case 'R': {a = 'L';break;}
        }
        x = this.findLocation(a);
        this.inPlay[x].setLocation('M');
      }
      rtrn = true;
    }
  }
  return rtrn;
}
function _playToBase(a, y, card) {
  var freeze = false, played = false, x;
  if(this.inPlay.length === 1) {
    x = 0;
    freeze = this.checkFreeze(x);
    if(!freeze) {
      played = this.inPlay[x].addSide(card,y - 1);
    }
  }
  else if(this.inPlay.length === 2 && a  !==  'M') {
    x = this.findLocation(a);
    freeze = this.checkFreeze(x);
    if(!freeze) {
      played = this.inPlay[x].addSide(card,y - 1);
    }
  }
  else if(this.inPlay.length === 3) {
    x = this.findLocation(a);
    freeze = this.checkFreeze(x);
    if(!freeze) {
      played = this.inPlay[x].addSide(card,y - 1);
    }
  }
  return played;
}
function _checkDone() {
  var freeze = [false,false,false], done = false, i;
  for(i = 0; i < this.inPlay.length; i++) {
    freeze[i] = this.inPlay[i].getFreeze();
  }
  if(this.inPlay.length === 1) {
    if(freeze[0]) {
      done = true;
    }
  }
  else if(this.inPlay.length === 2) {
    if(freeze[0] && freeze[1]) {
      done = true;
    }
  }
  else if(this.inPlay.length === 3) {
    if(freeze[0] === true&&freeze[1] === true&&freeze[2] === true) {
      done = true;
    }
  }
    return done;
}
function _calculateScore() {
  var p1Count=0, p2Count=0, i;
  for(i = 0; i < this.inPlay.length; i++) {
    p1Count = this.inPlay[i].scoreSide(0);
    p2Count = this.inPlay[i].scoreSide(1);
    if(p1Count === p2Count) {
      if(this.inPlay[i].getPlayer() === 1) {
        p1Score += 1;
      } else {
        p2Score += 1;
      }
    } else if(p1Count > p2Count) {
      p1Score += 1;
    } else {
      p2Score += 1;
    }
  }
  console.log("Pleyer 1 score:" + p1Score);
  console.log("Player 2 score:" + p2Score);
  if(p1Score > p2Score) {
    return 1;
  } else if(p1Score < p2Score) {
    return 2;
  } else {
    return 0;
  }
}
function _check(i) {
  return this.inPlay[i];
}
function _getSize() {
  return this.inPlay.length;
}

module.exports = BrawlField;
},{"./BrawlBase.js":2}]},{},[1]);
