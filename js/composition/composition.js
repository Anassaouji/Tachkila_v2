// import { modifierJoueurSurTerrain } from "./terrain.js";
// import { notificationMsg } from "./notification.js";
// import { enregistrerJoueurs } from "../stockage.js";


export function afficherJoueurs(joueurs, divAremplace) {

    if (joueurs.length === 0) {
        divAremplace.className =
            "remplace w-full rounded-[10px] border-2 border-dashed !mt-4 !p-5 text-center";

        const message = document.createElement("p");
        message.textContent = "Aucun joueur pour le moment.";

        divAremplace.replaceChildren(message);
        return;
    }

    divAremplace.className = "remplace vide";

    const divContainer = document.createElement("div");
    divContainer.classList.add("container-divs");


    joueurs.forEach((ele, index) => {
        const divParent = document.createElement("div");
        divParent.classList.add("border-1", "border-neutral-300", "!mt-[20px]", "rounded-[10px]", "!p-[15px]")
        const divpere = document.createElement("div");
        divpere.classList.add("flex", "justify-between")
        divParent.classList.add("parent");
        divParent.dataset.index = index;
        const divChild1 = document.createElement("div");
        divChild1.classList.add("child");

        const child1 = document.createElement("div");
        child1.classList.add("child1");
        child1.textContent = ele.numero;

        const child2 = document.createElement("div");
        child2.classList.add("child2");

        const souChild1 = document.createElement("div");
        souChild1.textContent = ele.nom;

        const souChild2 = document.createElement("div");
        souChild2.textContent = ele.poste;

        child2.append(souChild1, souChild2);
        divChild1.append(child1, child2);

        const divChild2 = document.createElement("div");
        divChild2.classList.add("child", "size-fit", "p-1", "rounded-md", "bg-green-700");
        divChild2.textContent = `${ele.statut}`
        if (ele.statut === "Blesse") {
            divChild2.classList.add("bg-red-700")
        }
        
        if (ele.statut === "Blesse") {
            divParent.classList.add("opacity-25")
        }

        const select = document.createElement("select");
        select.classList.add("select", "w-full", "!mt-2", "bg-slate-800", "border", "rounded-[6px]", "!p-2");
        select.name = "post-name";
        // options
        const option1 = document.createElement("option");
        createOption(option1, "Sur le banc", "sur-bank");

        const option2 = document.createElement("option");
        createOption(option2, "GB - Gardien", "gardien");

        const option3 = document.createElement("option");
        createOption(option3, "DG - Défenseur gauche", "defenseur");

        const option4 = document.createElement("option");
        createOption(option4, "DC - Défenseur central 1", "defenseur");

        const option5 = document.createElement("option");
        createOption(option5, "DC - Défenseur central 2", "defenseur");

        const option6 = document.createElement("option");
        createOption(option6, "DD - Défenseur droit", "defenseur");

        const option7 = document.createElement("option");
        createOption(option7, "MG - Milieu gauche", "milieu");

        const option8 = document.createElement("option");
        createOption(option8, "MC - Milieu central 1", "milieu");

        const option9 = document.createElement("option");
        createOption(option9, "MC - Milieu central 2", "milieu");

        const option10 = document.createElement("option");
        createOption(option10, "MD - Milieu droit", "milieu");

        const option11 = document.createElement("option");
        createOption(option11, "BU - Buteur 1", "buteur");

        const option12 = document.createElement("option");
        createOption(option12, "BU - Buteur 2", "buteur");


        select.append(option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12);
        select.value = ele.positionTerrain || "sur-bank";

        divpere.append(divChild1, divChild2)
        // divpere.append(divChild1)
        divParent.append(divpere, select);
        divContainer.append(divParent);
    });

    // Afficher la liste complète
    divAremplace.replaceChildren(divContainer);
}

function createOption(option, valuetextContent, value) {
    option.textContent = valuetextContent;
    option.classList.add("option");
    option.value = value;
}


// export function modifierJoueur(btn, joueurs, modal) {
//     const parent = btn.closest(".parent");
//     const index = Number(parent.dataset.index);

//     const joueur = joueurs[index];

//     const inputName = document.querySelector("input[type='text']");
//     const numberInput = document.querySelector('input[type="number"]');
//     const radios = document.querySelectorAll('input[type="radio"]');

//     inputName.value = joueur.name;
//     numberInput.value = joueur.nombre;

