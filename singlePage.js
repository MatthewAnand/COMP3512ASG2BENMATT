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
            //adding this artists name as one of the options in the select tag
            select.appendChild(option);
            
        }
  
        //adding the form tag into the main html tag
        

   
}

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

function populateTable(){

}

//adding handler for filter button 
const clearBtn = document.querySelector("#filter");
const songSelect = document.querySelector("#songSelect");
clearBtn.addEventListener("click",()=>{
  // getting all the radio buttons 
  const buttons = document.querySelector("input");

  // checking for index of radio button to see which one is chosen 
  const foundIndex = 0;
  for (const i =0; i < buttons.length; i++){
    if (butt.checked){
      foundIndex = i;
    }
    const button = buttons[i];

    // filtering process depending on the selected radio button
    if (button.value == "song"){

    }
    else if (button.value== "genre"){
  
    }
    else if (button.value = "artist"){

    }
    else{

    }
  }
  alert(`${songSelect.value}`);
});




selectArtist();
selectGenre();
selectSong();