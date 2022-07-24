/* Current Date */

const now = new Date();
console.log(now);
const d = new Date(document.lastModified);
const day = d.getDate();
const month = d.getMonth()+1;
const year = d.getFullYear();
const hours = d.getHours();
const minutes = d.getMinutes();
const seconds = d.getSeconds();

const fulldate = `Last Updated: ${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;


document.getElementById('lastmodification').textContent = fulldate;

document.querySelector('#year').textContent = new Date().getFullYear();




/* Menu */

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


/* Temple Directory Page */

const requestURL = 'json/data.json';
const cards = document.querySelector('.cards');

if (cards != null) {
    fetch(requestURL)
    .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const temples = jsonObject['temples'];

    temples.forEach(displayTemples);
  });
}


function displayTemples(temple) {
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');
    let li4 = document.createElement('li');
    let li5 = document.createElement('li');
    let li6 = document.createElement('li');
    let div = document.createElement('div');
    let a = document.createElement('a');
    let portrait = document.createElement('img');

    h2.textContent = `${temple.name}`;
    li1.innerHTML = `<strong>Address:</strong> ${temple.address}`;
    li2.innerHTML = `<strong>Phone number:</strong> ${temple.phone}`;
    li3.innerHTML = `<strong>Services:</strong> ${temple.services}`;
    li4.innerHTML = `<strong>Announced:</strong> ${temple.announced}`;
    li5.innerHTML = `<strong>Groundbreaking:</strong> ${temple.groundbreaking}`;
    li6.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;
    a.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>';

    portrait.setAttribute('src', temple.img);
    portrait.setAttribute('alt', `Portrait of ${temple.name}`);
    card.setAttribute('loading', 'lazy');
    a.classList.add('like-btn');

    div.appendChild(portrait);
    ul.append(li1, li2, li3, li4, li5, li6);

    card.appendChild(h2);
    card.appendChild(div);
    card.appendChild(ul);
    card.appendChild(a);

    document.querySelector('div.cards').appendChild(card);

}


const listBtn = document.querySelector('#list');
const gridBtn = document.querySelector('#grid');

if (listBtn!= null && gridBtn !=null) {
    gridBtn.onclick = function () {
        cards.classList.add("grid");
        cards.classList.remove("list");
        
    }
    
    listBtn.onclick = function () {
        cards.classList.add("list");
        cards.classList.remove("grid");
    }
    
} 


/* Reservation Page: Form */

var datetimeField = document.querySelector('#date-time-local');
if (datetimeField != null) {
    datetimeField.textContent = `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;    
}
