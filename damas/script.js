const tamanhoCelula = 40;
let pecaId = 0;
let celulaId = 0;
//let linhaId = 0;
var lastDragged;
var walkMoves = [7, 9];
var captureMoves = [14, 18]
document.body.append(criaTabuleiro());

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {

        let linha = document.createElement('tr');
        //linhaId++;
        //linha.setAttribute('id', linhaId);
        tabela.append(linha);

        for (let j = 0; j < tamanho; j++) {

            let celula = document.createElement('td');
            linha.append(celula);

            celulaId++;
            celula.setAttribute("id", 100+celulaId);
            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;
            
            if (i % 2 == j % 2) {
                celula.addEventListener("drop", drop);
                celula.addEventListener("dragover", allowDrop);
                celula.style.backgroundColor = 'black';
                if (i * 8 + j <= 24) {
                    celula.append(criaPeca('black', 1));
                } else if (i * 8 + j >= 40) {
                    celula.append(criaPeca('red', -1));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
    return tabela;
}

function criaPeca(cor, disponivel) {
    pecaId++;
    let imagem = document.createElement('img');
    imagem.setAttribute('id', pecaId);
    imagem.setAttribute("data-disponivel", disponivel);
    imagem.setAttribute('src', `img/${cor}.png`);
    imagem.setAttribute("data-cor", cor);
    imagem.setAttribute('width', `${tamanhoCelula-4}px`);
    imagem.setAttribute('height', `${tamanhoCelula-4}px`);
    imagem.setAttribute("draggable", "true");
    imagem.addEventListener("dragstart", drag)
    return imagem;
}

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    if (parseInt(ev.target.dataset.disponivel) > 0) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    lastDragged = ev.target;
}
  
function drop(ev) {
    
    let lastDraggedCel = parseInt(lastDragged.parentNode.id) - 100;
    let dropCelPosition = parseInt(ev.target.id) - 100;
    
    let c;
    if (lastDragged.dataset.cor == "black") {
        console.log('preto')
        c = dropCelPosition - lastDraggedCel;
    }
    else {
        console.log('branco')
        c = lastDraggedCel - dropCelPosition;
    }

    /*
    lista = [7, 9] -> i
    if ((lugar_de_dropar - i) == (posicao_de_drag - i)):
        if (posicao_de_drag + i < 100 ) //indica que é peca.
            remove peça
            dropa normalmente
            score += 1 para time que moveu.
    */

    if (parseInt(ev.target.id) > 100 && walkMoves.includes(c)) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));

        var imagens = document.querySelectorAll("img");
        imagens.forEach(function(img) {
            img.dataset.disponivel *= -1;
        });
    }

    if (parseInt(ev.target.id) > 100 && captureMoves.includes(c)) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));

        var imagens = document.querySelectorAll("img");
        imagens.forEach(function(img) {
            img.dataset.disponivel *= -1;
        });
    }
}