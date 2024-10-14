// GEOLOCALIZXACION
function obtenerGeolocalizacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarPosicion);
  } else {
    alert("La geolocalización no es soportada por este navegador.");
  }
}

function mostrarPosicion(position) {
  alert(
    "Latitud: " +
      position.coords.latitude +
      "\nLongitud: " +
      position.coords.longitude
  );
}

// DRAG AND DROP
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const img = document.getElementById(data);
  ev.target.appendChild(img);
}

// LISTA DE COMPRAS
function obtenerPrecio(fruta) {
  const precios = {
    fresa: 1.5,
    cereza: 2.0,
    pera: 3.0,
    platano: 1.8,
    sandia: 4.0,
  };
  return precios[fruta] || 0;
}

function addToLista(fruta) {
  let listaCompras = JSON.parse(localStorage.getItem("listaCompras")) || [];

  const frutaExistente = listaCompras.find((item) => item.nombre === fruta);

  if (frutaExistente) {
    alert(`${fruta} ya está en la lista.`);
  } else {
    listaCompras.push({ nombre: fruta, precio: obtenerPrecio(fruta) });
    localStorage.setItem("listaCompras", JSON.stringify(listaCompras)); 
    alert(
      `${fruta} agregada a la lista con un precio de $${obtenerPrecio(
        fruta
      ).toFixed(2)}`
    );
  }

  mostrarTotal();
}

function mostrarTotal() {
  let listaCompras = JSON.parse(localStorage.getItem("listaCompras")) || [];

  const total = listaCompras.reduce((acc, item) => acc + item.precio, 0);

  const totalElement = document.getElementById("total");
  totalElement.textContent = `Total acumulado: $${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarTotal();
});

// **********************************************************PARCIAL 2****************************************************


function actualizarTotal() {
  let total = 0;

  const checkboxes = document.querySelectorAll(
    '.frutas2 input[type="checkbox"]'
  );

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      total += Number(checkbox.value);
    }
    console.log("Tipo de total: ", typeof total);
  });

  const totalHTML = (document.getElementById(
    "total2"
  ).innerHTML = `Total acumulado: $${total}`);
  console.log(totalHTML);

  if (total > 0) {
    document.querySelector(".medios").style.display = "block";
  } else {
    document.querySelector(".payment").style.display = "none";
  }
}

function mostrarFormularioEfectivo() {
  
  document.querySelector(".paymentEfectivo").style.display = "block";
}

function mostrarFormularioTarjeta() {
  document.querySelector(".paymentTarjeta").style.display = "block";
}


function procesarPagoEfectivo(event) {
  event.preventDefault(); 

  const nombre = document.getElementById("nombreEfectivo").value;
  const monto = parseFloat(document.getElementById("totalEfectivo").value);

  if (monto < total) {
    alert("El monto ingresado es menor que el total. Por favor, abona con la cantidad correcta.");
    return;
  }

  alert(`Gracias ${nombre} por tu pago!`);
}

function procesarPagoTarjeta(event) {
  event.preventDefault(); 

  const nombre = document.getElementById("nombreTarjeta").value;
  const tarjeta = document.getElementById("tarjeta").value;
  const vencimiento = document.getElementById("vencimiento").value;
  alert(`Gracias ${nombre} por tu pago  con la tarjeta N° ${tarjeta} de vencimiento ${vencimiento}!`);
}