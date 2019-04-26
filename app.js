/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// The Pig game 

//play coded by Bogdan Adrian, following a learning path on Udemy. My first app. Here I understood how the Dom Manipulation works
var roundScore, activePlayer, scores, gamePlaying; 

init();

//add event listner to roll the dice button and display the dice on the right place,
document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying){
		//1. generate a random number
	var dice = Math.floor(Math.random()* 6) +1; 
	
	//2. display the number on right place
	var diceDom = document.querySelector('.dice');
	diceDom.style.display = 'block'; 
	diceDom.src = 'dice-' + dice + '.png';
	
	
	//3. update the result on roound score only if the random number is not 1,
	if (dice !== 1){
		//add to score set roundScore variable + dice everytime the dice rolls/ display the roundscore
		roundScore += dice; 
		document.querySelector('#current-' + activePlayer).textContent = roundScore; 
	} else {
		nextPlayer(); 
	}
	}
	
});

   //add event listener for hold button 
document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gamePlaying){
		// add current score to globale score 
	scores[activePlayer] += roundScore; 
	
	// update UI 
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	
	//check if the player won the game 
	if (scores[activePlayer] >= 100){
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		gamePlaying = false; 
	}else {
		//next player
	nextPlayer();
	}
 }
	
});

function nextPlayer(){
	// next player - if activePlayer gets 1, then it chnages with the other player whcich becomkes activePlayer
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		// reset player to 0 once it rolls up 1 
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		
		//change activePlayer panel to active once it's its turn
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		
		//reset dice to display none 
		document.querySelector('.dice').style.display = 'none';
	}


// add event listener for new game button 
document.querySelector('.btn-new').addEventListener('click', init);

function init(){

//add all the code from the beginning here
scores = [0, 0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true; 


// hide the dice at the begininng of the game
document.querySelector('.dice').style.display = 'none'; 

// set all display at 0,
document.getElementById('score-0').textContent = '0'; 
document.getElementById('current-0').textContent = '0'; 
document.getElementById('score-1').textContent = '0'; 
document.getElementById('current-1').textContent = '0'; 
	
	//reset the players at begininnig 
document.getElementById('name-0').textContent = 'Player-1';
document.getElementById('name-1').textContent = 'Player-2';
	
	//remove winner class from both player (we don'y know which one won, do we')
	document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
	
		
	//remove active class from both player 
    document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	
	//add active class for the first player again 
	document.querySelector('.player-0-panel').classList.add('active');

}	

















