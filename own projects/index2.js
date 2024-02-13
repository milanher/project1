let player = {
    name: "Per",
    chips: 200
}
let betting = false
let dealeralive = true
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let deala = document.getElementById("dealer")
let dsumEl = document.getElementById("dsum-el")
let dsum = 0
let dcards = []

playerEl.textContent = player.name + ": $" + player.chips
function dealerdead(){
    dealeralive = false
    if (betting === true){
        player.chips += 100
        playerEl.textContent = player.name + ": $" + player.chips
       


    }
    message = 'YOU WON'
    messageEl.textContent = message 




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
    isAlive = true
    betting = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    let dealerfirstCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    dcards = [dealerfirstCard]
    dsum = dealerfirstCard 
    renderGame()
    renderdealer()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        dealerdead()
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message 
}
function renderdealer(){
    deala.textContent = "dealers cards: "
    for (let i = 0; i < dcards.length; i++) {
        deala.textContent += dcards[i] + " "
    }
    dsumEl.textContent = "Sum: " + dsum
}
function dealerplays(){
    if(betting === true){
        let card = getRandomCard()
            dsum += card
            dcards.push(card)
            renderdealer()
        if(dsum < 17){
            let card = getRandomCard()
            dsum += card
            dcards.push(card)
            renderdealer()
            dealerplays()
        }else if(dsum > 21){
            dealerdead()
        }else if(sum > dsum && sum < 22){
            dealerdead()
        }else if(dsum > sum && dsum < 22){
            isAlive = false
            message = "GAME OVER"         
        }else if(dsum === sum && dsum < 22){
        isAlive = false
        message = "GAME OVER"         
    }  messageEl.textContent = message      
    
}}                                     
function newCard() {
    if (isAlive === true && hasBlackJack === false && betting === true) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}
function bet(){
    betting = true
    player.chips -= 50
    playerEl.textContent = player.name + ": $" + player.chips
    console.log(player.chips)

}