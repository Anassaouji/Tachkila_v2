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
        divmatches.classList.add("divmatches", "flex", "flex-col", "lg:flex-row", "w-full", "border", "border-[#294767]", "my-4", "justify-between", "gap-4", "rounded-xl", "p-4", "text-[#F4F8FF]", "bg-[#111F38]/65", "backdrop-blur-sm", "shadow-[0_4px_18px_rgba(0,0,0,0.25)]", "hover:border-[#3B82F6]", "hover:shadow-[0_0_20px_rgba(59,130,246,0.20)]", "transition-all", "duration-200", "motion-reduce:transition-none");
        const childParent1 = document.createElement("div");
        childParent1.classList.add("flex", "items-center", "flex-1", "min-w-0", "gap-4")
        const child1 = document.createElement("div");
        child1.classList.add("flex", "flex-col", "items-center", "w-20", "shrink-0", "bg-[#6366F1]", "text-white", "rounded-xl", "p-3", "[&>p:nth-child(2)]:text-2xl", "[&>p:nth-child(2)]:font-bold")

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
        pMatch.classList.add("font-bold", "text-lg", "break-words", "my-1")
        const pStade = document.createElement("p");
        pStade.classList.add("text-[#94A9C6]", "text-sm")
        if (match.domicile) {
            pDomicile.textContent = "Domicile";
            pDomicile.classList.add("px-2", "py-1", "bg-blue-500/10", "text-blue-300", "text-xs", "size-fit", "rounded-md")
            pMatch.textContent = `Atlas FC vs ${match.adversaire}`
        }
        else {
            pDomicile.textContent = "Exterieur";
            pDomicile.classList.add("px-2", "py-1", "bg-purple-500/10", "text-purple-300", "text-xs", "size-fit", "rounded-md")
            pMatch.textContent = `${match.adversaire} vs Atlas FC`
        }
        pStade.textContent = match.lieu;
        child2.append(pDomicile, pMatch, pStade)
        childParent1.append(child1, child2);
        const childParent2 = document.createElement("div");
        childParent2.classList.add("chilParend2", "flex", "items-center", "gap-3", "w-full", "lg:w-auto", "lg:max-w-sm")
        const childRight2 = document.createElement("div");
        childRight2.classList.add("flex", "shrink-0", "gap-2")
        const img1 = document.createElement("img");
        img1.setAttribute("src", "../images/edit-2.svg")
        img1.classList.add("edit", "p-0.5", "rounded-md", "cursor-pointer", "hover:bg-blue-500/20", "transition-colors", "duration-200");
        const img2 = document.createElement("img");
        img2.setAttribute("src", "../images/trash-2.svg")
        img2.classList.add("delete", "p-0.5", "rounded-md", "cursor-pointer", "hover:bg-red-500/20", "transition-colors", "duration-200");
        childRight2.append(img1, img2);
        const divComposition = document.createElement("div");
        const lienC = document.createElement("a");
        lienC.setAttribute("href", "./composition.html");
        lienC.textContent = "Voir la Composition";
        lienC.classList.add("inline-block", "rounded-lg", "border", "border-[#294767]", "bg-[#111F38]", "p-2", "text-sm", "hover:border-[#3B82F6]", "hover:text-[#22D3EE]", "transition-colors", "duration-200")
        divComposition.append(lienC);
        const childRight1 = document.createElement("div");
        childRight1.classList.add("childright1", "flex", "flex-col", "gap-2", "flex-1", "min-w-0")
        const divScore = document.createElement("div");
        divScore.classList.add("divScore")
        childRight1.append(divScore, divComposition);
        childParent2.append(childRight1, childRight2)

        if (estPassee(match) && match.butsAtlas === null && match.butsAdversaire === null) {
            const btnScore = document.createElement("button");
            btnScore.classList.add("btnScore", "p-2", "bg-[#6366F1]", "rounded-[10px]", "text-[#F4F8FF]", "shadow-[0_0_15px_rgba(99,102,241,0.35)]", "hover:shadow-[0_0_25px_rgba(99,102,241,0.55)]", "hover:bg-[#818CF8]", "transition-all", "duration-200", "motion-reduce:transition-none", "cursor-pointer")
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
        filtres.querySelectorAll("button").forEach((b) => b.classList.remove("bg-[#6366F1]", "rounded-md", "text-[#F8FAFC]", "shadow-[0_0_15px_rgba(99,102,241,0.35)]"));
        e.target.classList.add("bg-[#6366F1]", "rounded-md", "text-[#F8FAFC]", "shadow-[0_0_15px_rgba(99,102,241,0.35)]");

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