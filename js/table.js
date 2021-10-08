// let canvas = document.querySelector('#myCanvas');
// let ctx = canvas.getContext("2d"); 
//dibujando el tablero
//#region Valores de tablero

let inicX;
let inicY;
let dimX;
let dimY;
let cantWin;
let tabWidth = 60;
let tabHeight = 60;
let tabFill = "#232323";
let fillCirc = "white";
let colorUno = "ROJO";
let colorDos = "AMARILLO";
let colorWin = "#a5dbec";
let ultimoColor = colorDos;
let modoDeJuego;
let fichasJugador = null;
let tamFicha = null;
//#endregion
let juegoIniciado = false;
let continuaPartida = false;
let ptsJ1 = 0;
let ptsJ2 = 0;
let temporizador;
let segundos = 0;

let minutos = 0;
let fichas = [];//Fichas de ambos equipos
let vecinos = [];//busca iguales al rededor
let bajadas = [];//sectores de bajada de ficha
//guardo el Tablero
let matrizJuego = [];

crearTablero();

function verificarPTSGanador(){

  if (ptsJ1 > ptsJ2){
    document.querySelector(".turnos").innerHTML = "SE ACABO EL TIEMPO, GANO EL JUGADOR 1!!!"
  }
  else if (ptsJ2 > ptsJ1) {
    document.querySelector(".turnos").innerHTML = "SE ACABO EL TIEMPO, GANO EL JUGADOR 2!!!"
  }
  else{
    document.querySelector(".turnos").innerHTML = "SE ACABO EL TIEMPO, HUBO EMPATE!!!"
    juegoGanado = false
  }
  

  document.querySelector(".btnContinuarReiniciar").style.display = "flex";
  document.getElementById("btnReiniciar").style.display = "flex";
  
}

function reloj(){  

  let s = document.getElementById("segundos")
  let m = document.getElementById("minutos")
  m.innerHTML = "0"+minutos

  temporizador = setInterval(function(){

      if(minutos == 0 && segundos == 1){
        
        clearTimeout(temporizador);
        verificarPTSGanador() 
        juegoIniciado = false
        drawFigures()
      }

        if(segundos == 0){
          segundos = 60;
          minutos--;
          m.innerHTML = "0"+minutos
          
        }
        
        segundos--

        if(segundos <10){
          s.innerHTML = "0"+segundos
        }
        else{
          s.innerHTML = segundos
        }

      },1000)
}


 function crearTablero(){

    let botones = document.querySelectorAll("button");
    let divJugador = document.querySelectorAll(".jugador");

    for(let i=0; i < botones.length; i++) {

        botones[i].addEventListener("click", function(){
    
            modoDeJuego = botones[i].value;
            document.querySelector(".modoDeJuego").classList.add("ocultarButtons");
            document.querySelector(".turnos").style.display = "flex";
            document.querySelector(".cronometro").style.display = "flex"

            for(let j=0; j < divJugador.length; j++) {
                divJugador[j].style.display = "flex";
                document.querySelector(".tablero").style.display = "flex";
                
            }
            setTablero();
            juegoIniciado = true;
            juegoGanado = false;
            dibujarFichas();
            reloj()
        })
    }
}


cargarParametros();

//****************FIN SECUENCIAL *************/

function cargarParametros(){ //calculo los parametros
  fichasJugador = dimX * dimY;
  tamFicha = (tabWidth/2) -7;
}

//#region NIVELES DE JUEGO


function setTablero(){  //setea el tablero
  
  if (!juegoIniciado){

    if(!continuaPartida){

      let canvas = document.querySelector('#myCanvas');

      if(modoDeJuego == 4){
          dimY = 6;
          dimX = 7
          cantWin = 4
          inicX = 290
          minutos =1;
      }

      else if (modoDeJuego == 6){
          dimY = 7;
          dimX = 8
          cantWin = 6
          canvas.height = 600; 
          canvasHeight = canvas.height
          inicX = 260;
          minutos = 6;
      }

      else if (modoDeJuego == 7){
          dimY = 8;
          dimX = 9;
          cantWin = 7
          canvas.width = 1100
          canvas.height = 700;
          canvasWidth = canvas.width
          canvasHeight = canvas.height
          inicX = 290;
          minutos = 7;
      }

      else if (modoDeJuego == 8){
          dimY = 9;
          dimX = 10
          cantWin = 8
          canvas.width = 1100
          canvas.height = 700; 
          canvasWidth = canvas.width
          canvasHeight = canvas.height
          inicX = 260;
          minutos = 8;
      }

      inicY = 80;
    }
      document.querySelector(".title").innerHTML = modoDeJuego + " en linéa"
      cargarParametros();
      dibujarFichas();
  }
    
}

