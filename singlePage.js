const artist = JSON.parse(artists);
const genre = JSON.parse(genres);
const song = JSON.parse(songs);

function selectArtist(){
    //getting into the main file
    const main = document.querySelector("main");

    //creating form 
    const artistGenreForm = document.createElement("form");
    //creating a select elemeent for all the artists 
    const select = document.createElement("select");

        for(a of artist){
            // storing the current artists name as a text node
            const artistName = document.createTextNode(`${a.name}`);
           // creating option elemenet
            const option = document.createElement("option");
            //adding the artist name as a text node inbetween the option tags 
            option.appendChild(artistName);
            //adding this artists name as one of the options in the select tag
            select.appendChild(option);
            
        }
        //adding the select into the form tag
        artistGenreForm.appendChild(select);
        //adding the form tag into the main html tag
        main.append(artistGenreForm);

   
}

function selectGenre(){
    
  const main = document.querySelector("main");
  const select = document.createElement("select");
  const form = document.querySelector("form");
  
  for (g of genre){
    const genreName = document.createTextNode(`${g.name}`);
    const option = document.createElement("option");
    option.appendChild(genreName);

    select.appendChild(option);
  }
  form.appendChild(select);
  main.appendChild(form);

}

selectArtist();
selectGenre();