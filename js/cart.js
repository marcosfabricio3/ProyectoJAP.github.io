const URL = CART_INFO_URL + "25801" + EXT_TYPE;
var subtotalCostos = 0;

document.addEventListener("DOMContentLoaded",()=>{
  fetch(URL)
  .then(resp_1 => resp_1.json())
  .then(data_1 => {
    producto = data_1;
         
  mostrarCarrito();
  calculosCarrito()
 })

});

//subtotal
function calculosCarrito(){
              
  //Subtotal
  var moneda2 = producto.articles[0].currency;
  var m1 = producto.articles[0].unitCost;
  var m2 = document.getElementById("contadorValor").value;
  var resultado = m1*m2;
  var costoEnvio = 0; 
  document.getElementById("subtotalCarrito").innerHTML = moneda2 + "."+ resultado;  

  //Insercion del subtotal en el desglosado de costos
  document.getElementById("mostrarValorDeCompra").innerHTML = moneda2 + "."+ resultado;

 
  //calculo envio

  //premium
  if(envioPremium.checked){
    var resultadoPremium = (resultado*0.15);
    document.getElementById("mostrarGastosDeEnvio").innerHTML = resultadoPremium;
    document.getElementById("mostrarTipoDeEnvio").innerHTML = "Envío Premium 2 a 5 días (15%)";
    costoEnvio = resultadoPremium;

    //Express
  }else if(envioExpress.checked){
    var resultadoExpress = (resultado*0.07);
    document.getElementById("mostrarGastosDeEnvio").innerHTML = resultadoExpress;
    document.getElementById("mostrarTipoDeEnvio").innerHTML = "Envío Express 5 a 8 días (7%)";
    costoEnvio = resultadoExpress;

    //Standard
  }else if(envioStandar.checked){
    var resultadoStandard = (resultado*0.05);
    document.getElementById("mostrarGastosDeEnvio").innerHTML = resultadoStandard;
    document.getElementById("mostrarTipoDeEnvio").innerHTML = "Envío Standard 12 a 15 días (5%)";
    costoEnvio = resultadoStandard;
  }

  //Total
  document.getElementById("mostrarGastoTotal").innerHTML = moneda2 + "."+ (costoEnvio + resultado);
}
          
//Mostrar carrito
function mostrarCarrito(){

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
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})()

//Radios
var envioPremium = document.getElementById("flexRadioDefault1");
var envioExpress = document.getElementById("flexRadioDefault2");
var envioStandar = document.getElementById("flexRadioDefault3");
//Imputs
var calle = document.getElementById('idCalle');
var esquina = document.getElementById('idEsquina');
var numero =document.getElementById('idNúmero');
//Modal
var radioTarjeta = document.getElementById('flexRadioDefaultTarjeta1');
var radioTransferencia = document.getElementById('flexRadioDefaultTransferencia2');
var numeroTarjeta = document.getElementById('numeroTargeta');
var vencimiento = document.getElementById('vencimiento');
var codigoSeguridad = document.getElementById('codigoSeguridad');
var numeroCuenta = document.getElementById('numeroCuenta');
//Otras variables
var formCarrito = document.getElementById('formularioCarro');
var insercionTerminos = document.getElementById('insercionDeTerminos');
var modal = document.getElementById('staticBackdrop');
var insercionAlerta = document.getElementById('liveAlertPlaceholder');

// Desactivar campos de metodo de pagos no seleccionados
document.getElementById('cuerpomodal').addEventListener('click', ()=> {

  if(radioTarjeta.checked){
    numeroCuenta.disabled = true;
    numeroCuenta.value = '';


    numeroTarjeta.disabled = false;
    codigoSeguridad.disabled = false;
    vencimiento.disabled = false;

  }else if(!radioTarjeta.checked){
    numeroCuenta.disabled = false;

    numeroTarjeta.disabled = true;
    codigoSeguridad.disabled = true;
    vencimiento.disabled = true;
    numeroTarjeta.value = "";
    codigoSeguridad.value = "";
    vencimiento.value = "";
  }
})

//Funciones para desinvalidar el modal
function desinvalidarModalTarjeta(){
  numeroCuenta.classList.remove('is-invalid');
}

function desinvalidarModalTransferencia(){

  numeroTarjeta.classList.remove('is-invalid');
  vencimiento.classList.remove('is-invalid');
  codigoSeguridad.classList.remove('is-invalid');

}

