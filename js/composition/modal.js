import { renitialisationMessageDerror } from "./composition.js";
// import { deletJoueur } from "./composition.js";
import { notificationMsg } from "./notification.js";
import { retirerJoueurDuTerrain } from "./terrain.js";



// export function modalOpenAndClose(btnAjout, btnHidden, btnAnulle, modal, modification) {

//     btnAjout.addEventListener("click", () => {
//         modification.index = null;
//         renitialisationMessageDerror();
//         const inputName = document.querySelector("input[type='text']");
//         const numberInput = document.querySelector('input[type="number"]');
//         inputName.value = "";
//         numberInput.value = "";
//         document.querySelectorAll('input[type="radio"]').forEach(radio => {
//             radio.checked = false;
//         });

//         modal.classList.remove("hidden");
//     })
//     btnHidden.addEventListener("click", () => {
//         modal.classList.add("hidden");
//     })
//     btnAnulle.addEventListener("click", () => {
//         modal.classList.add("hidden");
//     });
// }



export function confirmDeleteJoueur(joueurs, divAremplace) {
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

        const parent = boutonSuppression.closest(".parent");
        if (!parent) return;

        const index = Number(parent.dataset.index);
        const joueur = joueurs[index];

        // Retirer le joueur du terrain
        retirerJoueurDuTerrain(joueur);

        // Supprimer le joueur
        deletJoueur(boutonSuppression, joueurs, divAremplace);

        // Afficher la notification
        notificationMsg(
            "Joueur supprimé avec succès",
            "bg-red-800",
            "bg-green-600"
        );

        // Fermer le modal
        const modal = document.querySelector("#modalDelete");
        modal.classList.add("hidden");
        modal.classList.remove("flex");

        boutonSuppression = null;
    });
}