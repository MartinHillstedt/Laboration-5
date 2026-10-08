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
    localStorage.setItem(storage_Key, JSON.stringify (history))
    // Spara history i localStorage
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    const savedHistory = localStorage.getItem (storageKey);

    // Hämta eventuell sparad historik

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    // Skriv ut innehållet i history till DOM
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

    // Uppdatera history och visningen på sidan
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