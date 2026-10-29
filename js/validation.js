
export function validNom(nom) {
    const validName = /^[a-zA-Z]{3,30}(?: [a-zA-Z]{3,30})*$/;
    const errorName = document.querySelector(".error-name");
    errorName.textContent = "";
    if (nom.trim() === "") {
        errorName.textContent = "vous devrez remplire le champs";
    }
    else if (!validName.test(nom.trim())) {
        errorName.textContent = "le nom doit etre entre 3 et 30 lettres";
    }
    else {
        return nom;
    }
}

export function validNumero(numero) {
    const validNumber = /^(?:[1-9][0-9]?)$/;
    const errorNumber = document.querySelector(".error-number");
    errorNumber.textContent = "";
    if (numero.trim() === "") {
        errorNumber.textContent = "vous devrez remplire le champs";
    }
    else if (!validNumber.test(numero.trim())) {
        errorNumber.textContent = "le numero doit etre entre 1 et 99";
    }
    else {
        return Number(numero);
    }
}

export function validAge(age) {
    const errorAge = document.querySelector(".error-age");
    errorAge.textContent = "";
    if (age.trim() === "") {
        errorAge.textContent = "vous devrez remplire le champs";
    }
    else if (Number(age) < 18 || Number(age) > 39) {
        errorAge.textContent = "l'age doit etre entre 18 et 39 ans";
    }
    else {
        return Number(age);
    }
}
export function validPost(post) {
    const errorPost = document.querySelector(".error-post");
    errorPost.textContent = "";
    if (post === "") {
        errorPost.textContent = "vous devrez choisir un option";
    }
    else {
        return post;
    }
}
export function validStatus(statut) {
    const errorStatus = document.querySelector(".error-status");
    errorStatus.textContent = "";
    if (statut === "") {
        errorStatus.textContent = "vous devrez choisir un option";
    }
    else {
        return statut;
    }
}

