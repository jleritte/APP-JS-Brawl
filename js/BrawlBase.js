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
  if(card.getType() == 12) {freeze = true; rtrn = true;}
  if(this.counts[side] == 0) {
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
        if(this.sides[side][this.counts[side] - 1].getType() == 1 || this.sides[side][this.counts[side] - 1].getType() == 2) {
          rtrn = this.placeCard(card, side);
        }
        else if(this.sides[side][this.counts[side] - 1].getType() == 11) {
          if(card.getType() == 1) {
            if(this.sides[side][this.counts[side] - 2].getType() == 3) {
              rtrn = this.placeCard(card, side);
            }
          }
        }
      }
      case 4:
      case 5:
      case 6: {
        if(this.sides[side][this.counts[side] - 1].getType() == 4 || this.sides[side][this.counts[side] - 1].getType() == 5) {
          rtrn = this.placeCard(card, side);
        }
        else if(this.sides[side][this.counts[side] - 1].getType() == 11) {
          if(card.getType() == 4) {
            if(this.sides[side][this.counts[side] - 2].getType() == 6) {
              rtrn = this.placeCard(card, side);
            }
          }
        }
      }
      case 7:
      case 8:
      case 9: {
        if(this.sides[side][this.counts[side] - 1].getType() == 7 || this.sides[side][this.counts[side] - 1].getType() == 8) {
          rtrn = this.placeCard(card, side);
        }
        else if(this.sides[side][this.counts[side] - 1].getType() == 11) {
          if(card.getType() == 7) {
            if(this.sides[side][this.counts[side] - 2].getType() == 9) {
              rtrn = this.placeCard(card, side);
            }
          }
        }
      }
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
  if(this.counts[side] <= 0)
    return this.sides[side][0];
  else
    return this.sides[side][this.counts[side] - 1];
}
function _scoreSide(side) {
  this.counts[side] = 0, j;
  for(j = 0; j < this.sides[side].length; j++) {
    if(this.sides[side][j] != null) {
      switch(this.sides[side][j].getType()) {
        case 1:
        case 4:
        case 7: this.counts[side] += 1;break;
        case 2:
        case 5:
        case 8: this.counts[side] += 2;break;
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
  if(this.freeze == true)
    freezeStr = 'True';
  else
    freezeStr = 'False';
  return freezeStr;
}

module.exports = BrawlBase;