//     radios.forEach(radio => {
//         if (radio.value === joueur.post)
//             radio.checked = true;
//     });

//     modal.classList.remove("hidden");

//     return index;
// }

// export function deletJoueur(btn, joueurs, divAremplace) {
//     const parent = btn.closest(".parent");
//     const index = Number(parent.dataset.index);

//     joueurs.splice(index, 1);
//     // localstorage
//     enregistrerJoueurs(joueurs);

//     const nbrJoueur = document.querySelector(".nombreJoueur");
//     nbrJoueur.textContent = `${joueurs.length} joueur(s)`;
//     afficherJoueurs(joueurs, divAremplace);
// }


// Ajouter un joueur
// export function addJoueur(form, joueurs, divAremplace, modification) {

//     form.addEventListener("submit", function (event) {
//         event.preventDefault();

//         const inputName = document.querySelector("input[type='text']");
//         const postChecked = document.querySelector("input[type='radio']:checked");
//         const numberInput = document.querySelector('input[type="number"]');

//         const errorName = document.querySelector(".error-name");
//         const errorNumber = document.querySelector(".error-number");
//         const errorPost = document.querySelector(".error-post");



//         let name = "";
//         let post = "";
//         let number = "";

//         let isValid = true;

//         if (!postChecked) {
//             errorPost.textContent = "doit choisie un post de Joueur !";
//             isValid = false;
//         }
//         else {
//             post = postChecked.value;
//         }

//         const validName = /^[a-zA-Z]{3,8}$/;
//         const numbrValid = /^(?:[1-9][0-9]?)$/;

//         if (inputName.value.trim() === "") {
//             errorName.textContent = "Le champ nom ne peut pas être vide.";
//             isValid = false;
//         } else if (!validName.test(inputName.value.trim())) {
//             errorName.textContent = "Nom invalide (lettres uniquement, pas d'espaces).";
//             isValid = false;
//         } else {
//             name = inputName.value.trim();
//         }

//         // Validation du Numéro
//         if (numberInput.value.trim() === "") {
//             errorNumber.textContent = "Le champ numéro ne peut pas être vide.";
//             isValid = false;
//         } else if (!numbrValid.test(numberInput.value.trim())) {
//             errorNumber.textContent = "Le numéro doit être compris entre 1 et 99.";
//             isValid = false;
//         }
//         else {
//             number = numberInput.value.trim();
//             const numeroExiste = joueurs.some((joueur, index) => {
//                 return joueur.nombre == number && index !== modification.index;
//             });

//             if (numeroExiste) {
//                 errorNumber.textContent = "Ce numéro est déjà attribué à un autre joueur.";
//                 isValid = false;
//             }
//         }

//         if (!isValid) {
//             return;
//         }

//         const joueur = {
//             name: name,
//             post: post,
//             nombre: number,
//             positionTerrain: modification.index !== null
//                 ? (joueurs[modification.index].positionTerrain || "sur-bank")
//                 : "sur-bank"
//         };

//         if (modification.index !== null) {
//             const index = modification.index;

//             joueurs[index] = joueur;

//             modifierJoueurSurTerrain(joueurs, index, joueur);
//             notificationMsg("Joueur Modifierer avec Succes", "bg-green-600", "bg-red-800");


//             modification.index = null;
//         } else {
//             joueurs.push(joueur);
//             notificationMsg("Joueur ajouté avec succès", "bg-green-600", "bg-red-800");
//         }
//         // localstorage
//         enregistrerJoueurs(joueurs);

//         const nbrJoueurs = document.querySelector(".nombreJoueur");
//         nbrJoueurs.textContent = `${joueurs.length} joueur(s)`;

//         // Réafficher tous les joueurs
//         afficherJoueurs(joueurs, divAremplace);

//         form.reset();
//     });
// }


// export function updateJoueurEvent(joueurs,modal,modification) {

//     document.addEventListener("click", function (event) {


//         const button = event.target.closest(".edit");

//         if (button) {
//             modification.index = modifierJoueur(button, joueurs, modal);
//         }
//         renitialisationMessageDerror();

//     });
//  }

export function renitialisationMessageDerror() {
    const errorName = document.querySelector(".error-name");
    const errorNumber = document.querySelector(".error-number");
    const errorPost = document.querySelector(".error-post");

    // Réinitialiser les messages d'erreur au début de la soumission
    errorName.textContent = "";
    errorNumber.textContent = "";
    errorPost.textContent = "";

}