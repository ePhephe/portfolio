function afficheApropos(tabDataApropos) {

    tabDataApropos.forEach(data => {
        let divAffichage = document.getElementById(data.id);
        let templateHtml = ``

        switch (data.id) {
            case "aPropos":
                templateHtml += `<h2>${data.titre}</h2>
                 <p><em>${data.metier}</em></p> 
                 <p><em>${data.lieu}</em></p>`;
                break;
            case "softSkills":
                templateHtml += `<h2>${data.titre}</h2>
                                <div class="flex gap">`;
                data.items.forEach(item => {
                    templateHtml += `<em>${item.libelle}</em>`;
                });
                templateHtml += `</div>`;
                break;
            case "description":
                templateHtml += `<p>${data.texte}</p>`;
                break;
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
            case "devLanguage":
                templateHtml += `<h2>${data.titre}</h2>
                                <div class="flex gap">`;
                data.items.forEach(item => {
                    templateHtml += `<em>${item.libelle}</em>`;
                });
                templateHtml += `</div>`;
                break;
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

        divAffichage.innerHTML = templateHtml;
    });


}

function afficheCarriere(tabDataCarriere) {
    
}

function afficheProjets(tabDataProjets) {
    
}

//Appel du fichier json pour construire la page d'accueil
fetch(`./public/json/accueil.json`).then( res => {
    return res.json();
})
.then(rep=>{
    console.log(rep);
    afficheApropos(rep.apropos)
})
.catch(err=>{
    console.log(err);
});