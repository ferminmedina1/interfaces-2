'use strict'
let c = document.querySelector('#myCanvas');
let ctx = c.getContext("2d"); 
 
//valores de juego.. dimensiones de tablero y cantidad de fichas

let juegoGanado = false;//marcador de fin de juego
let lostPos = null;
let lastClickedFigure = null;
let isMouseDown = false;
let canvasWidth = c.width;
let canvasHeight = c.height;
let imgFondo= new Image();
imgFondo.src = "img/fondo.jpg";
imgFondo.onload = function (){
    clearCanvasImg(ctx,imgFondo);
}

window.onload = function(){
    
    // opciones con fichas seleccionadas
    //movientos dentro del canvas 
    dibujarFichas();
    let isMouseDown = false;
    let lastClickedFigure = null;

  
    c.addEventListener("mousedown", function (e){

        isMouseDown = true;

        if (lastClickedFigure != null){

            lastClickedFigure.setSeleccionado(false);
            lastClickedFigure = null;
        }

        let clickedFigure = findClickedFigure(e.layerX, e.layerY);

        if (clickedFigure != null){
            
            clickedFigure.setSeleccionado(true);
            lastClickedFigure = clickedFigure;
            lostPos = clickedFigure.getPosition();
        }
        drawFigures();
    })

//cuando sale del canvas si se esta arrastrando una ficha, vuelve a su posicion

    c.addEventListener("mouseleave", function(e){

            if(lastClickedFigure){

                lastClickedFigure.setPosition(lostPos.x,lostPos.y);
                drawFigures();
                isMouseDown = false;
            }
    })


    // cuando se suelta la ficha
    
    c.addEventListener("mouseup", function(e){

        isMouseDown = false;

        if (lastClickedFigure != null){
            let pos= lastClickedFigure.getPosition();
            let encontro = false;

            for (let i = 0; i < bajadas.length; i++){   //REVISA SI SELECCIONO ALGUNA COLUMNA

                if(bajadas[i].isPointInside(pos.x,pos.y)){

                    lastClickedFigure.setPosition(pos.x,pos.y);
                    encontro = true;
                    actualizarTablero(i,lastClickedFigure); //si encontro actualiza el tablero y pone la ficha en su nuevo lugar!
                }
            }
            if (!encontro){

            lastClickedFigure.setSeleccionado(false);
            lastClickedFigure.setPosition(lostPos.x,lostPos.y);
            }
        }

        drawFigures();

    })


    // mueve la ficha por el canvas

    c.addEventListener("mousemove", function(e){
        
        if (isMouseDown && lastClickedFigure != null){

            lastClickedFigure.setPosition(e.layerX,e.layerY);
            drawFigures();
        }
    })


    // ver la ficha clickeada

    function findClickedFigure(layerX, layerY){

        for (let index = 0; index < fichas.length; index++){

            let element = fichas[index];                
            if (element.isPointInside(layerX,layerY) && element.getFill() != ultimoColor){
                return element;
            }
        }
    }  
 
};

