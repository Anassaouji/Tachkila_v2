

export function modifierCounter() {
    const terrain = document.querySelector("#terrain");

    const compteur = document.querySelector(".counter-joueurs");

    const nombreJourSurTirain = terrain.querySelectorAll("[data-numero]").length;

    compteur.textContent = `${nombreJourSurTirain} / 11`;

}