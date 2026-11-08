import { enregistrerJoueurs } from "../stockage.js";
import { notificationMsg } from "./notification.js";
import { verifiPositionTerain, retirerJoueurDuTerrain, creerDivJoueur } from "./terrain.js";

export function assigneJoueur(joueurs, positions) {

    document.addEventListener("change", (event) => {
        
        const select = event.target.closest(".select");

        if (select) {
            const option = select.value;
            const optionText = select.options[select.selectedIndex].text;

            const parent = select.closest(".parent");
            if (!parent) return;

            const indice = parent.dataset.index;
            const joueur = joueurs[indice];

            if(joueur.statut ==="Blesse"){
                notificationMsg("le Joueur est Blesse", "bg-[#76283A]", "bg-[#76283A]");
                return;
            }

            if (option === "gardien") {
                if (joueur.poste !== "GB") {
                    select.value = joueur.positionTerrain || "sur-bank";
                    notificationMsg("Joueur a pas ce post", "bg-[#76283A]", "bg-[#76283A]");
                    return;
                }

                if (!verifiPositionTerain(positions.joueurGB, joueur, select)) return;

                retirerJoueurDuTerrain(joueur);
                const divselected = creerDivJoueur(joueurs, joueur, "GB");
                positions.joueurGB.replaceChildren(divselected);
                joueur.positionTerrain = "gardien";
                notificationMsg("Joueur placé sur le terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
            }

            else if (option === "defenseur") {

                if (joueur.poste !== "DEF") {
                    select.value = joueur.positionTerrain || "sur-bank";
                    notificationMsg("Joueur a pas ce post", "bg-[#76283A]", "bg-[#76283A]");
                    return;
                }

                if (optionText.includes("DG - Défenseur gauche")) {

                    if (!verifiPositionTerain(positions.joueurDG, joueur, select)) return;
                    retirerJoueurDuTerrain(joueur);
                    const divselected = creerDivJoueur(joueurs, joueur, "DG");
                    positions.joueurDG.replaceChildren(divselected);
                    joueur.positionTerrain = "DG - Défenseur gauche";
                    notificationMsg("Joueur placé sur le terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
                }
                else if (optionText.includes("DD - Défenseur droit")) {

                    if (!verifiPositionTerain(positions.joueurDD, joueur, select)) return;
                    retirerJoueurDuTerrain(joueur);
                    const divselected = creerDivJoueur(joueurs, joueur, "DD");
                    positions.joueurDD.replaceChildren(divselected);
                    joueur.positionTerrain = "DD - Défenseur droit";
                    notificationMsg("Joueur placé sur le terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
                }
                else if (optionText.includes("DC - Défenseur central 1")) {

                    if (!verifiPositionTerain(positions.joueurDC1, joueur, select)) return;
                    retirerJoueurDuTerrain(joueur);
                    const divselected = creerDivJoueur(joueurs, joueur, "DC");
                    positions.joueurDC1.replaceChildren(divselected);
                    joueur.positionTerrain = "DC - Défenseur central 1";
                    notificationMsg("Joueur placé sur le terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
                }
                else if (optionText.includes("DC - Défenseur central 2")) {
                    if (!verifiPositionTerain(positions.joueurDC2, joueur, select)) return;
                    retirerJoueurDuTerrain(joueur);
                    const divselected = creerDivJoueur(joueurs, joueur, "DC");
                    positions.joueurDC2.replaceChildren(divselected);
                    joueur.positionTerrain = "DC - Défenseur central 2";
                    notificationMsg("Joueur placé sur le terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
                }
            }
            else if (option === "milieu") {
                if (joueur.poste !== "MIL") {
                    select.value = joueur.positionTerrain || "sur-bank";
                    notificationMsg("Joueur a pas ce post", "bg-[#76283A]", "bg-[#76283A]");
                    return;
                }
                if (optionText.includes("MG - Milieu gauche")) {

                    if (!verifiPositionTerain(positions.joueurMG, joueur, select)) return;
                    retirerJoueurDuTerrain(joueur);
                    const divselected = creerDivJoueur(joueurs, joueur, "MG");
                    positions.joueurMG.replaceChildren(divselected);
                    joueur.positionTerrain = "MG - Milieu gauche";
                    notificationMsg("Joueur placé sur le terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
                }
                else if (optionText.includes("MD - Milieu droit")) {

                    if (!verifiPositionTerain(positions.joueurMD, joueur, select)) return;
                    retirerJoueurDuTerrain(joueur);
                    const divselected = creerDivJoueur(joueurs, joueur, "MD");
                    positions.joueurMD.replaceChildren(divselected);
                    joueur.positionTerrain = "MD - Milieu droit";
                    notificationMsg("Joueur placé sur le terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
                }
                else if (optionText.includes("MC - Milieu central 1")) {

                    if (!verifiPositionTerain(positions.joueurMC1, joueur, select)) return;
                    retirerJoueurDuTerrain(joueur);
                    const divselected = creerDivJoueur(joueurs, joueur, "MC");
                    positions.joueurMC1.replaceChildren(divselected);
                    joueur.positionTerrain = "MC - Milieu central 1";
                    notificationMsg("Joueur placé sur le terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
                }
                else if (optionText.includes("MC - Milieu central 2")) {

                    if (!verifiPositionTerain(positions.joueurMC2, joueur, select)) return;
                    retirerJoueurDuTerrain(joueur);
                    const divselected = creerDivJoueur(joueurs, joueur, "MC");
                    positions.joueurMC2.replaceChildren(divselected);
                    joueur.positionTerrain = "MC - Milieu central 2";
                    notificationMsg("Joueur placé sur le terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
                }

            }
            else if (option === "buteur") {
                if (joueur.poste !== "ATT") {
                    select.value = joueur.positionTerrain || "sur-bank";
                    notificationMsg("Joueur a pas ce post", "bg-[#76283A]", "bg-[#76283A]");
                    return;
                }
                if (optionText.includes("BU - Buteur 1")) {

                    if (!verifiPositionTerain(positions.joueurBU1, joueur, select)) return;
                    retirerJoueurDuTerrain(joueur);
                    const divselected = creerDivJoueur(joueurs, joueur, "BU");
                    positions.joueurBU1.replaceChildren(divselected);
                    joueur.positionTerrain = "BU - Buteur 1";
                    notificationMsg("Joueur placé sur le terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
                }
                else if (optionText.includes("BU - Buteur 2")) {

                    if (!verifiPositionTerain(positions.joueurBU2, joueur, select)) return;
                    retirerJoueurDuTerrain(joueur);
                    const divselected = creerDivJoueur(joueurs, joueur, "BU");
                    positions.joueurBU2.replaceChildren(divselected);
                    joueur.positionTerrain = "BU - Buteur 2";
                    notificationMsg("Joueur placé sur le terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
                }
            }
            else if (option === "sur-bank") {
                retirerJoueurDuTerrain(joueur);
                joueur.positionTerrain = "sur-bank";
                notificationMsg("Joueur retiré du terrain avec succès", "bg-[#2F855A]", "bg-[#76283A]");
            }
            enregistrerJoueurs(joueurs);
        }
    });
}