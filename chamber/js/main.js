const now = new Date();

const d = new Date(document.lastModified);
const day = d.getDate();
const month = d.getMonth();
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

/* Number of visits in Discover Page */

const totalTime = document.querySelector("#timestamp");

let timeVisits = Number(window.localStorage.getItem('time'));
var start = new Date();
var calculateTime;
console.log(start);


if (timeVisits<=1) {
    totalTime.textContent = `${timeVisits} day.`;
} else {
    totalTime.textContent = `${timeVisits} days.`;
}


window.onunload = function () {
    var closeWindow = new Date();
    calculateTime = closeWindow-start;
    timeVisits = timeVisits + ((calculateTime/1000)/3600)/24;

   
    localStorage.setItem('time', timeVisits.toFixed(0));

}









