
document.querySelector('#search').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value.toLowerCase() //user search data
  const url = 'https://pokeapi.co/api/v2/pokemon/'+choice //api call url with query parameter from user search value
  let locations; //variable to hold api url for location data

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        document.querySelector('h2').innerText = `Name: ${data.name}`
        document.querySelector('h3').innerText = `Type: ${data.types[0].type.name}`
        document.querySelector('#poke').src = data.sprites.front_default
        document.querySelector('#poke').alt = `An image of a ${data.name}`
        locations= data.location_area_encounters
        //Once a pokemon is searched for, a locations button will be shown
        document.querySelector('#list-locations').removeAttribute('hidden')
        //location button click listener
        document.querySelector('#list-locations').addEventListener('click', getLocations)
        //location button method logic
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
                //loop through each location and crate a list item, add the content to that list item, and then append that list item to the list
                let li = document.createElement('li')
                li.appendChild(document.createTextNode(`${specific}`))
                document.querySelector('ul').appendChild(li)
              }}else if(locationList.length<1){
                let li = document.createElement('li')
                li.appendChild(document.createTextNode(`No locations given`))
                document.querySelector('ul').appendChild(li)
              }
            })
            .catch(err=>console.log(`error: ${err}`))
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

