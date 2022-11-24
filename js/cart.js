const URL = CART_INFO_URL;
var subtotalCostos = 0;

document.addEventListener("DOMContentLoaded", () => {
  fetch(URL)
    .then((resp_1) => resp_1.json())
    .then((data_1) => {
      producto = data_1;

      mostrarCarrito();
      calculosCarrito();
    });
});

//subtotal
function calculosCarrito() {

  //Subtotal
  var moneda2 = producto.articles[0].currency;
  var m1 = producto.articles[0].unitCost;
  var m2 = document.getElementById("contadorValor").value;
  var resultado = m1 * m2;
  var costoEnvio = 0;

  document.getElementById("subtotalCarrito").innerHTML =
    moneda2 + "." + resultado;

  //Insercion del subtotal en el desglosado de costos
  document.getElementById("mostrarValorDeCompra").innerHTML =
    moneda2 + "." + resultado;

  //calculo envio

  //premium
  if (envioPremium.checked) {
    var resultadoPremium = resultado * 0.15;

    document.getElementById("mostrarGastosDeEnvio").innerHTML = resultadoPremium;
    document.getElementById("mostrarTipoDeEnvio").innerHTML = "Envío Premium 2 a 5 días (15%)";
    costoEnvio = resultadoPremium;

    //Express
  } else if (envioExpress.checked) {
    var resultadoExpress = resultado * 0.07;
    document.getElementById("mostrarGastosDeEnvio").innerHTML = resultadoExpress;
    document.getElementById("mostrarTipoDeEnvio").innerHTML = "Envío Express 5 a 8 días (7%)";
    costoEnvio = resultadoExpress;

    //Standard
  } else if (envioStandar.checked) {
    var resultadoStandard = resultado * 0.05;

    document.getElementById("mostrarGastosDeEnvio").innerHTML = resultadoStandard;
    document.getElementById("mostrarTipoDeEnvio").innerHTML = "Envío Standard 12 a 15 días (5%)";
    costoEnvio = resultadoStandard;
  }

  //Total
  document.getElementById("mostrarGastoTotal").innerHTML = moneda2 + "." + (costoEnvio + resultado);
}

//Mostrar carrito
function mostrarCarrito() {
  var nombre = producto.articles[0].name;
  var costounico = producto.articles[0].unitCost;
  var moneda = producto.articles[0].currency;
  var cantidadcarrito = producto.articles[0].count;
  var imagenCarrito = producto.articles[0].image;
  var subtotal = costounico * cantidadcarrito;

  var textCarrito = ` 
    <tr>
    <th scope="row"><img src="${imagenCarrito}" alt="" class="img-fluid" style="max-width:100px;"></th>
    <td>${nombre}</td>
    <td>${moneda}.${costounico}</td>
    <td><input type="number" value="${cantidadcarrito}" onchange="calculosCarrito()" id="contadorValor" min="1"></td>
    <td><p id="subtotalCarrito">${moneda}.${subtotal}</p></td>
    </tr>`;

  document.getElementById("arrticulosDeCarrito").innerHTML += textCarrito;
}

