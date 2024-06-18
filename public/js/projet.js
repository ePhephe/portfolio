// On récupère l'identifiant du projet dans l'URL (sinon par défaut à 1)
let projetParam = adresse.searchParams.get('projet-id') === null ? 1 : adresse.searchParams.get('projet-id');

/**
 * Affichage des informations du projet
 * @param {array} tabDataProjet Tableau avec les informations du projet
 */
function afficheInfosProjet(tabDataProjet){
    // On récupère les div d'affichage des informations
    let tabDivAffichage = document.querySelectorAll(`.grid-presentation-projet div`);
    // On récupère l'élément de header du projet
    let headerProjet = document.querySelector(`.image-projet`);

    //On met à jour les informations SEO pour cette page projet
    document.querySelector('meta[name="description"]').setAttribute("content", tabDataProjet.metaDesc);
    document.querySelector('meta[property="og:description"]').setAttribute("content", tabDataProjet.metaDesc);
    document.title = tabDataProjet.title;
    document.querySelector('meta[property="og:title"]').setAttribute("content", tabDataProjet.title);
    document.querySelector('meta[property="og:image"]').setAttribute("content", `https://www.wordlofmddev.fr/public/img/images/projet-${tabDataProjet.id}.webp`);

    // On met en place le lien et le style du header
    headerProjet.style = `background-image:url("../public/img/images/projet-${tabDataProjet.id}.webp");`;
    headerProjet.innerHTML = `<a href="${tabDataProjet.url}" title="Accès à la démo du projet ${tabDataProjet.libelle}" target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="${tabDataProjet.color}" viewBox="0 0 256 256"><path d="M192,136v72a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V80A16,16,0,0,1,48,64h72a8,8,0,0,1,0,16H48V208H176V136a8,8,0,0,1,16,0Zm32-96a8,8,0,0,0-8-8H152a8,8,0,0,0-5.66,13.66L172.69,72l-42.35,42.34a8,8,0,0,0,11.32,11.32L184,83.31l26.34,26.35A8,8,0,0,0,224,104Z"></path></svg>
    </a>`;

    // On met en place la bonne couleur sur l'image
    document.querySelector(`.image-projet svg`).style = `fill:${tabDataProjet.color};`;

    // On parcourt chacun des blocs à alimenter
    tabDivAffichage.forEach(divAffichage => {
        // On initialise le template
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

/**
 * Affiche les images de l'interface mobile
 * @param {array} tabImagesMobile Tableau avec la liste des images de l'interface mobile à afficher
 */
function afficheImagesMobile(tabImagesMobile){
    // On récupère les div des images mobile
    let divImages = document.querySelectorAll(`.grid-image-mobile-projet div`);
    // On appelle notre fonction d'affichage
    afficheImages(tabImagesMobile,divImages);
}

/**
 * Masque la section dédié aux images mobiles
 */
function masqueImagesMobile(){
    // On récupère les éléments div et nav pour les images mobiles et desktops
    let divImageMobile = document.querySelector(`.grid-image-mobile-projet`).parentElement;
    let divImageDesktop = document.querySelector(`.grid-image-desktop-projet`).parentElement;
    let navButtonMobile = document.querySelector(`.bottom-navigation ul li[data-section="1"]`);
    let navButtonDesktop = document.querySelector(`.bottom-navigation ul li[data-section="2"]`);

    // On supprime les éléments dédiés au mobile
    navButtonMobile.remove();
    divImageMobile.remove();

    // On modifie l'attribut de section des parties desktop (passant de 1 à 2)
    divImageDesktop.setAttribute(`data-section`,"1");
    navButtonDesktop.setAttribute(`data-section`,"1");
}

/**
 * Affiche les images de l'interface desktop
 * @param {array} tabImagesDesktop Tableau avec la liste des images de l'interface desktop à afficher
 */
function afficheImagesDesktop(tabImagesDesktop){
    // On récupère les div des images desktop
    let divImages = document.querySelectorAll(`.grid-image-desktop-projet div`);
    // On appelle notre fonction d'affichage
    afficheImages(tabImagesDesktop,divImages);
}

/**
 * Masque la section dédié aux images desktop
 */
function masqueImagesDesktop(){
    // On récupère les éléments div et nav pour les images desktops
    let divImageDesktop = document.querySelector(`.grid-image-desktop-projet`).parentElement;
    let navButtonDesktop = document.querySelector(`.bottom-navigation ul li[data-section="2"]`);

    // On supprime les éléments
    divImageDesktop.remove();
    navButtonDesktop.remove();
}

/**
 * Affiche les images
 * @param {array} tabImages Tableau des images à afficher
 * @param {element} div 
 */
function afficheImages(tabImages,div){
    // On parcourt chacune des images
    tabImages.forEach((image,index) => {
        // On met l'image dans la div correspondante
        div[index].innerHTML = `<img src="./public/img/images/projet-loss-${projetParam}/${image.nom}" alt="${image.alt}" class="responsive">`;
        // On ajoute un évènement au click sur les divs
        div[index].addEventListener(`click`,(e)=>{
            // On récupère les éléments de la modal qui affiche l'image en grand
            let divModal = document.getElementById(`modal`);
            let divModalContenu = document.getElementById(`modal-image`);
            let btnFermer = document.getElementById(`btn-close`);

            // On met l'image dans la modal
            divModalContenu.innerHTML = `<img src="./public/img/images/projet-${projetParam}/${image.nom}" alt="${image.alt}" class="responsive">`;
            // On affiche la modal
            divModal.classList.remove(`display-none`);

            // On met en place les évènementsp pour fermer la modal
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
    //console.log(rep);
        //On appelle nos fonctions d'affichage
        //Affichage des information du projet
        afficheInfosProjet(rep.projets[projetParam-1]);

        // Si des images mobiles sont disponibles, on les affiche
        if(rep.projets[projetParam-1].imagesMobile != undefined)
            afficheImagesMobile(rep.projets[projetParam-1].imagesMobile);
        else
            masqueImagesMobile();
        
        // Si des images desktop sont disponibles, on les affiche
        if(rep.projets[projetParam-1].imagesDesktop != undefined)
            afficheImagesDesktop(rep.projets[projetParam-1].imagesDesktop);
        else
            masqueImagesDesktop();

}).catch(err => {
        console.log(err);
});
