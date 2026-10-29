
import {
    joueurs,
    matchs
} from "./donnees-initiales";

export function initialiserStockage() {
    if (localStorage.getItem("joueurs") === null) {
        localStorage.setItem("joueurs", JSON.stringify(joueurs)
        );
    }

    if (localStorage.getItem("matchs") === null) {
        localStorage.setItem("matchs", JSON.stringify(matchs)
        );
    }
}

// Lire les joueurs
export function lireJoueurs() {
    return JSON.parse(localStorage.getItem("joueurs")) || [];
}

// Enregistrer les joueurs
export function enregistrerJoueurs(joueurs) {
    localStorage.setItem("joueurs", JSON.stringify(joueurs));
}

// Lire les matchs
export function lireMatchs() {
    return JSON.parse(localStorage.getItem("matchs")) || [];
}

// Enregistrer les matchs
export function enregistrerMatchs(matchs) {
    localStorage.setItem("matchs", JSON.stringify(matchs));
}