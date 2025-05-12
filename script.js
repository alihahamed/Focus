/* fullscreen toggle */

function fullscreen(){
    if(!document.fullscreenElement){
        document.documentElement.requestFullscreen();
    }
    else if(document.exitFullscreen){
        document.exitFullscreen()
    }

}
/* json */

fetch('quotes.json')
.then(Response => Response.json())
.then(data => {
    const randomIndex = Math.floor(Math.random() * data.quotes.length)
    const randomQuote = data.quotes[randomIndex]
    const displayQuote = randomQuote.text
    quoteContent.textContent = displayQuote;
})

/* Timer */

const timer = document.getElementById('minutes-seconds');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const shortBtn = document.getElementById('shortBtn')
const focusBtn = document.getElementById('focusBtn')
const longBtn = document.getElementById('longBtn')
const welcomeTxt = document.getElementById('welcomeTxt')
const quoteContent = document.getElementById('quoteContent')
const message = document.getElementById('message')
const backgroundBtn = document.getElementById('backgroundBtn')
const backgroundBody = document.getElementsByTagName('body');

let pomodoro=1500;
let shortbreak=300;
let longbreak=600;
let interval;
let isActive = false;
let currentMode = 'pomodoro';


var timeUp = new Audio('getback.mp3')
var alertAudio = new Audio('yo_phone_linging.mp3');
var switchAudio = new Audio('switch.mp3');



function currTime(){
    let date = new Date()
    let hours = date.getHours()
    if(hours>=19){
        welcomeTxt.innerHTML = 'Good Afternoon Ali!'
    }
    else if(hours>=12){
    welcomeTxt.textContent = 'Good Evening Ali!'  
    }
    else if(hours>=6){
        welcomeTxt.textContent = 'Good morning Ali!'
    }
}

let isChanged = 'false'
const defaultColor = ''
let colors = 'black'

backgroundBtn.addEventListener("click", function(){
    if(isChanged){
        document.body.style.background = defaultColor;
        
        isChanged = false;
    }
    else if(!isChanged){
        timer.style.color = 'white'
        welcomeTxt.style.color = 'white'
        quoteContent.style.color = 'white'
        document.body.style.background = colors
        isChanged = true;
    }
})




/* focus button */

focusBtn.addEventListener('click', function(){
    switchAudio.play()
    pomodoro = 1500
    currentMode = 'pomodoro';
    clearInterval(interval)
    isActive= false
    updateTimer()
    startBtn.textContent = 'Start'
})

/* start button */

startBtn.addEventListener('click', function() {
    switchAudio.play()
    if(isActive){
        stopTimer()
        startBtn.textContent = 'Start'      
    }
    else if(!isActive) {
        startTimer()
        startBtn.textContent = 'Pause'
    }
    isActive = !isActive
})

function startTimer(){
    if(interval){
        clearInterval(interval);
    }
    interval = setInterval(() => {
        if(currentMode==='pomodoro'){
            pomodoro--;
            updateTimer();
        if(pomodoro===0){
            alertAudio.play();
            clearInterval(interval)
            alert("Take a break!")
            pomodoro=1500;
            updateTimer()
            message.textContent = 'Go take a Break!'
        } }
        else if(currentMode==='shortbreak'){
                shortbreak--;
                shortBreak()
        if(shortbreak===0){
            timeUp.play()
            clearInterval(interval)
            shortbreak=300
            shortBreak()
            message.textContent = 'Get Back to work nigga'
        }
        }
        else if(currentMode==='longbreak'){
            longbreak--
            longBreak()
        if(longbreak===0){
            timeUp.play()
            clearInterval(interval)
            longbreak=600
            longBreak()
            message.textContent = 'Get Back to work nigga'
        }
        }
    },
    1000)
}

function stopTimer(){
    clearInterval(interval)
}

function resetTimer(){
    clearInterval(interval)
    isActive = false;
    startBtn.textContent = 'Start'

    if(currentMode==='pomodoro'){
        pomodoro=1500
        updateTimer()
        message.textContent = ''
    }
    else if(currentMode==='shortbreak'){
        shortbreak=300
        shortBreak()
        message.textContent = ''
    }
    else if(currentMode==='longbreak'){
        longBreak=600
        longBreak()
        message.textContent = ''
    }
}
function updateTimer(){
    const minutes = pomodoro / 60;
    const seconds = pomodoro % 60;
    timer.innerHTML = `${Math.floor(minutes).toString().padStart(2,"0")}:${Math.floor(seconds).toString().padStart(2,"0")}`;
}



/* Short-break */

function shortBreak(){
    const minutes1 = shortbreak / 60;
    const seconds1 = shortbreak % 60;
    timer.innerHTML = `${Math.floor(minutes1).toString().padStart(2,"0")}:${Math.floor(seconds1).toString().padStart(2,"0")}`;
    
}

shortBtn.addEventListener('click', function(){
    switchAudio.play()
    currentMode = 'shortbreak';
    clearInterval(interval)
    isActive=false;
    shortbreak = 300;
    shortBreak()
    startBtn.textContent='Start'


})

/* Long-break */

function longBreak(){
    const minutes2 = longbreak / 60;
    const seconds2 = longbreak % 60;
    timer.innerHTML = `${Math.floor(minutes2).toString().padStart(2,"0")}:${Math.floor(seconds2).toString().padStart(2,"0")}`;
}

longBtn.addEventListener('click', function(){
    switchAudio.play()
    longbreak=600
    currentMode= 'longbreak'
    clearInterval(interval)
    isActive=false;
    longBreak()
    startBtn.textContent='Start'
})


currTime()
setInterval(currTime(),1000)
