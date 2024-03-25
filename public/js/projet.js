//On récupère les variables nécessaires pour faire slider les sections
let elementUp = document.getElementById(`page-up`);
let elementDown = document.getElementById(`page-down`);
//Listener sur le bouton pour la slide en haut
elementUp.addEventListener(`click`,(e)=>{
    changeSection(`prec`,``,`projet`);
});
//Listener sur le bouton pour la slide en bas
elementDown.addEventListener(`click`,(e)=>{
    changeSection(`suiv`,``,`projet`);
});

let adresse = new URL(document.location.href);
let projetParam = adresse.searchParams.get('projet-id');

function afficheInfosProjet(tabDataProjet){
    let tabDivAffichage = document.querySelectorAll(`.grid-presentation-projet div`);

    tabDivAffichage.forEach(divAffichage => {
        let templateHtml = ``;
        //En fonction de l'id du bloc, on choisit le bon template
        switch (divAffichage.id) {
            case "infoProjet":
                templateHtml += `<h2>${tabDataProjet.infoProjet.libelle}</h2>
                                <div class="flex gap">`;
                templateHtml += `${tabDataProjet.infoProjet.description}`;
                templateHtml += `</div>`;
                break;
            case "roleProjet":
                templateHtml += `<h2>${tabDataProjet.roleProjet.libelle}</h2>
                                <div class="flex gap">`;
                tabDataProjet.roleProjet.roles.forEach(role => {
                    templateHtml += `<em>${role}</em>`;
                });
                templateHtml += `</div>`;
                break;
            case "presentationProjet":
                templateHtml += tabDataProjet.presentationProjet;
                break;
            case "histoProjet":
                templateHtml += tabDataProjet.histoProjet;
                break;
            case "technoProjet":
                templateHtml += `<h2>${tabDataProjet.technoProjet.libelle}</h2>
                                <div class="flex gap">`;
                tabDataProjet.technoProjet.technologies.forEach(techno => {
                    templateHtml += `<em>${techno}</em>`;
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

function afficheImagesMobile(tabImagesMobile){
    let divImages = document.querySelectorAll(`.grid-image-mobile-projet div`);

    tabImagesMobile.forEach((image,index) => {
        divImages[index].innerHTML = `<img src="./public/img/images/projet-${projetParam}/${image}" class="responsive">`;
        divImages[index].addEventListener(`click`,(e)=>{
            let divModal = document.getElementById(`modal`);
            let divModalContenu = document.getElementById(`modal-image`);
            let btnFermer = document.getElementById(`btn-close`);

            divModalContenu.innerHTML = `<img src="./public/img/images/projet-${projetParam}/${image}" class="responsive">`;
            divModal.classList.remove(`display-none`);

            btnFermer.addEventListener(`click`,(e)=>{
                divModal.classList.add(`display-none`);
            });
        });
    });
}

function afficheImagesDesktop(tabImagesDesktop){
    let divImages = document.querySelectorAll(`.grid-image-desktop-projet div`);

    tabImagesDesktop.forEach((image,index) => {
        divImages[index].innerHTML = `<img src="./public/img/images/projet-${projetParam}/${image}" class="responsive">`;
        divImages[index].addEventListener(`click`,(e)=>{
            let divModal = document.getElementById(`modal`);
            let divModalContenu = document.getElementById(`modal-image`);
            let btnFermer = document.getElementById(`btn-close`);

            divModalContenu.innerHTML = `<img src="./public/img/images/projet-${projetParam}/${image}" class="responsive">`;
            divModal.classList.remove(`display-none`);

            btnFermer.addEventListener(`click`,(e)=>{
                divModal.classList.add(`display-none`);
            });
        });
    });
}

//Appel du fichier json pour construire la page du projet
fetch(`./public/json/projets.json`).then(res => {
    return res.json();
}).then(rep => {
        //On appelle nos fonctions d'affichage
        console.log(rep.projets[projetParam-1]);
        afficheInfosProjet(rep.projets[projetParam-1]);
        afficheImagesMobile(rep.projets[projetParam-1].imagesMobile);
        afficheImagesDesktop(rep.projets[projetParam-1].imagesDesktop);
}).catch(err => {
        console.log(err);
});
