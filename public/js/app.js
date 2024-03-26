//On récupère l'adresse de la page
let adresse = new URL(document.location.href);
//On récupère le contenu stocké localement
let monStockage = localStorage;
//On initialise les variables du theme
let theme = ``;
let darkTheme = false;
let accessible = ``;
let accessibleTheme = false;
//monStockage.clear();
//On récupère la page courrante, soit accueil, soit projet
let page = adresse.searchParams.get('projet-id') === null ? `accueil` : `projet` ;
//On récupère les input liés au thème et à la police
let inputTheme = document.getElementById(`switchTheme`);
let inputPolice = document.getElementById(`switchPolice`);
//On récupère les variables nécessaires pour faire slider les sections
let elementUp = document.getElementById(`page-up`);
let elementDown = document.getElementById(`page-down`);
//On récupère les varibales pour notre menu
let liMenuSection = document.querySelectorAll(`.menu-navigation li a`);
//On récupère les varibales pour notre menu
let liBottomMenuSection = document.querySelectorAll(`.bottom-navigation li a`);

//On récupère si le thème par défaut est dark ou non
const isDarkMode = () =>
	globalThis.matchMedia?.("(prefers-color-scheme:dark)").matches ?? false;

/**
 * Applique le bon thème
 * @param {booléen} darkMode - True si le darkmode est activé, false sinon.
 */
function setTheme(darkMode){
    let body = document.querySelector(`body`);

    if(darkMode===true) {
        body.classList.remove(`light-theme`);
        body.classList.add(`dark-theme`);
        inputTheme.checked = true;
        monStockage.setItem(`theme`,`dark`)
    }
    else {
        body.classList.remove(`dark-theme`);
        body.classList.add(`light-theme`);
        inputTheme.checked = false;
        monStockage.setItem(`theme`,`light`)
    }
}

/**
 * Applique la bonne police selon le choix de l'utilsateur
 * @param {booléen} police - True si le darkmode est activé, false sinon.
 */
function setPolice(police){
    let body = document.querySelector(`body`);

    if(police===true) {
        body.classList.add(`accessible-theme`);
        monStockage.setItem(`accessible`,`true`);
        inputPolice.checked = true;
    }
    else {
        body.classList.remove(`accessible-theme`);
        monStockage.setItem(`accessible`,`false`);
        inputPolice.checked = false;
    }
}

/**
 * Permet de changer le header sur la page des projets en fonction de la section
 * @param {integer} newNumSection - Numéro de la section sur laquelle on est
 */
function changeHeader(newNumSection) {
    //On récupère les div nécessaires
    let headerProjet = document.querySelector(`header`);
    let headerVide = document.querySelector(`.header-vide`);

    //Si on est sur la première section
    if(newNumSection != 0) {
        //On met le header en grand
        headerProjet.classList.remove(`header-projet-max`);
        headerProjet.classList.add(`header-projet-min`);
        headerVide.classList.remove(`header-projet-max`);
        headerVide.classList.add(`header-projet-min`);
    }
    else {
        //Sinon le header est petit
        headerProjet.classList.add(`header-projet-max`);
        headerProjet.classList.remove(`header-projet-min`);
        headerVide.classList.add(`header-projet-max`);
        headerVide.classList.remove(`header-projet-min`);
    }

}

/**
 * Permet d'afficher la bonne section
 * @param {string} direction - Indique la direction de la pagination, suiv ou prec
 * @param {string} section - Section à afficher
 * @param {string} page - Page sur laquelle on se trouve, accueil ou projet
 */
