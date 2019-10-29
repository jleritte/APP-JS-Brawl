import Base from './Base.js'

const field = new WeakMap()

export default class Field {
  constructor() {
    field.set(this,{
      alive: [new Base(1,'L'), new Base(2,'R')]
    })
  }
  toString() {
    return field.get(this).alive.reduce((acc,cur) => acc += cur.location,'')
  }
  get done() {
    return field.get(this).alive.reduce((acc,cur) => !acc ? acc : cur.frozen, true)
  }
  set playCard({location,side,card}) {
    let played
    field.get(this).alive.map(base => {
      if(base.location === location && !base.frozen) {
        played = base.addToSide(card,side)
      }
    })
  }
  set newBase({owner,location}) {
    let {alive} = field.get(this)
    if(alive.length < 3) {
      let nBase = new Base(owner,location)
      alive.push(nBase)
      field.get(this).alive = alive.map(base => {
        if(base.location === location && base !== nBase) {
          base.location = "M"
        } else if(base.location === "M") {
          base.location = location === "L" ? "R" : "L"
        }
        return base
      })
      return true
    }
    return false
  }
  set clearBase(location) {
    let {alive} = field.get(this)
    if(location !== 'M' && alive.length > 1) {
      field.get(this).alive = alive.reduce((acc, base,i) => {
        if(base.frozen || base.location !== location) {
          acc.push(base)
        }
        if(base.location === 'M') {
          base.location = location
        } else if(alive.length < 3) {
          base.location = 'M'
        }
        return acc
      },[])
    }
    return alive.length === field.get(this).alive.length
  }
  get finalScore() {
    return field.get(this).alive.reduce((acc,base) => {
      let [ p1, p2 ] = base.scoreSides
      p1 > p2 ? acc[0]++ : acc[1]++
      return acc
    },[0,0])
  }
}

// function _playToBase(a, y, card) {
//   var freeze = false, played = false, x;
//   if(this.inPlay.length === 1) {
//     x = 0;
//     freeze = this.checkFreeze(x);
//     if(!freeze) {
//       played = this.inPlay[x].addSide(card,y - 1);
//     }
//   }
//   else if(this.inPlay.length === 2 && a  !==  'M') {
//     x = this.findLocation(a);
//     freeze = this.checkFreeze(x);
//     if(!freeze) {
//       played = this.inPlay[x].addSide(card,y - 1);
//     }
//   }
//   else if(this.inPlay.length === 3) {
//     x = this.findLocation(a);
//     freeze = this.checkFreeze(x);
//     if(!freeze) {
//       played = this.inPlay[x].addSide(card,y - 1);
//     }
//   }
//   return played;
// }
