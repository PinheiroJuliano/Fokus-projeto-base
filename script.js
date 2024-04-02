const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const inicio = document.querySelector('.app__card-primary-button');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const timerBtn = document.getElementById('start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imgBtInicioPause = document.querySelector('.app__card-primary-butto-icon');
let timerRunning = false;
let timerInterval;
let timeLeftInSeconds = 1500; // Defina o tempo inicial em segundos
let tempoNaTela = document.querySelector('#timer');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somPlay = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const timeUpSom = new Audio('/sons/beep.mp3');
musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else{
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    alteraContexto('foco');
    focoBt.classList.add('active');
    timeLeftInSeconds = 1500;
    exibeTempo();
})

curtoBt.addEventListener('click', () => {
    alteraContexto('descanso-curto')
    curtoBt.classList.add('active')
    timeLeftInSeconds = 300;
    exibeTempo();
})

longoBt.addEventListener('click', () => {
    alteraContexto('descanso-longo');
    longoBt.classList.add('active');
    timeLeftInSeconds = 900;
    exibeTempo();
})

function alteraContexto(contexto) {
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML =
            `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;
        
        case "descanso-curto":
            titulo.innerHTML =
            `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        break;
        case "descanso-longo":
            titulo.innerHTML =
            `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
    default:
        break;
    }
}

timerBtn.addEventListener('click', () => {
    if (!timerRunning) {
        somPlay.play();
        startTimer();
    } else {
        somPause.play();
        pauseTimer();
    }
});

function startTimer() {
    timerRunning = true;
    exibeTempo();
    iniciarOuPausarBt.textContent = 'Pausar';
    imgBtInicioPause.setAttribute('src', '/imagens/pause.png');
    timerInterval = setInterval(() => {
        if (timeLeftInSeconds <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            iniciarOuPausarBt.textContent = 'Começar';
            timeUpSom.play();
            alert('O tempo acabou!');
            return;
        }
        timeLeftInSeconds--;
        exibeTempo();
    }, 1000);
}

function pauseTimer() {
    timerRunning = false;
    iniciarOuPausarBt.textContent = 'Começar';
    imgBtInicioPause.setAttribute('src', '/imagens/play_arrow.png');
    clearInterval(timerInterval);
}

// Função auxiliar para formatar o tempo em HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes
        .toString()
        .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function exibeTempo () {
    const tempo = formatTime(timeLeftInSeconds);
    tempoNaTela.innerHTML = `${tempo}`;
}


exibeTempo();