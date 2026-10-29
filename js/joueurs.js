import { enregistrerJoueurs } from "./stockage.js";
import { validNom, validNumero, validAge, validPost, validStatus } from "./validation.js";
import { initialiserModalAjout } from "./interface.js";



export function afficherJoueur(joueurs) {
    const articles = document.querySelector(".article");
    articles.classList.add("mt-[40px]", "grid", "grid-cols-4", "gap-4")
    articles.innerHTML = "";
    joueurs.forEach((joueur) => {
        const article = document.createElement("div");
        article.classList.add("border", "p-4", "rounded-[8px]");

        const articleHero = document.createElement("div");
        articleHero.classList.add("flex", "items-center")
        const paraHero = document.createElement("p");
        paraHero.textContent = joueur.numero;
        paraHero.classList.add("mr-4", "border-2", "rounded-[50%]", "w-[30px]", "h-[30px]", "text-center", "pt-[0.5px]")
        const divHero = document.createElement("div");
        const paraDivHero1 = document.createElement("p");
        paraDivHero1.textContent = joueur.nom;
        const paraDivHero2 = document.createElement("p");
        paraDivHero2.textContent = joueur.poste;
        divHero.append(paraDivHero1, paraDivHero2);

        articleHero.append(paraHero, divHero);

        const paraAge = document.createElement("p");
        paraAge.textContent = `Age : ${joueur.age} ans`;

        const divFoot = document.createElement("div");
        divFoot.classList.add("flex", "items-center", "justify-between");
        const paraEnform = document.createElement("p");
        paraEnform.textContent = joueur.statut;
        const divIcons = document.createElement("div");
        divIcons.classList.add("flex", "items-center", "gap-4");
        const paraCapitan = document.createElement("p");
        paraCapitan.textContent = "C";
        paraCapitan.classList.add("border", "w-[30px]", "text-center", "font-bold", "rounded-[6px]")
        const imgUpdate = document.createElement("img");
        imgUpdate.setAttribute("src", "./images/edit-2.svg");
        imgUpdate.classList.add("inline");
        const imgDelete = document.createElement("img");
        imgDelete.setAttribute("src", "./images/trash-2.svg");
        imgDelete.classList.add("inline");
        divIcons.append(paraCapitan, imgUpdate, imgDelete);

        divFoot.append(paraEnform, divIcons);

        article.append(articleHero, paraAge, divFoot);
        articles.append(article);



    })
}



export function ajouterJoueur(joueurs) {
    // joueurs=[];
    const form = document.querySelector("#monForm");

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const inputName = document.querySelector("input[type='text']");
        const inputNumber = document.querySelector('input[name="numero"]');
        const inputAge = document.querySelector('input[name="age"]');
        const selectPost = document.querySelector('select[name="post"]');
        const selectStatus = document.querySelector('select[name="status"]');

        const nom = validNom(inputName.value);
        const nombre = validNumero(inputNumber.value);
        const age = validAge(inputAge.value);
        const post = validPost(selectPost.value);
        const status = validStatus(selectStatus.value);
        // let valid = true;

        if (
            nom === undefined ||
            nombre === undefined ||
            age === undefined ||
            post === undefined ||
            status === undefined
        ) {
            return;
        }

        const joueur = {
            id: Date.now().toString(),
            nom: nom,
            numero: nombre,
            poste: post,
            age: age,
            statut: status,
            capitaine: false,
            position: "sur-bank"
        }

        joueurs.push(joueur);
        enregistrerJoueurs(joueurs);
        afficherJoueur(joueurs);
        initialiserModalAjout();
    });

}