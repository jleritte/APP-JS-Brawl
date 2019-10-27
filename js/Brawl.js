import $$ from './DOM.js'
import Deck from './Deck.js'
import Discard from './Discard.js'
import Base from './Base.js'
import Field from './Field.js'


window.test = new Deck('Darwin')
window.test2 = new Discard()
window.test3 = new Base(1,'M')
window.test4 = new Base(1,'M')

let field = new Field()
console.log(`${field}`)
field.newBase = {owner:1,location: "L"}
console.log(`${field}`)


test.deal
test2.store = test.deal
console.log(`${test2.top}`)
test2.store = test.deal
console.log(`${test2.top}`)
console.log(test.count)


// var BrawlDeck = require('brawl-deck'),
//     BrawlDiscard = require('brawl-discard'),
//     BrawlField = require('brawl-field');

// var grids,
//     whos,
//     change = new Event('change'),
//     click = new Event('click'),
//     body = document.querySelector('body'),
//     templates = require('templates');

// function Brawl(){
//   var _private = {
//     playArea: new BrawlField(1,2),
//     deck: [],
//     discard: [new BrawlDiscard(),new BrawlDiscard()],
//     currentCard: [],
//     icons: ['base',
//             'hitB', 'hit2B', 'blockB',
//             'hitG', 'hit2G', 'blockG',
//             'hitR', 'hit2R', 'blockR',
//             'clear', 'press', 'freeze'],
//     count: 0,
//     fillBody: fillBody,
//     loadDeck: loadDeck
//   };

//   function fillBody() {
//     var keys = Object.keys(templates);

//     keys.forEach(function(elem){
//       var template = document.createElement('template');

//       if(elem === 'game'){
//         template.innerHTML = templates[elem].join("\n");
//         body.appendChild(document.importNode(template.content,true));
//       } else {
//         template.className = elem;
//         template.innerHTML = templates[elem].join("\n");
//         body.appendChild(template);
//       }
//     });
//     grids = document.querySelectorAll('[grid]');
//     whos = document.getElementsByClassName('who');
//   }

//   function loadDeck(e){
//     var who = e.target.value,
//         player = parseInt(who.substr(-1,1)),
//         select = e.target.nextElementSibling;
//     select.className = select.className.replace('select','selected');
//     who = who.replace(/\d/,'').toLowerCase();
//     _private.deck[player] = new BrawlDeck(who,player);
//     show(who,_private.deck[player],player);
//     select.nextElementSibling.innerHTML = _private.deck[player].cardsLeft();
//     select.nextElementSibling.style.opacity = 1;
//   }

//   function show(name,deck,x) {
//     deck.shuffle();
//     var i,
//         land = document.querySelectorAll('.deckLanding')[x];
//     deck.getDeck().forEach(function(card) {
//       grids[x].appendChild(card);
//     });
//     Array.prototype.forEach.call(grids[x].children, function(card,i) {
//       var lt;
//       if (i < 7){
//         lt = 20;
//       } else if (i < 14) {
//         lt = 15;
//       } else if (i < 21) {
//         lt = 10;
//       } else if (i < 28) {
//         lt = 5;
//       } else if (i < 35) {
//         lt = 0;
//       }
//       setTimeout(function(){
//         card.style.zIndex = 170-i*5;
//         card.style.left = land.offsetLeft+5-lt+'px';
//         card.style.top = land.offsetTop + 8 + 'px';
//         card.style.boxShadow = '0 0 0 black';
//         card.style.opacity = 1;
//         card.style.transform = '';
//         card.addEventListener('click',flip);
//       },50*(36-i));
//     });
//     setTimeout(function(){grids[x].children[0].dispatchEvent(click);},2750);
//     setTimeout(function(){grids[x].children[0].dispatchEvent(click);},3650);
//   }

