const artist = JSON.parse(artists);
const genre = JSON.parse(genres);
const song = JSON.parse(songs);

function selectSong(){
  const select = document.querySelector("#songSelect");
  
  for (s of song){
    const songTitle = document.createTextNode(`${s.title}`);

    const option = document.createElement("option");
    
    // adding song title text to option element 
    option.appendChild(songTitle);

    //adding song title as a option to select tag
    select.appendChild(option);
  }
}

function selectArtist(){

    //getting select from html document 
    const select = document.querySelector("#artistSelect");

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
  
        //adding the form tag into the main html tag
        

   
}

function selectGenre(){
  
  const select = document.querySelector("#genreSelect");
  
  for (g of genre){
    const genreName = document.createTextNode(`${g.name}`);
    const option = document.createElement("option");
    option.appendChild(genreName);

    select.appendChild(option);
  }

}

selectArtist();
selectGenre();
selectSong();