// Enlace de bootstrap para la validacion de campos
(function () {
  "use strict";

  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//Radios
var envioPremium = document.getElementById("flexRadioDefault1");
var envioExpress = document.getElementById("flexRadioDefault2");
var envioStandar = document.getElementById("flexRadioDefault3");

//Imputs
var calle = document.getElementById("idCalle");
var esquina = document.getElementById("idEsquina");
var numero = document.getElementById("idNúmero");

//Modal
var radioTarjeta = document.getElementById("flexRadioDefaultTarjeta1");
var radioTransferencia = document.getElementById("flexRadioDefaultTransferencia2");
var numeroTarjeta = document.getElementById("numeroTargeta");
var vencimiento = document.getElementById("vencimiento");
var codigoSeguridad = document.getElementById("codigoSeguridad");
var numeroCuenta = document.getElementById("numeroCuenta");
var modalButton = document.getElementById("cerrarModal");

//Otras variables
var formCarrito = document.getElementById("formularioCarro");
var insertionMethodOfPayment = document.getElementById("insertionMethodOfPayment");
var modal = document.getElementById("staticBackdrop");
var insercionAlerta = document.getElementById("liveAlertPlaceholder");
var sendButton = document.getElementById("sendButton");

//variables para verificar
var verifiedCard = "";
var verifiedExpiration = "";
var codeSecurityVerified = "";
var verifiedAccountNumber = "";
var approvedCard = "";
var approvedTransfer = "";

// Desactivar campos de metodo de pagos no seleccionados
document.getElementById("cuerpomodal").addEventListener("click", () => {
  if (radioTarjeta.checked) {
    numeroCuenta.disabled = true;
    numeroCuenta.value = "";

    numeroTarjeta.disabled = false;
    codigoSeguridad.disabled = false;
    vencimiento.disabled = false;
  } else if (!radioTarjeta.checked) {
    numeroCuenta.disabled = false;

    numeroTarjeta.disabled = true;
    codigoSeguridad.disabled = true;
    vencimiento.disabled = true;
    numeroTarjeta.value = "";
    codigoSeguridad.value = "";
    vencimiento.value = "";
  }
});

// Validacion modal
function modalValidationStyle() {

  // Verificacion tarjeta
  if (radioTarjeta.checked) {
    numeroCuenta.value = "";
    numeroCuenta.classList.remove("is-invalid");
    numeroCuenta.classList.remove("is-valid");
    verifiedAccountNumber = "";

    if (numeroTarjeta.value !== "") {
      numeroTarjeta.classList.remove("is-invalid");
      numeroTarjeta.classList.add("is-valid");
      verifiedCard = "verificado";

    } else {
      numeroTarjeta.classList.remove("is-valid");
      numeroTarjeta.classList.add("is-invalid");
      verifiedCard = "";
    }

    if (vencimiento.value !== "") {
      vencimiento.classList.remove("is-invalid");
      vencimiento.classList.add("is-valid");
      verifiedExpiration = "verificado";

    } else {
      vencimiento.classList.remove("is-valid");
      vencimiento.classList.add("is-invalid");
      verifiedExpiration = "";
    }

    if (codigoSeguridad.value !== "") {
      codigoSeguridad.classList.remove("is-invalid");
      codigoSeguridad.classList.add("is-valid");
      codeSecurityVerified = "verificado";

    } else {
      codigoSeguridad.classList.remove("is-valid");
      codigoSeguridad.classList.add("is-invalid");
      codeSecurityVerified = "";
    }

    // Verificacion Transferencia
  } else if (radioTransferencia.checked) {
    numeroTarjeta.value = "";
    numeroTarjeta.classList.remove("is-invalid");
    numeroTarjeta.classList.remove("is-valid");
    verifiedCard = "";

    vencimiento.value = "";
    vencimiento.classList.remove("is-invalid");
    vencimiento.classList.remove("is-valid");
    verifiedExpiration = "";

    codigoSeguridad.value = "";
    codigoSeguridad.classList.remove("is-invalid");
    codigoSeguridad.classList.remove("is-valid");
    codeSecurityVerified = "";

    if (numeroCuenta.value !== "") {
      numeroCuenta.classList.remove("is-invalid");
      numeroCuenta.classList.add("is-valid");

      verifiedAccountNumber = "verificado";
    } else {
      numeroCuenta.classList.remove("is-valid");
      numeroCuenta.classList.add("is-invalid");
      verifiedAccountNumber = "";
    }
  }
}

//Mensajes de validacion del metodo de pago
function paymentMethodStatus() {
  var textError = `
    <div class="col p-0"><p id="nombreDePago" style="padding: 6px 12px 0px 0px; color: red;">Completar elección de pago</p></div>
    <div class="col d-flex justify-content-end">
      <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="color: red;">
        Seleccionar
      </button>
    </div>
  `;

  var textCard = `
    <div class="col p-0"><p id="nombreDePago" style="padding: 6px 12px 0px 0px;">Tarjeta de crédito</p></div>
    <div class="col d-flex justify-content-end">
      <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Seleccionar
      </button>
    </div>
  `;

  var textTransfer = `
    <div class="col p-0"><p id="nombreDePago" style="padding: 6px 12px 0px 0px;">Transferencia bancaria</p></div>
    <div class="col d-flex justify-content-end">
      <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Seleccionar
      </button>
    </div>
  `;

  if ((verifiedCard !== "") && (verifiedExpiration !== "") && (codeSecurityVerified !== "")) {
    insertionMethodOfPayment.innerHTML = textCard;
    approvedCard = "approved";
    approvedTransfer = "";

  } else if (verifiedAccountNumber !== "") {

    insertionMethodOfPayment.innerHTML = textTransfer;
    approvedTransfer = "approved";
    approvedCard = "";

  } else if (((verifiedCard == "") && (verifiedExpiration == "") && (codeSecurityVerified == "")) || (verifiedAccountNumber == "")) {
    insertionMethodOfPayment.innerHTML = textError;
    approvedTransfer = "";
    approvedCard = "";
  }
}

// fidbac invalido de envio y direccion
function invalidateShippingAndAddress() {
  if (!envioPremium.checked && !envioExpress.checked && !envioStandar.checked) {
    envioPremium.classList.add("is-invalid");
    envioExpress.classList.add("is-invalid");
    envioStandar.classList.add("is-invalid");
  }

  if (calle.value == "") {
    calle.classList.add("is-invalid");
  }

  if (esquina.value == "") {
    esquina.classList.add("is-invalid");
  }

  if (numero.value == "") {
    numero.classList.add("is-invalid");
  }
}

// fidbac Valido de envio y direccion
function validateShippingAndAddress() {
  if (envioPremium.checked || envioExpress.checked || envioStandar.checked) {
    envioPremium.classList.remove("is-invalid");
    envioExpress.classList.remove("is-invalid");
    envioStandar.classList.remove("is-invalid");

    envioPremium.classList.add("is-valid");
    envioExpress.classList.add("is-valid");
    envioStandar.classList.add("is-valid");
  }

  if (calle.value !== "") {
    calle.classList.remove("is-invalid");
    calle.classList.add("is-valid");
  }

  if (esquina.value !== "") {
    esquina.classList.remove("is-invalid");
    esquina.classList.add("is-valid");
  }

  if (numero.value !== "") {
    numero.classList.remove("is-invalid");
    numero.classList.add("is-valid");
  }
}


// Desinvalidificador en tiempo real
calle.addEventListener("keyup", () => {
  if (calle.classList == "form-control is-invalid") {
    validateShippingAndAddress();
  }
});

esquina.addEventListener("keyup", () => {
  if (esquina.classList == "form-control is-invalid") {
    validateShippingAndAddress();
  }
});

numero.addEventListener("keyup", () => {
  if (numero.classList == "form-control is-invalid") {
    validateShippingAndAddress();
  }
});

envioPremium.addEventListener("click", () => {
  if (envioPremium.classList == "form-check-input is-invalid") {
    validateShippingAndAddress();
  }
});

envioExpress.addEventListener("click", () => {
  if (envioExpress.classList == "form-check-input is-invalid") {
    validateShippingAndAddress();
  }
});

envioStandar.addEventListener("click", () => {
  if (envioStandar.classList == "form-check-input is-invalid") {
    validateShippingAndAddress();
  }
});

// modal
modalButton.addEventListener('click', () => {
  modalValidationStyle()
  paymentMethodStatus()
})


// Alerta
const alertPlaceholder = sendButton

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')

function send(){
  formCarrito.submit();
}

formCarrito.addEventListener('submit', (event) => {
  if((calle.value !== '') && (esquina.value !== '') && (numero.value !== '') && ((approvedCard !== '') || (approvedTransfer !== '')) && (envioPremium.checked || envioExpress.checked || envioStandar.checked)){
    event.preventDefault();
    event.stopPropagation();
    alert('¡Has comprado con éxito!', 'success');
    setTimeout(send, 3000);
  }
})

// //validacion Final
sendButton.addEventListener('click', (event) =>{
  if((approvedCard == '') && (approvedTransfer == '')){

    validateShippingAndAddress()
    invalidateShippingAndAddress()
    paymentMethodStatus()
    modalValidationStyle()
    event.preventDefault();
    event.stopPropagation();
  }
})