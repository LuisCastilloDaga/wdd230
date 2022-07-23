var toggleIcon = document.querySelector('.toggle-icon');
var menuMobile = document.querySelector('.menu');


toggleIcon.onclick = function() {
    menuMobile.classList.toggle('show-menu');
    toggleIcon.classList.toggle('show-icon')
}




/* WEATHER API */

const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-ic');
const condition = document.querySelector('#condition');
const humidity = document.querySelector('#humidity');

const fCon1 = document.querySelector('#f-description1');
const fCon2 = document.querySelector('#f-description2');
const fCon3 = document.querySelector('#f-description3');
const h1 = document.querySelector('#hour1');
const h2 = document.querySelector('#hour2');
const h3 = document.querySelector('#hour3');

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Lima&appid=6725ba7850ae02903340395b04dba12f&units=metric';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Lima&appid=6725ba7850ae02903340395b04dba12f&units=metric&cnt=3';

async function apiFetch() {
    try {
      const response = await fetch(url);
      const response2 = await fetch(forecastUrl);
      if (response.ok && response2.ok) {
        const data = await response.json();
        const data2 = await response2.json();
        console.log(data); // this is for testing the call
        console.log(data2);

        currentWeather(data);
        forecastWeather(data2);

      } else {
          throw Error(await response.text(), await response2.text());
      }
    } catch (error) {
        console.log(error);
    };
  }
  
  apiFetch();

  function currentWeather(weatherData) {
    temperature.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)} ºC</strong>`;
    
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
    const hum = `${weatherData.main.humidity}%`;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    condition.textContent = desc;
    humidity.textContent = hum;
}

    function forecastWeather(weatherData) {
       
       for (let i = 0; i<3; i++) {
            var forT = document.querySelector(`#f${i+1}-temp`);
            var forIc = document.querySelector(`#f${i+1}-icon`);
            var forDes = document.querySelector(`#f-description${i+1}`);
            var forH = document.querySelector(`#hour${i+1}`);
            
            var icsrc = `https://openweathermap.org/img/w/${weatherData.list[i].weather[0].icon}.png`;
            var desc = weatherData.list[i].weather[0].description;
            var date = new Date(weatherData.list[i].dt_txt) ;

            forT.innerHTML = `<strong>${weatherData.list[i].main.temp.toFixed(0)} ºC</strong>`;
            forIc.setAttribute('src', icsrc);
            forIc.setAttribute('alt', desc);
            forDes.textContent = desc;
            /* forH.textContent = date.substr(8,15); */
            forH.textContent = `${date.getDate()}th, ${date.getHours()}hrs.`;
            
       }
       
    }