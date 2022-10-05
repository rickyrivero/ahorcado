//Seletores
let pantalla = document.querySelector("canvas");
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display = "none"
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none"
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = 'none';
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById("btn-cancelar");


var palabras = ['ALURA', 'AHORCADO', 'HTML', 'ORACLE', 'JAVASCRIPT', 'LOGICA', 'DESAFIO'];
var tablero = document.getElementById('horca').getContext('2d');
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroDeErrores = 8
let letraElegida = [];


document.getElementById("iniciar-juego").onclick = () => {
  iniciarJuego();
}

document.getElementById("btn-guardar").onclick = () => {
  guardarPalabra();
}

//actualiza la pantalla cuando el usuario hace click en el botón "nuevo juego"
btnNuevoJuego.addEventListener("click", function () {
  location.reload();
});

//actualiza la pantalla cuando el usuario hace click en el botón "salir"
btnSalir.addEventListener("click", function () {
  location.reload();
});

//actualiza la pantalla cuando el usuario hace click en el botón "cancelar"
btnCancelar.addEventListener("click", function () {
  location.reload();
});


//sortea la palabra que será usada en el ahorcado
function escojerPalabraSecreta() {
  let palabra = palabras[Math.floor(Math.random() * palabras.length)]
  palabraSecreta = palabra
  return palabra
}


// verifica cual es la letra en que el usuario hizo clic
function comprobarLetra(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key)
    return false

  }
  else {
    letras.push(key)
    return true
  }
}

function añadirLetracorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase()
}

function añadirLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    errores -= 1
  }
}


function verificarFinJuego(letra) {
  //verificar si la letra ha sido incluída en el array de  las letras correctas o incorrectas
 if(letraElegida.length < palabraSecreta.length) {
    //incluye las letras ya digitadas en el array
    letrasIncorrectas.push(letra);


    //valida se el usuario cometió el numero maximo de errores
    if (letrasIncorrectas.length > numeroDeErrores) {
      perdiste()
    }
    else if(letraElegida.length < palabraSecreta.length) {
      añadirLetraIncorrecta(letra)
      escribirLetraIncorrecta(letra, errores)
    }
  }
}

//Verifica si el usuario ha ganado
function verificarVencedor(letra) {
  letraElegida.push(letra.toUpperCase());
  if (letraElegida.length == palabraSecreta.length) {

    ganaste()

  }

}



//impide que teclas como shift y otras, sean consideradas errores y sean escritas
function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}


function agregarPalabra() {
  document.getElementById("div-desaparece").style.display = 'none';
  document.getElementById("agregar-palabra").style.display = "block";

}

// guarda la palabra que el usuario quiere agregar
function guardarPalabra() {

  //captura lo que el usuario ha digitado
  let nuevaPalabra = document.getElementById('input-palabra-nueva').value;

  // incluye la palabra que el usuario digitó en el array de las palabras a serán sorteadas
  if(nuevaPalabra !== ""){
    palabras.push(nuevaPalabra.toUpperCase());
    swal('Perfecto!', 'La palabra fue guardada', 'success')

    document.getElementById("agregar-palabra").style.display = "none";
    iniciarJuego();
  }
  else{
    swal('Error',"Ninguna palabra ha sido digitada", 'error')
  }

}

//inicia el juego
function iniciarJuego() {

  document.getElementById("div-desaparece").style.display = 'none';

  dibujarTablero();

  escojerPalabraSecreta();

  dibujarLineas();

  document.getElementById("btn-nuevo-juego").style.display = "block"
  document.getElementById("btn-salir").style.display = "block"

  // captura la letra que el usuario escribió
  document.onkeydown = (e) => {
    let letra = e.key.toUpperCase()
    //verifica si el usuario todavia no ha perdido
    if (letrasIncorrectas.length <= numeroDeErrores) {
      if (!comprobarLetra(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          añadirLetracorrecta(palabraSecreta.indexOf(letra))
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              escrribirLetraCorrecta(i)
              verificarVencedor(letra)

            }
          }

        }
        // si el usuario cometió más errores de los que son permitidos,
        //llama las funciones que dibujan el ahorcado y exibe el mensaje de fin de juego
        else {
          if (!comprobarLetra(e.key) && !verificarVencedor(letra)) return
          dibujarAhorcado(errores)
          verificarFinJuego(letra)
        }
      }
    }
    else {
      swal('Cuidado','Has alcanzado el límite de letras incorrectas')
    }

  };
}

