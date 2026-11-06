
// // Donnees de depart (a ajuster le jour du live : une echeance passee, une a venir)

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
        divmatches.classList.add("divmatches", "flex", "w-full", "bg-slate-800", "my-6", "justify-between", "rounded-md", "p-6", "text-white");
        const childParent1 = document.createElement("div");
        childParent1.classList.add("flex", "items-center")
        const child1 = document.createElement("div");
        child1.classList.add("flex", "flex-col", "items-center", "w-[90px]", "bg-[#0b1329]", "rounded-md", "p-3", "mr-4")

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
        pMatch.classList.add("font-bold")
        const pStade = document.createElement("p");
        pStade.classList.add("text-gray-400")
        if (match.domicile) {
            pDomicile.textContent = "Domicile";
            pDomicile.classList.add("p-2", "bg-green-500", "size-fit", "rounded-md")
            pMatch.textContent = `Atlas FC vs ${match.adversaire}`
        }
        else {
            pDomicile.textContent = "Exterieur";
            pDomicile.classList.add("p-2", "bg-gray-500", "size-fit", "rounded-md")
            pMatch.textContent = `${match.adversaire} vs Atlas FC`
        }
        pStade.textContent = match.lieu;
        child2.append(pDomicile, pMatch, pStade)
        childParent1.append(child1, child2);
        const childParent2 = document.createElement("div");
        childParent2.classList.add("chilParend2", "flex", "items-center", "w-[30%]")
        const childRight2 = document.createElement("div");
        childRight2.classList.add("flex", "w-[12%]")
        const img1 = document.createElement("img");
        img1.setAttribute("src", "../images/edit-2.svg")
        const img2 = document.createElement("img");
        img2.setAttribute("src", "../images/trash-2.svg")
        childRight2.append(img1, img2);
        const divComposition = document.createElement("div");
        const lienC = document.createElement("a");
        lienC.setAttribute("href", "./composition.html");
        lienC.textContent = "Voir la Composition";
        lienC.classList.add("rounded-md", "border", "border-gray-600", "p-2")
        divComposition.append(lienC);
        const childRight1 = document.createElement("div");
        childRight1.classList.add("childright1", "flex", "flex-col", "gap-y-[20px]", "mr-4", "w-[84%]")
        childRight1.append(divComposition);
        childParent2.append(childRight1, childRight2)

        if (estPassee(match) && match.butsAtlas === null && match.butsAdversaire === null) {
            const divScore = document.createElement("div");
            divScore.classList.add("divScore")
            const btnScore = document.createElement("button");
            btnScore.classList.add("btnScore", "p-2", "rounded-md", "bg-blue-500")
            btnScore.textContent = "Saisir le Score";
            divScore.append(btnScore);
            childRight1.prepend(divScore);
        }


        divmatches.append(childParent1, childParent2)
        return divmatches;
    });
    listMatches.replaceChildren(...divs);

    modalAjouterScore(matchs);

    // Changer d'onglet
    filtres.addEventListener("click", (e) => {
        console.log("gggg");
        if (e.target.tagName !== "BUTTON") return;
        filtre = e.target.dataset.filtre;
        filtres.querySelectorAll("button").forEach((b) => b.classList.remove("bg-emerald-500", "rounded-md", "text-white"));
        e.target.classList.add("bg-emerald-500", "rounded-md", "text-white");

        afficherMatchs(matchs);
    });
    // colorise la partie vectoire
    colorMatch(matchs);
}






function modalAjouterScore(matchs) {
    let match = null;
    const modal = document.querySelector(".modal-score");
    document.addEventListener("click", (e) => {
        const button = e.target.closest(".btnScore");
        const btnAnnuler = e.target.closest(".anuleS");
        if (button) {
            const parent = button.closest(".divmatches");
            if (!parent) return;
            const id = parent.dataset.id;
            match = matchs.find(m => m.id == id);
            if (!match) return;
            modal.classList.remove("hidden");
            console.log(match);
        }
        else if (btnAnnuler) {
            modal.classList.add("hidden");
            match = null;
        }
    });
    const modalForm = document.querySelector("#modalS");
    modalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const scoreE1 = document.querySelector("#score1")
        const scoreE2 = document.querySelector("#score2")

        const score1 = Number(scoreE1.value);
        const score2 = Number(scoreE2.value);
        if (score1 === score2) {
            match.butsAtlas = score1;
            match.butsAdversaire = score2;
        }
        else if (match.domicile === true) {
            match.butsAtlas = score1;
            match.butsAdversaire = score2;
        }
        else {
            match.butsAdversaire = score1;
            match.butsAtlas = score2;
        }

    })

}


export function colorMatch(matchs) {
    matchs.forEach((match) => {
        if (match.butsAtlas != null || match.butsAdversaire != null) {
            const parent = document.querySelector(`[data-id="${match.id}"]`);
            if (!parent) return;
            const childright1 = parent.querySelector(".childright1");
            const divScore2 = document.createElement("div");
            divScore2.classList.add("flex", "w-full", "justify-between", "h-[40px]", "items-center")
            const pScore = document.createElement("p");
            pScore.classList.add("pScore", "font-bold")
            const pVectoir = document.createElement("p");
            pVectoir.classList.add("pVectoir", "p-1", "bg-gray-600", "text-white", "rounded-md");
            const pUpdateScore = document.createElement("p");
            pUpdateScore.textContent = "Modifier le score"
            if (match.butsAtlas === match.butsAdversaire) {
                pVectoir.textContent = "Nul";
                pVectoir.classList.add("bg-gray-600");
                pScore.classList.add("bg-gray-600", "p-1", "rounded-md");
            }
            else if (match.butsAtlas > match.butsAdversaire) {
                pVectoir.textContent = "Victoire";
                pVectoir.classList.add("bg-green-600");
                pScore.classList.add("bg-green-600", "p-1", "rounded-md");
            }
            else {
                pVectoir.textContent = "Défaite";
                pVectoir.classList.add("bg-red-600");
                pScore.classList.add("bg-red-600", "p-1", "rounded-md");
            }
            if (match.domicile) {
                pScore.textContent = `${match.butsAtlas} - ${match.butsAdversaire}`;
            }
            if (!match.domicile) {
                pScore.textContent = `${match.butsAdversaire} - ${match.butsAtlas}`;
            }

            divScore2.append(pScore, pVectoir, pUpdateScore)
            childright1.prepend(divScore2);
        }
    })

}



