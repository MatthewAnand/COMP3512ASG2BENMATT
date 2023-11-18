const artist = JSON.parse(artists);
const genre = JSON.parse(genres);
const song = JSON.parse(songs);

function defaultSelect(pick)
{
  const defaultSelect = document.createElement("option");
    defaultSelect.appendChild(document.createTextNode("--"))
    pick.appendChild(defaultSelect);
}
function selectSong(){
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

function selectArtist(){

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

            //adding value to artist option
            option.setAttribute("value",`${a.id}`);
            //adding this artists name as one of the options in the select tag
            select.appendChild(option);
            
        }
  
        //adding the form tag into the main html tag
        

   
}

/**
 * function for filling out the select with options of all genres
 */
function selectGenre(){
  
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
function searchArtist(id){
  const songList = [];
  for (s of song){
    if (id == s.id){
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
    console.log(t);
    const a = document.createTextNode(s.artist.name);
    const y = document.createTextNode(s.year);
    const g = document.createTextNode(s.genre.name);
    const p = document.createTextNode(s.popularity);

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






selectArtist();
selectGenre();
selectSong();

//adding handler for filter button 
const clearBtn = document.querySelector("#filter");
const songSelect = document.querySelector("#songSelect");
clearBtn.addEventListener("click",()=>{
  // getting all the radio buttons 
  const buttons = document.querySelectorAll("input");

  // checking for index of radio button to see which one is chosen 
  let foundIndex = 0;
  for (let i =0; i < buttons.length; i++){
    if (buttons[i].checked){
      foundIndex = i;
    }
    const button = buttons[foundIndex];

    // filtering process depending on the selected radio button
    
    // variable for songs that will be displayed on table
    let songList = [];
    if (button.value == "song"){
      const songChoice = document.querySelector("#songSelect");
      songList = searchGenres(songChoice.value);
      populateTable(songList);
    }
    else if (button.value== "genre"){
      const genreChoice = document.querySelector("#genreSelect");
      songList = searchGenres(genreChoice.value);
      populateTable(songList);
    }
    else if (button.value = "artist"){
      const artistChoice = document.querySelector("#artistSelect");
      songList = searchArtists(artistChoice.value);
      populateTable(songList);
    }
    else{

    }
  }
});