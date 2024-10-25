
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScore();

/*
if (!score){
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/ 

let isAutoPlaying = false;
let intervalId;

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScore();
}

function autoPlay(){
  if (!isAutoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      pickResult(playerMove);
    }, 1000);
    isAutoPlaying = true;

    document.querySelector('.js-auto-button')
      .innerHTML = 'Stop Playing';

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;

    document.querySelector('.js-auto-button')
      .innerHTML = 'Auto play';
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    pickResult('Rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    pickResult('Paper');
  });

document.querySelector('.js-scissor-button')
  .addEventListener('click', () => {
    pickResult('scissors');
  });

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    resetConfirmation();
});

function resetConfirmation() {
  document.querySelector('.js-confirmation')
    .innerHTML = `
    Are you sure you want to reset the score?
    <button class="js-yes-button">Yes</button>
    <button class="js-no-button">No</button>
    `;

document.querySelector('.js-yes-button')
  .addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });

document.querySelector('.js-no-button')
  .addEventListener('click', () => {
    hideResetConfirmation();
  });
}

function hideResetConfirmation() {
  document.querySelector('.js-confirmation')
    .innerHTML = '';
}

document.querySelector('.js-auto-button')
  .addEventListener('click', () => {
    autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r')
    pickResult('Rock');
  else if (event.key === 'p')
    pickResult('Paper');
  else if (event.key === 's')
    pickResult('scissors');
  else if (event.key === 'Backspace')
    resetConfirmation();
  else if (event.key === 'a')
    autoPlay();
});

function pickComputerMove(){
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'Rock';
      } else if (randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'Paper';
      } else {
        computerMove = 'scissors';
      }
      return computerMove;  
  }

function pickResult(playerMove){
  const computerMove = pickComputerMove();
  let Result = '';

  if (playerMove === 'scissors'){
    if (computerMove === 'Rock'){
      Result = 'You lose';
    } else if (computerMove === 'Paper'){
      Result = 'You won';
    } else if (computerMove === 'scissors'){
      Result = 'Tie';
    }

  } else if (playerMove === 'Paper'){
    if (computerMove === 'Rock'){
      Result = 'You won';
    } else if (computerMove === 'Paper'){
      Result = 'Tie';
    } else if (computerMove === 'scissors'){
      Result = 'You lose';
    }

  } else if (playerMove === 'Rock'){
    if (computerMove === 'Rock'){
      Result = 'Tie';
    } else if (computerMove === 'Paper'){
      Result = 'You lose';
    } else if (computerMove === 'scissors'){
      Result = 'You won';
    }
  }

  if (Result === 'You won'){
    score.wins += 1; 
  } else if (Result === 'You lose'){
    score.losses += 1;
  } else if (Result === 'Tie'){
    score.ties += 1;
  } 
  
  localStorage.setItem('score', JSON.stringify(score)); 
  
  updateScore();

  document.querySelector('.js-result')
    .innerHTML = Result ;

  document.querySelector('.js-moves')
    .innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="image">
<img src="images/${computerMove}-emoji.png" class="image">
computer`;  
}

function updateScore(){
  document.querySelector('.js-score')
    .innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties; ${score.ties} `
}