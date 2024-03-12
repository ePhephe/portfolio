//On récupère si le thème par défaut est dark ou non
const isDarkMode = () =>
	globalThis.matchMedia?.("(prefers-color-scheme:dark)").matches ?? false;
//On récupère les éléments pour le menu burger
let divMenuBurger = document.getElementById(`menuBurger`);
let headerAccueil = document.getElementById(`headerAccueil`);

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
    }
    else {
        body.classList.remove(`dark-theme`);
        body.classList.add(`light-theme`);
    }
}

//Initialisation du thème
setTheme(isDarkMode());