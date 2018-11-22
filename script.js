const userResult_span = document.getElementById('user-result');
const computerResult_span = document.getElementById('computer-result');
const resultInfo_p = document.querySelector('p.result_info');
const reset_btn = document.querySelector('button');
const hands = [...document.querySelectorAll('div.choise')];


const gameSummary = {
    numbers: 0,
    wins: 0,
    loses: 0,
    draws: 0,
}

const game = {
    playerHand: '',
    aiHand: '',
}


function win() {
    gameSummary.numbers++;
    gameSummary.wins++;
    userResult_span.innerHTML = `${gameSummary.wins}`;
    resultInfo_p.innerHTML = `${game.playerHand} beats ${game.aiHand}.  Good job!`;
}

function lost() {
    gameSummary.numbers++;
    gameSummary.loses++;
    computerResult_span.innerHTML = `${gameSummary.loses}`;
    resultInfo_p.innerHTML = `${game.playerHand} loses to ${game.aiHand}.  Try again.`;
}

function draw() {
    gameSummary.numbers++;
    gameSummary.draws++;
    resultInfo_p.innerHTML = `${game.playerHand} is equals ${game.aiHand}.  it's a draw.`;
}

function checkResult() {
    switch (game.playerHand + game.aiHand) {
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            win();
            break;
        case 'rockpaper':
        case 'paperscissors':
        case 'scissorsrock':
            lost();
            break;
        case 'rockrock':
        case 'paperpaper':
        case 'scissorsscissors':
            draw();
            break;
    }
}

function aiHandSelection() {
    const randomNumber = Math.floor(Math.random() * hands.length);
    game.aiHand = hands[randomNumber].id;
    hands[randomNumber].style.borderColor = "#d92139";
    setTimeout(checkResult, 100);
}

function clearAll() {
    hands.forEach((hand) => hand.style.borderColor = '');
    hands.forEach((hand) => hand.style.backgroundColor = '');
}

function userHandSelection() {
    game.playerHand = this.id;
    hands.forEach((hand) => hand.style.borderColor = 'white');
    hands.forEach((hand) => hand.style.backgroundColor = '#253f58');
    this.style.borderColor = '#aec33a';
    this.style.backgroundColor = '#325372';
    resultInfo_p.style.color = '';
    setTimeout(aiHandSelection, 100);
    setTimeout(clearAll, 800);
}

hands.forEach(hand => {
    hand.addEventListener('click', userHandSelection)
});

const reset = () => {
    gameSummary.numbers = 0;
    gameSummary.wins = 0;
    gameSummary.loses = 0;
    gameSummary.draws = 0;
    playerHand = '';
    aiHand = '';
    userResult_span.innerHTML = '0';
    computerResult_span.innerHTML = '0';
    resultInfo_p.textContent = ' ';
    startTy();
    resultInfo_p.style.color = '#aec33a';
}

const typingContent = 'Maybe one more time?';

function startTy() {
    let i = 0;
    const startTyping = () => {
        resultInfo_p.textContent += typingContent[i];
        i++
        if (i == typingContent.length) clearInterval(indexTyping);
    }
    const indexTyping = setInterval(startTyping, 60)
}

reset_btn.addEventListener('click', reset);