const images = document.querySelectorAll("[data-src]");

const options = {
    threshold: 1,
    rootMargin: "0px 0px 100px 0px"
};

function preloadImages(img) {
    const src = img.getAttribute("data-src");
    if (!src) {
        return;
    } else {
        img.src = src;
    }
}

const imageObserver = new IntersectionObserver((entries, imageObserver) => {

    entries.forEach(entry=>{
        if(!entry.isIntersecting){
            return;
        }else{
            preloadImages(entry.target);
            imageObserver.unobserve(entry.target);
        }
    })

}, options);


images.forEach(image => {
    imageObserver.observe(image);
})