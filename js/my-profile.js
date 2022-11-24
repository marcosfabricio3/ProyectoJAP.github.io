// Imputs
var firstName = document.getElementById('firstName');
var secondName = document.getElementById('secondName');
var surname = document.getElementById('surname');
var secondSurname = document.getElementById('secondSurname');
var profilePicture = document.getElementById('profilePicture');
var phoneNumber = document.getElementById('phoneNumber');
// info local Storage
var savedFirstName = localStorage.getItem('first name');
var savedSecondName = localStorage.getItem('second name');
var savedSurname = localStorage.getItem('surname');
var savedSecondSurname = localStorage.getItem('second surname');
var savedProfilePicture = localStorage.getItem('profile picture');
var savedPhoneNumber = localStorage.getItem('phone number');
var savedEmail = localStorage.getItem('email');


// mostrar el email del logeo
document.addEventListener('DOMContentLoaded', () =>{
    
    document.getElementById('emailProfile').value = savedEmail;
    firstName.value = savedFirstName;
    secondName.value = savedSecondName;
    surname.value = savedSurname;
    secondSurname.value =savedSecondSurname;
    phoneNumber.value = savedPhoneNumber;

    if(localStorage.getItem('profile picture') !== null){
        image.setAttribute('src', localStorage.getItem('profile picture'));
    }
    
    
})

// setear datos previamente guardados
document.getElementById('saveChanges').addEventListener('click',(event) => {

    if((firstName.value !== '') && (surname.value !== '') && (document.getElementById('emailProfile').value !== '') && (phoneNumber.value !=='')){

        localStorage.setItem('first name', firstName.value);
        localStorage.setItem('second name', secondName.value);
        localStorage.setItem('surname', surname.value);
        localStorage.setItem('second surname', secondSurname.value);
        localStorage.setItem('phone number', phoneNumber.value);
        localStorage.setItem('email', document.getElementById('emailProfile').value);    
    }
})

// Comvertir imagen a 64
const inputFile = document.querySelector('#profilePicture');
const image = document.querySelector('#previa');

async function encodeFileAsBase64URL(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            resolve(reader.result);
        });
        reader.readAsDataURL(file);
    });
};

inputFile.addEventListener('input', async (event) => {
    const base64URL = await encodeFileAsBase64URL(inputFile.files[0]);
    localStorage.setItem('profile picture', base64URL);
    
});