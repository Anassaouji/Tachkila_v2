
export function renderPage(joueurs, joueurParPage, currentPage) {

    const start = (currentPage - 1) * joueurParPage;
    const end = start + joueurParPage;

    return joueurs.slice(start, end);
}

export function pagination(joueurs, joueurParPage, currentPage, actualiserAffichage) {
    const precedent = document.querySelector(".precedent");
    const suivant = document.querySelector(".suivant");

    let listeJoueurs = joueurs;

    function afficherPage() {
        const totalPages = Math.max(
            1,
            Math.ceil(listeJoueurs.length / joueurParPage)
        );

        currentPage = Math.max(1, Math.min(currentPage, totalPages));

        currentPage = actualiserAffichage(listeJoueurs, currentPage);

        precedent.disabled = currentPage === 1;
        suivant.disabled = currentPage === totalPages;
    }

    afficherPage();

    suivant.addEventListener("click", () => {
        const totalPages = Math.max(
            1,
            Math.ceil(listeJoueurs.length / joueurParPage)
        );

        if (currentPage < totalPages) {
            currentPage++;
            afficherPage();
        }
    });

    precedent.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            afficherPage();
        }
    });

    function actualiserListe(nouvelleListe, resetPage = false) {
        listeJoueurs = nouvelleListe;

        if (resetPage) {
            currentPage = 1;
        }

        afficherPage();
    }

    return actualiserListe;
}