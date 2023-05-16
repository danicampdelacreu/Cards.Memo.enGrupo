document.addEventListener("DOMContentLoaded", ()=>{
    const item = document.querySelector('.item')
    item.classList.add('open')

    setTimeout(() => {  // esta funcion activa el volteo inicial a las cartas para verlas 2,5 segundos antes de empezar a jugar
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
          card.classList.add('flipped');// add añade flipped a cada elemento y muestra temporalmente la imagen 
          setTimeout(() => {
            card.classList.remove('flipped');// remove saca clase flipped a todos elementos despues de estos 2,5 segundos
          },2500);
        });
      },2500);
   
})

const url = `https://api.pexels.com/v1/search?query=flores&per_page=8`;
const headers = { Authorization: 'CrIzthWbxPSYAUYYyeXpMKJH4m2nmHkmhVlkvRP66dXm0Ze1JAFZnxZv' };
let contadorIntentos = 0; 
let parejasEncontradas = 0;// Jesus---variable para alert de parejas encontradas

fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
        obtenerFotosFlores(data)//Trae  "data" para poder acceder a todas las fotos.
        actualizarContador();
    })

    

function obtenerFotosFlores(data) {
    const container = document.getElementById('container');

    data.photos = data.photos.concat(data.photos); // Concatena la matriz data.photos consigo misma para obtener duplicados.

    aleatorio(data.photos); //llamar funcion relocat para recolocar fotos aleatoriamente

    let flippedCards = []; // Matriz de cartas volteadas.
   

    data.photos.forEach(photo => {
        let div = document.createElement("div");
        div.setAttribute("class", "card");
        div.setAttribute("data-id", `${photo.id}`);
        container.appendChild(div);

        const img = document.createElement('img');

        img.src = photo.src.medium;
        img.setAttribute('data-id', `${photo.id}`);
        div.appendChild(img);
        

        
        // console.log(div)
        // console.log(img)
        div.addEventListener('click', () => {
            console.log('hola')
            // console.log(flippedCards)
            if (flippedCards.length < 2 && !flippedCards.includes(img)) {
                console.log(flippedCards)
                // Si hay menos de dos cartas volteadas y la carta actual no está volteada, voltea la carta.
                div.classList.add('flipped');
                flippedCards.push(img);
                

                if (flippedCards.length === 2) {
                    contadorIntentos++;// cada vez que se ejecute la linea sumar 1 al anterior
                    actualizarContador(); // Agregamos llamada a actualizarContador()
                    
                    setTimeout(() => {// Si hay dos cartas volteadas, espera dos segundos y compara las cartas.
                        const card1 = flippedCards[0].getAttribute('data-id');
                        console.log(card1)
                        const card2 = flippedCards[1].getAttribute('data-id');

                        if (card1 === card2) { // Si las cartas son iguales, déjalas volteadas y vacía la matriz de cartas volteadas.
                            flippedCards.forEach(img => {
                                img.parentNode.classList.add('matched');
                            });
                            flippedCards = [];
                            parejasEncontradas++;//Jesus--Incrementa el contador de parejas encontradas
                            
                            //--------Jesus---Inicio frases funciones jugadores malos----------
                            
                            if (parejasEncontradas === 1 && contadorIntentos >= 2) {
                                setTimeout(() => {
                                    alert ("Mal empezamos, lumbreras...");
                                }, 500);
                            }

                            if (parejasEncontradas === 3 && contadorIntentos >= 8) {
                                setTimeout(() => {
                                    alert ("¿Has pensado dedicarte a otra cosa? !Continúa!");
                                }, 500);
                            }

                            if (parejasEncontradas === 5 && contadorIntentos >= 16) {
                                setTimeout(() => {
                                    alert ("Tienes menos memoria que el pez dorado, !venga sigue!");
                                }, 500);
                            }

                            if (parejasEncontradas === 6 && contadorIntentos >= 22) {
                                setTimeout(() => {
                                    alert ("No te apellidarás Einstein, ¿por casualidad? Venga que ya te queda menos");
                                }, 500);
                            }

                            if (parejasEncontradas === 7 && contadorIntentos >= 24) {
                                setTimeout(() => {
                                    alert ("¡Ya te despertaste! ¡Buenos días!");
                                }, 500);
                            }
                            //--------Jesus--Fin frases funciones jugadores malos----------

                            //--------Jesus--Inicio frases funciones de jugadores buenos----------
                            if (parejasEncontradas === 1 && contadorIntentos <= 1) {
                                setTimeout(() => {
                                    alert ("Buena memoria !Sigue así!");
                                }, 500);
                            }

                            if (parejasEncontradas === 3 && contadorIntentos <= 4) {
                                setTimeout(() => {
                                    alert ("!Vaya vaya! Cerebrito a la vista, enhorabuena");
                                }, 500);
                            }

                            if (parejasEncontradas === 5 && contadorIntentos <= 8) {
                                setTimeout(() => {
                                    alert ("¡Qué bueno! ¿Has pensado donar tu cerebro a la cienca?");
                                }, 500);
                            }

                            if (parejasEncontradas === 6 && contadorIntentos <= 11) {
                                setTimeout(() => {
                                    alert ("¡Enhorabuena! De aquí a PASAPALABRA");
                                }, 500);
                            }

                            if (parejasEncontradas === 7 && contadorIntentos <= 12) {
                                setTimeout(() => {
                                    alert ("¡Ya lo tienes, qué CAB**N!");
                                }, 500);
                            }
                            //--------Jesus--Fin frases funciones de jugadores buenos----------

                            if (parejasEncontradas === 8) { //Jesus---función de alert de fin de juego con botones de SALIR o JUGAR DE NUEVO
                                setTimeout(() => {
                                  const reiniciarJuego = window.confirm('¡Enhorabuena! ¡Te pasaste el juego!\n¿Deseas reiniciar?');
                                  if (reiniciarJuego) {
                                    location.reload();
                                    setTimeout(() => {  // esta funcion activa el volteo inicial a las cartas para verlas 2,5 segundos antes de empezar a jugar
                                        const cards = document.querySelectorAll('.card');
                                        cards.forEach(card => {
                                          card.classList.add('flipped');// add añade flipped a cada elemento y muestra temporalmente la imagen 
                                          setTimeout(() => {
                                            card.classList.remove('flipped');// remove saca clase flipped a todos elementos despues de estos 2,5 segundos
                                          },2500);
                                        });
                                      },2500);
                                    }
                                }
                            )}




                          
                        } else { // Si las cartas no son iguales, da la vuelta a las cartas de nuevo y vacía la matriz de cartas volteadas.
                            flippedCards.forEach(img => {
                                img.parentNode.classList.remove('flipped');
                            });
                            flippedCards = [];
                        }
                    }, 2000);
                }
            }
        });

       
    });
};

// funcion para hacer recolocacion de fotos
function aleatorio(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const Random = Math.floor(Math.random() * (i + 1));
        [array[i], array[Random]] = [array[Random], array[i]];
    }
}

// funcion para actualizar el contador de intentos
function actualizarContador() {
    const contador = document.getElementById('contador-intentos');
    contador.textContent = contadorIntentos;// funcion toma valor contadorIntentos y la muestra
   
}