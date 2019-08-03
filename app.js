// declair the variable
let scores, avtivePlayer, roundScore, gamePlaying;

// define DOM selectors function
const selectors = function () {
const dice1 = document.getElementById('dice-1');
const dice2 = document.getElementById('dice-2');

const current0 = document.getElementById(`current-0`);
const current1 = document.getElementById(`current-1`)

const score0 = document.getElementById(`score-0`);
const score1 = document.getElementById(`score-1`);

const name0 = document.querySelector(`#name-0`);
const name1 = document.querySelector(`#name-1`);

const panel0 = document.querySelector(`.player-0-panel`);
const panel1 = document.querySelector(`.player-1-panel`);

const btnNew = document.querySelector('.btn-new');
const btnHold = document.querySelector('.btn-hold');
const btnRoll = document.querySelector('.btn-roll');


return {
  dice1,
  dice2, 
  current0,
  current1,
  score0, 
  score1,
  panel0,
  panel1,
  name0,
  name1,
  btnNew,
  btnHold,
  btnRoll
}
}


// call init function to start the application
init();

// roll dice button event listener.
selectors().btnRoll.addEventListener('click', function () {
  const selector = selectors();

  // get the current value and input value to compair them and call winner function in case the current value is qual o bigger than inout value
let input = document.querySelector('.final-score').value;
const inputParse = parseInt(input)
let sel = document.querySelector(`#current-${activePlayer}`).textContent;
const val = parseInt(sel);

if (val >= inputParse) {
  winner();
}

// check if game playing. if not block the dice roll button
 if (gamePlaying) {

  //get the dice numbers for all 2 dices
  const number1 = Math.floor(Math.random() * 6) + 1;
  const number2 = Math.floor(Math.random() * 6) + 1;

  //display duces in UI
 selector.dice1.style.display = 'block';
 selector.dice2.style.display = 'block';
 selector.dice1.setAttribute('src', `dice-${number1}.png`);
 selector.dice2.setAttribute('src', `dice-${number2}.png`);
   
 // change layer if dices are 1 both
  if (number1 !== 1 && number2 !== 1) {

    roundScore += number1 + number2;
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
  
}else {
  nextPlayer();
}
 }
});

// next player function to be called from roll dices event handler 
function nextPlayer() {

  const selector = selectors();

  //cecck if game is still plying
  if (gamePlaying) {
// change active player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  // modify UI accordly 
    selector.current0.textContent = 0;
    selector.current1.textContent = 0;
    selector.panel0.classList.toggle('active');
    selector.panel1.classList.toggle('active');
    selector.dice1.style.display = 'none';
    selector.dice2.style.display = 'none';
  }

 
}
// button hold event handler 
selectors().btnHold.addEventListener('click', function() {
    const selector = selectors();
  // set score in scores array to keeep trace of total score per player
    scores[activePlayer] += roundScore;
    // show score total in UI
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer]; 
    // get the input value 
    let input = document.querySelector('.final-score').value;
 // check the total score and compair it to the input value. call winner function if igger or equal to input
    if (scores[activePlayer] >= input) {
      winner()
      // next player othewise
    }else {
      nextPlayer()
    }
 
   
});
// new game button event handler to call init function;
selectors().btnNew.addEventListener('click', init);

// init function to reste all the game
function init () {

  const selector = selectors();
//data structure
scores = [0, 0];
activePlayer = 0;
roundScore = 0;
gamePlaying = true;

// reset all UI 
selector.dice1.style.display = 'none';
selector.dice2.style.display = 'none';
selector.score0.textContent = 0;
selector.score1.textContent = 0;
selector.current0.textContent = 0;
selector.current1.textContent = 0;
selector.name0.textContent = 'Player 1';
selector.name1.textContent = 'Player 2';
selector.panel0.classList.remove('winner');
selector.panel1.classList.remove('winner');
selector.panel0.classList.remove('active');
selector.panel1.classList.remove('active');
selector.panel0.classList.add('active');
};


// winner function to be called whenever one player overtake the input value number 
function winner () {
  const selector = selectors();
    // sei winner calsses and UI values
    document.querySelector(`#name-${activePlayer}`).textContent = 'Winner'
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    selector.dice1.style.display = 'none';
    selector.dice2.style.display = 'none';
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    gamePlaying = false;
 
}