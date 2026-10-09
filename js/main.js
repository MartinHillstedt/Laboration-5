"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Martin Nilsson
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");

const storageKey = "cardHistory"
// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * 
 */
function validateForm() {
    // Rensa tidigare felmeddelanden
    errors = [];
    
    // Kontrollera formulärets obligatoriska fält
    if (fullnameInput.value.trim() === "") {
        errors.push ("Namn måste anges");
    }

    if (emailInput.value.trim() === "") {
        errors.push ("Ange din e-postadress")
    }

    if (phoneInput.value.trim() === "") {
        errors.push ("Telefonnummer krävs")
    }

   
    // Visa eventuella felmeddelanden
    displayErrors();


    // Returnera resultatet (true eller false) av valideringen
    return errors.length === 0;

}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";
    // Skriv ut aktuella felmeddelanden till DOM
    errors.forEach(function (errorMessage) {
        const listItem = document.createElement ("li")
        listItem.textContent = errorMessage;
        errorList.appendChild (listItem);
    });

}   



/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const font = fontSelect.value;     
    // Uppdatera studentkortet
    previewFullname.textContent = fullname;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;
    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;


    // Lägg till studentkortet i historiken
    const newCard = {
        fullname: fullname,
        email: email, 
        phone: phone, 
        font: font
    };
    history.unshift(newCard);

    // Spara och uppdatera historiken
    saveHistory();
    renderHistory();

}


/**
 * Sparar historiken i localStorage.
 *
 */
function saveHistory() {
    localStorage.setItem(storageKey, JSON.stringify (history));
    // Spara history i localStorage
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    

    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem (storageKey);

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {

    // Rensa tidigare visad historik

    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
    history.forEach(function (card) {
        const cardElement = document.createElement("div");
        cardElement.classList.add ("card")
        cardElement.style.fontFamily = card.font;

        const nameElement = document.createElement("div")
        nameElement.classList.add ("card-info");
        nameElement.textContent = card.fullname;

        const emailElement = document.createElement("div")
        emailElement.classList.add ("card-info");
        emailElement.textContent = card.email;

        const phoneElement = document.createElement("div")
        phoneElement.classList.add ("card-info");
        phoneElement.textContent = card.phone;

        cardElement.appendChild(nameElement);
        cardElement.appendChild(emailElement);
        cardElement.appendChild(phoneElement);

        historySection.appendChild(cardElement);

    });
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
form.reset();
    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    
    // Radera sparad historik
    localStorage.removeItem (StorageKey)

    // Uppdatera history och visningen på sidan
    history = [];
    renderHistory ();
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas
form.addEventListener("submit", function (event){
    event.preventDefault();

    if (validateForm()) {
        createStudentCard();
    }
});

// När användaren klickar på "Rensa"
clearButton.addEventListener ("click", clearForm);


// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener ("click", deleteHistory);

// När sidan laddas:
// - läs in och visa eventuell tidigare historik
document.addEventListener("DOMContentLoaded", function () {
    loadHistory();
    renderHistory();
});