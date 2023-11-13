const artist = JSON.parse(artists);
const genre = JSON.parse(genres);
const song = JSON.parse(songs);

function selectArtist(){
    document.write("<select>");
        for(a of artist){
            document.write(`<option value ='${artist.id}>${a.name}</option>`);
        }
    document.write("</select>");
}

function selectGenre(){
    document.write("<select id = 'genreSelect'>");

    for (g of genre){
       document.write(`<option value = '${g.id}'>${g.name}</option>`)
    }
       
    document.write("</select");
}

selectArtist();
selectGenre();
console.log()