//On récupère si le thème par défaut est dark ou non
const isDarkMode = () =>
	globalThis.matchMedia?.("(prefers-color-scheme:dark)").matches ?? false;
//On récupère les éléments pour le menu burger
let divMenuBurger = document.getElementById(`menuBurger`);
let headerAccueil = document.getElementById(`headerAccueil`);
let inputTheme = document.getElementById(`switchTheme`);
let inputPolice = document.getElementById(`switchPolice`);

//On ajouter un listener click sur le menu burger
divMenuBurger.addEventListener(`click`,(e)=>{
    divMenuBurger.classList.toggle(`menu-burger-close`);
    headerAccueil.classList.toggle(`header-accueil-affiche`);    
});

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
    }
    else {
        body.classList.remove(`dark-theme`);
        body.classList.add(`light-theme`);
        inputTheme.checked = false;
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
    }
    else {
        body.classList.remove(`accessible-theme`);
    }
}

function changeSection(direction,section=``) {
    let bodySections = document.querySelectorAll(`main section`);
    let sectionActive = document.querySelector(`main section.active`);
    let liMenuSection = document.querySelectorAll(`.menu-navigation li`);
    let numSection = parseInt(sectionActive.getAttribute(`data-section`));
    let newNumSection = 0;

    if(direction===`suiv`){
        newNumSection = numSection+1;
        if(newNumSection>bodySections.length-1) {
            newNumSection = bodySections.length-1;
        }
    }
    else if(direction===`prec`){
        newNumSection = numSection-1;
        if(newNumSection<0) {
            newNumSection = 0;
        }
    }
    else if(section!=``){
        newNumSection = section;
    }

    console.log(newNumSection);

    bodySections.forEach(section => {
        if(newNumSection===parseInt(section.getAttribute(`data-section`))) {
            section.classList.add(`active`);
            section.classList.add(`opacity-none`);
            section.classList.remove(`opacity-yes`);
            //section.classList.remove(`display-none`);
        }
        else {
            section.classList.remove(`active`);
            section.classList.remove(`opacity-none`);
            section.classList.add(`opacity-yes`);
            //section.classList.add(`display-none`);
        }
    });

    liMenuSection.forEach(li => {
        if(newNumSection===parseInt(li.getAttribute(`data-section`))) {
            li.classList.add(`menu-actif`);
        }
        else {
            li.classList.remove(`menu-actif`);
        }
    });
}

//On récupère les variables nécessaires pour faire slider les sections
let elementUp = document.getElementById(`page-up`);
let elementDown = document.getElementById(`page-down`);
//Listener sur le bouton pour la slide en haut
elementUp.addEventListener(`click`,(e)=>{
    changeSection(`prec`);
});
//Listener sur le bouton pour la slide en bas
elementDown.addEventListener(`click`,(e)=>{
    changeSection(`suiv`);
});

//On récupère les varibales pour notre menu
let liMenuSection = document.querySelectorAll(`.menu-navigation li a`);
//Listener sur les éléments li de navigation
liMenuSection.forEach(lien => {
    lien.addEventListener(`click`,(e)=>{
        e.preventDefault();
        changeSection(``,parseInt(lien.parentElement.getAttribute(`data-section`)))
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

//Initialisation du thème
setTheme(isDarkMode());