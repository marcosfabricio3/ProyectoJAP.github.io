//Mostrar productos
const URL = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('identificador del producto')}.json`

fetch(URL)
.then(Response => Response.json())
.then(data => {

  //Texto del Producto y su insercion
  var text =`
    <br>
    <div class="row border border-1 p-2 border-opacity-10 rounded">
      <div class="row">
        <div class="col">
          <h1>${data.name}</h1>
        </div>
        <div class="col">
          <h1 class="text-end">${data.currency}  ${data.cost}</h1>
        </div>
      </div>
      <hr>
      <br>
      <h4><strong>Descripcion: </strong>${data.description}</h4><br>
      <h4><strong>Categoria: </strong>${data.category}</h4><br><br>
      <h4><Strong>Cantidad de vendidos: </Strong> ${data.soldCount}</h4><br><br>
      <h4><strong>Imagenes ilustrativas</strong></h4><br>
    </div>
  <br>`;
  document.getElementById("insercionProducto").innerHTML = text;

  //Imagenes del producto para su insercion
  function showResult(data){
    for (let i = 0; i<= data.images.length; i++){ 
      let elementHTML = `<div class="col"><img src="${data.images[i]}" alt="" class="img-fluid"></div>`;
      document.getElementById("insercionImagenProducto").innerHTML += elementHTML;
    }
  }

    
  // Mostrar productos Relacionados
  function cambiarProducto(relacionadoSeleccionado){
    localStorage.setItem("identificador del producto", relacionadoSeleccionado);
    window.location.href = "product-info.html";
  }

  function mostrarProductosRelacionados (){
    var arrayRelacionados = data.relatedProducts;
    for (let l = 0; l<= arrayRelacionados.length; l++){ 
      var textRelacionados = `
        <div class="col-3 border border-start rounded" style="margin: 0px 12px;" onclick=cambiarProducto(${arrayRelacionados[l].id})>
          <div class="row">
            <img src="${arrayRelacionados[l].image}" alt="" class="img-fluid">
          </div>
          <div class="row">
            <strong><p>${arrayRelacionados[l].name}</p></strong>
          </div>
        </div>
      `;
      document.getElementById("productosRelacionados").innerHTML += textRelacionados;
    }

  }

  setTimeout(mostrarProductosRelacionados, 100);
  showResult(data);

})

//Cambiar a Producto Relacionado
function cambiarProducto(relacionadoSeleccionado){
  localStorage.setItem("identificador del producto", relacionadoSeleccionado);
  window.location.href = "product-info.html";
}

//Comentarios
const URLcomentarios = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem('identificador del producto')}.json`;
var input =document.getElementById("nuevoComentario");

//Comentarios Previos
fetch(URLcomentarios)
.then(Response => Response.json())
.then(data2 => {

  //Insercion de Comentarios Previos
  for (let i = 0; i< data2.length; i++) {
    //Calificacion de comentarios Previos
    var estrellas = document.getElementById("Calificacion").value;
    if(data2[i].score == 1){
      var calificacionGuardadas = `<span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
        }else if(data2[i].score == 2){
      var calificacionGuardadas = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
        }else if(data2[i].score == 3){
      var calificacionGuardadas = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
        }else if(data2[i].score == 4){
      var calificacionGuardadas = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span>`;
        }else{
      var calificacionGuardadas = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span>`;
    };
    let comentarioPredeterminado = `
    <div class="text-bg-light p-3 border border-secondary rounded-start">
      <div class="row">
        <div class="col">
           <p class="text-break"> ${data2[i].description}</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="text-end text-muted">${calificacionGuardadas} Escrito por ${data2[i].user},Publicado el ${data2[i].dateTime}</p>
        </div>
      </div>
    </div>
    <br>`;
      document.getElementById("comentarios").innerHTML += comentarioPredeterminado;
  };
})

  
function comentar(){

  //Fecha y hora
  var hoy = new Date();
  var anio = hoy.getFullYear();
  var mes = hoy.getMonth() + 1;
  var dia = hoy.getDay();
  var hora = hoy.getHours();
  var minutos = hoy.getMinutes();
  var segundos = hoy.getSeconds();

  //Obtencion del nombre de Usuario
  var emailObtenido = localStorage.getItem('email');
  var username = emailObtenido.slice(0,emailObtenido.indexOf('@'));

  //Calificacion
  var estrellas = document.getElementById("Calificacion").value;
  if(estrellas == 1){
    var calificacionFinal = `<span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
    }else if(estrellas == 2){
      var calificacionFinal = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
    }else if(estrellas == 3){
      var calificacionFinal = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
    }else if(estrellas == 4){
      var calificacionFinal = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span>`;
    }else{
      var calificacionFinal = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span>`;
  };

  //Texto HTML a insertar
  let textComentarios = `
  <div class="text-bg-light p-3 border border-secondary rounded-start">
    <div class="row">
      <div class="col">
        <p class="text-break"> ${input.value}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p id="estrellitas"></p><p class="text-end text-muted">${calificacionFinal} Escrito por ${username},Publicado el ${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}</p>
      </div>
    </div>
  </div>
  <br>`;
  document.getElementById("comentarios").innerHTML += textComentarios;

 //Borrado
  input.value = "";
  document.getElementById("Calificacion").innerHTML = `<option selected>Calificar</option>
  <option value="1">⭐</option>
  <option value="2">⭐⭐</option>
  <option value="3">⭐⭐⭐</option>
  <option value="4">⭐⭐⭐⭐</option>
  <option value="5">⭐⭐⭐⭐⭐</option>`;
}

//Funcionalidad del boton
document.getElementById("enviar").addEventListener("click",function(){
  if(input.value !== ""){
    comentar();
  }
})