//   function flip(e) {
//     var x = _findPlayer(e.target)-1,
//         deck = _private.deck[x],
//         card = grids[x].firstElementChild;
//     if(35 - deck.getDeck().indexOf(card) !== deck.cardsLeft()){
//       return;
//     }
//     card = deck.dealCard();
//     var left = document.querySelectorAll('.discard')[x].offsetLeft + 5,
//         flipdir = 180 - (x * 360),
//         zrotate = Math.floor(Math.random() * 360);//* 10 + 90);
//     if(!card.type && deck.cardsLeft() === 34) {
//       var side = x ? 'R' : 'L',
//           playA = document.querySelector('[playArea]'),
//           center = playA.clientWidth / 2 - (150 / 2);
//       card.style.transform = 'rotateY(' + flipdir + 'deg) rotateZ(' + 360 + 'deg)';
//       card.style.top = playA.offsetTop + 'px';
//       if (side === 'R') {
//         card.style.left = center + (150*0.75) + 'px';
//       } else {
//         card.style.left = center - (150*0.75) + 'px';
//       }
//       setTimeout(function(){
//         playA.appendChild(card);
//       },500);
//       card.addEventListener('click',_playtoBase);
//     } else {
//       _private.discard[x].setCard(card);
//       card.style.transform = 'rotateY(180deg)';
//       card.className += ' deck';
//       card.style.left = left+'px';
//       setTimeout(function(){
//         document.querySelectorAll('.discard')[x].appendChild(card);
//       },500);
//     }
//     setTimeout(function(){
//       card.style.zIndex = 0;
//     },200);
//     card.style.boxShadow = '';
//     card.removeEventListener('click',flip);
//     document.querySelectorAll('[cdlt]')[x].innerHTML = deck.cardsLeft();
//   }

//   function moveToPlayArea(elem,side) {
//     var where = document.querySelector('[playArea]'),
//         CARDWIDTH = 150,
//         center = where.clientWidth / 2 - (CARDWIDTH / 2);
//     console.log(side,elem,where);
//     elem.style.top = where.offsetTop + 'px';
//     if (where.childElementCount === 1) {
//       if (side === 'R') {
//         elem.style.left = center + (CARDWIDTH*0.75) + 'px';
//       } else {
//         elem.style.left = center - (CARDWIDTH*0.75) + 'px';
//       }
//     } else if (where.childElementCount === 2){
//       elem.style.left = center + 'px';
//     }
//     setTimeout(function(){
//       where.appendChild(where);
//     },500);
//   }

//   Object.defineProperties(this,{
//     'init': {
//       value: _init.bind(_private),
//       enumerable: true
//     }
//   });
// }

// window.Brawl = Brawl;
// window.Brawl = new Brawl();
// window.Brawl.init();

// function _init() {
//   var card = BrawlDiscard(0,'darwin');
//   document.body.appendChild(card);
//   var card1 = BrawlDiscard(1,'chris');
//   document.body.appendChild(card1);
//   // var that = this;
//   // that.fillBody();
//   // document.querySelector('[value=Play]').addEventListener('click',_startGame);
//   // document.querySelector('.vsContain').style.opacity = 1;
//   // document.querySelector('[game]').style.height = 109 + 'px';
//   // document.querySelector('[game]').style.width = 321 + 'px';
//   // Array.prototype.forEach.call(whos, function(who) {
//   //   Array.prototype.forEach.call(who.children, function(option) {
//   //     if(option.selected === true){
//   //       option.selected = false;
//   //     }
//   //     if(option.value === 'blank'){
//   //       option.selected = true;
//   //     }
//   //   });
//   // });
//   // Array.prototype.forEach.call(document.querySelectorAll('.select.icon'),function(elem,i){
//   //   elem.addEventListener('click',_selectChar.bind(this));
//   // });
//   // Array.prototype.forEach.call(whos,function(who){
//   //   who.addEventListener('change',that.loadDeck);
//   // });
// }

