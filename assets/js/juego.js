/** 50. CREAR BARAJA DE CARTAS
 *
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Picas)
 *  
 **/

// Cubierta o Baraja
let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector("#btn-pedir");
const btnDetener = document.querySelector("#btn-detener");
const btnNuevo = document.querySelector('#btn-nuevo');
const scores = document.querySelectorAll('span');
const divJugadorCartas = document.querySelector('#div-jugador-cartas');
const divComputadorCartas = document.querySelector('#div-computador-cartas');

// Esta funcion crea un nuevo deck
const createDeck = () => {
    for(let i = 2; i <= 10; i++) {
        // deck.push(i + 'C');
        for(let tipo of tipos) {
            deck.push(`${i}${tipo}`);
        }
    }

    for(let especial in especiales) {
        for(let tipo of tipos) {
            deck.push(especiales[especial] + tipo);
        }
    }

    deck = _.shuffle(deck);

    console.log(deck);

    return deck;
}

// Esta funcion permite obtener una carta
const pedirCarta = () => {
    if(deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    // const carta1 = deck.shift();
    const carta2 = deck.pop();

    return carta2;
}

// ESTA FUNCION: obtiene el valor de la carta
const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return  ((isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1);
}

// turno computadora
const turnoComputadora = ( puntosMinimos ) => {

    do {

        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);
    
        scores[1].innerHTML = puntosComputadora;
    
        // <img class="participante__carta-img" src="./assets/cards/10H.png" alt="carta entregada del juego"></img>
        const imgCarta = document.createElement('img');
        imgCarta.alt = 'Carta proporcionada por el juego';
        imgCarta.src = `./assets/cards/${carta}.png`;
        imgCarta.classList.add('participante__carta-img');
    
        divComputadorCartas.append(imgCarta);

        if(puntosMinimos > 21) {
            break;
        }

    } while((puntosMinimos > puntosComputadora) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntosComputadora > 21) {
            alert('Felicidades has ganado!!');
        } else if (puntosComputadora === puntosJugador) {
            alert('Ha sido un duelo parejo!!');
        } else {
            alert('Lo sentimos, has perdido!!');
        }
    }, 100);

};

const inicioComputadora = () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
}

const nuevaPartida = () => {
    deck = [];
    puntosJugador = 0;
    puntosComputadora = 0;
    scores[0].innerText = 0;
    scores[1].innerText = 0;
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    divJugadorCartas.innerHTML = '';
    divComputadorCartas.innerHTML = '';

    createDeck();
}

// const valor = valorCarta(pedirCarta());

/** 53. Introducción al DOM y su manipulación
 * 
 *  Se trabajo con el objeto => document
 * 
 *  Un consejo del instructor, hacer estás manipulaciones lo menos posible, y
 *  en caso de utilizar un elemento más de una vez, se recomienda grabarlo en
 *  una variable (por tema de rendimiento).
 *  
 *  Ej: const h1 = document.querySelector('h1');
 *      h1.innerText = 'Hola Mundo';
*/

/** 54. Manipulación del DOM - Segunda Parte
 * 
 * Se necesita aprender a crear nuevos elementos en la estructura HTML.
 * Algo necesario y básico que se debe saber manipulando el DOM
 * 
 * Comandos vistos: const div = document.querySelector('#div-botones');
 *                  const boton = document.createElement('button');
 *                  boton.classList.add('btn2');
 *                  boton.classList.add('m-1');
 *                  div.append(boton); // .prepend(boton) coloca el elemento al inicio.
 * 
*/

// 55. EVENTO CLICK - PEDIR CARTA 
/*
elemento.addEventListener('click, dbclick, focus', function() {
}
    Una función que se entrega como parámetro para otra función es
    llamada Callback
)

*/
btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);

    scores[0].innerHTML = puntosJugador;

    // <img class="participante__carta-img" src="./assets/cards/10H.png" alt="carta entregada del juego"></img>
    const imgCarta = document.createElement('img');
    imgCarta.alt = 'Carta proporcionada por el juego';
    imgCarta.src = `./assets/cards/${carta}.png`;
    imgCarta.classList.add('participante__carta-img');

    divJugadorCartas.append(imgCarta);

    if(puntosJugador > 21) {
        console.warn('Lo siento, te pasaste!!');
        inicioComputadora();
    } else if(puntosJugador === 21) {
        console.warn('Genial, Lograste obtener 21!!');
        inicioComputadora();
    }

});


btnDetener.addEventListener('click', () => {
    if(puntosJugador === 0) {
        alert('Al menos debes tener 1 carta para detenerte');
    } else {
        inicioComputadora();
    }
});

btnNuevo.addEventListener('click', () => {

    console.clear();
    
    if(puntosJugador === 0) {
        alert('Su juego está listo para iniciar');
    } else if(puntosComputadora === 0) {
        const respuesta = prompt('Esta en curso su juego, desea reestrablecerlo perderá todo lo invertido? s/n', 'n');
        if(respuesta === 'S' || respuesta === 's') {
            nuevaPartida();
            setTimeout(() => {
                alert('Partida restablecida con éxito!!'); 
            }, 100);
        }
    } else {
        nuevaPartida();
        setTimeout(() => {
            alert('Partida nueva!!');  
        }, 100);
    }

});

createDeck();