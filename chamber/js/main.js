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

document.querySelector('.date-large').textContent = Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
);
document.querySelector('.date-mobile').textContent = Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
);

/*::::Mobile Menu:::::*/

const hamb = document.querySelector('#hamburguer');
const menu = document.querySelector('#menu');

hamb.onclick = function () {
    menu.classList.toggle('show-menu');
    hamb.classList.toggle('xChange');
}


/*:::::Top banner::::: */

const bannerContent = document.querySelector('.banner');

if (bannerContent != null) {
    if ((now.getDay() != 1) && (now.getDay() != 2)) {
        bannerContent.style.display = "none";
    } else {
        bannerContent.style.display = "block";
    };
} 

/* Number of visits since your last Discover Page */

const totalTime = document.querySelector("#timestamp");

if (totalTime!=null) {
    var start = new Date();
    var lastVisit = Number(window.localStorage.getItem('time')) == 0 ? start : new Date(window.localStorage.getItem('time'));

    
    var calculateTime = ((((start-lastVisit)/1000)/3600)/24).toFixed(0);


    if (calculateTime != 0 && calculateTime != 1) {
        totalTime.textContent = `Your last visit was ${calculateTime} days ago.`;
    } else if (calculateTime == 1){
        totalTime.textContent = `Your last visit was ${calculateTime} day ago.`;
    }else{
        totalTime.textContent = `Welcome. Your last visit was less than a day ago.`;
    }



    window.onunload = function () {
        var closeWindow = new Date();

    
        localStorage.setItem('time', closeWindow);

    }
}

/* Join Page: Form */

var datetimeField = document.querySelector('#date-time-local');
if (datetimeField != null) {
    datetimeField.textContent = `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;    
}


/* Directory Cards */

const requestURL = 'json/data.json';
const cards = document.querySelector('.cards');

if (cards != null) {
    fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    const business = jsonObject['business'];

    business.forEach(displayBusiness);
  });
}


function displayBusiness(bus) {
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');
    let span = document.createElement('span');
    let div = document.createElement('div');
    let a = document.createElement('a');
    let portrait = document.createElement('img');

    h2.textContent = `${bus.name}`;
    li1.innerHTML = `<strong>Address:</strong> ${bus.address}`;
    li2.innerHTML = `<strong>Phone number:</strong> ${bus.phone}`;
    li3.innerHTML = `<strong>Membership Level:</strong> ${bus.mLevel}`;
    span.textContent = `Since ${bus.year}`;
    a.textContent = 'Website';

    portrait.setAttribute('src', bus.img);
    portrait.setAttribute('alt', `Portrait of ${bus.name}`);
    span.setAttribute('class','year');
    a.setAttribute('href',bus.url)
    card.setAttribute('loading', 'lazy');

    div.appendChild(portrait);
    ul.append(li1, li2, li3);

    card.appendChild(h2);
    card.appendChild(div);
    card.appendChild(span);
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


/* WEATHER API */

const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-ic');

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Lima&appid=6725ba7850ae02903340395b04dba12f&units=metric';

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        
        weatherResults(data);

      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch();

function weatherResults(weatherData) {
    temperature.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

}