let projetParam = adresse.searchParams.get('projet-id') === null ? 1 : adresse.searchParams.get('projet-id');

function afficheInfosProjet(tabDataProjet){
    let tabDivAffichage = document.querySelectorAll(`.grid-presentation-projet div`);
    let headerProjet = document.querySelector(`.image-projet`);

    //On met à jour les informations SEO pour cette page projet
    document.querySelector('meta[name="description"]').setAttribute("content", tabDataProjet.metaDesc);
    document.querySelector('meta[property="og:description"]').setAttribute("content", tabDataProjet.metaDesc);
    document.title = tabDataProjet.title;
    document.querySelector('meta[property="og:title"]').setAttribute("content", tabDataProjet.title);
    document.querySelector('meta[property="og:image"]').setAttribute("content", `https://www.wordlofmddev.fr/public/img/images/projet-${tabDataProjet.id}.webp`);

    headerProjet.style = `background-image:url("../public/img/images/projet-${tabDataProjet.id}.webp");`;
    headerProjet.innerHTML = `<a href="${tabDataProjet.url}" title="Accès à la démo du projet ${tabDataProjet.libelle}" target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="${tabDataProjet.color}" viewBox="0 0 256 256"><path d="M192,136v72a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V80A16,16,0,0,1,48,64h72a8,8,0,0,1,0,16H48V208H176V136a8,8,0,0,1,16,0Zm32-96a8,8,0,0,0-8-8H152a8,8,0,0,0-5.66,13.66L172.69,72l-42.35,42.34a8,8,0,0,0,11.32,11.32L184,83.31l26.34,26.35A8,8,0,0,0,224,104Z"></path></svg>
    </a>`;

    document.querySelector(`.image-projet svg`).style = `fill:${tabDataProjet.color};`;

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

    afficheImages(tabImagesMobile,divImages)
}

function afficheImagesDesktop(tabImagesDesktop){
    let divImages = document.querySelectorAll(`.grid-image-desktop-projet div`);

    afficheImages(tabImagesDesktop,divImages)
}

function afficheImages(tabImages,div){
    tabImages.forEach((image,index) => {
        div[index].innerHTML = `<img src="./public/img/images/projet-loss-${projetParam}/${image.nom}" alt="${image.alt}" class="responsive">`;
        div[index].addEventListener(`click`,(e)=>{
            let divModal = document.getElementById(`modal`);
            let divModalContenu = document.getElementById(`modal-image`);
            let btnFermer = document.getElementById(`btn-close`);

            divModalContenu.innerHTML = `<img src="./public/img/images/projet-${projetParam}/${image.nom}" alt="${image.alt}" class="responsive">`;
            divModal.classList.remove(`display-none`);

            divModal.addEventListener(`click`,(e)=>{
                divModal.classList.add(`display-none`);
            });
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
    console.log(rep);
        //On appelle nos fonctions d'affichage
        //console.log(rep.projets[projetParam-1]);
        afficheInfosProjet(rep.projets[projetParam-1]);
        if(rep.projets[projetParam-1].imagesMobile != undefined)
            afficheImagesMobile(rep.projets[projetParam-1].imagesMobile);
        if(rep.projets[projetParam-1].imagesDesktop != undefined)
            afficheImagesDesktop(rep.projets[projetParam-1].imagesDesktop);
}).catch(err => {
        console.log(err);
});
