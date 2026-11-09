import { enregistrerMatchs } from "../stockage.js";
import { validAdversaire, validDate, validDomicile, validHeure, validLieu } from "../validation.js";
import { colorMatch, modalAjouterScore } from "./score.js";

let filtre = "toutes";
const listMatches = document.querySelector(".list-matchs");
const filtres = document.querySelector("#filtres");

// // Une tache est passee si son echeance est avant maintenant (calcule, jamais enregistre)
const estPassee = (match) => new Date(`${match.date}T${match.heure}`).getTime() <= Date.now();

// Afficher les taches de l'onglet choisi
export function afficherMatchs(matchs) {
    const visibles = matchs.filter((match) => {
        if (filtre === "avenir") return !estPassee(match);
        if (filtre === "jouee") return estPassee(match);
        return true;
    });
    const divs = visibles.map((match) => {
        const divmatches = document.createElement("div");
        divmatches.dataset.id = match.id;
        divmatches.classList.add("divmatches", "flex", "w-full", "bg-[#1E293B]", "my-6", "justify-between", "rounded-md", "p-6", "text-[#F8FAFC]", "max-lg:flex-col", "max-lg:gap-4", "max-sm:p-3");
        const childParent1 = document.createElement("div");
        childParent1.classList.add("flex", "items-center")
        const child1 = document.createElement("div");
        child1.classList.add("flex", "flex-col", "items-center", "w-[90px]", "bg-[#2F5C83]", "rounded-md", "p-3", "mr-4", "max-lg:shrink-0")

        const date = new Date(match.date + "T00:00:00");
        const day = date.toLocaleDateString("fr-FR", { weekday: "short" }).toUpperCase();
        const dayNumber = date.getDate();
        const month = date.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();

        const pDay = document.createElement("p");
        pDay.textContent = `${day}`;
        const pDayNumber = document.createElement("p");
        pDayNumber.textContent = `${dayNumber}`
        const pMonth = document.createElement("p");
        pMonth.textContent = `${month}`
        const pTime = document.createElement("p");
        pTime.textContent = `${match.heure}`
        child1.append(pDay, pDayNumber, pMonth, pTime);
        const child2 = document.createElement("div");
        const pDomicile = document.createElement("p");
        const pMatch = document.createElement("p");
        pMatch.classList.add("font-bold", "max-lg:wrap-anywhere")
        const pStade = document.createElement("p");
        pStade.classList.add("text-[#CBD5E1]")
        if (match.domicile) {
            pDomicile.textContent = "Domicile";
            pDomicile.classList.add("p-2", "bg-[#243B53]", "size-fit", "rounded-md")
            pMatch.textContent = `Atlas FC vs ${match.adversaire}`
        }
        else {
            pDomicile.textContent = "Exterieur";
            pDomicile.classList.add("p-2", "bg-[#243B53]", "size-fit", "rounded-md")
            pMatch.textContent = `${match.adversaire} vs Atlas FC`
        }
        pStade.textContent = match.lieu;
        child2.append(pDomicile, pMatch, pStade)
        childParent1.append(child1, child2);
        const childParent2 = document.createElement("div");
        childParent2.classList.add("chilParend2", "flex", "items-center", "w-[30%]", "max-lg:w-full", "max-lg:gap-2")
        const childRight2 = document.createElement("div");
        childRight2.classList.add("flex", "w-[12%]", "max-lg:w-auto", "max-lg:shrink-0")
        const img1 = document.createElement("img");
        img1.setAttribute("src", "../images/edit-2.svg")
        img1.classList.add("edit");
        const img2 = document.createElement("img");
        img2.setAttribute("src", "../images/trash-2.svg")
        img2.classList.add("delete");
        childRight2.append(img1, img2);
        const divComposition = document.createElement("div");
        const lienC = document.createElement("a");
        lienC.setAttribute("href", "./composition.html");
        lienC.textContent = "Voir la Composition";
        lienC.classList.add("rounded-md", "border", "border-[#486581]", "p-2", "max-lg:inline-block")
        divComposition.append(lienC);
        const childRight1 = document.createElement("div");
        childRight1.classList.add("childright1", "flex", "flex-col", "gap-y-[20px]", "mr-4", "w-[84%]", "max-lg:mr-0", "max-lg:w-full", "max-lg:min-w-0")
        const divScore = document.createElement("div");
        divScore.classList.add("divScore")
        childRight1.append(divScore, divComposition);
        childParent2.append(childRight1, childRight2)

        if (estPassee(match) && match.butsAtlas === null && match.butsAdversaire === null) {
            const btnScore = document.createElement("button");
            btnScore.classList.add("btnScore", "p-2", "rounded-md", "bg-[#904700]")
            btnScore.textContent = "Saisir le Score";
            divScore.append(btnScore);
        }


        divmatches.append(childParent1, childParent2)
        return divmatches;
    });
    listMatches.replaceChildren(...divs);

    // Changer d'onglet
    filtres.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") return;
        filtre = e.target.dataset.filtre;
        filtres.querySelectorAll("button").forEach((b) => b.classList.remove("bg-[#16636D]", "rounded-md", "text-[#F8FAFC]"));
        e.target.classList.add("bg-[#16636D]", "rounded-md", "text-[#F8FAFC]");

        afficherMatchs(matchs);
    });
    // colorise la partie vectoire
    colorMatch(matchs);
}


