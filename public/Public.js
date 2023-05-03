async function name() {

var down = await (await fetch('/checkdown')).text();
if(parseInt(down) == 1) window.localStorage.href='/down.html';

if(window.localStorage.authKey == null) {
  window.location.href = '/login';
}
var MaxRequest = 250;
var userIsPremium = false;
await fetch('/user/check/premium', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({key: window.localStorage.authKey})})
.then(res => res.json())
.then(res => {userIsPremium = res.premium}).then(async unused2 => {
var userIsAdmin = false;
await fetch('/user/check/admin', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({key: window.localStorage.authKey})})
.then(res => res.json())           
.then(res => {
  userIsAdmin = res.admin;
}).then(unused=>{
  
if(userIsPremium || userIsAdmin) {
  MaxRequest = 2000;
}

  if(window.localStorage.LAST_DAY == null) {
    window.localStorage.LAST_DAY = new Date().getDate();
    window.localStorage.remreq = MaxRequest;
  }
  if(window.localStorage.LAST_DAY != new Date().getDate()) {
    window.localStorage.LAST_DAY = new Date().getDate();
    window.localStorage.remreq = MaxRequest;
  }

var newIcon = ''; //<img class=newtag height=30 src='/new-icon.png'>
var menuIcon = document.querySelector('.menu-icon');
var closeIcon = document.querySelector('.close-icon');
document.querySelector('.nav').innerHTML = `<ul>
    <li data-link="/"><span>Home</span><i class='fa-solid fa-house'></i></li>
${userIsAdmin ? `<li data-link="/admin.html"><span>Administrator</span><i class='fa-solid fa-hammer'></i></li>` : ''/*`<li data-link="/settings"><span>Account Settings</span><i class='fa-solid fa-gear'></i></li>`*/}
    <li class="spacer blue">Modes</li>`+
    // <li data-link="/multibot"><span>Multibot${newIcon}</span><i class='fa-solid fa-user-robot'></i></li>
   `<li data-link="/chatbot"><span>Chatbot</span><i class='fa-solid fa-message'></i></li>
    <li data-link="/customization"><span>Customization</span><i class='fa-solid fa-palette'></i></li>
    <li data-link="/vision"><span>Vision${newIcon}</span><i class='fa-solid fa-glasses'></i></li>
    <li class="spacer aqua">Socials</li>
    <li data-link="https://discord.gg/epBXp5hHBQ"><span>Discord</span><i class='fa-brands fa-discord'></i></li>
    <li data-link="/news"><span>News Center</span><i class='fa-solid fa-book'></i></li>
    <li data-link="/donate"><span>Donate</span><i class="fa-brands fa-usd"></i></li>
    <li class="spacer red">Other</li>
    <li data-link="/boxgen"><span>Boxgen${newIcon}</span><i class='fa-solid fa-scroll'></i></li>`+
    //<li data-link="/ask.html"><span>Classic</span><i class='fa-solid fa-microchip'></i></li>
`</ul>`;
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
});});
};name();