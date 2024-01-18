
document.querySelector('#search').addEventListener('click', getFetch)
let locations;

function getFetch(){
  const choice = document.querySelector('input').value.toLowerCase()
  const url = 'https://pokeapi.co/api/v2/pokemon/'+choice

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // console.log(data)
        document.querySelector('h2').innerText = `Name: ${data.name}`
        document.querySelector('h3').innerText = `Type: ${data.types[0].type.name}`
        document.querySelector('#poke').src = data.sprites.front_default
        document.querySelector('#poke').alt = `An image of a ${data.name}`
        locations= data.location_area_encounters
        // console.log(locations)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

document.querySelector('#list-locations').addEventListener('click', getLocations)
function getLocations(){
  fetch(locations)
    .then(res=>res.json())
    .then(data=>{
      // console.log(data)
      document.querySelector('ul').removeAttribute('hidden')
      let locationList =[]
      for(let location of data){
        locationList.push(location.location_area.name)
      }
      // console.log(locationList)
      for(let specific of locationList){
        let li = document.createElement('li')
        li.appendChild(document.createTextNode(`${specific}`))
        document.querySelector('ul').appendChild(li)
      }
    })
    .catch(err=>console.log(`error: ${err}`))
}