import { afficherJoueur, colorise, coloriseStatut, coloriseCapitan } from "./joueurs.js";
import { renderPage } from "./pagination.js";

let joueursActuels = [];
let joueurParPage = 8;
let currentPage = 1;

export function actualiserAffichage(joueurs, page = 1) {
    joueursActuels = joueurs;
    currentPage = page;

    const totalPages = Math.max(1, Math.ceil(joueursActuels.length / joueurParPage));

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const pageJoueurs = renderPage(joueursActuels, joueurParPage, currentPage);

    // Affichage
    afficherJoueur(pageJoueurs);

    // Couleurs
    colorise(pageJoueurs);
    coloriseStatut(pageJoueurs);
    coloriseCapitan(joueursActuels);

    // Pagination
    document.querySelector(".parPage").textContent = pageJoueurs.length;

    document.querySelector(".nombreJoueurs").textContent = joueursActuels.length;

    document.querySelector(".page").textContent = currentPage;

    document.querySelector(".nPage").textContent = totalPages;

    return currentPage;
}












