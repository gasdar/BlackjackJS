// 63. PATRÓN MODULO
const miModulo = (() => {
    'use strict';

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
          divCartasJugadores = document.querySelectorAll(".participante__carta");

    // Esta funcion inicializa el juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();
        for(let i=0; i<numJugadores; i++) {
            puntosJugadores.push(0);
        }
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

    // Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = ( carta, turno ) => {
        puntosJugadores[turno] += valorCarta(carta);
        scores[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.alt = 'Carta proporcionada por el juego';
        imgCarta.src = `./assets/cards/${carta}.png`;
        imgCarta.classList.add('participante__carta-img');
        divCartasJugadores[turno].append(imgCarta);
        
    }

    const determinarGanador = () => {

        const [puntosJug, puntosComp] = puntosJugadores;

        setTimeout(() => {
            if (puntosComp > 21) {
                alert('Felicidades has ganado!!');
            } else if (puntosComp === puntosJug) {
                alert('Ha sido un duelo parejo!!');
            } else {
                alert('Lo sentimos, has perdido!!');
            }
        }, 100);

    }

    // turno computadora
    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();
            acumularPuntos(carta, puntosJugadores.length-1);
            crearCarta(carta, puntosJugadores.length-1);
        } while ((puntosMinimos > puntosJugadores[puntosJugadores.length-1]) && (puntosMinimos <= 21));

        determinarGanador();
    };

    const inicioComputadora = () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    }

    const nuevaPartida = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for(let i=0; i<numJugadores; i++) {
            puntosJugadores.push(0);
        }
        scores.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    btnPedir.addEventListener('click', () => {

        if(deck.length > 0) {
            const carta = pedirCarta();
            acumularPuntos(carta, 0);
            crearCarta(carta, 0);
    
            if (puntosJugadores[0] > 21) {
                console.warn('Lo siento, te pasaste!!');
                inicioComputadora();
            } else if (puntosJugadores[0] === 21) {
                console.warn('Genial, Lograste obtener 21!!');
                inicioComputadora();
            }
        } else {
            alert('Debe iniciar un nuevo juego');
        }

    });


    btnDetener.addEventListener('click', () => {
        if (puntosJugadores[0] === undefined) {
            alert('Debe iniciar un nuevo juego');
        } else if(puntosJugadores[0] === 0) {
            alert('Al menos debes tener 1 carta para detenerte');
        } else {
            inicioComputadora();
        }
    });

    // btnNuevo.addEventListener('click', () => {

    //     console.clear();

    //     if (deck.length === 0) {
    //         inicializarJuego(2);
    //     } else if (puntosJugadores[0] === 0) {
    //         alert('Su juego está listo para iniciar');
    //     } else if (puntosJugadores[puntosJugadores.length - 1] === 0) {
    //         const respuesta = prompt('Esta en curso su juego, desea reestrablecerlo perderá todo lo invertido? s/n', 'n');
    //         if (respuesta === 'S' || respuesta === 's') {
    //             nuevaPartida(2);
    //             setTimeout(() => {
    //                 alert('Partida restablecida con éxito!!');
    //             }, 100);
    //         }
    //     } else {
    //         nuevaPartida(2);
    //     }

    // });

    return {
        nuevoGame: nuevaPartida
    };

})();

