// navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Define poker deck suits and values
const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// create and shuffle a deck of cards
function createDeck() {
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
    return deck.sort(() => Math.random() - 0.5);
}

// Game state variables
let deck = [];
let playerHand = [];
let aiHand = [];
let gameCards = [];
let dealStage = 0;

// start a new game
function startGame() {
    deck = createDeck();
    playerHand = [deck.pop(), deck.pop()];
    aiHand = [deck.pop(), deck.pop()];
    gameCards = [];
    dealStage = 0;
    updateDisplay();
}

// Update the game display
function updateDisplay() {
    updateHandDisplay('player-hand', playerHand);
    updateHandDisplay('ai-hand', aiHand);
    updateHandDisplay('game-cards', gameCards);
    checkWinner();  // Determine the winner dynamically
}

// display a players hand on the UI
function updateHandDisplay(elementId, hand) {
    let container = document.getElementById(elementId);
    container.innerHTML = '';
    hand.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = `${card.value}${card.suit}`;
        if (card.suit === '♦' || card.suit === '♥') {
            cardElement.style.color = 'red';
        }
        container.appendChild(cardElement);
    });
}

// deal cards in stages
function dealGameCards() {
    if (dealStage === 0) {
        gameCards.push(deck.pop(), deck.pop(), deck.pop()); // Flop
    } else if (dealStage === 1 || dealStage === 2) {
        gameCards.push(deck.pop()); // Turn and River
    }
    dealStage++;
    updateDisplay();  
}

// determine the winner based on poker hand
function checkWinner() {
    let playerBestHand = getBestHand([...playerHand, ...gameCards]);
    let aiBestHand = getBestHand([...aiHand, ...gameCards]);

    document.getElementById('hand-rank').textContent = `Sebis Best Hand: ${playerBestHand.name}`;
    document.getElementById('ai-hand-rank').textContent = `KI Best Hand: ${aiBestHand.name}`;

    if (gameCards.length < 5) return;

    let winnerText = "It's a tie!";
    
    if (handRankings[playerBestHand.name] > handRankings[aiBestHand.name]) {
        winnerText = "You win!";
    } else if (handRankings[playerBestHand.name] < handRankings[aiBestHand.name]) {
        winnerText = "AI wins!";
    } else {
        // If same rank, compare highest card values
        for (let i = 0; i < playerBestHand.cards.length; i++) {
            if (values.indexOf(playerBestHand.cards[i]) > values.indexOf(aiBestHand.cards[i])) {
                winnerText = "You win!";
                break;
            } else if (values.indexOf(playerBestHand.cards[i]) < values.indexOf(aiBestHand.cards[i])) {
                winnerText = "AI wins!";
                break;
            }
        }
    }
    document.getElementById('winner').textContent = winnerText;
}

// Poker hand rankings
const handRankings = {
    "High Card": 1,
    "One Pair": 2,
    "Two Pair": 3,
    "Three of a Kind": 4,
    "Straight": 5,
    "Flush": 6,
    "Full House": 7,
    "Four of a Kind": 8,
    "Straight Flush": 9
};

// determine the best poker hand from a set of cards
function getBestHand(cards) {
    if (cards.length < 5) return { name: "-", cards: [] };

    let valuesCount = {};
    let suitsCount = {};
    let valuesList = [];

    cards.forEach(card => {
        valuesCount[card.value] = (valuesCount[card.value] || 0) + 1;
        suitsCount[card.suit] = (suitsCount[card.suit] || 0) + 1;
        valuesList.push(card.value);
    });

    let sortedValues = [...new Set(valuesList)].sort((a, b) => values.indexOf(b) - values.indexOf(a));
    let pairCount = 0;
    let threeOfAKind = false;
    let fourOfAKind = false;
    let bestHandName = "High Card";
    
    Object.values(valuesCount).forEach(count => {
        if (count === 4) fourOfAKind = true;
        if (count === 3) threeOfAKind = true;
        if (count === 2) pairCount++;
    });

    // Check for flush
    let flushSuit = Object.keys(suitsCount).find(suit => suitsCount[suit] >= 5);
    let flushCards = flushSuit ? cards.filter(c => c.suit === flushSuit) : [];

    // Check for straight
    let isStraight = false;
    for (let i = 0; i <= sortedValues.length - 5; i++) {
        let sequence = sortedValues.slice(i, i + 5);
        if (sequence.every((v, idx, arr) => idx === 0 || values.indexOf(v) + 1 === values.indexOf(arr[idx - 1]))) {
            isStraight = true;
            break;
        }
    }

    // Identify hand rankings
    if (flushSuit && isStraight) {
        bestHandName = "Straight Flush";
    } else if (fourOfAKind) {
        bestHandName = "Four of a Kind";
    } else if (threeOfAKind && pairCount > 0) {
        bestHandName = "Full House";
    } else if (flushSuit) {
        bestHandName = "Flush";
    } else if (isStraight) {
        bestHandName = "Straight";
    } else if (threeOfAKind) {
        bestHandName = "Three of a Kind";
    } else if (pairCount === 2) {
        bestHandName = "Two Pair";
    } else if (pairCount === 1) {
        bestHandName = "One Pair";
    }

    return { name: bestHandName, cards: sortedValues };
}


// reset the displayed game results
function resetResult() {
    document.getElementById('hand-rank').textContent = "Sebis Best Hand: -";
    document.getElementById('ai-hand-rank').textContent = "Jebenti Best Hand: -";
    document.getElementById('winner').textContent = "Winner: -";
}

// fold and start a new game
function foldGame() {
    resetResult();
    startGame();
}

// Event listeners
document.getElementById('rules-button').addEventListener('click', () => showPage('rules-page'));
document.getElementById('combinations-button').addEventListener('click', () => showPage('combinations-page'));
document.getElementById('start-game-button').addEventListener('click', () => {
    showPage('game-page');
    startGame();
});
document.getElementById('back-button').addEventListener('click', () => showPage('greeting-page'));
document.getElementById('back-home-button').addEventListener('click', () => showPage('greeting-page'));
document.getElementById('back-home-button-2').addEventListener('click', () => showPage('greeting-page'));
document.getElementById('deal-button').addEventListener('click', dealGameCards);
document.getElementById('fold-button').addEventListener('click', foldGame);
