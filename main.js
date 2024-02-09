//Create event listener for when 'Search' button is clicked
document.querySelector('#search').addEventListener('click', getFetch)

//create function that is invoked when search is clicked
function getFetch(){
  const choice = document.querySelector('input').value.toLowerCase() //user search data
  const url = 'https://pokeapi.co/api/v2/pokemon/'+choice //api call url with query parameter from user search value
  let locations; //variable to hold api url for location data
  //api call
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        //change the name and type elements to add data from the api return
        document.querySelector('h2').innerText = `Name: ${data.name}`
        document.querySelector('h3').innerText = `Type: ${data.types[0].type.name}`
        //change the image of the pokeball to the image of the pokemon searched by using the api return, set alt as well
        document.querySelector('#poke').src = data.sprites.front_default
        document.querySelector('#poke').alt = `An image of a ${data.name}`
        //set the locations to equal the return location data
        locations= data.location_area_encounters
        //Once a pokemon is searched for, a locations button will be shown
        document.querySelector('#list-locations').removeAttribute('hidden')
        //location button click listener, to display locations to user
        document.querySelector('#list-locations').addEventListener('click', getLocations)

        //location button event method
        function getLocations(){
          fetch(locations)
            .then(res=>res.json())
            .then(data=>{
              //create array to store location data
              let locationList = [];
              //unhide ul
              document.querySelector('ul').removeAttribute('hidden')
              //wipe ul incase pre-existing search has been done
              document.querySelector('ul').innerHTML = ''
              //loop over each object within response data (array)
              for(let location of data){
                //add each objects location data to array
                locationList.push(location.location_area.name)
              }
              if(locationList.length>0){
                for(let specific of locationList){
                //if there are location data: loop through each location and create a list item, add the content to that list item, and then append that list item to the list
                //define a list item
                let li = document.createElement('li')
                //add to that list item a text node with the current iteration text
                li.appendChild(document.createTextNode(`${specific}`))
                //append the list item to the ul
                document.querySelector('ul').appendChild(li)
              }}else if(locationList.length<1){//otherwise tell user there was no location data
                //define a list item
                let li = document.createElement('li')
                //add to that list item a text node telling a user no locations given for their pokemon
                li.appendChild(document.createTextNode(`No locations given`))
                //append the list item to the ul
                document.querySelector('ul').appendChild(li)
              }
            })
            .catch(err=>console.log(`error: ${err}`))//if there are any errors during the api call for locations log them
        }
      })
      .catch(err => {//if there are any errors during the api call for the pokemon then log them
          console.log(`error ${err}`)
      });
}

