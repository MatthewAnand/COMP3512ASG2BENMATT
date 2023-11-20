const artist = JSON.parse(artists);
const genre = JSON.parse(genres);
const song = JSON.parse(songs);

/** Used to create default option in a select element (pick) */
function defaultSelect(pick)
{
  const defaultSelect = document.createElement("option");
    defaultSelect.appendChild(document.createTextNode("--"))
    pick.appendChild(defaultSelect);
}

/** this is used to s */
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
  for (s of song){
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

function populateTable(songList){
  const tbody = document.querySelector("tbody");

  for(s of songList){
    const row = document.createElement("tr");
    const titleRow = document.createElement("td");
    const artistRow = document.createElement("td");
    const yearRow = document.createElement("td");
    const genreRow = document.createElement("td");
    const popularityRow = document.createElement("td");

    //creating text nodes for each td
    const t = document.createTextNode(s.title);
    const a = document.createTextNode(s.artist.name);
    const y = document.createTextNode(s.year);
    const g = document.createTextNode(s.genre.name);
    const p = document.createTextNode(s.details.popularity);

    titleRow.appendChild(t);
    artistRow.appendChild(a);
    yearRow.appendChild(y);
    genreRow.appendChild(g);
    popularityRow.appendChild(p);

    row.appendChild(titleRow);
    row.appendChild(artistRow);
    row.appendChild(yearRow);
    row.appendChild(genreRow);
    row.appendChild(popularityRow);

    tbody.appendChild(row);
  }
}

/**
 * This method is used to filter the song based on the input chosen
 *
 */
function filter(filterBy){

}


populateArtist();
populateGenre();
populateSong();

//adding handler for filter button 
const filterBtn = document.querySelector("#filter");

filterBtn.addEventListener("click",()=>{
 
// getting all the radio buttons 
 const buttons = document.querySelectorAll("input[type=radio]");
 const selectTest = document.querySelectorAll("select");


  // checking for index of radio button to see which one is chosen 
  let foundIndex = 0;
  let found = false;
  for (let i =0; i < buttons.length; i++){
    if (buttons[i].checked){
        foundIndex = i;
        found = true;
    }
}
    const btn = buttons[foundIndex];
    console.log(btn);
    // filtering process depending on the selected radio button
    
    // variable for songs that will be displayed on table
    let songList = [];

    if (btn.value == "song" && found == true){
      const songChoice = document.querySelector("#songSelect");
      songList = searchSong(songChoice.value);
      populateTable(songList);
    }
    else if (btn.value== "genre" && found == true){
      const genreChoice = document.querySelector("#genreSelect");
      songList = searchGenres(genreChoice.value);
      populateTable(songList);
    }
    else if (btn.value = "artist" && found == true){
      const artistChoice = document.querySelector("#artistSelect");
      songList = searchArtists(artistChoice.value);
      populateTable(songList);
    }
    else{
        alert("Nothing Selected");
    }
  
});

// event listener for unchecking a radio button
