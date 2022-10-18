const URL = CART_INFO_URL + "25801" + EXT_TYPE;

document.addEventListener("DOMContentLoaded",()=>{
  fetch(URL)
  .then(resp_1 => resp_1.json())
  .then(data_1 => {
    producto = data_1;
    console.log(producto);
         
  mostrarCarrito(); 
 })

});


//subtotal
function subtotalProducto(){
              
  var moneda2 = producto.articles[0].currency;
  var m1 = producto.articles[0].unitCost;
  var m2 = document.getElementById("contadorValor").value;
  var resultado = m1*m2;
  console.log(resultado)
  document.getElementById("subtotalCarrito").innerHTML = moneda2 + "."+ resultado;          
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
    <td><input type="number" value="${cantidadcarrito}" onchange="subtotalProducto()" id="contadorValor"></td>
    <td><p id="subtotalCarrito">${moneda}.${subtotal}</p></td>
    </tr>`;
  document.getElementById("arrticulosDeCarrito").innerHTML += textCarrito;
}
