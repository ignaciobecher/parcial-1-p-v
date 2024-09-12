// funcion localizacion
function obtenerGeolocalizacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((posicion) => {
        const latitud = posicion.coords.latitude;
        const longitud = posicion.coords.longitude;
        alert(`Latitud: ${latitud}, Longitud: ${longitud}`);
      });
    } else {
      alert("Geolocalizacion no disponible");
    }
  }


//   funciones para el carrito
  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  

//   funcion lista compras
function addToLista(clase) {
    const parrafo = document.querySelector(`.${clase}`);
    if (parrafo) {
        const contenido = parrafo.textContent;
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        if (!favoritos.includes(contenido)) {
            favoritos.push(contenido);
        }
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
}


// funcion web worker
let worker;
document.getElementById('start').addEventListener('click', function() {
  if (typeof(Worker) !== "undefined") {
      if (typeof(worker) === "undefined") {
          worker = new Worker("webworker.js");
      }
      worker.onmessage = function(event) {
          document.getElementById("result").innerText = "Subtotal: " + event.data;
      };

      worker.postMessage('start');
  } else {
      document.getElementById("result").innerText = "Tu navegador no soporta Web Workers.";
  }
});
