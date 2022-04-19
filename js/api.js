//Definition de la constante qui contient le clé de l'API
const apiKey = 'f33cd318f5135dba306176c13104506a';

function searchSerieFromApi(valeurRechercher){
    //appel du web service qui renvoi les series en function d'un mot de recherche
    window.fetch('http://api.themoviedb.org/3/search/tv?language=fr&api_key='+apiKey+'&query=' + valeurRechercher)
    //attente de la réponse qui contient l'entete
    .then(function(httpResponse){
        //renvoi de la réponse au prochain Then
        return httpResponse.json();
    })
    //attente de la réponse contenant le corps de la réponse
    .then(function(content){
        let stringResult = "";
        //boucle sur le resultat JSON
        for(let result of content.results){
            //appel de la function 'cards' qui gère le formatage html et concatenation dans la variable 'stringResult'
            stringResult += cards(result);
        }
        //affichage final dans la div HTML
        contentResult.innerHTML = "";
        contentResult.innerHTML = stringResult;
    }); 
}

function getSerieFromApi(id){
    
}