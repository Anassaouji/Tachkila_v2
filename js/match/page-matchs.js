import { enregistrerMatchs, initialiserStockage, lireMatchs } from "../stockage.js";
import { afficherMatchs } from "./match.js";


initialiserStockage();
const matchs = lireMatchs();
enregistrerMatchs(matchs);

afficherMatchs(matchs)
