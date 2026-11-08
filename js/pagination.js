
export function renderPage(joueurs, joueurParPage, currentPage) {

    const start = (currentPage - 1) * joueurParPage;
    const end = start + joueurParPage;

    return joueurs.slice(start, end);
}

export function pagination(joueurs, joueurParPage, currentPage, actualiserAffichage) {

    const precedent = document.querySelector(".precedent");
    const suivant = document.querySelector(".suivant");

    // Liste actuelle
    let listeJoueurs = joueurs;

    // Afficher la page initiale
    actualiserAffichage(listeJoueurs, currentPage);

    // Bouton suivant
    suivant.addEventListener("click", () => {

        const totalPages = Math.ceil(listeJoueurs.length / joueurParPage);

        if (currentPage < totalPages) {

            currentPage++;
            actualiserAffichage(listeJoueurs, currentPage);
        }
    });

    // Bouton précédent
    precedent.addEventListener("click", () => {

        if (currentPage > 1) {

            currentPage--;

            actualiserAffichage(listeJoueurs, currentPage);
        }
    });

    // Fonction pour actualiser la liste
    function actualiserListe(nouvelleListe) {

        listeJoueurs = nouvelleListe;

        currentPage = 1;
        // currentPage = actualiserAffichage(listeJoueurs, currentPage);

        actualiserAffichage(listeJoueurs, currentPage);
    }

    return actualiserListe;
}