function dibujarFichas(){

    let initAltura = 160;
    let aux = false;
    let limitRojoX = inicX -80;
    let inicAmarilloX = canvasWidth - 210

      for (let i=0; i < fichasJugador; i++){
        
        if(initAltura <= canvasHeight/2){
          initAltura += 15
          
        }
        
        else{
          if(aux == false){
            initAltura = 160;
            aux = true;
          }
          initAltura += 15
          limitRojoX = 120
          inicAmarilloX = canvasWidth - 120
        }

          fichas[i]=addFichaR(limitRojoX,initAltura,colorUno); //creo las fichas rojas
          i++;
          fichas[i]=addFichaA(inicAmarilloX, initAltura, colorDos); //crep las fichas amarillas
          
      }
    cargarTablero();
    cargarBajadas();
    drawFigures();
}

function addFichaR(X,Y,color){ //podriamos agregar un parametro para cargar una imagen...
  let posX =  X//Math.round(Math.random() * X);
  let posY = Y //+ Math.round(Math.random() * (canvasHeight - Y)); //se crea aleatoriamente en el canvas
  let radio = tamFicha;
  let dir= "img/ficha_roja.png";
  let ficha = new Ficha(posX,posY,color,radio,ctx,dir); //Creamos el objeto ficha con sus respectivos parametros y lo retornamos
  return ficha;
}

function addFichaA(X,Y,color){
  let posX = X; //se crea pero del otro lado!
  let posY = Y //+ Math.round(Math.random() * (canvasHeight - Y));
  let radio = tamFicha;
  let dir= "img/ficha_amarilla.png";
  let ficha = new Ficha(posX,posY,color,radio,ctx,dir);
  return ficha;
}


function cargarTablero(){
    let posX = inicX;
    let posY = inicY;
    let ancho = tabWidth;
    let alto = tabHeight;
    let color = "#232323";
    for (let i = 0; i < dimY ; i++){
        matrizJuego[i]=[];
        for(let j = 0; j < dimX; j++){
            let rect = new Rect(posX,posY,color,ctx,ancho,alto); //creamos el tablero
            let dir = "img/ficha_blanca.png";
            let circ = new Ficha(posX+(ancho/2),posY+(alto/2),fillCirc,(ancho/2)-10,ctx,dir); //creamos las falsas fichas para el tablero
            //guardo el estado de casillero, arranca en blanco
            let compuesto = new FigCompuesta(rect,circ); //para poder obtener la informacion del objeto se crea la clase!
            matrizJuego[i][j] = compuesto;
            posX+=ancho;
        }
        posX = inicX;
        posY+=alto;
    }
  }



  function cargarBajadas(){ //creo las flechas de entrada!
    let posY = inicY - tamFicha;
    let posX = inicX + (tabWidth/2);
    let radio = tamFicha;
    let dir = "img/flecha.png";
    for(let i = 0; i < dimX; i++){
      let circle = new Ficha(posX,posY,"black",radio,ctx,dir);
      bajadas[i] = circle;
      posX+=tabWidth;
    }
  }

  function dibujarTablero(){ //simplemente se dibuja el tablero!
    dibujarBajadas();
    for(let i=0; i < dimY; i++){
      for(let j=0; j < dimX; j++){
        matrizJuego[i][j].getFig1().draw();
        matrizJuego[i][j].getFig2().draw();
      }
    }
  }


  /// MODIFICA EL CUADRANTE DEL SECTOR GANADOR
  function cargarGanador(color){

    clearTimeout(temporizador); //se para el reloj
    let ganadorDeRonda;
    if(color == colorUno){
      ptsJ1++;
      document.getElementById("player1").innerHTML = ptsJ1
      document.querySelector(".turnos").innerHTML = "GANO EL JUGADOR 1!!!"
      ganadorDeRonda = "jugador 1"
    }
    else{
      ptsJ2++;
      document.getElementById("player2").innerHTML = ptsJ2
      document.querySelector(".turnos").innerHTML = "GANO EL JUGADOR 2!!!"
      ganadorDeRonda = "jugador 2"
    }

    for(let i = 0; i < vecinos.length ; i++){
      matrizJuego[vecinos[i].y][vecinos[i].x].getFig1().setFill(colorWin); //remarca el fondo en el cual se logro ganar!
      juegoGanado = true;
      juegoIniciado = false; //aca podriamos hacer que aparezca una imagen para el ganador...

    }

    document.querySelector(".btnContinuarReiniciar").style.display = "flex";
    document.getElementById("btnContinuar").style.display = "flex";
    document.getElementById("btnReiniciar").style.display = "flex";

    document.getElementById("btnContinuar").addEventListener("click", function(){ //BOTON CONTINUAR

      document.getElementById("btnContinuar").style.display = "none ";

      if (ganadorDeRonda == "jugador 1"){
        document.querySelector(".turnos").innerHTML = "Es el turno del jugador 2"
      }
      else{
        document.querySelector(".turnos").innerHTML = "Es el turno del jugador 1"
      }

      continuaPartida = true;
      clearTimeout(temporizador); //se para el reloj
      reloj() //se inicia el reloj
      reiniciarTablero()  //reinicia el tablero

      document.querySelector(".btnContinuarReiniciar").style.display = "none";
      
    })


  }


  document.getElementById("btnReiniciar").addEventListener("click", function(){

    continuaPartida = false;
    ptsJ1 = 0;
    ptsJ2 = 0;
    segundos = 0;
    reiniciarTablero()
    clearTimeout(temporizador); //se para el reloj
    reloj();
    document.querySelector(".btnContinuarReiniciar").style.display = "none";
    
  })


  function reiniciarTablero(){

    fichasJugador = null;
    tamFicha = null;
    juegoIniciado = false;
    document.getElementById("player1").innerHTML = ptsJ1
    document.getElementById("player2").innerHTML = ptsJ2
    fichas = [];//Fichas de ambos equipos
    vecinos = [];//busca iguales al rededor
    bajadas = [];//sectores de bajada de ficha
    matrizJuego = [];
    setTablero();
    juegoIniciado = true;
    juegoGanado = false;
    cargarParametros();
    dibujarFichas();

  }
  

  function dibujarBajadas(){
    for(let i = 0; i < dimX; i++){
      bajadas[i].draw(); //se dibujan las bajadas
    }
  }


  function drawFigures(){
    clearCanvasImg(ctx,imgFondo);
    dibujarTablero();
    if (juegoIniciado){
      for (let i=0; i < fichas.length; i++){
        fichas[i].draw(); //se dibujan las fichas
      }
    }
}

