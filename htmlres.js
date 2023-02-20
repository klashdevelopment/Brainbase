module.exports = function(jsonAnswer, question) {
  var realAnswer = jsonAnswer.choices[0].text;
  return `
  <html>
  <head>
    <link href="https://gtml.gavingogamingrepl.repl.co/regular-ass-style.css" rel="stylesheet">
  <link href="https://unpkg.com/movement.css/movement.css" rel="stylesheet">
  <style>
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
    .content {
      padding: 0 18px;
      display: none;
      overflow: hidden;
      background-color: gray;
      color: #f1f1f1;
    }
  </style>
  </head>
  <body>
  
    <center style="margin-left:17%;margin-right:17%;">
      <h1 class="jetbrains-mono">Brainbase</h1>
      <p data-m="reveal-right" style="box-sizing:border-box;border:3px solid white;border-radius:1.5px;" id="ques"><h2>Question Asked</h2>${question}</p><br>
      <p data-m="reveal-right" style="box-sizing:border-box;border:3px solid white;border-radius:1.5px;" id="answer"><h2>The Result</h2>${realAnswer.replaceAll("\n", "<br>")}</p><br>
      <button class="collapsible">See Advanced Details</button>
      <div class="content">
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
  </body>
  </html>
  `;
}