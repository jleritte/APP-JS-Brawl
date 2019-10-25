import Card from './Card.js'

const discards = new WeakMap()

export default class Discard {
  constructor() {
    discards.set(this,{
      cards: []
    })
  }
  set store(card) {
    discards.get(this).cards.unshift(card)
  }

  get top() {
    return discards.get(this).cards[0] || new Card(-1)
  }

  get play() {
    return discards.get(this).cards.shift() || new Card(-1)
  }
}