//LOGICA DE JUEGO

function actualizarTablero(columna,ultimaFicha){

  let color = ultimaFicha.getFill();
  let dir = ultimaFicha.getDir();
  let pinto = false;
  for(let fila = (dimY - 1); fila >= 0; fila--){
    if ((matrizJuego[fila][columna].getFig2().getFill() == fillCirc) && !pinto ){
      matrizJuego[fila][columna].getFig2().setFill(color);
      matrizJuego[fila][columna].getFig2().setDir(dir);
      pinto = true;
      ultimoColor = ultimaFicha.getFill(); //busca en la matriz el lugar donde sera colocada la ficha y la coloca!
      ultimaFicha.setNull();
      juegoGanado = buscaGanador(columna,fila);  //busca si el jugador logro ganar
    } 
  }
}

//#region VERIFICA SI GANO EL ULTIMO EN AGREGAR
//pos x=columna, posY = i
function buscaGanador(posX,posY){

  vecinos = [];
  let enLinea = false;
  let color = matrizJuego[posY][posX].getFig2().getFill();
  
  if(color == colorDos)
    document.querySelector(".turnos").innerHTML = "Es el turno del jugador 1";
    else{
        document.querySelector(".turnos").innerHTML = "Es el turno del jugador 2";
    }
  enLinea = buscaRectaY(posX,posY,color); //busca si hay una recta como para declarar un ganador
  if(enLinea){
    cargarGanador(color);
    return true;
  }
  else{ //busco en otras posibles posicones
    enLinea = buscaRectaX(posX,posY,color);
    if (enLinea){
      cargarGanador(color);
      return true;
    }
    else {
      enLinea = buscaDiagonalI(posX,posY,color);
      if (enLinea){
        cargarGanador(color);
        return true;
      }
      else {
        enLinea = buscaDiagonalD(posX,posY,color);
        if (enLinea){
          cargarGanador(color);
          return true;
        }
      }
    }
  }
  return false;
}

