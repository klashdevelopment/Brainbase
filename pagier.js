module.exports = (Title = "made with pagier.js", content) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Title}</title>
    <link href="https://gtml.gavingogamingrepl.repl.co/regular-ass-style.css" rel="stylesheet">
  <link href="https://unpkg.com/movement.css/movement.css" rel="stylesheet">
</head>
<body>
    <center style="margin-left:10%;margin-right:10%;">
      ${content}
    </center>
</body>
</html>`;
}