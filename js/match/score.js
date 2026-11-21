
export function colorMatch(matchs) {
    matchs.forEach((match) => {
        if (match.butsAtlas != null || match.butsAdversaire != null) {
            const parent = document.querySelector(`[data-id="${match.id}"]`);
            if (!parent) return;
            const childright1 = parent.querySelector(".childright1");
            const divScore2 = document.createElement("div");
            divScore2.classList.add("divResultat", "flex", "flex-wrap", "w-full", "items-center", "gap-2")
            const pScore = document.createElement("p");
            pScore.classList.add("pScore", "font-bold", "px-3", "whitespace-nowrap")
            const pVectoir = document.createElement("p");
            pVectoir.classList.add("pVectoir", "py-1", "px-3", "rounded-md", "whitespace-nowrap");
            const pUpdateScore = document.createElement("p");
            pUpdateScore.classList.add("editScore", "bg-[#6366F1]", "px-3", "py-1", "text-sm", "rounded-[10px]", "text-[#F4F8FF]", "shadow-[0_0_15px_rgba(99,102,241,0.35)]", "hover:shadow-[0_0_25px_rgba(99,102,241,0.55)]", "hover:bg-[#818CF8]", "transition-all", "duration-200", "motion-reduce:transition-none", "cursor-pointer");
            pUpdateScore.textContent = "Modifier le score"
            if (match.butsAtlas === match.butsAdversaire) {
                pVectoir.textContent = "Nul";
                pVectoir.classList.add("bg-slate-500/15", "text-[#94A3B8]", "ring-1", "ring-slate-500/25");
                pScore.classList.add("bg-slate-500/15", "text-[#94A3B8]", "ring-1", "ring-slate-500/25", "p-1", "rounded-md");
            }
            else if (match.butsAtlas > match.butsAdversaire) {
                pVectoir.textContent = "Victoire";
                pVectoir.classList.add("bg-green-500/10", "text-[#22C55E]", "ring-1", "ring-green-500/25");
                pScore.classList.add("bg-green-500/10", "text-[#22C55E]", "ring-1", "ring-green-500/25", "p-1", "rounded-md");
            }
            else {
                pVectoir.textContent = "Défaite";
                pVectoir.classList.add("bg-red-500/10", "text-[#EF4444]", "ring-1", "ring-red-500/25");
                pScore.classList.add("bg-red-500/10", "text-[#EF4444]", "ring-1", "ring-red-500/25", "p-1", "rounded-md");
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