function changeSection(direction,section=``,page=`accueil`) {
    //On récupère les sections
    let bodySections = document.querySelectorAll(`main div.section`);
    //On récupère la section active
    let sectionActive = document.querySelector(`main div.section.active`);
    //On récupère les items du menu
    let liMenuSection = document.querySelectorAll(`.menu-navigation li`);
    //On récupère les items de la navbar
    let liBottomMenuSection = document.querySelectorAll(`.bottom-navigation li`);
    //On récupère le numéro de la section active
    let numSection = parseInt(sectionActive.getAttribute(`data-section`));
    //On initialise la nouvelle section à afficher
    let newNumSection = 0;

    //Si on est dans le sens, section suivante
    if(direction===`suiv`){
        //La nouvelle section est la section active + 1
        newNumSection = numSection+1;
        //Sauf si on est déjà à la dernière section
        if(newNumSection>bodySections.length-1) {
            newNumSection = bodySections.length-1;
        }
    }
    else if(direction===`prec`){
        //Dans l'autres sens c'est la section active -1
        newNumSection = numSection-1;
        //Sauf si on est déjà au début, on reste à 0
        if(newNumSection<0) {
            newNumSection = 0;
        }
    }
    else if(section!=``){
        //Si il n'y a pas de direction et une section en paramètre, on la récupère
        newNumSection = section;
    }

    //Si on est sur la page projet, on appel changHeader pour afficher le bon
    if(page===`projet`) {
        changeHeader(newNumSection);
    }

    //On parcourt nos sections
    bodySections.forEach(section => {
        if(newNumSection===parseInt(section.getAttribute(`data-section`))) {
            //Si on est sur la section à afficher, on l'affiche et on la rend active
            section.classList.add(`active`);
            section.classList.add(`opacity-none`);
            section.classList.remove(`opacity-yes`);
        }
        else {
            //Sinon on la masque et on la rend inactive
            section.classList.remove(`active`);
            section.classList.remove(`opacity-none`);
            section.classList.add(`opacity-yes`);
        }
    });

    //On parcourt le menu pour rendre l'item qui correspond à la section actif
    liMenuSection.forEach(li => {
        if(newNumSection===parseInt(li.getAttribute(`data-section`))) {
            li.classList.add(`menu-actif`);
        }
        else {
            li.classList.remove(`menu-actif`);
        }
    });

    //On parcourt la navbar pour rendre l'item qui correspond à la section actif
    liBottomMenuSection.forEach(li => {
        if(newNumSection===parseInt(li.getAttribute(`data-section`))) {
            li.classList.add(`menu-actif-bottom`);
        }
        else {
            li.classList.remove(`menu-actif-bottom`);
        }
    });
}

//Listener sur le bouton pour la slide en haut
elementUp.addEventListener(`click`,(e)=>{
    changeSection(`prec`,``,page);
});
//Listener sur le bouton pour la slide en bas
elementDown.addEventListener(`click`,(e)=>{
    changeSection(`suiv`,``,page);
});

//Listener sur les éléments li de navigation
liMenuSection.forEach(lien => {
    lien.addEventListener(`click`,(e)=>{
        e.preventDefault();
        changeSection(``,parseInt(lien.parentElement.getAttribute(`data-section`)),page);
    });
});

//Listener sur les éléments li de navigation
liBottomMenuSection.forEach(lien => {
    lien.addEventListener(`click`,(e)=>{
        e.preventDefault();
        changeSection(``,parseInt(lien.parentElement.getAttribute(`data-section`)),page);
    });
});

//Effet sur le curseur de la souris
document.addEventListener(`mousemove`,(e)=>{
    let divPointer = document.getElementById(`pointer`);
    divPointer.style = `background: radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(129, 167, 96, 0.15), transparent 80%);`
});

//Listener sur le bouton pour la slide en haut
inputTheme.addEventListener(`change`,(e)=>{
    setTheme(e.target.checked);
});

//Listener sur le bouton pour la slide en haut
inputPolice.addEventListener(`change`,(e)=>{
    setPolice(e.target.checked);
});

//Gestion du thème en fonction de la présence d'une préférence dans le stockage
theme = monStockage.getItem(`theme`);
if(theme != null) {
    darkTheme = theme === `dark` ? true : false;
}
else {
    darkTheme = isDarkMode();
}
setTheme(darkTheme);

//Gestion du thème en fonction de la présence d'une préférence dans le stockage
accessible = monStockage.getItem(`accessible`);
if(accessible != null) {
    accessibleTheme = accessible === `true` ? true : false;
}
else {
    accessibleTheme = false;
}

setPolice(accessibleTheme);

console.log(monStockage.getItem(`theme`))