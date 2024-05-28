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
    
    // console.log(deck);

    deck = _.shuffle(deck);

    console.log(deck);

    return deck;
}

createDeck();

// Esta funcion permite obtener una carta
const pedirCarta = () => {
    if(deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    // const carta1 = deck.shift();
    const carta2 = deck.pop();
    
    // Entregar una carta de la baraja y la regrese, y luego tiene que dejar de existir
    // console.warn('Se ha obtenido una carta de la baraja');
    // console.log(deck);
    // console.log(carta2);

    return carta2;
}

// pedirCarta();

// ESTA FUNCION: obtiene el valor de la carta
const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return  ((isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1);
    // return ( (!isNaN(valor)) ? valor*1 : (valor === 'A') ? 11 : 10);
    // console.log({ valor })

    // let puntos = 0;
    // // Saber si es un número y convertirlo a uno (un tipo de dato numérico), normalmente se le multiplica 1
    // if(isNaN( valor )) {
    //     // console.log('No es un número');
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {
    //     // console.log('Es un número');
    //     puntos = valor * 1;
    // }
    // console.log(puntos);
}

const valor = valorCarta(pedirCarta());
// console.log({ valor });

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

