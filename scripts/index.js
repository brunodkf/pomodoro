const html = document.querySelector('html');

const displayTempo = document.querySelector('#timer');

const hero = document.querySelector('.app__image');

const titulo = document.querySelector('.app__title');

// Botoes

const playbt = document.querySelector('.app__card-primary-button');

const focobt = document.querySelector('.app__card-button--foco');

const curtobt = document.querySelector('.app__card-button--curto');

const longobt = document.querySelector('.app__card-button--longo');

const playMusic = document.querySelector('#alternar-musica');

const musica = new Audio('./assets/sons/luna-rise-part-one.mp3');
musica.loop = true;

const startTempBt = document.querySelector('#start-pause');
const startTempBtText = document.querySelector('#start-pause span');
const startTempBtImg = document.querySelector('#start-pause img');

const playSound = new Audio('./assets/sons/play.wav');
const pauseSound = new Audio('./assets/sons/pause.mp3');
const finalSound = new Audio('./assets/sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

//Tempos 

const tempFoco = 1500;
const tempCurto = 300;
const tempLongo = 900;



//Functions

const verificaClasse = (event)=>{
    document.querySelectorAll('.app__card-button').forEach((e)=>{
        if(e.classList.contains('active')){
            e.classList.remove('active');
            event.target.classList.add('active');
        }else{
            event.target.classList.add('active');
        }
    })
}

const alterarContexto = (contexto)=>{
    mostrarTempo()
    html.setAttribute('data-contexto', contexto);
    hero.setAttribute('src', `./assets/imagens/${contexto}.png`); 
    switch (contexto) {
        case "foco":
            titulo.innerHTML =  `Otimize sua produtividade, <br><strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong"> Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superficie<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}



//EventListeners

focobt.addEventListener('click', (event)=>{
    tempoDecorridoEmSegundos = tempFoco;
    alterarContexto('foco');
    verificaClasse(event);
})

curtobt.addEventListener('click', (event)=>{
    tempoDecorridoEmSegundos = tempCurto;
    alterarContexto('descanso-curto');
    verificaClasse(event);
})

longobt.addEventListener('click', (event)=>{
    tempoDecorridoEmSegundos = tempLongo;
    alterarContexto('descanso-longo');
    verificaClasse(event);
})

playMusic.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})


//Trabalhando no Temporizador

function iniciarOuPausar(){
    if(intervaloId){
        zerar();
        pauseSound.play();
        return;
    }
    playSound.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    startTempBtText.textContent = "Pausar";
    startTempBtImg.setAttribute('src', './assets/imagens/pause.png');
}

const contagemRegressiva = ()=>{
    if(tempoDecorridoEmSegundos <= 0){
        finalSound.play();
        alert('Fica ligado, mané.');
        zerar();
        return;
    }

    tempoDecorridoEmSegundos -= 1;

    mostrarTempo();
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
    startTempBtText.textContent = "Começar";
    startTempBtImg.setAttribute('src', './assets/imagens/play_arrow.png');
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    displayTempo.innerHTML = `${tempoFormatado}`
}

mostrarTempo();


startTempBt.addEventListener('click', iniciarOuPausar);