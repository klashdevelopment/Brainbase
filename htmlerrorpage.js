module.exports = function(fullerror) {
  return `<html><link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script><body style="background-color:black;color:white;font-family:monospace;">
    <h1>${fullerror}</h1>
    <pre><code class="languge-json" id="simple" style="border: 1px solid white;padding:2px;margin:1px;">${fullerror.replace('\n', "<br>")}</code></pre></body><script>hljs.highlightAll();</script></html>`;
}