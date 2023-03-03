var $ = document.querySelector;
var $$= (q,c)=>{document.querySelectorAll(q).forEach(e=>c(e))};

var newIcon = ''; //<img class=newtag height=30 src='/new-icon.png'>
var menuIcon = document.querySelector('.menu-icon');
var closeIcon = document.querySelector('.close-icon');
document.querySelector('.nav').innerHTML = `<ul>
    <li data-link="/"><span>Home</span><i class='fa-solid fa-house'></i></li>
    <li class="spacer blue">Modes</li>`+
    // <li data-link="/multibot"><span>Multibot${newIcon}</span><i class='fa-solid fa-user-robot'></i></li>
   `<li data-link="/chatbot"><span>Chatbot</span><i class='fa-solid fa-message'></i></li>
    <li data-link="/customization"><span>Customization</span><i class='fa-solid fa-gear'></i></li>
    <li data-link="/vision"><span>Vision${newIcon}</span><i class='fa-solid fa-glasses'></i></li>
    <li class="spacer green">Socials</li>
    <li data-link="https://discord.gg/epBXp5hHBQ"><span>Discord</span><i class='fa-brands fa-discord'></i></li>
    <li data-link="/donate"><span>Donate</span><i class="fa-brands fa-usd"></i></li>
    <li class="spacer red">Other</li>
    <li data-link="/boxgen"><span>Boxgen${newIcon}</span><i class='fa-solid fa-scroll'></i></li>
    <li data-link="/ask.html"><span>Classic</span><i class='fa-solid fa-microchip'></i></li>
</ul>`;
var content = document.querySelector('.content');
menuIcon.addEventListener('click', () => {
  closeIcon.style['display'] = 'block';
  menuIcon.style['display'] = 'none';
  document.querySelector('.nav').style['transform'] = 'translateX(0)';
  content.style['filter'] = 'blur(5px)';
  content.style.pointerEvents = 'none';
});
closeIcon.addEventListener('click', () => {
  closeIcon.style['display'] = 'none';
  menuIcon.style['display'] = 'block';
  document.querySelector('.nav').style['transform'] = 'translateX(-75vw)';
  content.style['filter'] = 'none';
  content.style.pointerEvents = 'auto';
});

var buttons = document.querySelectorAll(".nav ul li:not(.spacer)");
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        window.location.href = btn.dataset.link;
    });
});
var checks = document.querySelectorAll('.toggle-switch');
checks.forEach((check) => {
  check.addEventListener("click", ()=> {
    check.dataset.clicked = (check.dataset.clicked == 'true' ? 'false' : 'true');
  })
})
// const txl = document.querySelectorAll("textarea.adjusting");
// txl.forEach(tx=>{
//   for (let i = 0; i < tx.length; i++) {
//     tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
//     tx[i].addEventListener("input", OnInput, false);
//   }
  
//   var OnInput = ()=>{
//     tx.style.height = 0;
//     tx.style.height = (this.scrollHeight) + "px";
//   }
// })