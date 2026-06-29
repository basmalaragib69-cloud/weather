let searchInput = document.querySelector('#search');

let todayCard = document.querySelector('.today-card');
let tommorowCard = document.querySelector('.tommorow-card');
let afterTommorowCard = document.querySelector('.after-tommorow-card');


getWeather();


searchInput.addEventListener('input', function () {

    getWeather();

});



async function getWeather() {


    let location = "Cairo";


    if(searchInput.value.trim() !== ""){

        location = searchInput.value;

    }


    try {


        let res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=c841a07972c74884aa7120019251111&q=${location}&days=3&aqi=no&alerts=no`
        );


        let data = await res.json();


        displayToday(data);

        otherDays(data,1);

        otherDays(data,2);



    }catch(error){

        console.log(error);

    }


}







function displayToday(data){


let date = new Date(data.current.last_updated);


let today = date.toLocaleString("en-us",{
    weekday:"long"
});


let month = date.toLocaleString("en-us",{
    month:"long"
});


let day = date.getDate();



let content = `


<div class="header p-2 fw-normal d-flex justify-content-between">

<span class="day">${today}</span>

<span class="data">${day} ${month}</span>

</div>



<div class="status p-3">

<span class="city">

${data.location.name}

</span>

</div>



<div class="details">


<div class="box d-flex flex-lg-column">


<div class="degree fw-bold text-white">

${data.current.temp_c}<sup>o</sup>C

</div>



<div class="image">

<img src="https:${data.current.condition.icon}">

</div>


</div>


<span class="general-status">

${data.current.condition.text}

</span>


</div>





<div class="other-details my-3 d-flex">


<div class="me-3">

<i class="fa-solid fa-umbrella"></i>

${data.current.humidity}

</div>



<div class="me-3">

<i class="fa-solid fa-wind"></i>

${data.current.wind_kph}

</div>



<div>

<i class="fa-solid fa-compass"></i>

${data.current.wind_dir}

</div>



</div>



`;


todayCard.innerHTML = content;


}









function otherDays(data,num){


let forecast = data.forecast.forecastday[num];


let date = new Date(forecast.date);


let day = date.toLocaleString("en-us",{

weekday:"long"

});



let content = `


<div class="header p-2">

<span>${day}</span>

</div>



<div class="details pb-5 d-flex flex-column align-items-center">


<div class="image">

<img src="https:${forecast.day.condition.icon}" class="w-100">

</div>



<span class="degree-day fw-bold text-white">

${forecast.day.maxtemp_c}<sup>o</sup>C

</span>



<span class="degree-night">

${forecast.day.mintemp_c} C

</span>



<span class="general-status mt-3">

${forecast.day.condition.text}

</span>



</div>



`;



if(num === 1){

tommorowCard.innerHTML = content;

}

else if(num === 2){

afterTommorowCard.innerHTML = content;

}



}