export function ajouterMatch(matchs, modification) {
    // joueurs=[];
    const form = document.querySelector("#monForm");
    const modalMatch = document.querySelector(".modal-match");

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const inputAdversaire = document.querySelector("#adversaire");
        const inputDate = document.querySelector("#date");
        const inputheure = document.querySelector("#heure");
        const inputLieu = document.querySelector("#lieu");
        const inputDomicile = document.querySelector('input[name="domicile"]:checked');

        const adveresaire = validAdversaire(inputAdversaire.value);
        const date = validDate(inputDate.value);
        const heure = validHeure(inputheure.value);
        const lieu = validLieu(inputLieu.value);
        const domicile = validDomicile(inputDomicile);

        if (
            adveresaire === undefined ||
            date === undefined ||
            heure === undefined ||
            lieu === undefined ||
            domicile === undefined
        ) {
            return;
        }

        const match = {
            id: Date.now().toString(),
            adversaire: adveresaire,
            date: date,
            heure: heure,
            lieu: lieu,
            domicile: domicile,
            butsAtlas: null,
            butsAdversaire: null,
            composition: []
        }
        if (modification.index !== null) {
            const index = modification.index;
            matchs[index] = match;
            modification.index = null;
        }
        else {
            matchs.push(match);
        }
        enregistrerMatchs(matchs);
        afficherMatchs(matchs)
        form.reset();
        modalMatch.classList.add("hidden");
    });

}


export function updateMatch(matchs, modification) {
    document.addEventListener("click", (event) => {
        const button = event.target.closest(".edit");
        if (button) {

            modification.index = edit(button, matchs);
        }
    })
}

export function edit(btn, matchs) {
    const modalMatch = document.querySelector(".modal-match");
    const parent = btn.closest(".divmatches");

    const index = matchs.findIndex((match) => {
        return match.id === parent.dataset.id;
    });

    const match = matchs[index];
    const inputAdversaire = document.querySelector("#adversaire");
    const inputDate = document.querySelector("#date");
    const inputheure = document.querySelector("#heure");
    const inputLieu = document.querySelector("#lieu");
    const inputDomicile = document.querySelectorAll('input[name="domicile"]');



    inputAdversaire.value = match.adversaire;
    inputDate.value = match.date;
    inputheure.value = match.heure;
    inputLieu.value = match.lieu;
    inputDomicile.forEach((domicile) => {
        if (domicile.value === JSON.stringify(match.domicile)) {
            domicile.checked = true
        }
    })

    modalMatch.classList.remove("hidden");
    return index;

}


export function deleteMatch(btn, matchs) {
    const parent = btn.closest(".divmatches");

    const index = matchs.findIndex((match) => {
        return match.id === parent.dataset.id;
    });

    matchs.splice(index, 1);

    enregistrerMatchs(matchs);
    afficherMatchs(matchs);
}

export function searchMatch(matchs) {
    document.addEventListener("input", (e) => {
        const searchMatch = e.target.closest(".searchMatch");
        
        if (!searchMatch) return;
            const cherch = searchMatch.value.toLowerCase().trim();
            const searchs = matchs.filter((match) => {
                return match.adversaire.toLowerCase().includes(cherch);
            })
            afficherMatchs(searchs);
    })
}