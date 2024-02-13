
let player = {
    name: "Per",
    chips: 200
}
let bet1 = false
let cards = []
let sum = 0
let hasBlackJack = false
let delalive = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips
let Dealercard = document.getElementById("dealerCards")
let dealercards = []
let dsum = 0

function dealerdead(){
    if(delalive === false){
        player.chips += 100;
        playerEl.textContent = player.name + ": $" + player.chips; 
    }
}

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    console.log("startGame()")
    isAlive = true
    delalive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    let dealerfirst= getRandomCard()
    let dealersecond = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    dealercards = dealerfirst + dealersecond
    dsum = dealerfirst + dealersecond
    renderGame()
}

function renderGame() {
    let dealercards = [];
    for (let i = 0; i < dealercards.length; i++) {
        Dealercard.innerText += dealercards[i] + " "
    }
    
   cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    } 
    sumEl.textContent = "dealers Sum: " + dsum

    sumEl.textContent = "Sum: " + sum
    //player
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        if (bet === true){
            player.chips += 100
        }
    } else if(dsum < sum){
        player.chips += 100
        message = "You have won"
    }else {
        message = "You're out of the game!"
        isAlive = false
    }

    //dealer
    if(dsum < 17){
        denewcard()
    }else if(dsum === 21){
        isAlive = false
        message = "dealer got blackjack, GAME OVER"
    }else if (dsum > 21){
        dealerdead()
    }else if(dsum > sum){
        isAlive = false
        message = "dealer won"
    }

    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}
function denewcard(){
        let card = getRandomCard()
        dsum += card
        dealercards.push(card)
        renderGame()        

}

function bet() {
    bet1 = true;
    player.chips -= 50; 
    playerEl.textContent = player.name + ": $" + player.chips; 
}
