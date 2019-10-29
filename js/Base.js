const bases = new WeakMap()

function place(base,card,side) {
  bases.get(base).sides[side].unshift(card)
}
export default class Base {
  constructor(x, a) {
    bases.set(this,{
      owner: x,
      location: a,
      frozen: false,
      sides: [[],[]]
    })
  }
  get owner() {
    return bases.get(this).owner
  }
  set freeze(bool) {
    bases.get(this).frozen = true
  }
  get frozen() {
    return bases.get(this).frozen
  }
  get location() {
    return bases.get(this).location
  }
  set location(position) {
    bases.get(this).location = position
  }
  get scoreSides() {
    return bases.get(this).sides.map(side => {
      return side.reduce((acc,cur) => {
        switch(cur.type) {
          case 1:
          case 4:
          case 7: return acc += 1
          case 2:
          case 5:
          case 8: return acc += 2
        }
      },0)
    })
  }
  addToSide(card, side) {
    let {sides} = bases.get(this),
      played = card.type,
      top = sides[side][0] ? sides[side][0].type : null,
      second = sides[side][1] ? sides[side][1].type : null
    if(played === 12) {
      this.freeze
      return true
    }
    if(sides[side].length === 0) {
      switch(played) {
        case 1:
        case 4:
        case 7: place(this, card, side)
      }
      return true
    }
    else {
      switch(played) {
        case 1:
        case 2:
        case 3: {
          if(top === 1 || top === 2) {
            place(this, card, side)
            return true
          }
          else if(top === 11) {
            if(played === 1) {
              if(second === 3) {
                place(this, card, side)
                return true
              }
            }
          }
        }
        case 4:
        case 5:
        case 6: {
          if(top === 4 || top === 5) {
            place(this, card, side)
            return true
          }
          else if(top === 11) {
            if(place === 4) {
              if(second === 6) {
                place(this, card, side)
                return true
              }
            }
          }
        }
        case 7:
        case 8:
        case 9: {
          if(top === 7 || top === 8) {
            place(this, card, side)
            return true
          }
          else if(top === 11) {
            if(played === 7) {
              if(second === 9) {
                place(this, card, side)
                return true
              }
            }
          }
        } break;
        case 11: {
          switch(top) {
            case 3:
            case 6:
            case 9: place(this, card, side)
          }
        }
      }
    }
    return false
  }
}