//#region busca ganador en Y
function buscaRectaY(posX,posY,color){
  let suma = 0;
  suma = recursivoAbajo(posX,posY+1,color) + 1;
  if(suma >= cantWin){
    vecinos.push({ 
      "x": posX,
      "y": posY,}); 
      return true;
  }
  vecinos = [];
  return false;
}

function recursivoAbajo(posX,posY,color){
  let suma = 0;
  if (posY < dimY){
    
    let colorActual = matrizJuego[posY][posX].getFig2().getFill();
    if (colorActual == color){
      vecinos.push({ 
        "x": posX,
        "y": posY,});
      suma+= recursivoAbajo(posX,posY+1,color);
      return (suma + 1);
    }
  }
  return 0;
}
//#endregion

//#region busca Ganador en X
function buscaRectaX(posX,posY,color){
  let suma = 0;
  suma = recursivoAtras(posX-1,posY,color) + 1;
  if (suma < cantWin){
    suma+= recursivoAdelante(posX+1,posY,color);
  }
  if(suma >= cantWin){
    vecinos.push({ 
      "x": posX,
      "y": posY,});
      return true;
  }
  vecinos = [];
  return false;
}

function recursivoAtras(posX, posY, color){
  let suma = 0;
  if (posX >= 0){
    if (matrizJuego[posY][posX].getFig2().getFill() == color){
      vecinos.push({ 
        "x": posX,
        "y": posY,});
      suma+= recursivoAtras(posX-1,posY, color);
      return (suma + 1);
    }
  }
  return 0;
}

function recursivoAdelante(posX,posY,color){
  let suma = 0;
  if (posX < dimX){
    if (matrizJuego[posY][posX].getFig2().getFill() == color){
      vecinos.push({ 
        "x": posX,
        "y": posY,});
      suma+= recursivoAdelante(posX+1,posY,color);
      return (suma + 1);
    }
  }
  return 0;
}
//#endregion

//#region busca ganador en diagonal Izquierda
function buscaDiagonalI(posX,posY,color){
  let suma = 0;
  suma = recursivoAtrasI(posX+1,posY-1,color) + 1;
  if (suma < cantWin){
    suma+= recursivoAdelanteI(posX-1,posY+1,color);
  }
  if(suma >= cantWin){
    vecinos.push({ 
      "x": posX,
      "y": posY,});
      return true;
  }
  vecinos = [];
  return false;
}

function recursivoAtrasI(posX, posY, color){
  let suma = 0;
  if (posY >= 0 && posX < dimX){
    if (matrizJuego[posY][posX].getFig2().getFill() == color){
      vecinos.push({ 
        "x": posX,
        "y": posY,});
      suma+= recursivoAtrasI(posX+1,posY-1,color);
      return (suma + 1);
    }
  }
  return 0;
}

function recursivoAdelanteI(posX, posY, color){
  let suma = 0;
  if (posX >= 0 && posY < dimY){
    if (matrizJuego[posY][posX].getFig2().getFill() == color){
      vecinos.push({ 
        "x": posX,
        "y": posY,});
      suma+= recursivoAdelanteI(posX-1,posY+1,color);
      return (suma + 1);
    }
  }
  return 0;
}

//#endregion

//#region busca ganador en diagonal Derecha

function buscaDiagonalD(posX,posY,color){
  let suma = 0;
  suma = recursivoAtrasD(posX-1,posY-1,color) + 1;
  if (suma < cantWin){
    suma+= recursivoAdelanteD(posX+1,posY+1,color);
  }
  if(suma >= cantWin){
    vecinos.push({ 
      "x": posX,
      "y": posY,});
      return true;
  }
  vecinos = [];
  return false;
}

function recursivoAdelanteD(posX,posY,color){
  let suma = 0;
  if (posX < dimX && posY < dimY){
    if (matrizJuego[posY][posX].getFig2().getFill() == color){
      vecinos.push({ 
        "x": posX,
        "y": posY,});
      suma+= recursivoAdelanteD(posX+1,posY+1,color);
      return (suma + 1);
    }
  }
  return 0;
}

function recursivoAtrasD(posX,posY,color){
  let suma = 0;
  if (posX >= 0 && posY >= 0){
    if (matrizJuego[posY][posX].getFig2().getFill() == color){
      vecinos.push({ 
        "x": posX,
        "y": posY,});
      suma+= recursivoAtrasD(posX-1,posY-1,color);
      return (suma + 1);
    }
  }
  return 0;
}


