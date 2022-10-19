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

document.addEventListener("click", function prueba3(){ 
    var valorLogin = document.getElementById("opcionesLogin").value;
    var loginText = document.getElementById("LoginOrUser").text;

    //transporte al login
    if(loginText == "Login"){
        window.location.href = "index.html";
    }

    //accion de cada opcion
    if(valorLogin == 1){
        document.getElementById("formularioLogin").reset();
        window.location.href = "cart.html";
    }else if(valorLogin == 2){
        document.getElementById("formularioLogin").reset();
        window.location.href = "my-profile.html";
    }else if(valorLogin == 3){
        document.getElementById("formularioLogin").reset();
        window.location.href = "index.html";
        localStorage.removeItem("email");
    }
})