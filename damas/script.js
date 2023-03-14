const tamanhoCelula = 40;
let pecaId = 0;
let celulaId = 0;
let linhaId = 0;
var lastDragged;
var walkMoves = [7, 9, 14, 18];
document.body.append(criaTabuleiro());

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {

        let linha = document.createElement('tr');
        linhaId++;
        linha.setAttribute('id', linhaId);
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
    imagem.setAttribute('width', `${tamanhoCelula-4}px`);
    imagem.setAttribute('height', `${tamanhoCelula-4}px`);
    imagem.setAttribute("draggable", "true");
    imagem.addEventListener("dragstart", drag)
    return imagem;
}

function allowDrop(ev) {
    console.log("allow: " + ev.target.id)
    ev.preventDefault();
}
  
function drag(ev) {
    if (parseInt(ev.target.dataset.disponivel) > 0) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    //Preciso descobrir se isso está influenciando em algo.
    /*Uncaught TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.*/

    lastDragged = ev.target.id;
}
  
function drop(ev) {
    /*acredito que essa lógica funcione, mas precisa considear o parentNode.*/
    // let a = parseInt(lastDragged);
    // let b = parseInt(ev.target.id) - 100;
    // let c = b - a;
    // console.log(a, b, c);

    if (parseInt(ev.target.id) > 100) {
        console.log(ev.target.parentNode);
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));

        var imagens = document.querySelectorAll("img");
        imagens.forEach(function(img) {
            img.dataset.disponivel *= -1;
        });
    }
}
