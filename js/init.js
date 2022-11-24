const CATEGORIES_URL = "http://localhost:8000/cats";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "http://localhost:8000/cats_products/";
const PRODUCT_INFO_URL = "http://localhost:8000/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:8000/products_comments/";
const CART_INFO_URL = "http://localhost:8000/user_cart";
const CART_BUY_URL = "http://localhost:8000/sell";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function goToUser(){
  window.location.href = "my-profile.html"
}

function goToCart(){
  window.location.href = "cart.html"
}