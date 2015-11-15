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