function cards(result){
    //creation du contenu HTML
    stringResult = "";
    stringResult += '<div class="col-md-4">';
    stringResult += '    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">';
    stringResult += '            <div class="col-auto d-none d-lg-block">';
    stringResult += '                <img class="img-fluid" width="200" height="250" src="https://www.themoviedb.org/t/p/w1280/'+result.poster_path+'">';
    stringResult += '            </div>';
    stringResult += '            <div class="col p-4 d-flex flex-column position-static">';
    stringResult += '              <h3 class="mb-0">'+result.name+'</h3>';
    stringResult += '              <div class="mb-1 text-muted">Nov 12</div>';
    stringResult += '              <p class="card-text mb-auto">'+result.overview.substring(0, 60)+'...</p>';
    stringResult += '              <a href="details.html?id='+result.id+'" class="stretched-link">Details</a>';
    stringResult += '            </div>';
    stringResult += '    </div>';
    stringResult += '</div>';
    //renvoi du contenu
    return stringResult;
    
}