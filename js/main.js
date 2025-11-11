getWeather()
let searchInput =document.querySelector('input')
let todayCard = document.querySelector('.today-card')
let tommorowCard =document.querySelector('.tommorow-card')
let afterTommorowCard=document.querySelector('.after-tommorow-card')
searchInput.addEventListener('input',()=>{
    getWeather()
})

async function getLocation() {
    try{
        let res = await fetch (`https://api.weatherapi.com/v1/current.json?key=c841a07972c74884aa7120019251111&q=Cairo&aqi=no`)
        let data = await res.json()
        
        let location =data.location.name
        return location
    }catch (error){
        console.log(error)
    }
    
}
async function getWeather() {
    let location = await getLocation()
    if(searchInput.value.trim()!=="")
        location =searchInput.value
    try {
         let res =await fetch (`https://api.weatherapi.com/v1/forecast.json?key=c841a07972c74884aa7120019251111&q=${location}&days=3&aqi=no&alerts=no`)
         let data =await res.json()
         console.log(data)
         displayToday(data)
         otherDays(data ,1)
          otherDays(data ,2)
    
} catch (error) {
        console.log(error)
    }
}
function displayToday(data){
let dataApi =data.current.last_updated
let myDate =new Date(dataApi)
let today =myDate.toLocaleString("en-us",{weekday:"long"})
let month = myDate.toLocaleString("en-us",{month:"long"})
let day = myDate.getDay()
let city =data.location.name
let temp =data.current.temp_c
let img =data.current.condition.icon
let imgUrl =`https:${img}`
let text =data.current.condition.text
let humidity =data.current.humidity
let wind_kph =data.current.wind_kph
let wind_dir =data.current.wind_dir
const content =`<div class="header p-2 fw-normal d-flex justify-content-between">
<span class="day">${today}</span>
<span class="data">${day}${month}</span>
      </div>
      <div class="status  p-3">
      <span class="city">${city}</span>
    </div>
    <div class="details">
      <div class="box d-flex flex-lg-column">
        <div class="degree fw-bold text-white">  ${temp}<sup>o</sup><span>C</span></div>
        <div class="image d-flex align-items-center">
          <img src="${imgUrl}" alt="sun">
        </div>
      </div>
      <span class="general-status">${text}</span>
    </div>
    <div class="other-details my-3 d-flex">
        <div class="umbrella me-3 ">
          <img src="icons/imgi_3_icon-umberella@2x.png"  alt="" ><span> ${humidity}</span>
        </div>
         <div class="wind me-3">
          <img src="icons/imgi_4_icon-wind@2x.png" alt="">
          <span>${wind_kph}</span>
        </div>
         <div class="compass me-3">
          <img src="icons/imgi_5_icon-compass@2x.png" alt="">
          <span>${wind_dir}</span>
        </div>
    </div>
    </div>`;
    todayCard.innerHTML = content
}

function otherDays(data ,num){
let forecast = data.forecast.forecastday[num]
let apiDate = forecast.data
console.log(apiDate)
let myDate =new Date(apiDate)
let today =myDate.toLocaleString("en-us",{weekday:"long"})
console.log(today)
let img =forecast.day.condition.icon
let imgUrl =`https:${img}`
console.log(imgUrl)
let maxtemp_c =forecast.day.maxtemp_c
let mintemp_c =forecast.day.mintemp_c
console.log(maxtemp_c ,mintemp_c)
let text =forecast.day.condition.text
console.log(text)
let content =` <div class="header p-2">
      <span class="day">${today}</span>
    </div>
    <div class="details pb-5 d-flex flex-column align-items-center">
      <div class="image">
        <img src="${imgUrl}" alt="sum" class="w-100">
      </div>
      <span class="degree-day fw-bold text-white">${maxtemp_c}<sup>o</sup><span>C</span></span>
     <span class="degree-night">${mintemp_c} <sub>o</sub></span>
     <span class="general-status mt-3">${text}</span>
    </div>`
    if(num===1){
      tommorowCard.innerHTML = content
    }
    else if (num===2){
      afterTommorowCard.innerHTML = content
    }else{
      console.log('invalid day')
    }
}