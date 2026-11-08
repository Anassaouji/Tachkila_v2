import { enregistrerJoueurs } from "./stockage.js";
import { validNom, validNumero, validAge, validPost, validStatus } from "./validation.js";
import { initialiserModalAjout } from "./interface.js";





export function afficherJoueur(joueurs) {
    const articles = document.querySelector(".article");
    articles.classList.add("mt-[40px]", "grid", "grid-cols-4", "gap-4")
    articles.innerHTML = "";
    joueurs.forEach((joueur) => {
        const article = document.createElement("div");
        article.classList.add("articlParent", "p-4", "rounded-[8px]", "bg-[#1E293B]", "max-h-[190px]");
        article.dataset.id = joueur.id;
        const articleHero = document.createElement("div");
        articleHero.classList.add("flex", "items-center")
        const paraHero = document.createElement("p");
        paraHero.textContent = joueur.numero;
        paraHero.classList.add("colorJoueur", "mr-4", "border-2", "rounded-[50%]", "w-[30px]", "h-[30px]", "text-center", "pt-[0.5px]")
        const divHero = document.createElement("div");
        const paraDivHero1 = document.createElement("p");
        paraDivHero1.textContent = joueur.nom;
        const paraDivHero2 = document.createElement("p");
        paraDivHero2.textContent = joueur.poste;
        paraDivHero2.classList.add("px-[4px]", "rounded-[5px]", "w-fit", "font-bold");
        divHero.append(paraDivHero1, paraDivHero2);

        articleHero.append(paraHero, divHero);

        const paraAge = document.createElement("p");
        paraAge.textContent = `Age : ${joueur.age} ans`;

        const divFoot = document.createElement("div");
        divFoot.classList.add("flex", "items-center", "justify-between", "mt-[30px]");
        const paraEnform = document.createElement("p");
        paraEnform.textContent = joueur.statut;
        paraEnform.classList.add("px-[3px]", "rounded-[5px]")
        const divIcons = document.createElement("div");
        divIcons.classList.add("flex", "items-center", "gap-4");
        const paraCapitan = document.createElement("p");
        paraCapitan.textContent = "C";
        paraCapitan.classList.add("capitane", "border", "w-[30px]", "text-center", "font-bold", "rounded-[6px]", "cursor-pointer")
        const imgUpdate = document.createElement("img");
        imgUpdate.setAttribute("src", "./images/edit-2.svg");
        imgUpdate.classList.add("inline", "edit");
        const imgDelete = document.createElement("img");
        imgDelete.setAttribute("src", "./images/trash-2.svg");
        imgDelete.classList.add("inline", "delete");
        divIcons.append(paraCapitan, imgUpdate, imgDelete);

        divFoot.append(paraEnform, divIcons);

        article.append(articleHero, paraAge, divFoot);
        articles.append(article);

    })
}



export function ajouterJoueur(joueurs, modification, actualiserAffichage) {
    // joueurs=[];
    const form = document.querySelector("#monForm");
    const modalJoueur = document.querySelector(".modal-ajout");
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const inputName = document.querySelector("input[type='text']");
        const inputNumber = document.querySelector('input[name="numero"]');
        const inputAge = document.querySelector('input[name="age"]');
        const selectPost = document.querySelector('select[name="post"]');
        const selectStatus = document.querySelector('select[name="status"]');

        const nom = validNom(inputName.value);
        const nombre = validNumero(inputNumber.value, joueurs, modification);
        const age = validAge(inputAge.value);
        const post = validPost(selectPost.value, joueurs,modification);
        const status = validStatus(selectStatus.value);
        // let valid = true;

        if (
            nom === undefined ||
            nombre === undefined ||
            age === undefined ||
            post === undefined ||
            status === undefined
        ) {
            return;
        }

        const joueur = {
            id: Date.now().toString(),
            nom: nom,
            numero: nombre,
            poste: post,
            age: age,
            statut: status,
            capitaine: false,
            position: "sur-bank"
        }
        if (modification.index !== null) {
            const index = modification.index;
            joueurs[index] = joueur;
            modification.index = null;
        }
        else {
            joueurs.push(joueur);
        }
        enregistrerJoueurs(joueurs);

        actualiserAffichage(joueurs);

        initialiserModalAjout();
        modalJoueur.classList.add("hidden")

    });

}




export function suprimer(btn, joueurs, actualiserAffichage) {
    const parent = btn.closest(".articlParent");
    const id = parent.dataset.id;

    const index = joueurs.findIndex((joueur) => {
        return joueur.id === id;
    });

    joueurs.splice(index, 1);

    enregistrerJoueurs(joueurs);
    actualiserAffichage(joueurs);
}


export function updateJoueur(joueurs, modification) {
    document.addEventListener("click", (event) => {
        const button = event.target.closest(".edit");
        if (button) {
            initialiserModalAjout()
            modification.index = modifier(button, joueurs);
        }
    })
}

