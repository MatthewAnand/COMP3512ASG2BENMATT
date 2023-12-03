const artist = JSON.parse(artists);
const genre = JSON.parse(genres);
const song = JSON.parse(songs);

/** Used to create default option in a select element (pick) */
function defaultSelect(pick)
{
  const defaultSelect = document.createElement("option");
  defaultSelect.value = "default";
  defaultSelect.appendChild(document.createTextNode("--"))
  pick.appendChild(defaultSelect);
}

//adding api to read songs 

  document.addEventListener("DOMContentLoaded", () =>{
   const url = 
   "http://www.randyconnolly.com/funwebdev/3rd/api/music/songs-nested.php";
 
   //grabbing song data from api 
   fetch(url)
   .then(resp => resp.json())
   .then(songs => {
     
    // sorting songs by title
     const sortedSongs = songs.sort( (a,b) => {
      if (a.title < b.title){
        return -1;
      }
      else{
        return 1;
      }
   });
   
   // Adding songs from api to song select tag
   defaultSelect(document.querySelector("#songSelect"));
   sortedSongs.forEach(s =>{

    const select = document.querySelector("#songSelect");
    const option = document.createElement("option");
    option.textContent = s.title;
    option.value = s.song_id;
    option.className = "song-option";
    select.appendChild(option);
   })

   //Adding artist to select tag
   populateArtist();

   //adding genre to select tag
   populateGenre();
   //Displaying All songs initially
   populateTable(sortedSongs);

  
   //Filter Songs based on choice (radio buttons)
   




   //TODO event listeners for sorting songs when you click table headers
  
  
  
   // TODO Clicking song brings up Song

  
  
  
   // TODO filter button event listener
   
   
   })
   .catch(error => console.log(error));
     

   //end of dom content loaded 
  });
   
 

/** this is used to s 
function populateSong(){
  const select = document.querySelector("#songSelect");
  defaultSelect(select);
  for (s of song){
    const songTitle = document.createTextNode(`${s.title}`);

    const option = document.createElement("option");
    option.setAttribute("value",`${s.song_id}`);
    option.className = "song-option";
    // adding song title text to option element 
    option.appendChild(songTitle);

    //adding song title as a option to select tag
    select.appendChild(option);
  }
}
*/
function populateArtist(){

    //getting select from html document 
    const select = document.querySelector("#artistSelect");
    defaultSelect(select);
    
        for(a of artist){
            // storing the current artists name as a text node
            const artistName = document.createTextNode(`${a.name}`);
           // creating option elemenet
            const option = document.createElement("option");
            //adding the artist name as a text node inbetween the option tags 
            option.appendChild(artistName);

            //adding id value to artist option
            option.setAttribute("value",`${a.id}`);

            //adding this artists name as one of the options in the select tag
            select.appendChild(option);
            
        }
   
}

/**
 * function for filling out the select with options of all genres
 */
function populateGenre(){
  
  const select = document.querySelector("#genreSelect");
  //default selection
  defaultSelect(select);
  
  for (g of genre){
    // creating genre text to add to the option 
    const genreName = document.createTextNode(`${g.name}`);
    //creatin the option 
    const option = document.createElement("option");
    //adding genre name to option
    option.appendChild(genreName);
    //giving the option a value
    option.setAttribute("value",`${g.id}`);

    select.appendChild(option);
  }

}

/**
 * function for finding song selected
*/
function searchSong(id){
  const songList = [];
  for (s of sortedSongs){
    if (id == s.song_id){
      songList.push(s);
    }
  }
  return songList;
}

/**
 * function  for finding specific artist selected
 */
function searchArtists(id){
  const songList = []; 
  for (s of song){
    if (id == s.artist.id){
      songList.push(s);
    }
  }
  return songList;
}

/**
 * function  for finding specific genre selected
 */
function searchGenres(id){
  const songList = []; 
  for (s of song){
    if (id == s.genre.id){
      songList.push(s);
    }
  }

  return songList;
}

/**
 * Fills row based on object pased and property name passed
 * @param {*} obj the song object
 * @param {*} row 
 * @param {*} songProp property of the sog object you want
 */
function fillRow(song, row, songProp){
  //getting tbody 
  const tbody = document.querySelector("tbody");
  //selecting table row 
  //creating a table description
  const entry = document.createElement("td");
  entry.textContent = song[songProp];
  //adding table description to table row 
  row.appendChild(entry);
  //adding row to tbody
  tbody.appendChild(row);
}

function populateTable(songList){
  //getting tbody that row will be added to
  const tbody = document.querySelector("tbody");

  // loop to go through every song from the api  
  for(s of songList){
   
    const row = document.createElement("tr");
  
    row.className = "song-entry";
     //new way to append to row
     fillRow(s,row,"title");
     fillRow(s.artist,row,"name");
     fillRow(s,row,"year");
     fillRow(s.genre,row,"name");
     fillRow(s.details,row,"popularity");
  }
}

/**
 * This method is used to filter the song based on the input chosen
 *
 */
function filter(filterBy){

}

function clear(){
    let rows = document.querySelectorAll(".song-entry");
    for (let row of rows ){
        row.remove();
    }
}



//populateSong();
//loadSongs();



//clear event listener 
const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click",clear);


// event listener for unchecking a radio button




