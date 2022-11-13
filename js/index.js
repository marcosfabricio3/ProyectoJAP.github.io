document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//Funciones de barra superior a la Derecha
document.getElementById('dropdownLogin').addEventListener('click', () => {

    var textLogin = document.getElementById('dropdownLogin').text;

    //transporte al login
    if(textLogin == "Login"){
        window.location.href = "index.html";
    }
})

function logout(){
    
    window.location.href = "index.html";
    localStorage.removeItem("email");
}