require('./BrawlDeck.js');
require('./BrawlDiscard.js');
require('./BrawlField.js');

function Brawl(){
  var _private = {
    playArea: new BrawlField(1,2),
    deck: [],
    discard: [],
    currentCard: [],
    icons: [],
    count: 0
  }
  function init() {

  }
}

module.exports = Brawl;

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