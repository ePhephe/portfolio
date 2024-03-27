let projetParam = adresse.searchParams.get('projet-id');

function afficheInfosProjet(tabDataProjet){
    let tabDivAffichage = document.querySelectorAll(`.grid-presentation-projet div`);
    let headerProjet = document.querySelector(`.image-projet`);

    headerProjet.innerHTML = `<a href="${tabDataProjet.url}" title="Accès à la démo du projet ${tabDataProjet.libelle}" target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="${tabDataProjet.color}" viewBox="0 0 256 256"><path d="M192,136v72a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V80A16,16,0,0,1,48,64h72a8,8,0,0,1,0,16H48V208H176V136a8,8,0,0,1,16,0Zm32-96a8,8,0,0,0-8-8H152a8,8,0,0,0-5.66,13.66L172.69,72l-42.35,42.34a8,8,0,0,0,11.32,11.32L184,83.31l26.34,26.35A8,8,0,0,0,224,104Z"></path></svg>
    </a>`;

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
                if(tabDataProjet.histoProjet != ``) {
                    templateHtml += tabDataProjet.histoProjet;
                }
                else { 
                    let couleurAlea = Math.floor(Math.random() * (3 - 1)) + 1 === 1 ? `firstColor` : `secondColor` ;
                    divAffichage.style = `background-color: var(--${couleurAlea});`
                }
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
