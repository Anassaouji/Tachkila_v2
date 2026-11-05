# ⚽ TACHKILA V2 — Gestion d'effectif et de matchs

**Tachkila V2** est une application web interactive et responsive développée pour le club de football amateur **Atlas FC**. Elle permet aux entraîneurs de gérer leur effectif, d'organiser leurs compositions d'équipe en formation 4-4-2 et de suivre les rencontres sportives depuis une interface centralisée.

Ce projet constitue une évolution de Tachkila V1, avec une architecture JavaScript modulaire, des fonctionnalités de gestion avancées et une conservation des données grâce au localStorage.

## 🌐 Démonstration

- **Application en ligne :** [https://tachkilav2-seven.vercel.app/]
- **Repository GitHub :** [(https://github.com/Anassaouji/Tachkila_v2.git)]
- **Planification :** [https://aoujianass.atlassian.net/jira/software/projects/TACHKILAV2/boards/35]
- **Presentation :** [https://canva.link/vu55yuu9cj5u05h]

## 🎯 Objectifs du projet

L'objectif principal est de proposer un outil simple, intuitif et performant permettant de :

- Centraliser la gestion des joueurs et des matchs.
- Préparer une composition tactique en 4-4-2.
- Respecter les règles de gestion de l'effectif.
- Suivre les résultats des rencontres.
- Faciliter la recherche et la consultation des données.
- Conserver les informations après actualisation ou changement de page.

## 🚀 Fonctionnalités principales

### 1. Gestion de l'effectif — `index.html`

La page Effectif permet de gérer l'ensemble des joueurs du club.

**Gestion des joueurs**
- Ajouter un joueur avec ses informations personnelles et sportives.
- Modifier les informations d'un joueur existant.
- Supprimer un joueur après confirmation.
- Afficher les joueurs sous forme de cartes avec un code couleur selon leur poste.
- Identifier les joueurs « En forme » et « Blessé ».
- Désigner un capitaine unique, avec une indication visuelle sur sa carte.

**Validation des données**
- Nom composé de 3 à 30 lettres.
- Numéro de maillot unique, compris entre 1 et 99.
- Âge compris entre 18 et 39 ans.
- Effectif limité à deux gardiens.
- Messages d'erreur affichés sous les champs concernés.

**Recherche et navigation**
- Recherche dynamique par nom.
- Filtrage par poste : gardien, défenseur, milieu ou attaquant.
- Combinaison de la recherche et du filtrage.
- Pagination dynamique de 8 joueurs par page.

### 2. Gestion des compositions — `composition.html`

Cette page permet de préparer visuellement une formation tactique **4-4-2**.

- Représentation interactive du terrain avec CSS Grid.
- Affichage des onze positions de la formation.
- Affectation des joueurs aux positions compatibles avec leur poste.
- Gestion des positions libres et occupées.
- Interdiction de placer un joueur blessé sur le terrain.
- Prévention des affectations multiples d'un même joueur.
- Retrait automatique du terrain lorsqu'un joueur devient blessé, change de poste de manière incompatible ou est supprimé.
- Conservation de la composition après actualisation.

### 3. Gestion des matchs — `matchs.html`

La page Matchs centralise les rencontres du club et leurs résultats.

**Gestion des rencontres**
- Ajouter un match avec un adversaire, une date, une heure, un lieu et un type de rencontre.
- Modifier ou supprimer les informations d'un match.
- Distinguer les matchs à domicile et à l'extérieur.
- Valider les données des formulaires.

**Suivi des matchs**
- Affichage des rencontres à venir et des matchs passés.
- Filtrage par statut : Tous, À venir et Joués.
- Recherche dynamique par nom d'adversaire.
- Combinaison de la recherche et des filtres.
- Affichage du bouton « Saisir le score » lorsque la date et l'heure du match sont passées.
- Enregistrement et affichage des scores.

**Résultats avec code couleur**
- 🟢 Vert : victoire.
- 🔴 Rouge : défaite.
- ⚪ Gris : match nul.

L'état temporel des rencontres est déterminé automatiquement à l'aide de `Date.now()`.

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| HTML5 | Structure sémantique des pages |
| Tailwind CSS | Design, mise en page et responsive |
| CSS Grid | Construction du terrain de football |
| JavaScript ES6+ | Logique métier et interactions |
| DOM API | Création et mise à jour des interfaces |
| localStorage | Persistance des données |
| Git & GitHub | Versionnement et collaboration |
| Jira | Planification et suivi des tâches |
| Vercel | Déploiement de l'application |

## 🏗️ Architecture du projet

Le projet repose sur une architecture modulaire utilisant les fonctionnalités natives de JavaScript ES6 (`import` / `export`).

Le code est organisé selon plusieurs responsabilités :

- **Données :** gestion des joueurs, des matchs et de leur stockage.
- **Validation :** vérification des formulaires et des règles métier.
- **Interface :** création des composants HTML et mise à jour du DOM.
- **Événements :** gestion des interactions utilisateur.
- **Pages :** fichiers d'entrée dédiés aux différentes pages de l'application.

Cette séparation facilite la maintenance, la compréhension du code et son évolution.

### Concepts JavaScript appliqués

- Fonctions fléchées et template literals.
- Déstructuration et opérateur spread.
- Méthodes de tableaux : `map()`, `filter()`, `find()`, `some()` et `slice()`.
- Manipulation du DOM avec `createElement()`, `textContent()` et `replaceWith()`.
- Gestion des événements et délégation d'événements.
- Expressions régulières (Regex) pour les validations.
- Sauvegarde et récupération des données via JSON et localStorage.

## 💾 Gestion et persistance des données

L'application utilise **localStorage** afin de conserver les données directement dans le navigateur.

Les informations sont partagées entre les trois pages, ce qui permet notamment :

- De retrouver les joueurs et les matchs après un rechargement.
- De maintenir la composition du terrain.
- De synchroniser les modifications des joueurs avec leur présence sur le terrain.
- De conserver les scores enregistrés.

Aucun serveur ni base de données externe n'est nécessaire au fonctionnement de cette version.

## 📱 Responsive Design

L'interface est conçue pour s'adapter à différentes tailles d'écran :

| Appareil | Largeur |
|---|---|
| Mobile | Jusqu'à 767 px |
| Tablette | 768 à 1023 px |
| Petit ordinateur | 1024 à 1279 px |
| Grand ordinateur | 1280 px et plus |

Les différentes pages utilisent les utilitaires responsive de Tailwind CSS pour adapter l'affichage des cartes, des formulaires, des menus et des contenus.

## ⚙️ Installation et exécution

**Prérequis :**
- Un navigateur web récent.
- Visual Studio Code.
- L'extension Live Server.

**Étapes d'installation :**

1. Cloner le repository GitHub du projet.
2. Ouvrir le dossier du projet dans Visual Studio Code.
3. Installer l'extension Live Server si nécessaire.
4. Ouvrir `index.html` avec Live Server.
5. Naviguer entre les trois pages depuis le menu principal.

L'application est développée avec JavaScript natif et ne nécessite pas de serveur backend.

## ✅ Règles métier et fiabilité

Plusieurs contraintes sont intégrées pour garantir la cohérence des données :

- Un seul capitaine peut être désigné dans l'effectif.
- Le nombre de gardiens est limité à deux.
- Chaque numéro de maillot doit être unique.
- Un joueur blessé ne peut pas intégrer la composition.
- Un joueur ne peut pas occuper plusieurs positions simultanément.
- Chaque position accepte uniquement les joueurs compatibles.
- Les modifications de l'effectif sont prises en compte sur le terrain.
- Les résultats des matchs dépendent des scores enregistrés.
- La pagination s'actualise selon les recherches, filtres et modifications des données.

## 🔐 Bonnes pratiques

Le développement prend en compte les principes suivants :

- Utilisation de balises HTML sémantiques.
- Séparation entre la logique métier et l'interface.
- Validation des données saisies par l'utilisateur.
- Création sécurisée des éléments avec `createElement()` et `textContent()`.
- Organisation du code en modules réutilisables.
- Gestion des interactions au clavier et des fermetures de modales.
- Nommage explicite des fonctions et variables.
- Versionnement du projet avec Git et GitHub.

## 📌 Organisation et gestion du projet

Le développement a été planifié avec **Jira**, selon une approche de travail progressive.

Les tâches ont été réparties entre les principales fonctionnalités : architecture, gestion de l'effectif, composition, suivi des matchs, validations, responsive et tests.

Le suivi du code s'appuie sur Git et GitHub, avec des branches de fonctionnalité et des Pull Requests permettant de faciliter la relecture et l'intégration des modifications.

## 📄 Conclusion

**Tachkila V2** propose une solution web complète pour la gestion sportive d'Atlas FC, en réunissant les joueurs, les compositions tactiques et les rencontres dans une même application.

Ce projet met en pratique les compétences essentielles du développement frontend moderne : **JavaScript ES6+, manipulation du DOM, architecture modulaire, validation des données, responsive design et persistance locale**.

---

**Projet réalisé dans le cadre d'une formation en développement web.**

**Tachkila V2 — Atlas FC | 2026**
