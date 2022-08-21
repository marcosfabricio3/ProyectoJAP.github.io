const URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json'

    fetch(URL)
    .then(Response => Response.json())
    .then(data => {

        const ArrayDatos = data.products;

        

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
                    <h4 id="${referencia1}">${valor1}</h4>
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
        }

       
        console.log(ArrayDatos);
        listado1();
    })

    