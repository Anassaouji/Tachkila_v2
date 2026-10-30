import { confirmDeleteJoueur, modalOpenAndClose } from "./interface.js";
import { afficherJoueur, ajouterJoueur, updateJoueur, colorise, coloriseStatut, capitan, coloriseCapitan } from "./joueurs.js";
import { enregistrerJoueurs, lireJoueurs, initialiserStockage } from "./stockage.js";


const modification = {
    index: null
};

initialiserStockage();
const joueurs = lireJoueurs();
enregistrerJoueurs(joueurs);

afficherJoueur(joueurs);

modalOpenAndClose();

ajouterJoueur(joueurs, modification);

// deletJoueur(joueurs);
confirmDeleteJoueur(joueurs);

updateJoueur(joueurs, modification);

colorise(joueurs);
coloriseStatut(joueurs);

coloriseCapitan(joueurs);
capitan(joueurs);
