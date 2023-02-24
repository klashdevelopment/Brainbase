var $ = document.querySelector;
var $$= (q,c)=>{document.querySelectorAll(q).forEach(e=>c(e))};

var menuIcon = document.querySelector(".menu-icon");
var closeIcon = document.querySelector(".close-icon");
menuIcon.onclick = () => {
    closeIcon.style.display = "block";
    var nav = document.querySelector(".nav");
    nav.style.display = "block";
    document.querySelector(".content").style.filter = "blur(4px)";
    setTimeout(() => {
        nav.classList.add("slide-in");
    }, 10);
};
closeIcon.onclick = () => {
    closeIcon.style.display = "none";
    var nav = document.querySelector(".nav");
    nav.style.display = "none";
    document.querySelector(".content").style.filter = "none";
    nav.classList.remove("slide-in");
    nav.classList.add("slide-out");
    setTimeout(() => {
        nav.style.display = "none";
        document.querySelector(".content").style.filter = "none";
        nav.classList.remove("slide-out");
    }, 250);
};