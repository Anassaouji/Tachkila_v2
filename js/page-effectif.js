import { modalOpenAndClose } from "./interface.js";
import { afficherJoueur, ajouterJoueur } from "./joueurs.js";
import { enregistrerJoueurs, lireJoueurs,initialiserStockage } from "./stockage.js";



initialiserStockage();
const joueurs = lireJoueurs();
enregistrerJoueurs(joueurs);

afficherJoueur(joueurs);

modalOpenAndClose();

ajouterJoueur(joueurs);