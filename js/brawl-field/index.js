var BrawlBase = require('brawl-base');

function BrawlField(p1, p2) {
  var _private = {
    inPlay: [new BrawlBase(p1,'L'),
            new BrawlBase(p2,'R')],
    p1Score: 0,
    p2Score: 0,
    checkFreeze: checkFreeze,
    findLocation: findLocation
  };
  function checkFreeze(x) {
    return _private.inPlay[x].getFreeze();
  }
  function findLocation(a) {
    var i = -1;
    do {
      i++;
      if(_private.inPlay[i].getLocation() === a) {
        return i;
      }
    }
    while(i < _private.inPlay.length);
    return 3;
  }
  Object.defineProperties(this,{
    'addNewBase': {
      value: _addNewBase.bind(_private),
      enumerable: true
    },
    'clearBase': {
      value: _clearBase.bind(_private),
      enumerable: true
    },
    'playToBase': {
      value: _playToBase.bind(_private),
      enumerable: true
    },
    'checkDone': {
      value: _checkDone.bind(_private),
      enumerable: true
    },
    'calculateScore': {
      value: _calculateScore.bind(_private),
      enumerable: true
    },
    'check': {
      value: _check.bind(_private),
      enumerable: true
    },
    'getSize': {
      value: _getSize.bind(_private),
      enumerable: true
    }
  });
}

function _addNewBase(player, a) {
  var x, rtrn = false;
  if(this.inPlay.length < 3) {
    if(this.inPlay.length > 1) {
      x = this.findLocation(a);
      this.inPlay[x].setLocation('M');
      this.inPlay.push(new BrawlBase(player,a));
    }
    else if(this.inPlay.length === 1) {
      this.inPlay.push(new BrawlBase(player,a));
      switch(a) {
        case 'L': {a = 'R';break;}
        case 'R': {a = 'L';break;}
      }
      x = this.findLocation('M');
      this.inPlay[x].setLocation(a);
    }
    rtrn = true;
  }
  return rtrn;
}
function _clearBase(a) {
  var x, freeze, rtrn = false;
  if(a  !==  'M' && this.inPlay.length  !==  1) {
    x = this.findLocation(a);
    freeze = this.checkFreeze(x);
    if(!freeze) {
      this.inPlay.splice(x,1);
      if(this.inPlay.length > 1) {
        x = this.findLocation('M');
        this.inPlay[x].setLocation(a);
      }
      else if(this.inPlay.length === 1) {
        switch(a) {
          case 'L': {a = 'R';break;}
          case 'R': {a = 'L';break;}
        }
        x = this.findLocation(a);
        this.inPlay[x].setLocation('M');
      }
      rtrn = true;
    }
  }
  return rtrn;
}
function _playToBase(a, y, card) {
  var freeze = false, played = false, x;
  if(this.inPlay.length === 1) {
    x = 0;
    freeze = this.checkFreeze(x);
    if(!freeze) {
      played = this.inPlay[x].addSide(card,y - 1);
    }
  }
  else if(this.inPlay.length === 2 && a  !==  'M') {
    x = this.findLocation(a);
    freeze = this.checkFreeze(x);
    if(!freeze) {
      played = this.inPlay[x].addSide(card,y - 1);
    }
  }
  else if(this.inPlay.length === 3) {
    x = this.findLocation(a);
    freeze = this.checkFreeze(x);
    if(!freeze) {
      played = this.inPlay[x].addSide(card,y - 1);
    }
  }
  return played;
}
function _checkDone() {
  var freeze = [false,false,false], done = false, i;
  for(i = 0; i < this.inPlay.length; i++) {
    freeze[i] = this.inPlay[i].getFreeze();
  }
  if(this.inPlay.length === 1) {
    if(freeze[0]) {
      done = true;
    }
  }
  else if(this.inPlay.length === 2) {
    if(freeze[0] && freeze[1]) {
      done = true;
    }
  }
  else if(this.inPlay.length === 3) {
    if(freeze[0] === true&&freeze[1] === true&&freeze[2] === true) {
      done = true;
    }
  }
    return done;
}
function _calculateScore() {
  var p1Count=0, p2Count=0, i;
  for(i = 0; i < this.inPlay.length; i++) {
    p1Count = this.inPlay[i].scoreSide(0);
    p2Count = this.inPlay[i].scoreSide(1);
    if(p1Count === p2Count) {
      if(this.inPlay[i].getPlayer() === 1) {
        p1Score += 1;
      } else {
        p2Score += 1;
      }
    } else if(p1Count > p2Count) {
      p1Score += 1;
    } else {
      p2Score += 1;
    }
  }
  console.log("Pleyer 1 score:" + p1Score);
  console.log("Player 2 score:" + p2Score);
  if(p1Score > p2Score) {
    return 1;
  } else if(p1Score < p2Score) {
    return 2;
  } else {
    return 0;
  }
}
function _check(i) {
  return this.inPlay[i];
}
function _getSize() {
  return this.inPlay.length;
}

module.exports = BrawlField;