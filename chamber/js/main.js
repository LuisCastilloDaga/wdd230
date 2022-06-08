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

