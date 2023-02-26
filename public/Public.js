var $ = document.querySelector;
var $$= (q,c)=>{document.querySelectorAll(q).forEach(e=>c(e))};

var menuIcon = document.querySelector('.menu-icon');
var closeIcon = document.querySelector('.close-icon');
var nav = document.querySelector('.nav');
nav.outerHTML = `<nav class="nav">
<ul>
    <li data-link="/"><span>Home</span><i class='fa-solid fa-house'></i></li>
    <li class="spacer">Modes</li>
    <li data-link="/chatbot"><span>Chatbot</span><i class='fa-solid fa-message'></i></li>
    <li data-link="/customization"><span>Customization</span><i class='fa-solid fa-gear'></i></li>
    <li data-link="/vision"><span>Vision<img class=newtag height=30 src='/new-icon.png'></span><i class='fa-solid fa-glasses'></i></li>
    <li class="spacer">Socials</li>
    <li data-link="https://discord.gg/epBXp5hHBQ"><span>Discord</span><i class='fa-brands fa-discord'></i></li>
    <li data-link="/donate"><span>Donate</span><i class="fa-brands fa-usd"></i></li>
    <li class="spacer">Older</li>
    <li data-link="/ask.html"><span>Classic</span><i class='fa-solid fa-microchip'></i></li>
</ul>
</nav>`;
var content = document.querySelector('.content');
menuIcon.addEventListener('click', () => {
  closeIcon.style['display'] = 'block';
  menuIcon.style['display'] = 'none';
  nav.style['transform'] = 'translateX(0)';
  content.style['filter'] = 'blur(5px)';
  content.style.pointerEvents = 'none';
});
closeIcon.addEventListener('click', () => {
  closeIcon.style['display'] = 'none';
  menuIcon.style['display'] = 'block';
  nav.style['transform'] = 'translateX(-75vw)';
  content.style['filter'] = 'none';
  content.style.pointerEvents = 'auto';
});

var buttons = document.querySelectorAll(".nav ul li:not(.spacer)");
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        window.location.href = btn.dataset.link;
    });
});