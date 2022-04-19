//declaration de la cle d'api
const myKeyLocalStorage = "Ma_biblotheque";

//declaration des variables globales
let serieData;
let episodeData;
let obj = [];

//recuperation de l'url
var url_string = window.location.href;
var url = new URL(url_string);
//isolation des parametres passer dans l'url
var id = url.searchParams.get("id");

//appel du webservice qui envoi les informations de la série par rapport a son ID
window.fetch('http://api.themoviedb.org/3/tv/'+id+'?api_key='+apiKey)
//recuperation des entete
.then(function(httpResponse){
    return httpResponse.json();
})
//traitement du corps de la dmeande
.then(function(content){
    serieData = content;
    //liaison a l'element html pour l'image
    let poster = document.getElementById('poster');
    poster.innerHTML = "<img class=\"img-fluid\" src=\"https://www.themoviedb.org/t/p/w1280/"+serieData.poster_path+"\" />";

    //construction de l'affichage général de la page
    let contenuDePage = document.getElementById('content');
    contenuDePage.innerHTML = "<h1>"+serieData.name+"</h1><br/>";
    
    contenuDePage.innerHTML += "Genre(s) :<br />";
    for(let genre of content.genres){
        contenuDePage.innerHTML += genre.name + " - ";
    }

    contenuDePage.innerHTML += "<br />";
    contenuDePage.innerHTML += "<br />Créer par :<br />";
    for(let creator of content.created_by){
        contenuDePage.innerHTML += creator.name + " - ";
    }
    contenuDePage.innerHTML += "<br />";
    contenuDePage.innerHTML += "<br />";

    //construction de l'html pour les bloc des saisons dans une boucle
    contenuDePage.innerHTML += "<div>";
    for(let season of content.seasons){
        contenuDePage.innerHTML += "<div class=\"p-3 border alert alert-secondary titleSeason\" data-id=\""+season.season_number+"\" data-tvid=\""+id+"\" >"+season.name+"</div>";
        contenuDePage.innerHTML += "<div class=\"episodeList\" id=\"season_"+season.season_number+"\">Contenu</div>";
    }
    contenuDePage.innerHTML += "</div>";

    detectAllTiTleBtn();

}); 

function detectAllTiTleBtn(){
    //je recupere toute les instance de title par leur classe
    let allTitleSeason = document.querySelectorAll('.titleSeason');
    for(let title of allTitleSeason){
        title.addEventListener('click', showSeason);
    }
}

function showSeason(event){

    //je recupere le tableau des episodes dans le localstorage
    obj = [];
    if(window.localStorage.getItem(myKeyLocalStorage) != null){
        obj = JSON.parse(window.localStorage.getItem(myKeyLocalStorage));
    }
    

    //je recupere les données caché sur le checkbox via la propriete dataset
    let seasonNumber = event.currentTarget.dataset.id;
    let tvId = event.currentTarget.dataset.tvid;
    document.getElementById('season_'+seasonNumber).classList.toggle('episodeList');

    //appel du web service qui envoi les informations des épisodes de la série
    window.fetch('http://api.themoviedb.org/3/tv/'+tvId+'/season/'+seasonNumber+'?language=fr&api_key='+apiKey)
    .then(function(httpResponse){
        return httpResponse.json();
    })
    .then(function(content){
        
        let bloc = document.getElementById('season_' + seasonNumber);
        let stringToShowEpidode = "<ul class=\"list-group\">";

        for(let episode of content.episodes){
            //si un id d'episode est présent dans le tableau alors la case se coche
            if(obj.find(id => id == episode.id)){
                stringToShowEpidode += "<li class=\"list-group-item\"><input checked=\"checked\" class=\"checkboxClass\" type=\"checkbox\" data-tvid=\""+tvId+"\" data-season=\""+seasonNumber+"\" data-id=\""+episode.id+"\"> Episode " + episode.episode_number + " : " + episode.name + "</li>";
            }else{
                stringToShowEpidode += "<li class=\"list-group-item\"><input class=\"checkboxClass\" type=\"checkbox\" data-tvid=\""+tvId+"\" data-season=\""+seasonNumber+"\" data-id=\""+episode.id+"\"> Episode " + episode.episode_number + " : " + episode.name + "</li>";
            }
        }

        stringToShowEpidode += "</ul>";
        bloc.innerHTML = stringToShowEpidode;

        detectCheckbox();
    });
}

function detectCheckbox(){
    let allCheckbox = document.querySelectorAll('.checkboxClass');
    for(let checkbox of allCheckbox){
        checkbox.addEventListener('click', saveMyData);
    }
}

function saveMyData(event){

    //je recupere l'id de l'episode sur lequel j'ai cliquer
    let episodeId = event.currentTarget.dataset.id;

    if(event.currentTarget.checked){
        //je recuperee le localstorage
        obj.push(JSON.parse(episodeId));
    }else{
        let dataLocalStorage = window.localStorage.getItem(myKeyLocalStorage);
        tab = JSON.parse(dataLocalStorage);
        //je recupere l'index de la valeur dans le tableau
        let position = tab.indexOf(parseInt(episodeId));
        //je supprime la valeur dans le tableau par rapport a son index
        tab.splice(position, 1);
        obj = tab;
    }

    //j'ecrase le localstorage
    window.localStorage.setItem(myKeyLocalStorage, JSON.stringify(obj));

}

