module.exports = function(fullerror) {
  return `<html><link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script><body style="background-color:black;color:white;font-family:monospace;">
    <h1>Dang it! You broke Brainbase. Stop using it so much! The site will be online again in around 1 day. IF it is a school day, the site should be back on by 4:00 PM.</h1>
    <h1>${JSON.parse(fullerror).message.replace('\n', "<br>")}</h1>
    <pre><code class="languge-json" id="simple" style="border: 1px solid white;padding:2px;margin:1px;">${fullerror.replace('\n', "<br>")}</code></pre></body><script>hljs.highlightAll();</script></html>`;
}