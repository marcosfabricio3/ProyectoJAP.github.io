const URL = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`

const nameAS = "AZ";
const nameDES = "ZA";
const priceAS = "$->$$";
const priceDES = "$$->$";
const relevance = "❤️";
let filterArray = [];
let min = 0;
let max = 0;

fetch(URL)
  .then(Response => Response.json())
  .then(data => {

  const ArrayData = data.products;
  const NameCat = data.catName;
  
  //Categoria de subtitulo
  document.getElementById('productsDescription').innerHTML = 'Verás aqui todos los productos de la categoría ' + NameCat

  function list1 () {
    for (var i = 0; i < ArrayData.length; i++) {

      var reference1 = "modelo" + i;
      var reference2 = "descripcion" + i;
      var reference3 = "vendidos" + i;
      var reference4 = "imagen" + i;

      var value1 = ArrayData[i].name;
      var value2 = ArrayData[i].description;
      var value3 = ArrayData[i].soldCount + ' Vendidas';
      var value4 = ArrayData[i].image;
      var value5 = ArrayData[i].cost;

      var txt = `
      <div class="row">
        <div class="list-group" id="cat-list-container" onclick=setProduct(${ArrayData.id})>
          <div class="list-group-item-action">
            <div class="row">
              <div class="col-3">
                <img src="${value4}" alt="product image" class="img-thumbnail" id="${reference4}">
              </div>
              <div class="col">
                <div class="d-flex w-100 justify-content-between">
                  <div class="mb-1">
                    <h4 id="${reference1}">${value1} - UYU ${value5}</h4>
                    <p id="${reference2}">${value2}</p>
                  </div>
                  <small class="text-muted" id="${reference3}">${value3}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><br>`;
                
      document.getElementById("insertion").innerHTML += txt;                
    }
  }
  list1();

  //Limpiar Filtro

  document.getElementById("clearRangeFilter").addEventListener("click", function(){
  document.getElementById("insertion").innerHTML = "";
  document.getElementById("rangeFilterCountMin").value = null;
  document.getElementById("rangeFilterCountMax").value = null;
  
  list1();
  });
})

//Filtro

function comparison(a,b){
  return a.name.localeCompare(b.name)
}
  
function filterByCategory(criterion, array){
  if (criterion === nameAS){
    filterArray = array.sort(comparison)
  }
  if (criterion === nameDES){
    filterArray = array.reverse(comparison)
  }
  if (criterion === priceAS){
    filterArray = array.sort((a,b) => {return a.cost - b.cost} )
  }
  if (criterion === priceDES){
    filterArray = array.sort((a,b) => {return b.cost - a.cost} )
  }
  if (criterion === relevance){
    filterArray = array.sort((a,b) => {return b.soldCount - a.soldCount} )
  }
  document.getElementById("insertion").innerHTML = "" 
  showinfo(filterArray)
}
  
document.addEventListener("DOMContentLoaded", function (e) {
  fetch(URL)
  .then( res => res.json())
  .then(data => {
    filterArray = data.products
    document.getElementById("insertion").innerHTML = "";
    showinfo(filterArray)
  })

  document.getElementById("sortAsc").addEventListener("click", function(){
    filterByCategory(nameAS, filterArray);
  });
  
  document.getElementById("sortDesc").addEventListener("click", function(){
    filterByCategory(nameDES, filterArray);
  });
  
  document.getElementById("sortPriceAsc").addEventListener("click", function(){
    filterByCategory(priceAS, filterArray);
  });
  
  document.getElementById("sortPriceDesc").addEventListener("click", function(){
    filterByCategory(priceDES, filterArray);
  });

  document.getElementById("Relevancia").addEventListener("click", function(){
    filterByCategory(relevance, filterArray);
  });
  
  document.getElementById("rangeFilterCount").addEventListener("click", function(){
    min = document.getElementById("rangeFilterCountMin").value;
    max = document.getElementById("rangeFilterCountMax").value;
    document.getElementById("insertion").innerHTML = "";
    showinfo(filterArray)
  });
  
})
  
//Guardado del identificador y transpoorte a "products-info"
function setProduct(identificador){
  localStorage.setItem("identificador del producto", identificador);
  window.location.href = "product-info.html";
}

function showinfo(array){
  array.forEach(element => {
    if (((min == 0) || (parseInt(element.cost) >= min)) && ((max == 0) || (parseInt(element.cost) <= max))){
      var elementHTML = `
      <div class="row">
        <div class="list-group" id="cat-list-container" onclick="setProduct(${element.id})">
          <div class="list-group-item-action">
            <div class="row">
              <div class="col-3">
                <img src="${element.image}" alt="product image" class="img-thumbnail">
              </div>
              <div class="col">
                <div class="d-flex w-100 justify-content-between">
                  <div class="mb-1">
                    <h4>${element.name} - ${element.currency} ${element.cost}</h4>
                      <p>${element.description}</p>
                  </div>
                  <small class="text-muted">${element.soldCount}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>`;
      document.getElementById("insertion").innerHTML += elementHTML;
    }
  });
}