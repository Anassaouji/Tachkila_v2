import { modifierCounter } from "./counter.js";
import { notificationMsg } from "./notification.js";

export function creerDivJoueur(joueurs, joueur, posteCode) {
    const divselected = document.createElement("div");
    divselected.classList.add("flex", "items-center", "text-white");
    divselected.dataset.numero = joueur.numero;
    divselected.dataset.indexJoueur = joueurs.indexOf(joueur);

    const divselectedChild1 = document.createElement("div");
    divselectedChild1.classList.add("border-2", "rounded-[50%]","w-[30px]","h-[30px]","text-center", "!mr-1","pt-[5px]")
    divselectedChild1.textContent = joueur.numero;

    const divselectedChild2 = document.createElement("div");
    const para1 = document.createElement("p");
    para1.textContent = posteCode;
    const para2 = document.createElement("p");
    para2.textContent = joueur.nom;

    divselectedChild2.append(para1, para2);
    divselected.append(divselectedChild1, divselectedChild2);

    return divselected;
}


export function modifierJoueurSurTerrain(joueurs, index, joueur) {
    const joueurSurTerrain = document.querySelector(`[data-index-joueur="${index}"]`);

    if (!joueurSurTerrain) return;

    // Vérifier si le nouveau poste correspond à l'ancienne position
    const posteCode = joueurSurTerrain.querySelector("p").textContent;

    const postesCompatibles = {
        GB: "gardien",
        DG: "defenseur",
        DC: "defenseur",
        DD: "defenseur",
        MG: "milieu",
        MC: "milieu",
        MD: "milieu",
        BU: "attaquant"
    };

    if (postesCompatibles[posteCode] !== joueur.poste.toLowerCase()) {
        joueurSurTerrain.remove();
        return;
    }

    joueurSurTerrain.replaceWith(creerDivJoueur(joueurs, joueur, posteCode));
}

export function retirerJoueurDuTerrain(joueur) {
    const joueurSurTerrain = document.querySelector(
        `[data-numero="${joueur.numero}"]`
    );

    if (joueurSurTerrain) {
        joueurSurTerrain.remove();
    }

}


export function verifiPositionTerain(joueurG, jou, selec) {

    const joueurPresent = joueurG.querySelector("[data-numero]");

    if (joueurPresent && joueurPresent.dataset.numero != jou.numero) {

        const ancienneOption = [...selec.options].find(
            opt => opt.text.includes(jou.positionTerrain || "sur-bank")
        );

        if (ancienneOption) {
            selec.selectedIndex = ancienneOption.index;
        }

        notificationMsg(
            "Cette position est déjà occupée !",
            "bg-red-800",
            "bg-red-800"
        );
        selec.value = "sur-bank";

        return false;
    }
    return true;
}

// local storzge
export function restaurerTerrain(joueurs, positions) {
    joueurs.forEach((joueur) => {
        const position = joueur.positionTerrain;

        if (!position || position === "sur-bank") {
            return;
        }

        if (position === "gardien") {
            positions.joueurGB.replaceChildren(creerDivJoueur(joueurs, joueur, "GB"));
        }
        else if (position === "DG - Défenseur gauche") {
            positions.joueurDG.replaceChildren(creerDivJoueur(joueurs, joueur, "DG"));
        }
        else if (position === "DD - Défenseur droit") {
            positions.joueurDD.replaceChildren(creerDivJoueur(joueurs, joueur, "DD"));
        }
        else if (position === "DC - Défenseur central 1") {
            positions.joueurDC1.replaceChildren(creerDivJoueur(joueurs, joueur, "DC"));
        }
        else if (position === "DC - Défenseur central 2") {
            positions.joueurDC2.replaceChildren(creerDivJoueur(joueurs, joueur, "DC"));
        }
        else if (position === "MG - Milieu gauche") {
            positions.joueurMG.replaceChildren(creerDivJoueur(joueurs, joueur, "MG"));
        }
        else if (position === "MD - Milieu droit") {
            positions.joueurMD.replaceChildren(creerDivJoueur(joueurs, joueur, "MD"));
        }
        else if (position === "MC - Milieu central 1") {
            positions.joueurMC1.replaceChildren(creerDivJoueur(joueurs, joueur, "MC"));
        }
        else if (position === "MC - Milieu central 2") {
            positions.joueurMC2.replaceChildren(creerDivJoueur(joueurs, joueur, "MC"));
        }
        else if (position === "BU - Buteur 1") {
            positions.joueurBU1.replaceChildren(creerDivJoueur(joueurs, joueur, "BU"));
        }
        else if (position === "BU - Buteur 2") {
            positions.joueurBU2.replaceChildren(creerDivJoueur(joueurs, joueur, "BU"));
        }

    });

    modifierCounter();
}

