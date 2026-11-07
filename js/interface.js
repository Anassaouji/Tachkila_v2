import { suprimer } from "./joueurs.js";


export function modalOpenAndClose() {
    const modalAjout = document.querySelector(".modal-ajout");
    const btnAjout = document.querySelector(".btn-ajout");
    const btnHidden = document.querySelector(".btn-hidden");
    const btnAnulle = document.querySelector(".btn-annule");

    btnAjout.addEventListener("click", () => {


        const inputName = document.querySelector("input[type='text']");
        const numberInput = document.querySelector('input[name="numero"]');
        const inputAge = document.querySelector('input[name="age"]');
        const selectPost = document.querySelector('select[name="post"]');
        const selectStatus = document.querySelector('select[name="status"]');
        inputName.value = "";
        numberInput.value = "";
        inputAge.value = "";
        selectPost.value = "";
        selectStatus.value = "";


        modalAjout.classList.remove("hidden");

    })
    btnHidden.addEventListener("click", () => {
        modalAjout.classList.add("hidden");
        initialiserModalAjout();
    })
    btnAnulle.addEventListener("click", () => {
        modalAjout.classList.add("hidden");
    });
}

export function initialiserModalAjout() {
    const inputName = document.querySelector("input[type='text']");
    const inputNumber = document.querySelector('input[name="numero"]');
    const inputAge = document.querySelector('input[name="age"]');
    const selectPost = document.querySelector('select[name="post"]');
    const selectStatus = document.querySelector('select[name="status"]');

    const errorName = document.querySelector(".error-name");
    const errorNumber = document.querySelector(".error-number");
    const errorAge = document.querySelector(".error-age");
    const errorPost = document.querySelector(".error-post");
    const errorStatus = document.querySelector(".error-status");

    inputName.value = "";
    inputNumber.value = "";
    inputAge.value = "";
    selectPost.value = "";
    selectStatus.value = "";

    errorName.textContent = "";
    errorNumber.textContent = "";
    errorAge.textContent = "";
    errorPost.textContent = "";
    errorStatus.textContent = "";
}


export function confirmDeleteJoueur(joueurs, actualiserAffichage) {
    let boutonSuppression = null;

    document.addEventListener("click", function (event) {
        const button = event.target.closest(".delete");

        if (button) {
            boutonSuppression = button;

            const modal = document.querySelector("#modalDelete");
            modal.classList.remove("hidden");
            modal.classList.add("flex");
        }
    });

    document.querySelector("#cancelDelete").addEventListener("click", function () {
        const modal = document.querySelector("#modalDelete");

        modal.classList.add("hidden");
        modal.classList.remove("flex");

        boutonSuppression = null;
    });

    document.querySelector("#confirmDelete").addEventListener("click", function () {
        if (!boutonSuppression) return;
        suprimer(boutonSuppression, joueurs, actualiserAffichage);

        // const parent = boutonSuppression.closest(".parent");
        // if (!parent) return;

        // const index = Number(parent.dataset.index);
        // const joueur = joueurs[index];

        // Retirer le joueur du terrain
        // retirerJoueurDuTerrain(joueur);

        // Supprimer le joueur
        // suprimer(boutonSuppression, joueurs);

        // Afficher la notification
        // notificationMsg(
        //     "Joueur supprimé avec succès",
        //     "bg-red-800",
        //     "bg-green-600"
        // );

        // Fermer le modal
        const modal = document.querySelector("#modalDelete");
        modal.classList.add("hidden");
        modal.classList.remove("flex");

        boutonSuppression = null;
    });
}



export function openClosModalMatch() {
    const modalMatch = document.querySelector(".modal-match");
    document.addEventListener('click', (e) => {
        const btnAjout = e.target.closest(".btn-ajout-match");
        const btnAnnule = e.target.closest(".btn-annule");
        const btnHidden = e.target.closest(".btn-hidden");
        if (btnAjout) {
            modalMatch.classList.remove("hidden");
        }
        if (btnAnnule || btnHidden) {
            modalMatch.classList.add("hidden");
        }
    })
}



export function initialiserModalMatch() {
    const inputAdversaire = document.querySelector("#adversaire");
    const inputDate = document.querySelector("#date");
    const inputheure = document.querySelector("#heure");
    const inputLieu = document.querySelector("#lieu");
    const inputDomicile = document.querySelectorAll('input[name="domicile"]');

    const erreurAdvers = document.querySelector(".error-advers");
    const erreurDate = document.querySelector(".error-date");
    const erreurHeure = document.querySelector(".error-heure");
    const erreurLieu = document.querySelector(".error-lieu");
    const erreurDomicile = document.querySelector(".error-domicile");


    inputAdversaire.value = "";
    inputDate.value = "";
    inputheure.value = "";
    inputLieu.value = "";
    inputDomicile.forEach(domicile => domicile.checked = false);


    erreurAdvers.textContent = "";
    erreurDate.textContent = "";
    erreurHeure.textContent = "";
    erreurLieu.textContent = "";
    erreurDomicile.textContent = "";
}