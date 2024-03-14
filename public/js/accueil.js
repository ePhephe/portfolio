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
    tabDataCarriere.forEach(data => {
        let divAffichage = document.getElementsByClassName(`carriere-${data.id}`)[0];
        let templateHtml = ``;

        if (data.metier != ``) {
            templateHtml += `<h2 class="flex justify-between"><div>${data.metier} - ${data.employeur}</div> <a href="${data.link}" title="Accès au site de ${data.employeur}" target="_blank"><i class="fa-solid fa-globe"></i></a></h2> 
            <h3>${data.lieu} - ${data.dates}</h3> 
            <p>${data.description}</p>`;
        }
        else {
            templateHtml += `Job Undefined`
        }
        divAffichage.innerHTML = templateHtml;
    });
}

function afficheProjets(tabDataProjets) {
    tabDataProjets.forEach(data => {
        let divAffichage = document.getElementsByClassName(`projet-${data.id}`)[0];
        let templateHtml = ``;

        if (data.libelle != ``) {
            divAffichage.style = `background-image: url("./public/img/images/${data.background}");color:${data.color};`;
            templateHtml += `${data.competence}<a class="picto picto-36 plus-projet" href="./projet.html?projet-id=${data.id}" title="Accès au projet">
                    </a>`;
        }
        else {
            templateHtml += `New project soon...`
        }
        divAffichage.innerHTML = templateHtml;
    });
}

//Appel du fichier json pour construire la page d'accueil
fetch(`./public/json/accueil.json`).then(res => {
    return res.json();
}).then(rep => {
        afficheApropos(rep.apropos);
        afficheCarriere(rep.carriere);
        afficheProjets(rep.projets);
}).catch(err => {
        console.log(err);
});