// function _startGame(){
//   var game = document.querySelector('[game]'),
//       land = document.querySelector('template.landing'),
//       field = document.importNode(document.querySelector('template.field').content,true).firstElementChild,
//       vs = document.querySelector('.vsContain'),
//       start = false;
//   if(whos[0].value !== 'blank' && whos[1].value !== 'blank'){
//     start = true;
//   } else {
//     start = false;
//   }
//   if(start){
//     vs.style.opacity = 0;
//     game.style.height = '';
//     game.style.width = '';
//     setTimeout(function(){
//       Array.prototype.forEach.call(document.querySelectorAll('[class^=p]'),function(elem){
//         elem.appendChild(document.importNode(land.content,true));
//       });
//       Array.prototype.forEach.call(whos,function(who){
//         who.dispatchEvent(change);
//       });
//       Array.prototype.forEach.call(document.querySelectorAll('[class^=p]'),function(elem){
//         elem.style.flexBasis = '100%';
//       });
//       game.insertBefore(field,vs);
//       game.removeChild(vs);
//     },650);
//   } else {
//     alert('Select Fighters to Play!');
//   }
// }

// function _selectChar(e) {
//   if(e.target.className.substr(0,6) === 'select'){
//     return;
//   }
//   var who = e.target.className.replace('icon ',''),
//       select = e.target.parentElement,
//       x = parseInt(select.parentElement.parentElement.className.substr(1,1))-1;
//   Array.prototype.forEach.call(whos[x].children, function(option,i) {
//     if(option.selected === true){
//       option.selected = false;
//     }
//     if (option.value === who+x) {
//       option.selected = true;
//     }
//   });
//   select.className = 'select icon '+who;
//   select.setAttribute('value',who);
//   Array.prototype.forEach.call(select.children,function(elem) {
//     if(elem.hasAttribute('blank')){
//       elem.removeAttribute('blank');
//     }
//     if(elem.className === 'icon '+who) {
//       elem.setAttribute('blank','');
//     }
//   });
// }

// function _clearDeck(x){
//   var select = document.getElementsByClassName('select')[x];
//   select.className = 'select icon Empty';
//   select.setAttribute('value','');
//   Array.prototype.forEach.call(select.children,function(elem) {
//     if(elem.hasAttribute('blank')){
//       elem.removeAttribute('blank');
//     }
//   });
//   Array.prototype.forEach.call(grids[x].children, function(contain,i) {
//     contain.firstElementChild.style.opacity = 0;
//     contain.style.top = -300+'px';
//     contain.style.left = 0 + (x * 550)+'px';
//     contain.firstElementChild.style.transform = '';
//     contain.firstElementChild.style.boxShadow = '15px 15px 20px black';
//     contain.firstElementChild.removeEventListener('click',_playtoBase);
//   });
// }



// function _playtoBase(e){
//   if (e.layerY < 104.5){
//     alert('Player 1');
//   } else {
//     alert('Player 2');
//   }
// }

// function _findPlayer(elem) {
//   while(elem.className.substr(0,1)!=='p'){
//     elem = elem.parentElement;
//   }
//   elem = parseInt(elem.className.substr(1,1));
//   return elem;
// }

// // public class Brawl /*extends GameSearch*/ {
// //   public static void main(String[] args) {
// //     /*Object[] playerNum = {"1","2"};
// //     String num = (String)JOptionPane.showInputDialog(null,"Number of Players","PlayMode",JOptionPane.PLAIN_MESSAGE,null,playerNum,playerNum[0]);*/
// //     for(short i = 0; i < deck.length; i++) {
// //       deck[i] = new BrawlDeck(getChar(),count);
// //       discard[i] = new BrawlDiscard(deck[i].getDeckSize());
// //       deck[i].shuffle();
// //       currentCard[i] = deck[i].dealCard();
// //       currentCard[i] = deck[i].dealCard();
// //       discard[i].setCard(currentCard[i]);
// //     }
// //     boolean quit = false,played = false;
// //     BrawlPanel bp = new BrawlPanel();
// //   }
// //   public static boolean exitValue() {
// //     boolean quit = playArea.checkDone();
// //     return quit;
// //   }
// //   public static String getChar() {
// //     Object[] characters = {"Bennett","Chris","Darwin","Hale","Morgan","Pearl"};
// //     String str = (String)JOptionPane.showInputDialog(null,"Please pick character","Character Selection",JOptionPane.PLAIN_MESSAGE,null,characters,characters[0]);
// //     icons[count] = new BrawlIcons(str);
// //     count++;
// //     return str;
// //   }
// // }