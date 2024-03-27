//On récupère les éléments pour le menu burger
let divMenuBurger = document.getElementById(`menuBurger`);
let headerAccueil = document.getElementById(`headerAccueil`);

//On ajouter un listener click sur le menu burger
divMenuBurger.addEventListener(`click`,(e)=>{
    divMenuBurger.classList.toggle(`menu-burger-close`);
    headerAccueil.classList.toggle(`header-accueil-affiche`);    
});

/**
 * Affiche les informations sur la page d'accueil
 * @param {array} tabDataApropos - Tableau des informations à afficher
 */
function afficheApropos(tabDataApropos) {
    //On parcours chaque élément
    tabDataApropos.forEach(data => {
        //On récupère la div qui va contenir le bloc courant
        let divAffichage = document.getElementById(data.id);
        //On initialise le template HTML 
        let templateHtml = ``;

        //En fonction de l'id du bloc, on choisit le bon template
        switch (data.id) {
            //Bloc à propos
            case "aPropos":
                templateHtml += `<h2>${data.titre}</h2>
                 <h1><p><em>${data.metier}</em></p> 
                 <p><em>${data.lieu}</em></p></h1>`;
                break;
            //Bloc des compétences
            case "softSkills":
                templateHtml += `<h2>${data.titre}</h2>
                                <div class="flex gap">`;
                data.items.forEach(item => {
                    templateHtml += `<em>${item.libelle}</em>`;
                });
                templateHtml += `</div>`;
                break;
            //Bloc de descrption
            case "description":
                templateHtml += `<p>${data.texte}</p>`;
                break;
            //Bloc des formations
            case "formation":
                templateHtml += `<h2>${data.titre}</h2>`;
                data.etablissements.forEach(etablissement => {
                    templateHtml += `<em>${etablissement.libelle}</em>
                    <ul class="liste">`;
                    etablissement.diplomes.forEach(diplome => {
                        templateHtml += `<li>${diplome.libelle}</li>`;
                    });
                    templateHtml += `</ul>`;
                });
                break;
            //Bloc des langage de développement
            case "devLanguage":
                templateHtml += `<h2>${data.titre}</h2>
                                <div class="flex gap">`;
                data.items.forEach(item => {
                    templateHtml += `<em>${item.libelle}</em>`;
                });
                templateHtml += `</div>`;
                break;
            //Bloc des outils de développement
            case "devTools":
                templateHtml += `<h2>${data.titre}</h2>
                                <div class="flex gap">`;
                data.items.forEach(item => {
                    templateHtml += `<em>${item.libelle}</em>`;
                });
                templateHtml += `</div>`;
                break;

            default:
                break;
        }
        //On affiche le template dans notre div
        divAffichage.innerHTML = templateHtml;
    });
}

/**
 * Affiche le détail de la carrière
 * @param {array} tabDataCarriere - Tableau des informations de carrière à afficher
 */
function afficheCarriere(tabDataCarriere) {
    //On parcourt l'ensemble des emplois
    tabDataCarriere.forEach(data => {
        //On récupère la div qui va contenir le bloc courant
        let divAffichage = document.getElementsByClassName(`carriere-${data.id}`)[0];
        //On initialise le template HTML 
        let templateHtml = ``;

        //Si le métier n'est pas vide, on l'affiche
        if (data.metier != ``) {
            templateHtml += `<h2 class="flex justify-between"><div>${data.metier} - ${data.employeur}</div> <a href="${data.link}" title="Accès au site de ${data.employeur}" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm78.37,64H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM128,40.11c12,13,21,29.55,26.37,47.89H101.63C107,69.66,116,53.13,128,40.11ZM96,128a145.29,145.29,0,0,1,2-24h60a145.72,145.72,0,0,1,0,48H98A145.29,145.29,0,0,1,96,128Zm5.63,40h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168Zm49.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Zm23.53-61a161.79,161.79,0,0,0,0-48h38.46a88.15,88.15,0,0,1,0,48Z"></path></svg>
            </a></h2> 
            <h3>${data.lieu} - ${data.dates}</h3> 
            <p>${data.description}</p>`;
        }
        else {
            //Sinon on affiche Job Undefined
            templateHtml += `Job Undefined`
        }
        //On affiche le template dans notre div
        divAffichage.innerHTML = templateHtml;
    });
}

/**
 * Affiche les différents projets
 * @param {array} tabDataProjets - Tableau des projets avec leurs informations
 */
function afficheProjets(tabDataProjets) {
    //On parcourt l'ensemble des projets
    tabDataProjets.forEach(data => {
        //On récupère la div qui va contenir le bloc courant
        let divAffichage = document.getElementsByClassName(`projet-${data.id}`)[0];
        //On initialise le template HTML 
        let templateHtml = ``;

        //Si le libellé du projet n'est pas vide, on l'affiche
        if (data.libelle != ``) {
            divAffichage.style = `background-image: url("./public/img/images/${data.background}");color:${data.color};`;
            templateHtml += `${data.competence}<a class="picto picto-36 rounded picto-center fixed-bottom-right" href="./projet.html?projet-id=${data.id}" title="Accès au projet">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#000000" viewBox="0 0 256 256"><path d="M192,136v72a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V80A16,16,0,0,1,48,64h72a8,8,0,0,1,0,16H48V208H176V136a8,8,0,0,1,16,0Zm32-96a8,8,0,0,0-8-8H152a8,8,0,0,0-5.66,13.66L172.69,72l-42.35,42.34a8,8,0,0,0,11.32,11.32L184,83.31l26.34,26.35A8,8,0,0,0,224,104Z"></path></svg>
            </a>`;
        }
        else {
            //Sinon on affiche New Project Soon
            templateHtml += `New project soon...`
        }
        //On affiche le template dans notre div
        divAffichage.innerHTML = templateHtml;
    });
}

//Appel du fichier json pour construire la page d'accueil
fetch(`./public/json/accueil.json`).then(res => {
    return res.json();
}).then(rep => {
        //On appelle nos fonctions d'affichage
        afficheApropos(rep.apropos);
        afficheCarriere(rep.carriere);
        afficheProjets(rep.projets);
}).catch(err => {
        console.log(err);
});

let sectionParam =adresse.searchParams.get('section');

if(sectionParam != null) {
    changeSection(``, parseInt(sectionParam))
}