const BLANK = -1,
    BASE = 0,
    BLUEHIT = 1, BLUEHIT2 = 2, BLUEBLOCK = 3,
    GREENHIT = 4, GREENHIT2 = 5, GREENBLOCK = 6,
    REDHIT = 7, REDHIT2 = 8, REDBLOCK = 9,
    CLEAR = 10,
    PRESS = 11,
    FREEZE = 12

const cards = new WeakMap()

export default class Card {
  constructor(type) {
    cards.set(this,{
      type
    })
  }
  get type() {
    return cards.get(this).type
  }
  toString() {
    switch(cards.get(this).type) {
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
}