module.exports = function(jsonAnswer, question) {
  var realAnswer = jsonAnswer.choices[0].text;
  return `
  <html>
  <head>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7614959482950422"
     crossorigin="anonymous"></script>
  <title>${question} | Brainbase</title>
    <link href="https://gtml.gavingogamingrepl.repl.co/regular-ass-style.css" rel="stylesheet">
  <link href="https://unpkg.com/movement.css/movement.css" rel="stylesheet">
  <style>
  @import url('/navs.css');
    /* Style the button that is used to open and close the collapsible content */
    .collapsible {
      background-color: #eee;
      color: #444;
      cursor: pointer;
      padding: 18px;
      width: 100%;
      border: none;
      text-align: left;
      outline: none;
      font-size: 15px;
    }
    
    /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
    .active, .collapsible:hover {
      background-color: #ccc;
    }
    
    /* Style the collapsible content. Note: hidden by default */
    .content2 {
      padding: 0 18px;
      display: none;
      overflow: hidden;
      background-color: gray;
      color: #f1f1f1;
    }
  </style>
  </head>
  <body>
  
        <div class="menu-icon"><i class="fa-solid fa-bars"></i></div>
        <div class="close-icon"><i class="fa-solid fa-x"></i></div>
        <script>
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
        </script>
        <nav class="nav">
            <ul>
                <li data-link="/"><span>Home</span><i class="fa-solid fa-house"></i></li>
                <li class="spacer">Pages</li>
                <li data-link="/chatbot"><span>Chatbot</span><i class="fa-solid fa-message"></i></li>
                <li data-link="/chatbot/customization"><span>Customization</span><i class="fa-solid fa-gear"></i></li>
                <li data-link="/ask.html"><span>Classic</span><i class="fa-solid fa-microchip"></i></li>
                <li class="spacer">Socials</li>
                <li data-link="https://discord.gg/epBXp5hHBQ"><span>Discord</span><i class="fa-brands fa-discord"></i></li>
            </ul>
        </nav>
    <center class=content>
      <h1 class="jetbrains-mono">Brainbase</h1>
      <p data-m="reveal-right" style="box-sizing:border-box;border:3px solid white;border-radius:1.5px;" id="ques"><h2>Question Asked</h2>${question}</p><br>
      <p data-m="reveal-right" style="box-sizing:border-box;border:3px solid white;border-radius:1.5px;" id="answer"><h2>The Result</h2>${realAnswer.replaceAll("\n", "<br>")}</p><br>
      <button class="collapsible">See Advanced Details</button>
      <div class="content2">
        <a>Object: ${jsonAnswer.object}</a><br>
        <a>Model Used: ${jsonAnswer.model}</a><br>
        <a>Finish Reason: ${jsonAnswer.choices[0].finish_reason}</a><br>
      </div>
    </center>
    <script>

    var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
</script>
        <script>
            var buttons = document.querySelectorAll(".nav ul li:not(.spacer)");
            buttons.forEach((btn) => {
                btn.addEventListener("click", () => {
                    window.location.href = btn.dataset.link;
                });
            });
        </script>
        <script src="Public.js"></script>
  </body>
  </html>
  `;
}