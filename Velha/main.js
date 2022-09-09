//lógica por trás do jogo da velha :)))
//armazena valores da base da tela
var display = document.getElementById('display')
display.style.height = window.innerHeight * 0.75 + 'px';
display.style.width = document.getElementById('display').style.height;

//quem inicia
localStorage.getItem('roundlead') == undefined ? localStorage.setItem('roundlead', 'x') : false
let turn = localStorage.getItem('roundlead')

//alterna quem começa a próxima partida
if(localStorage.getItem('roundlead')=='x')localStorage.setItem('roundlead', 'o')
else localStorage.setItem('roundlead', 'x')
//boolean de vitória
var win = false

//armazena o local de mensagem
let narrator = document.getElementById('narrator')
//primeira mensagem, qual inicia
narrator.innerText = turn.toUpperCase()+' inicia a partida'

//armazena dois valores locais no navegador se não presentes
localStorage.getItem('x_victories') == undefined ? localStorage.setItem('x_victories', 0) : false
localStorage.getItem('o_victories') == undefined ? localStorage.setItem('o_victories', 0) : false

//estética
document.getElementById('game-table').style.gridTemplateColumns = 100 / 3 + '% ' + 100 / 3 + '% ' + 100 / 3 + '%';
document.getElementById('game-table').style.gridTemplateRows = 100 / 3 + '% ' + 100 / 3 + '% ' + 100 / 3 + '%';

//armazena todos os itens (imagem) de jogo
var content = document.querySelectorAll('.game-table div img')

let red = 255
let blue = 255

//função de cores
anim()
function anim() {
    //define a cor gradiente do jogo de acordo com a rodada
    display.style.backgroundImage = 'linear-gradient(to bottom right, rgb(' + red / 2 + ',0,' + blue / 2 + '), rgb(' + red + ',0,' + blue + '))';
    //define a cor gradiente do jogo de acordo com a condição de vitória
    win ? document.body.style.backgroundImage = 'linear-gradient(to bottom right, rgb(' + red / 4 + ',0,' + blue / 4 + '), rgb(' + red / 2 + ',0,' + blue / 2 + '))' : false
    document.getElementById('replay-btn').style.backgroundImage = 'linear-gradient(to bottom right, rgb(' + red / 4 + ',0,' + blue / 4 + '), rgb(' + red / 2 + ',0,' + blue / 2 + '))'
    //tons aumentam ou diminuem conforme a rodada
    if (turn == 'x') {
        red < 255 ? red += 5 : false
        blue > 0 ? blue -= 5 : false
    }
    else {
        red > 0 ? red -= 5 : false
        blue < 255 ? blue += 5 : false
    }
    //aproveitamento de codigo: mostra as vitórias
    document.getElementById('x_victories').innerText = localStorage.getItem('x_victories')
    document.getElementById('o_victories').innerText = localStorage.getItem('o_victories')
    //loop
    window.requestAnimationFrame(anim)
}

function listen(a) {
    //verifica qual quadrado foi selecionado
    if (!win) {
        a = parseInt(a)
        if (!content[a].hasAttribute('src')) {
            //insere a fonte de uma imagem na tag img
            content[a].setAttribute('src', turn + '.png');
            //verificação meridional
            for (let i = 0; i < 9; i += 3) {
                let p = 0
                for (let o = i; o < i + 3; o++)
                    if (content[o].getAttribute('src') == turn + '.png') p++
                p == 3 ? win = true : false
            }
            for (let i = 0; i < 3; i++) {
                let p = 0
                for (let o = i; o < 9; o += 3)
                    if (content[o].getAttribute('src') == turn + '.png') p++
                p == 3 ? win = true : false
            }
            //verificação diagonal
            if (content[0].getAttribute('src') == turn + '.png' && content[4].getAttribute('src') == turn + '.png' && content[8].getAttribute('src') == turn + '.png') win = true
            if (content[2].getAttribute('src') == turn + '.png' && content[4].getAttribute('src') == turn + '.png' && content[6].getAttribute('src') == turn + '.png') win = true

            //condição de vitória
            //se não venceu
            if (!win) {
                let x = 0
                for (let i = 0; i < 9; i++)
                    if(!content[i].hasAttribute('src'))x++

                //troca de rodada
                if (x > 0) {
                    turn == 'x' ? turn = 'o' : turn = 'x'
                    narrator.innerText = 'Rodada de ' + turn.toUpperCase()
                }
                //mensagem de empate
                else {
                    narrator.innerText = 'Empate'
                    document.getElementById('replay-btn').style.display = 'inline'
                }
            }
            //se vencer
            else {
                //armazena na memória
                let v = parseInt(localStorage.getItem(turn + '_victories'))
                localStorage.setItem(turn + '_victories', v + 1)

                //mensagem de vitória
                narrator.innerText = turn.toUpperCase() + ' venceu'
                document.getElementById('replay-btn').style.display = 'inline'
            }
        }
    }
}