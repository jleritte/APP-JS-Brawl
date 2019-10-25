import Card from './Card.js'

const BENNETT = [7,8,0,1,3,0,1,4,0,1,6,1,3],
      CHRIS =   [4,7,0,2,5,0,2,8,0,2,2,0,3],
      DARWIN =  [3,4,1,3,4,0,1,8,1,3,1,3,3],
      HALE =    [6,5,1,0,8,1,1,4,1,1,4,0,3],
      MORGAN =  [5,8,0,4,6,0,2,2,0,1,4,0,3],
      PEARL =   [5,7,1,1,7,1,1,1,0,1,5,2,3]
const DECKSIZE = 35,
      decks = new WeakMap()


export default class Deck {
  constructor(who) {
    let deck
    switch(who.toLowerCase()) {
      case 'bennett':  deck = buildDeck(BENNETT);console.log('Bennett');break;
      case 'chris':    deck = buildDeck(CHRIS);console.log('Chris');break;
      case 'darwin':   deck = buildDeck(DARWIN);console.log('Darwin');break;
      case 'hale':     deck = buildDeck(HALE);console.log('Hale');break;
      case 'morgan':   deck = buildDeck(MORGAN);console.log('Morgan');break;
      case 'pearl':    deck = buildDeck(PEARL);console.log('Pearl');break;
    }
    shuffle(deck)
    decks.set(this,{
      deck,
      who
    })
  }
  get cards() {
    return decks.get(this).deck
  }
  get count() {
    return decks.get(this).deck.length
  }
  get deal() {
    return decks.get(this).deck.shift() || new Card(-1)
  }
  get who() {
    return decks.get(this).who
  }
  toString() {
    return this.who
  }
}

function buildDeck(deckBuilt, who) {
  let deck = new Array(DECKSIZE)
  let cardCt = 0
  for(let type = 0; type < 13 ; type++) {
      for(let i = 1; i <= deckBuilt[type]; i++) {
        deck[cardCt++] = new Card(type)
      }
  }
  return deck
}

function shuffle(deck) {
  for(let i = 31; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    if(rand > 0) {
      let temp = deck[i];
      deck[i] = deck[rand];
      deck[rand] = temp;
    }
  }
}