//Mostrar productos
const URL = PRODUCT_INFO_URL + `${localStorage.getItem('identificador del producto')}`;

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
  document.getElementById("productInsertion").innerHTML = text;

  //Mostrar productos relacionados
  function showRelatedProducts (){
    var arrayRelated = data.relatedProducts;

    for (let l = 0; l<= arrayRelated.length; l++){ 
      var textRelated = `
        <div class="col-3 border border-start rounded" style="margin: 0px 12px;" onclick=changeProduct(${arrayRelated[l].id})>
          <div class="row">
            <img src="${arrayRelated[l].image}" alt="" class="img-fluid">
          </div>
          <div class="row">
            <strong><p>${arrayRelated[l].name}</p></strong>
          </div>
        </div>
      `;
      document.getElementById("relatedProducts").innerHTML += textRelated;
    }

  }
  setTimeout(showRelatedProducts, 100);
  showResult(data);
})

// Mostrar productos Relacionados
function changeProduct(relatedSelected){
  localStorage.setItem("identificador del producto", relatedSelected);
  window.location.href = "product-info.html";
}
//Imagenes del producto para su insercion
function showResult(data){
  for (let i = 0; i<= data.images.length; i++){ 
    let elementHTML = `<div class="col"><img src="${data.images[i]}" alt="" class="img-fluid"></div>`;
    document.getElementById("insertImageProduct").innerHTML += elementHTML;
  }
}

//Cambiar a Producto Relacionado
function changeProduct(relatedSelected){
  localStorage.setItem("identificador del producto", relatedSelected);
  window.location.href = "product-info.html";
}

//Comentarios
const URLcomments = PRODUCT_INFO_COMMENTS_URL +`${localStorage.getItem('identificador del producto')}`;
var input =document.getElementById("newComment");

//Comentarios Previos
fetch(URLcomments)
.then(Response => Response.json())
.then(data2 => {

  //Insercion de Comentarios Previos
  function PreviousCommentsJson(){
    for (let i = 0; i< data2.length; i++) {
      //Calificacion de comentarios Previos
      var stars = document.getElementById("qualification").value;
      if(data2[i].score == 1){
        var ratingSaved = `<span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
          }else if(data2[i].score == 2){
        var ratingSaved = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
          }else if(data2[i].score == 3){
        var ratingSaved = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
          }else if(data2[i].score == 4){
        var ratingSaved = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span>`;
          }else{
        var ratingSaved = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span>`;
      };
      let commentDefault = `
      <div class="text-bg-light p-3 border border-secondary rounded-start">
        <div class="row">
          <div class="col">
            <p class="text-break"> ${data2[i].description}</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="text-end text-muted">${ratingSaved} Escrito por ${data2[i].user},Publicado el ${data2[i].dateTime}</p>
          </div>
        </div>
      </div>
      <br>`;
        document.getElementById("comments").innerHTML += commentDefault;
    };
  }
  PreviousCommentsJson();
})

  
function comment(){

  //Fecha y hora
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var day = today.getDay();
  var hour = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();

  //Obtencion del nombre de Usuario
  var generateusername = localStorage.getItem('email');
  var username = generateusername.slice(0,generateusername.indexOf('@'));

  //Calificacion
  var stars = document.getElementById("qualification").value;
  if(stars == 1){
    var finalscore = `<span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
    }else if(stars == 2){
      var finalscore = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
    }else if(stars == 3){
      var finalscore = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span> <span class="fa fa-star"></span>`;
    }else if(stars == 4){
      var finalscore = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star"></span>`;
    }else{
      var finalscore = `<span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span> <span class="fa fa-star checked"></span>`;
  };

  //Texto HTML a insertar
  let textComments = `
  <div class="text-bg-light p-3 border border-secondary rounded-start">
    <div class="row">
      <div class="col">
        <p class="text-break"> ${input.value}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p id="estrellitas"></p><p class="text-end text-muted">${finalscore} Escrito por ${username},Publicado el ${year}-${month}-${day} ${hour}:${minutes}:${seconds}</p>
      </div>
    </div>
  </div>
  <br>`;
  document.getElementById("comments").innerHTML += textComments;

 //Borrado
  input.value = "";
  document.getElementById("qualification").innerHTML = `<option selected>Calificar</option>
  <option value="1">⭐</option>
  <option value="2">⭐⭐</option>
  <option value="3">⭐⭐⭐</option>
  <option value="4">⭐⭐⭐⭐</option>
  <option value="5">⭐⭐⭐⭐⭐</option>`;
}

//Funcionalidad del boton
document.getElementById("send").addEventListener("click",function(){
  if(input.value !== ""){
    comment();
  }
})

