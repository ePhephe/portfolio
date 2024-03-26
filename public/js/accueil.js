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
            templateHtml += `<h2 class="flex justify-between"><div>${data.metier} - ${data.employeur}</div> <a href="${data.link}" title="Accès au site de ${data.employeur}" target="_blank"><i class="fa-solid fa-globe"></i></a></h2> 
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
                <i class="fa-solid fa-plus"></i></a>`;
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