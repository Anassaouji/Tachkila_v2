
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

export function validNumero(numero, joueurs, modification) {
    const validNumber = /^(?:[1-9][0-9]?)$/;
    const errorNumber = document.querySelector(".error-number");

    const numeroExiste = joueurs.some((joueur, index) => {
        return joueur.numero == numero && index !== modification.index;
    });
    errorNumber.textContent = "";
    if (numero.trim() === "") {
        errorNumber.textContent = "vous devrez remplire le champs";
    }
    else if (!validNumber.test(numero.trim())) {
        errorNumber.textContent = "le numero doit etre entre 1 et 99";
    }
    else if (numeroExiste) {
        errorNumber.textContent = "Ce numéro est déjà attribué à un autre joueur.";
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

export function validPost(post, joueurs) {
    const errorPost = document.querySelector(".error-post");
    const gardiens = joueurs.filter((joueur) => {
        return joueur.poste == "GB";
    });
    errorPost.textContent = "";
    if (post === "") {
        errorPost.textContent = "vous devrez choisir un option";
    }
    else if (gardiens.length >= 2) {
        errorPost.textContent = "vous avez depasse le nombre de Gardien a ajouter";
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





// 1. Validation Adversaire
export function validAdversaire(advers) {
    const validAdvers = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    const erreurAdvers = document.querySelector(".error-advers");

    erreurAdvers.textContent = "";

    if (advers.trim() === "") {
        erreurAdvers.textContent = "Le nom de l'adversaire est obligatoire.";
    }

    else if (!validAdvers.test(advers.trim())) {
        erreurAdvers.textContent = "Nom Adversaire Incorect.";
    }
    else {

        return advers;
    }
}

// 2. Validation Date
export function validDate(date) {
    const erreurDate = document.querySelector(".error-date");

    erreurDate.textContent = "";

    if (date === "") {
        erreurDate.textContent = "Veuillez choisir une date.";
    }
    else {
        return date;
    }
}

// 3. Validation Heure
export function validHeure(heure) {
    const erreurHeure = document.querySelector(".error-heure");

    erreurHeure.textContent = "";

    if (heure === "") {
        erreurHeure.textContent = "Veuillez choisir une heure.";
    }
    else {
        return heure
    }
}

// 4. Validation Lieu
export function validLieu(lieu) {
    const erreurLieu = document.querySelector(".error-lieu");

    erreurLieu.textContent = "";

    if (lieu.trim() === "") {
        erreurLieu.textContent = "Le lieu est obligatoire.";
    }
    else {
        return lieu;
    }
}

// 5. Validation Domicile / Extérieur
export function validDomicile(domicile) {
    const erreurDomicile = document.querySelector(".error-domicile");

    // const radioChecked = document.querySelector('input[name="domicile"]:checked');

    erreurDomicile.textContent = "";

    if (!domicile) {
        erreurDomicile.textContent = "Veuillez choisir Domicile ou Extérieur.";
    }
    else {
        // return JSON.parse(domicile.value)
        return domicile.value ==="true";
    }
}