//Funcion de la alerta
function temporisadorAlerta(){
  var TextAlerta =`
  <div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>¡Has comprado con éxito!</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" id="alertaBoton"></button>
  </div>
  `;

  insercionAlerta.innerHTML = TextAlerta;
}
document.getElementById('alertaBoton').addEventListener('click', () => {
  location.reload();
})

//Validacion del formulario ("tipo de envio y direccion")
formCarrito.addEventListener('submit', (event) => {
  //tipo de envio
  if(envioPremium.checked || envioExpress.checked || envioStandar.checked){

    envioPremium.classList.add('is-valid');
    envioExpress.classList.add('is-valid');
    envioStandar.classList.add('is-valid');
    console.log('bien1')
  }else{
    envioPremium.classList.replace('is-valid','is-invalid');
    envioExpress.classList.replace('is-valid','is-invalid');
    envioStandar.classList.replace('is-valid','is-invalid');
    console.log('mal1')
  }
  //Calle del envio
  if(calle.value !== ''){

    calle.classList.add('is-valid');
    console.log('bien2')
  }else{
    calle.classList.replace('is-valid','is-invalid')
    console.log('mal2')
  }
  //Esquina del envio
  if(esquina.value !== ''){

    esquina.classList.add('is-valid');
    console.log('bien3')
  }else{
    esquina.classList.replace('is-valid','is-invalid')
    console.log('mal3')
  }
   //Numero del envio
   if(numero.value !== ''){

    numero.classList.add('is-valid');
    console.log('bien4')
  }else{
    numero.classList.replace('is-valid','is-invalid')
    console.log('mal4')
  }

  //Modal
  var TextoError = `
    <div class="col p-0"><p id="nombreDePago" style="padding: 6px 12px 0px 0px; color: red;">Completar elección de pago</p></div>
    <div class="col d-flex justify-content-end">
      <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="color: red;">
        Seleccionar
      </button>
    </div>
  `;

  var textoTargeta =`
    <div class="col p-0"><p id="nombreDePago" style="padding: 6px 12px 0px 0px;">Tarjeta de crédito</p></div>
      <div class="col d-flex justify-content-end">
        <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Seleccionar
        </button>
      </div>
  `;

  var textoTransferencia =`
  <div class="col p-0"><p id="nombreDePago" style="padding: 6px 12px 0px 0px;">Transferencia bancaria</p></div>
      <div class="col d-flex justify-content-end">
        <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Seleccionar
        </button>
      </div>
  `;

  //Comprobar si el metodo esta electo
  if(!radioTarjeta.checked || !radioTransferencia.checked ){
    insercionTerminos.innerHTML = TextoError;

  }

  //Al elegir pago con targeta
  if(((numeroTarjeta.value !== '') && (vencimiento.value !== '') && (codigoSeguridad.value !== '')) && (radioTarjeta.checked)){
    insercionTerminos.innerHTML = textoTargeta;
    
    desinvalidarModalTarjeta();
    desinvalidarModalTransferencia();
    temporisadorAlerta();
    insercionAlerta.classList.replace('d-none','d-block');
    
  }else if(!radioTransferencia.checked){
    insercionTerminos.innerHTML = TextoError;

    numeroTarjeta.classList.add('is-invalid');
    vencimiento.classList.add('is-invalid');
    codigoSeguridad.classList.add('is-invalid');

    event.preventDefault();
    
  }

  //Al elejir pago por transferencia
  if ((numeroCuenta.value !== '') && (radioTransferencia.checked)){
    insercionTerminos.innerHTML = textoTransferencia;

    desinvalidarModalTarjeta();
    desinvalidarModalTransferencia();
    temporisadorAlerta()
    insercionAlerta.classList.replace('d-none','d-block');
   

  }else if(!radioTarjeta.checked){
    insercionTerminos.innerHTML = TextoError;
    numeroCuenta.classList.add('is-invalid');

    event.preventDefault();
    
  }
})

// Quitar error de los imputs modal
radioTarjeta.addEventListener('change', () => {

  desinvalidarModalTarjeta();
  desinvalidarModalTransferencia();
  

})
radioTransferencia.addEventListener('change', () => {

  desinvalidarModalTarjeta();
  desinvalidarModalTransferencia();

})
modal.addEventListener('keyup', () => {

  desinvalidarModalTarjeta();
  desinvalidarModalTransferencia();

})

// Alerta
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    alert('Nice, you triggered this alert message!', 'success')
  })
}