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
   
   // adding default option to song select 
   defaultSelect(document.querySelector("#songSelect"));

   // Adding songs from api to song select tag
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

  

   // adding search method for song, artist, and genre
   
  /**
   * Helper function for finding song selected
  */
  function searchSong(id){
    const songList = sortedSongs.filter(s =>{
      return id == s.song_id;
    });

    return songList;
  }

  /**
   * Helper function  for finding specific artist selected
   */
  function searchArtists(id){
    const songList = sortedSongs.filter(s =>{
      return id == s.artist.id;
    });
    return songList;
  }

  /**
   * Helper function  for finding specific genre selected
   */
  function searchGenres(id){
    const songList = sortedSongs.filter(s =>{
      return id == s.genre.id;
    });
    
    return songList;
  }

   //Filter Songs based on choice (radio buttons)

    
  // getting filter button 
  const filterBtn = document.querySelector("#filter");

  //adding handler for filter button
  filterBtn.addEventListener("click",()=>{
  // clearing previous search 
  clear();

  // getting all the radio buttons 
  const buttons = document.querySelectorAll("input[type=radio]");

    // checking for home of radio button to see which one is chosen 
    let foundhome = 0;
    let found = false;
    for (let i =0; i < buttons.length; i++){
      if (buttons[i].checked){
          foundhome = i;
          found = true;
      }
  }
      const btn = buttons[foundhome];
  
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
      else if (btn.value == "artist" && found == true){
        const artistChoice = document.querySelector("#artistSelect");
        songList = searchArtists(artistChoice.value);
        populateTable(songList);
      }
      else{
          alert("Nothing Selected");
      }


    
  });

   //TODO event listeners for sorting songs when you click table headers
  
   //artist filter 
   document.querySelector("#artist-filter").addEventListener("click", (e) =>{
    //checking if a filter search has happened 
    if (songList){
      populateTable(songList.sort((a,b) =>{
        if (a.song.artist.name < b.song.artist.name){
          return -1;
        }
        else {
          return 1;
        }
      }));
    }
    
    tableRows = document.querySelectorAll("tbody tr");
    console.log(tableRows[0]);
    
   })
  
  
   // TODO Clicking song brings up Song

  
  
  
   // TODO filter button event listener
   
   
   })
   .catch(error => console.log(error));
     

   //end of dom content loaded 
  });
   
 


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


//SWITCHING TO SINGLESONG
function buildViewSongButton(song){
  seeSongButton.id = song.id;
  seeSongButton.addEventListener("click", function(){
     singleSong = document.querySelector("#singleSongPage");
     home = document.querySelector("#home");
    // singleSong.hidden = false;
    // home.hidden=true;

     // calc duration
     const songLength = document.querySelector("#duration");
     let minutes = (song.details.duration / 60).toFixed(0);
     let seconds = (song.details.duration % 60);
     songLength.textContent= `${minutes}:${seconds}`;

     const songTitle = document.querySelector("#titleSong");
     songTitle.textContent = song.title;
     const songArtist = document.querySelector("#artist");
     songArtist.textContent = song.artist.name;
     const songYear = document.querySelector("#year");
     songYear.textContent = song.year;
     const songGenre = document.querySelector("#genre");
     songGenre.textContent = song.genre.name;
     const bpm = document.querySelector("#bpm");
     const energy = document.querySelector("#energy");
     const dance = document.querySelector("#danceability");
     const live = document.querySelector("#liveness");
     const valence= document.querySelector("#valence");
     const acoustic = document.querySelector("#acousticness");
     const speech = document.querySelector("#speechiness");
     const pop = document.querySelector("#popularity");
     bpm.textContent = "BPM: " +song.details.bpm;

     //Energy
     energy.textContent = "Energy: \u00A0 \u00A0 \u00A0\u00A0\u00A0\u00A0 ";
     let energyBar = document.createElement(`progress`);
     energyBar.setAttribute(`max`, 100);
     energyBar.setAttribute(`value`, song.analytics.energy);
     energy.appendChild(energyBar);

     //Danceability
     dance.textContent = "Danceability: ";
     let danceabilityBar = document.createElement(`progress`);
     danceabilityBar.setAttribute(`max`, 100);
     danceabilityBar.setAttribute(`value`, song.analytics.danceability);
     dance.appendChild(danceabilityBar);

     //Liveness
     live.textContent = "Liveness:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00a0";
     let livenessBar = document.createElement(`progress`);
     livenessBar.setAttribute(`max`, 100);
     livenessBar.setAttribute(`value`, song.analytics.liveness);
     live.appendChild(livenessBar);

     //Valence
     valence.textContent = "Valence:\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0";
     let valenceBar = document.createElement(`progress`);
     valenceBar.setAttribute(`max`, 100);
     valenceBar.setAttribute(`value`, song.analytics.valence);
     valence.appendChild(valenceBar);

     //Acousticness
     acoustic.textContent = "Acousticness: ";
     let acousticBar = document.createElement(`progress`);
     acousticBar.setAttribute(`max`, 100);
     acousticBar.setAttribute(`value`, song.analytics.acousticness);
     acoustic.appendChild(acousticBar);

     //Speechiness
     speech.textContent = "Speechiness: \u00a0\u00a0";
     let speechBar = document.createElement(`progress`);
     speechBar.setAttribute(`max`, 100);
     speechBar.setAttribute(`value`, song.analytics.speechiness);
     speech.appendChild(speechBar);

     //Popularity
     pop.textContent = "Popularity: \u00a0\u00a0\u00a0\u00a0\u00a0";
     let popBar = document.createElement(`progress`);
     popBar.setAttribute(`max`, 100);
     popBar.setAttribute(`value`, song.details.popularity);
     pop.appendChild(popBar);

     //radarChart
     buildChart(song.details.bpm, song.analytics.energy, song.analytics.danceability, song.analytics.liveness, song.analytics.valence, song.analytics.acousticness, song.analytics.speechiness, song.details.popularity);
  })
}