export function modifier(btn, joueurs) {
    const modal = document.querySelector(".modal-ajout");
    const parent = btn.closest(".articlParent");
    const id = parent.dataset.id;

    const index = joueurs.findIndex((joueur) => {
        return joueur.id === id;
    });

    const joueur = joueurs[index];
    const inputName = document.querySelector("input[type='text']");
    const inputNumber = document.querySelector('input[name="numero"]');
    const inputAge = document.querySelector('input[name="age"]');
    const selectPost = document.querySelector('select[name="post"]');
    const selectStatus = document.querySelector('select[name="status"]');


    inputName.value = joueur.nom;
    inputNumber.value = joueur.numero;
    inputAge.value = joueur.age;
    selectPost.value = joueur.poste;
    selectStatus.value = joueur.statut;

    modal.classList.remove("hidden");
    return index;

}

export function colorise(joueurs) {
    joueurs.forEach((joueur) => {
        if (joueur.poste === "GB") {
            recupereElementToStyling(joueur, "#FBBF24", "#483710")
        }
        else if (joueur.poste === "DEF") {
            recupereElementToStyling(joueur, "#60A5FA", "#1B3557")
        }
        else if (joueur.poste === "MIL") {
            recupereElementToStyling(joueur, "#34D399", "#134235");
        }
        else if (joueur.poste === "ATT") {
            recupereElementToStyling(joueur, "#FB7185", "#512635");

        }
    })
}

function recupereElementToStyling(joueur, primaryColor, secondaryColor) {
    const index = joueur.id;
    const parent = document.querySelector(`[data-id="${index}"]`);
    parent.style.borderLeft = `4px solid ${primaryColor}`;
    const firstChild = parent.children[0];
    // const childColor = firstChild.querySelector('*:first-child');
    const firstChildColor = firstChild.firstElementChild;
    firstChildColor.style.color = primaryColor;
    const lastChildColor = firstChild.lastElementChild;
    const lastElement = lastChildColor.lastElementChild;
    lastElement.style.cssText = `color:${primaryColor}; background-color:${secondaryColor}`;
}

export function coloriseStatut(joueurs) {
    joueurs.forEach((joueur) => {
        if (joueur.statut === "En forme") {
            const index = joueur.id;
            const parent = document.querySelector(`[data-id="${index}"]`);
            const lastElement = parent.lastElementChild;
            const firtInlast = lastElement.firstElementChild
            firtInlast.style.cssText = "color :#F8FAFC; background-color:#2F855A"

        }
        else if (joueur.statut === "Blesse") {
            const index = joueur.id;
            const parent = document.querySelector(`[data-id="${index}"]`);
            const lastElement = parent.lastElementChild;
            const firtInlast = lastElement.firstElementChild
            firtInlast.style.cssText = "color :#FFACB5; background-color:#612D39"

        }
    })
}

export function capitan(joueurs) {
    document.addEventListener("click", (event) => {
        const btn = event.target.closest(".capitane");
        if (btn) {
            joueurs.forEach((joueur) => {
                joueur.capitaine = false;
            });
            document.querySelectorAll(".capitane").forEach((btn) => {
                // button.style.backgroundColor = "";
                btn.classList.remove("bg-[#2F855A]");
            });
            const parent = btn.closest(".articlParent");
            const dataID = parent.dataset.id;
            const index = joueurs.findIndex((joueur) => {
                return joueur.id === dataID;
            });
            const joueur = joueurs[index];
            if (joueur) {
                joueur.capitaine = true;
                btn.classList.add("bg-[#2F855A]");
                enregistrerJoueurs(joueurs);
            }
        }

    })
}




export function coloriseCapitan(joueurs) {
    const joueur = joueurs.find((joueur) => joueur.capitaine === true);
    if (joueur) {
        const dataId = joueur.id;
        const parent = document.querySelector(`[data-id="${dataId}"]`);
        if (parent) {
            const capitaine = parent.querySelector(".capitane");
            if (capitaine) {
                capitaine.classList.add("bg-[#2F855A]")
            }
        }
    }
}


export function rechercheEtFilter(joueurs, actualiserListe) {

    const inputSearch = document.querySelector("input[type='search']");

    const btnTous = document.querySelector(".btn-tous");
    const btnGb = document.querySelector(".btn-gb");
    const btnDef = document.querySelector(".btn-def");
    const btnMil = document.querySelector(".btn-mil");
    const btnAtt = document.querySelector(".btn-att");

    // État du filtre actuel
    let posteActuel = "Tous";

    // Fonction qui combine recherche et filtrage
    function appliquerFiltres() {

        const recherche = inputSearch.value.toLowerCase();
        const joueursFiltres = joueurs.filter((joueur) => {
            const rechercheNom = joueur.nom.toLowerCase().includes(recherche);
            const filtrePoste = posteActuel === "Tous" || joueur.poste === posteActuel;
            return rechercheNom && filtrePoste;
        });

        actualiserListe(joueursFiltres);
    }

    // Recherche
    inputSearch.addEventListener("input", () => {
        appliquerFiltres();
    });

    // Filtrage par poste
    btnTous.addEventListener("click", () => {
        posteActuel = "Tous";
        appliquerFiltres();
    });

    btnGb.addEventListener("click", () => {
        posteActuel = "GB";
        appliquerFiltres();
    });

    btnDef.addEventListener("click", () => {
        posteActuel = "DEF";
        appliquerFiltres();
    });

    btnMil.addEventListener("click", () => {
        posteActuel = "MIL";
        appliquerFiltres();
    });

    btnAtt.addEventListener("click", () => {
        posteActuel = "ATT";
        appliquerFiltres();
    });
}
