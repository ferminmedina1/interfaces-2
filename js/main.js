document.addEventListener('DOMContentLoaded', loadPage);

function loadPage () {

    
    let modoDeJuego;
    let botones = document.querySelectorAll("button");
    let divJugador = document.querySelectorAll(".jugador");

    for(let i=0; i < botones.length; i++) {

        botones[i].addEventListener("click", function(){
    
            modoDeJuego = botones[i].value;
            document.querySelector(".modoDeJuego").classList.add("ocultarButtons")
            
            for(let j=0; j < divJugador.length; j++) {
                divJugador[j].style.display = "flex"
            }
            document.querySelector(".tablero").style.display = "flex"
            document.querySelector("section").style.width = "80%"
            crearTablero(modoDeJuego);
    
        })
    }

    function crearTablero(ModoDeJuego){
        
        let filas;
        let columnas;
        
        if(modoDeJuego == 4){
            filas = 6;
            columnas = 7
        }
        else if (modoDeJuego == 6){
            filas = 8;
            columnas = 9
        }

        else if (modoDeJuego == 7){
            filas = 9;
            columnas = 10
        }

        else if (modoDeJuego == 8){
            filas = 10;
            columnas = 11
        }

//se crea la tabla

        // Obtener la referencia del elemento body
        var body = document.querySelector(".tablero");

        // Crea un elemento <table> y un elemento <tbody>
        var tabla   = document.createElement("table");
        var tblBody = document.createElement("tbody");

        // Crea las celdas
        for (var i = 0; i < filas; i++) {
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");

            for (var j = 0; j < columnas; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            //var textoCelda = document.createTextNode("celda en la hilera "+i+", columna "+j);
            celda.innerHTML = '<img class="ficha" src="./img/ficha_blanca.png">'
            hilera.appendChild(celda);
            }

            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
        }

        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tabla);
        // modifica el atributo "border" de la tabla y lo fija a "2";
        
    }
}