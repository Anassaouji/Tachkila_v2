
export function colorMatch(matchs) {
    matchs.forEach((match) => {
        if (match.butsAtlas != null || match.butsAdversaire != null) {
            const parent = document.querySelector(`[data-id="${match.id}"]`);
            if (!parent) return;
            const childright1 = parent.querySelector(".childright1");
            const divScore2 = document.createElement("div");
            divScore2.classList.add("divResultat", "flex", "w-full", "justify-between", "h-[40px]", "items-center")
            const pScore = document.createElement("p");
            pScore.classList.add("pScore", "font-bold")
            const pVectoir = document.createElement("p");
            pVectoir.classList.add("pVectoir", "p-1", "bg-[#243B53]", "text-[#F8FAFC]", "rounded-md");
            const pUpdateScore = document.createElement("p");
            pUpdateScore.classList.add("editScore", "bg-[#1E293B]", "p-1", "rounded-md");
            pUpdateScore.textContent = "Modifier le score"
            if (match.butsAtlas === match.butsAdversaire) {
                pVectoir.textContent = "Nul";
                pVectoir.classList.add("bg-[#735019]");
                pScore.classList.add("bg-[#735019]", "p-1", "rounded-md");
            }
            else if (match.butsAtlas > match.butsAdversaire) {
                pVectoir.textContent = "Victoire";
                pVectoir.classList.add("bg-[#2F855A]");
                pScore.classList.add("bg-[#2F855A]", "p-1", "rounded-md");
            }
            else {
                pVectoir.textContent = "Défaite";
                pVectoir.classList.add("bg-[#8E3347]");
                pScore.classList.add("bg-[#8E3347]", "p-1", "rounded-md");
            }
            if (match.domicile) {
                pScore.textContent = `${match.butsAtlas} - ${match.butsAdversaire}`;
            }
            if (!match.domicile) {
                pScore.textContent = `${match.butsAdversaire} - ${match.butsAtlas}`;
            }
            const divScore = childright1.querySelector(".divScore");
            const ancienScore = childright1.querySelector(".divResultat");
            if (ancienScore) {
                ancienScore.remove();
            }
            divScore2.append(pScore, pVectoir, pUpdateScore)
            // childright1.prepend(divScore2);
            divScore.replaceChildren(divScore2)
        }
    })

}

export function modalAjouterScore(matchs) {
    let match = null;
    const modal = document.querySelector(".modal-score");
    const form = document.querySelector("#modalS");
    const scoreE1 = document.querySelector("#score1");
    const scoreE2 = document.querySelector("#score2");
    document.addEventListener("click", (e) => {
        const buttonAjout = e.target.closest(".btnScore");
        const buttonEdit = e.target.closest(".editScore");
        const btnAnnuler = e.target.closest(".anuleS");
        if (buttonAjout || buttonEdit) {
            const button = buttonAjout || buttonEdit;
            const parent = button.closest(".divmatches");
            if (!parent) return;
            match = matchs.find(m => m.id == parent.dataset.id);
            if (!match) return;
            if (buttonEdit) {
                if (match.domicile) {
                    scoreE1.value = match.butsAtlas;
                    scoreE2.value = match.butsAdversaire
                }
                else {
                    scoreE1.value = match.butsAdversaire;
                    scoreE2.value = match.butsAtlas;
                }
            }
            else {
                form.reset();
            }
            modal.classList.remove("hidden");
        }
        else if (btnAnnuler) {
            modal.classList.add("hidden");
            match = null;
        }
    });
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!match) return;
        const score1 = Number(scoreE1.value);
        const score2 = Number(scoreE2.value);
        if (match.domicile === true) {
            match.butsAtlas = score1;
            match.butsAdversaire = score2;
        }
        else {
            match.butsAdversaire = score1;
            match.butsAtlas = score2;
        }

        // Enregistrer les modifications
        localStorage.setItem("matchs", JSON.stringify(matchs));

        // Actualiser l'affichage
        colorMatch(matchs);

        // Fermer le modal
        modal.classList.add("hidden");
        
        // Vider les inputs
        form.reset();

        match = null;
    })

}