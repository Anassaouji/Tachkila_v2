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

    inputName.value="";
    inputNumber.value="";
    inputAge.value="";
    selectPost.value="";
    selectStatus.value="";
}


export function confirmDeleteJoueur(joueurs) {
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
        suprimer(boutonSuppression, joueurs);
        console.log("hello");
        
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