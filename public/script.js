const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)

searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0]    //get first place
  if (place == null)return
  
  //get location longitude and latitude
  const latitude = place.geometry.location.lat()
  const longitude = place.geometry.location.lng()
  
  fetch('/weather', {   //call created weather api in google
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({  //send these to our server
      latitude: latitude,
      longitude: longitude
    })
  }).then(res => res.json()).then(data => {
      //console.log(data)
      setWeatherData(data, place.formatted_address)   //calling this fn
  })

})



//daily
searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0]    //get first place
  if (place == null)return
  
  //get location longitude and latitude
  const latitude = place.geometry.location.lat()
  const longitude = place.geometry.location.lng()
  
  fetch('/daily', {   //call created weather api in google
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({  //send these to our server
      latitude: latitude,
      longitude: longitude
    })
  }).then(res => res.json()).then(data => {
      //console.log(data)
      setDailyData(data, place.formatted_address)   //calling this fn
  })

})

//current condition
const icon = new Skycons({ color: '#222' })
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')

//daily conditions
const locationElement2 = document.querySelector('[data-location2]')
const statusElement2 = document.querySelector('[data-status2]')

icon.set('icon', 'clear-day')
icon.play()

//setting up current data
function setWeatherData(data, place) {
  locationElement.textContent = place
  statusElement.textContent = data.summary
  temperatureElement.textContent = data.temperature
  precipitationElement.textContent = `${data.precipProbability * 100}%` //get it in percentage
  windElement.textContent = data.windSpeed
  icon.set('icon', data.icon)
  icon.play()
}

//setting up daily data
function setDailyData(data, place) {
  locationElement2.textContent = place
  statusElement2.textContent = data.summary
  icon.set('icon', data.icon)
  icon.play()
}