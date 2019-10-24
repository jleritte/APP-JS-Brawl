var xtag = require('x-tag');

var BLANK = -1,
    BASE = 0,
    BLUEHIT = 1, BLUEHIT2 = 2, BLUEBLOCK = 3,
    GREENHIT = 4, GREENHIT2 = 5, GREENBLOCK = 6,
    REDHIT = 7, REDHIT2 = 8, REDBLOCK = 9,
    CLEAR = 10,
    PRESS = 11,
    FREEZE = 12;

xtag.register('brawl-card',{
  accessors:{
    type: {
      get: function() {
        return this._type;
      },
      set: function(type) {
        this._type = type;
      }
    }
  },
  events: {
    click: function() {
      if(!this.className.match('flipped')){
        this.className += ' flipped';
      }
    }
  },
  methods: {
    toString: _toString
  }
});

xtag.register('bennett-card',{
  extends: 'brawl-card'
});

xtag.register('chris-card',{
  extends: 'brawl-card'
});

xtag.register('darwin-card',{
  extends: 'brawl-card'
});

xtag.register('hale-card',{
  extends: 'brawl-card'
});

xtag.register('morgan-card',{
  extends: 'brawl-card'
});

xtag.register('pearl-card',{
  extends: 'brawl-card'
});

function BrawlCard(theType, who) {
  var card = document.createElement('brawl-card',who + '-card');

  card.type = theType;
  card.className = card.toString();

  return card;
}

function _toString() {
  switch(this.type) {
    case BLUEHIT:   return 'hitB';
    case BLUEHIT2:  return 'hitB2';
    case BLUEBLOCK: return 'blockB';
    case GREENHIT:  return 'hitG';
    case GREENHIT2: return 'hitG2';
    case GREENBLOCK:return 'blockG';
    case REDHIT:    return 'hitR';
    case REDHIT2:   return 'hitR2';
    case REDBLOCK:  return 'blockR';
    case BASE:      return 'base';
    case CLEAR:     return 'clear';
    case PRESS:     return 'press';
    case FREEZE:    return 'freeze';
    default:        return '??';
  }
}

module.exports = BrawlCard;