var BrawlDeck = require('./BrawlDeck.js'),
    BrawlDiscard = require('./BrawlDiscard.js'),
    BrawlField = require('./BrawlField.js');

  var grids = document.querySelectorAll('[grid]'),
      whos = document.getElementsByClassName('who'),
      change = new Event('change'),
      click = new Event('click'),
      cdCts = [0,0];


function Brawl(){
  var _private = {
    playArea: new BrawlField(1,2),
    deck: [],
    discard: [],
    currentCard: [],
    icons: ['base',
            'hitB', 'hit2B', 'blockB',
            'hitG', 'hit2G', 'blockG',
            'hitR', 'hit2R', 'blockR',
            'clear', 'press', 'freeze'],
    count: 0,
    buildDecksHTML: buildDecksHTML
  };
  function buildDecksHTML() {
    var t = document.querySelectorAll('template.card')[0];
    Array.prototype.forEach.call(grids,function(elem){
      var i = 35;
      while(i){
        elem.appendChild(document.importNode(t.content,true));
        i--;
      }
    });
  }
  Object.defineProperties(this,{
    'init': {
      value: _init.bind(_private),
      enumerable: true
    }
  });
}

window.Brawl = Brawl;

function _init() {
  console.log(this);
  var that = this;
  that.buildDecksHTML();
  document.querySelectorAll('[value=Play]')[0].addEventListener('click',startGame);
  document.querySelectorAll('.vsContain')[0].style.opacity = 1;
  Array.prototype.forEach.call(whos, function(who) {
    Array.prototype.forEach.call(who.children, function(option) {
      if(option.selected === true){
        option.selected = false;
      }
      if(option.value === 'blank'){
        option.selected = true;
      }
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('.buttonBox'),function(elem,i){
    elem.firstElementChild.addEventListener('click', function(){
      whos[i].dispatchEvent(change);
    });
    elem.lastElementChild.addEventListener('click',function(event){
      clearDeck(i);
      noShuffle(event);
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('.select.icon'),function(elem,i){
    elem.addEventListener('click',selectChar.bind(this));
    elem.parentElement.style.left = 350 + (i * 220) + 'px';
  });
  Array.prototype.forEach.call(whos,function(who){
    who.addEventListener('change',loadDeck);
    //who.dispatchEvent(change);
  });
  function startGame(){
    var t = document.querySelectorAll('template.landing')[0], start = false;
    Array.prototype.forEach.call(whos,function(who){
      if(who.value !== "blank"){
        start = true;
      } else {
        start = false;
      }
    });
    if(start){
      Array.prototype.forEach.call(document.querySelectorAll('[menu]'),function(elem){
        elem.style.left = '';
      });
      document.querySelectorAll('.vsContain')[0].style.opacity = 0;
      Array.prototype.forEach.call(document.querySelectorAll('[class^=p]'),function(elem){
        elem.appendChild(document.importNode(t.content,true));
        elem.lastElementChild.style.opacity = 1;
        elem.lastElementChild.previousElementSibling.style.opacity = 1;
      });
      Array.prototype.forEach.call(whos,function(who){
        who.dispatchEvent(change);
      });
    } else {
      alert('Select Fighters to Play!');
    }
  }
  function selectChar(e) {
    if(e.target.className.substr(0,6) === 'select'){
      return;
    }
    var who = e.target.className.replace('icon ',''),
        select = e.target.parentElement,
        x = parseInt(select.parentElement.parentElement.className.substr(1,1))-1;
    Array.prototype.forEach.call(whos[x].children, function(option,i) {
      if(option.selected === true){
        option.selected = false;
      }
      if (option.value === who+x) {
        option.selected = true;
      }
    });
    select.className = 'select icon '+who;
    select.setAttribute('value',who);
    Array.prototype.forEach.call(select.children,function(elem) {
      if(elem.hasAttribute('blank')){
        elem.removeAttribute('blank');
      }
      if(elem.className === 'icon '+who) {
        elem.setAttribute('blank','');
      }
    });
  }
  function selectDeck(e) {
    selectChar(e);
    whos[x].dispatchEvent(change);
  }
  function loadDeck(e){
    var who = e.target.value,
        player = parseInt(who.substr(-1,1)),
        select = e.target.nextElementSibling;
    select.className = select.className.replace('select','selected');
    who = who.replace(/\d/,'');
    that.deck[player] = new BrawlDeck(who,player);
    show(who,that.deck[player],player);
  }
  function buildLabels(deck,x) {
    var i, bd=[];
    for(i = 0; i < deck.length; i++){
      var front = grids[x].children[i].firstElementChild.firstElementChild;
      bd.push(that.icons[deck[i].getType()]);
    }
    return bd;
  }
  function show(name,deck,x) {
    deck.shuffle();
    deck = buildLabels(deck.getDeck(),x);
    var i, discard = document.getElementsByClassName('discard')[0];
    Array.prototype.forEach.call(grids[x].children, function(contain,i) {
      var card = contain.firstElementChild, lt;
      if (i < 7){
        lt = 0;
      } else if (i < 14) {
        lt = 1;
      } else if (i < 21) {
        lt = 2;
      } else if (i < 28) {
        lt = 3;
      } else if (i < 35) {
        lt = 4;
      }
      setTimeout(function(){
        contain.style.zIndex = 170-i*5;
        contain.style.left = (lt*5+125+(x*587))+'px';
        contain.style.top = 5+'px';
        card.style.boxShadow = '0 0 0 black';
        card.style.opacity = 1;
        card.style.transform = '';
        card.className = name;
        card.firstElementChild.className = deck[i];
        card.addEventListener('click',flip);
      },50*(36-i));
    });
    cdCts[x] = 0;
    setTimeout(function(){grids[x].children[0].firstElementChild.dispatchEvent(click);},2750);
    setTimeout(function(){grids[x].children[1].firstElementChild.dispatchEvent(click);},3000);
  }
  function clearDeck(x){
    var select = document.getElementsByClassName('select')[x];
    select.className = 'select icon Empty';
    select.setAttribute('value','');
    Array.prototype.forEach.call(select.children,function(elem) {
      if(elem.hasAttribute('blank')){
        elem.removeAttribute('blank');
      }
    });
    Array.prototype.forEach.call(grids[x].children, function(contain,i) {
      contain.firstElementChild.style.opacity = 0;
      contain.style.top = -300+'px';
      contain.style.left = 0 + (x * 550)+'px';
      contain.firstElementChild.style.transform = '';
      contain.firstElementChild.style.boxShadow = '15px 15px 20px black';
      contain.firstElementChild.removeEventListener('click',test);
    });
  }
  function flip(e) {
    var x = findPlayer(e.target)-1,
        contain = grids[x].children[cdCts[x]],
        card = contain.firstElementChild,
        left = 320 + (x * 235),
        flipdir = 180 - (x * 360);
        zrotate = Math.floor(Math.random() * 360);//* 10 + 90);
    if(!cdCts[x]) {
      left = 170 +(x * 170);
      contain.style.top = 250+'px';
      card.style.transform = 'rotateY(' + flipdir + 'deg) rotateZ(' + 360 + 'deg)';
      card.addEventListener('click',test);
    } else {
      card.style.transform = 'rotateY(180deg)';
      card.className += ' deck';
    }
    contain.style.left = left+'px';
    setTimeout(function(){
      contain.style.zIndex = 0;
    },200);
    card.style.boxShadow = '';
    card.removeEventListener('click',flip);
    cdCts[x]++;
  }
  function test(e){
    if (e.layerY < 104.5){
      alert('Player 1');
    } else {
      alert('Player 2');
    }
  }
  function findPlayer(elem) {
    while(elem.className.substr(0,1)!=='p'){
      elem = elem.parentElement;
    }
    elem = parseInt(elem.className.substr(1,1));
    return elem;
  }
  function noShuffle(e) {
    var button = e.target.previousElementSibling;
    button.setAttribute('disabled','');
  }

}

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