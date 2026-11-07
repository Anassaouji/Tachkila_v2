import { openClosModalMatch } from "../interface.js";
import { enregistrerMatchs, initialiserStockage, lireMatchs } from "../stockage.js";
import { afficherMatchs, ajouterMatch } from "./match.js";
import { modalAjouterScore } from "./score.js";

const modification = {
    index: null
};

initialiserStockage();
const matchs = lireMatchs();
enregistrerMatchs(matchs);

afficherMatchs(matchs)
modalAjouterScore(matchs);
openClosModalMatch()

ajouterMatch(matchs,modification);