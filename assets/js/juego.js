// 63. PATRÓN MODULO
(() => {
    'use strict'

    // Cubierta o Baraja
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedir = document.querySelector("#btn-pedir"),
          btnDetener = document.querySelector("#btn-detener"),
          btnNuevo = document.querySelector('#btn-nuevo');

    const scores = document.querySelectorAll('span'),
          divJugadorCartas = document.querySelector('#div-jugador-cartas'),
          divComputadorCartas = document.querySelector('#div-computador-cartas');

    // Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 1 ) => {
        deck = crearDeck();
        for(let i=0; i<numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosJugadores.push(0);

        console.log({ puntosJugadores });
    }
    
    // Esta funcion crea un nuevo deck
    const crearDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(`${i}${tipo}`);
            }
        }

        for (let especial in especiales) {
            for (let tipo of tipos) {
                deck.push(especiales[especial] + tipo);
            }
        }

        return _.shuffle(deck);
    }

    // Esta funcion permite obtener una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        // return deck.shift();
        return deck.pop();
    }

    // ESTA FUNCION: obtiene el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return ((isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1);
    }

    const acumularPuntos = () => {

    }

    // turno computadora
    const turnoComputadora = (puntosMinimos) => {

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

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosMinimos > puntosComputadora) && (puntosMinimos <= 21));

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
        puntosJugador = 0;
        puntosComputadora = 0;
        scores[0].innerText = 0;
        scores[1].innerText = 0;
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        divJugadorCartas.innerHTML = '';
        divComputadorCartas.innerHTML = '';

        deck = crearDeck();
    }

    btnPedir.addEventListener('click', () => {

        if(deck.length > 0) {
            const carta = pedirCarta();

            puntosJugador += valorCarta(carta);
            scores[0].innerHTML = puntosJugador;
    
            // <img class="participante__carta-img" src="./assets/cards/10H.png" alt="carta entregada del juego"></img>
            const imgCarta = document.createElement('img');
            imgCarta.alt = 'Carta proporcionada por el juego';
            imgCarta.src = `./assets/cards/${carta}.png`;
            imgCarta.classList.add('participante__carta-img');
    
            divJugadorCartas.append(imgCarta);
    
            if (puntosJugador > 21) {
                console.warn('Lo siento, te pasaste!!');
                inicioComputadora();
            } else if (puntosJugador === 21) {
                console.warn('Genial, Lograste obtener 21!!');
                inicioComputadora();
            }
        }

    });


    btnDetener.addEventListener('click', () => {
        if (puntosJugador === 0) {
            alert('Al menos debes tener 1 carta para detenerte');
        } else {
            inicioComputadora();
        }
    });

    btnNuevo.addEventListener('click', () => {

        console.clear();

        if (deck.length == 0) {
            inicializarJuego();
        } else if (puntosJugador === 0) {
            alert('Su juego está listo para iniciar');
        } else if (puntosComputadora === 0) {
            const respuesta = prompt('Esta en curso su juego, desea reestrablecerlo perderá todo lo invertido? s/n', 'n');
            if (respuesta === 'S' || respuesta === 's') {
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

})();

