const URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`

const nombreAs = "AZ";
const nombreDe = "ZA";
const precioAs = "$->$$";
const precioDe = "$$->$";
const relevancia = "❤️";
let FiltroArray = [];
let min = 0;
let max = 0;

    fetch(URL)
    .then(Response => Response.json())
    .then(data => {

        const ArrayDatos = data.products;
        const NombreCat = data.catName;

        function listado1 () {
            for (var i = 0; i < ArrayDatos.length; i++) {

                var referencia1 = "modelo" + i;
                var referencia2 = "descripcion" + i;
                var referencia3 = "vendidos" + i;
                var referencia4 = "imagen" + i;

                var valor1 = ArrayDatos[i].name;
                var valor2 = ArrayDatos[i].description;
                var valor3 = ArrayDatos[i].soldCount + ' Vendidas';
                var valor4 = ArrayDatos[i].image;
                var valor5 = ArrayDatos[i].cost;

                var txt = `<div class="row">
        <div class="list-group" id="cat-list-container">
          <div class="list-group-item-action">
            <div class="row">
              <div class="col-3">
                <img src="${valor4}" alt="product image" class="img-thumbnail" id="${referencia4}">
              </div>
              <div class="col">
                <div class="d-flex w-100 justify-content-between">
                  <div class="mb-1">
                    <h4 id="${referencia1}">${valor1} - UYU ${valor5}</h4>
                    <p id="${referencia2}">${valor2}</p>
                  </div>
                  <small class="text-muted" id="${referencia3}">${valor3}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
                
                document.getElementById("insercion").innerHTML += txt;

                
               
            }
            //Categoria de subtitulo
            document.getElementById('subtitulo').innerHTML = 'Verás aqui todos los productos de la categoría ' + NombreCat
        } 
        listado1();

        //Limpiar Filtro

        document.getElementById("clearRangeFilter").addEventListener("click", function(){
          document.getElementById("insercion").innerHTML = "";
          listado1();
      });
    })

    //Filtro

    function comparacion(a,b){
      return a.name.localeCompare(b.name)
  }
  
  function filtradoPorCategorias(criterio, array){
      if (criterio === nombreAs){
          FiltroArray = array.sort(comparacion)
      }
      if (criterio === nombreDe){
          FiltroArray = array.reverse(comparacion)
      }
      if (criterio === precioAs){
          FiltroArray = array.sort((a,b) => {return a.cost - b.cost} )
      }
      if (criterio === precioDe){
          FiltroArray = array.sort((a,b) => {return b.cost - a.cost} )
      }
      if (criterio === relevancia){
        FiltroArray = array.sort((a,b) => {return b.soldCount - a.soldCount} )
    }
      document.getElementById("insercion").innerHTML = "" 
      showinfo(FiltroArray)
  }
  
  document.addEventListener("DOMContentLoaded", function (e) {
  fetch(URL)
  .then( res => res.json())
  .then(data => {
      FiltroArray = data.products
      showinfo(FiltroArray)
  })
  
  document.getElementById("sortAsc").addEventListener("click", function(){
      filtradoPorCategorias(nombreAs, FiltroArray);
  });
  
  document.getElementById("sortDesc").addEventListener("click", function(){
      filtradoPorCategorias(nombreDe, FiltroArray);
  });
  
  document.getElementById("sortPriceAsc").addEventListener("click", function(){
      filtradoPorCategorias(precioAs, FiltroArray);
  });
  
  document.getElementById("sortPriceDesc").addEventListener("click", function(){
      filtradoPorCategorias(precioDe, FiltroArray);
  });

  document.getElementById("Relevancia").addEventListener("click", function(){
    filtradoPorCategorias(relevancia, FiltroArray);
});
  
  document.getElementById("rangeFilterCount").addEventListener("click", function(){
      min = document.getElementById("rangeFilterCountMin").value;
      max = document.getElementById("rangeFilterCountMax").value;
      document.getElementById("insercion").innerHTML = ""
      showinfo(FiltroArray)
  });
  
  })
  
  
  function showinfo(array){

      array.forEach(element => {
          if (((min == 0) || (parseInt(element.cost) >= min)) &&
          ((max == 0) || (parseInt(element.cost) <= max))){
  
              var elementHTML = `<div class="row">
              <div class="list-group" id="cat-list-container">
                <div class="list-group-item-action">
                  <div class="row">
                    <div class="col-3">
                      <img src="${element.image}" alt="product image" class="img-thumbnail">
                    </div>
                    <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                          <h4>${element.name} - UYU ${element.cost}</h4>
                          <p>${element.description}</p>
                        </div>
                        <small class="text-muted">${element.soldCount}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`

            document.getElementById("insercion").innerHTML += elementHTML;
          }
      });
  }
  
 