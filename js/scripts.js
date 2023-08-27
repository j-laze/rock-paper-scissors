const option = ['rock', 'paper', 'scissors'];

const computerSelection = () => option[Math.floor(Math.random() * option.length)];
let playerSelection;
let currentScore;
let playerScoreCount = 0;
let computerScoreCount = 0;
const scoreText = document.querySelector('.score');
const resultText = document.querySelector('.result');

function playRound(playerSelection, computerSelection) {
    const winOrNot = playerSelection + computerSelection;
    const winArray = ['paperrock', 'rockscissors', 'scissorspaper'];
    resultText.classList.add('shrink');


    if (playerSelection === computerSelection) {
        return 'draw';
    }
    else if (winArray.includes(winOrNot)) {
        return 'win';
    }
    else return 'lose';


}




function keepScore(lastRound) {
    switch (lastRound) {
        case 'win':
            playerScoreCount++;
            break;
        case 'lose':
            computerScoreCount++;
            break;
        case 'draw':
            break;
    }
 
}

function userSelection() {
    const buttonChoices = document.querySelectorAll('.choice-button');
    buttonChoices.forEach(button => {
        button.addEventListener('click', () => {
            playerSelection = button.getAttribute('id');
            let computerSelectionHere = computerSelection(); 
            currentScore = (playRound(playerSelection, computerSelectionHere));
            keepScore(currentScore);
             console.log(playerScoreCount, computerScoreCount)
             
             updateComputersChoice(computerSelectionHere);

        })
    });

}


function mouseUpSoundEffect(){
    const sound = new Audio('/sound/button-off.wav');
    sound.play();

}

function mouseDownSoundEffect(){
    const sound = new Audio('/sound/button-on.wav');
    sound.play();

}

function updateComputersChoice(computerSelectionHere){
    let computerChoice = document.querySelector('.computer-choice');
    let currentIndex = 0;
    let intervalTime = 80;
    const updateChoice = () => {
        computerChoice.textContent = option[currentIndex];
        currentIndex = (currentIndex + 1) % option.length;
        intervalTime = intervalTime * 1.3;
        const clickSound = new Audio('/sound/clickingsound.mp3');
        clickSound.play();
    
        
        if (intervalTime > 400){
            computerChoice.textContent = 'Computer chose:\xa0\xa0' + computerSelectionHere + '\xa0\xa0\xa0\xa0\xa0\xa0You chose: \xa0' + playerSelection;
            
            updatePage();
            return;
        }
          setTimeout(updateChoice, intervalTime);
      };
    
      updateChoice();


  

}

function resetButton(){
    const resetButton = document.querySelector('.reset-button');
    resetButton.addEventListener('click', () =>{
        location.reload();
    })
}


function updatePage() { 
    
    
    console.log(currentScore);
    switch (currentScore) {
        case 'draw':
            resultText.textContent = 'You drew!';
            resultText.style.color = '#383838';
        
            break;
        case 'win':
            resultText.textContent = 'Player won!';
            resultText.style.color = '#66FF00';

       
            break;
        case 'lose':
            resultText.textContent = 'you lost :(';
            resultText.style.color = '#D2122E';

    
            break;
    } 
      if(computerScoreCount === 5 || playerScoreCount === 5){
        displayEnd();
        
    }
   else{ scoreText.textContent =   `Player Score: ${playerScoreCount} `  + '\xa0\xa0\xa0\xa0\xa0\xa0 ' +`Computer Score: ${computerScoreCount}`;}
   resultText.classList.remove('shrink');
   resultText.classList.add('grow');

}


function displayEnd(){
    if(computerScoreCount === 5){
   resultText.textContent = 'Oh no you lose :(';
   resultText.style.color = '#D2122E'
   const sound = new Audio('/sound/lose.mp3');
   sound.play();
   scoreText.textContent = "Hit reset to play again!";}
   else if(playerScoreCount ===5){
    resultText.textContent = 'You are the winner :)!'
    resultText.style.color = '#66FF00'
    const sound = new Audio('/sound/win.mp3');
    sound.play();
    scoreText.textContent = "press reset to play again!";}
    scoreText.classList.add('scoreTextBold')
    
   
   resultText.classList.remove('shrink');
    resultText.classList.add('grow');
    

}




function startGame() {


 
    
    userSelection();
    resetButton();

    

     


    //console.log(playerScoreCount);
}






startGame();
