 const cityForm = document.querySelector('form');

 const card = document.querySelector('.card');
 const details = document.querySelector('.details');
 const time = document.querySelector('img.time');
 const icon = document.querySelector('.icon img');

 const updateUI =(data)=>{

    const { cityDetails, weather} = data;


     details.innerHTML = `
     <h5 class="my-3">${cityDetails.EnglishName}</h5>
     <div class="my-3">${weather.WeatherText}</div>
     <div class="display-4 my-4">
         <span>${weather.Temperature.Metric.Value}</span>
         <span>&deg;c</span>
     </div>
     
     `;
    //  update the night/day & icon images
    const iconSrc =`img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

     let timeSrc =weather.IsDayTime? 'img/day.svg': 'img/night.svg';
     time.setAttribute('src', timeSrc);

     if(card.classList.contains('d-none')){

        card.classList.remove('d-none');
     }

 };

 const updateCity = async(city)=>{
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    
    return {cityDetails, weather};

 };

 cityForm.addEventListener('submit', e =>{
     e.preventDefault();

    //  get city value

     const city = cityForm.city.value.trim();
     cityForm.reset();


//  update the ui with the city
 updateCity(city)
 .then(data=>updateUI(data))
 .catch(error=>console.log(error))

});