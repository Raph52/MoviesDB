//definition de variables
let data;
//mapping des element HTMLS avec des variabels javascript
let searchBar = document.getElementById('searchBar');
let contentResult = document.getElementById('contentResult');

//mise en place de l'evenement a chaque touche
searchBar.addEventListener('keyup', searchData);

//function en charge de l'affichage des reultat
function searchData(event){
    //recuperation de la valeur taper dans l'input
    let valeurRechercher = event.currentTarget.value;
    //appel de la function qui va appeller l'api
    searchSerieFromApi(valeurRechercher);
}