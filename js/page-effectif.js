import { actualiserAffichage } from "./affichage.js";
import { confirmDeleteJoueur, modalOpenAndClose } from "./interface.js";
import { ajouterJoueur, updateJoueur, capitan, rechercheEtFilter } from "./joueurs.js";
import { pagination } from "./pagination.js";
import { enregistrerJoueurs, lireJoueurs, initialiserStockage } from "./stockage.js";


const modification = {
    index: null
};

initialiserStockage();
const joueurs = lireJoueurs();
enregistrerJoueurs(joueurs);

modalOpenAndClose();


const currentPage = Number(sessionStorage.getItem("currentPage")) || 1;


const actualiserListe = pagination(joueurs, 8, currentPage, actualiserAffichage);

// Ajouter
ajouterJoueur(joueurs, modification, actualiserAffichage);

// Delete
confirmDeleteJoueur(joueurs, actualiserListe);

updateJoueur(joueurs, modification);

capitan(joueurs);


rechercheEtFilter(joueurs, actualiserListe);