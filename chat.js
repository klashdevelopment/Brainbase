const bodyParser = require('body-parser');
const opai = require('openai');
function parseArray(array) {
  return JSON.stringify(array);
}
function runchat(askGpt, app, oai) {
  app.use(bodyParser.json());
  app.get('/customization', (req, res) => {
    res.send(require('fs').readFileSync('public/customize.html', { encoding: 'utf-8' }));
    res.end();
  });
  app.get('/donate', (req, res) => {
    res.send(require('fs').readFileSync('public/donate.html', { encoding: 'utf-8' }));
    res.end();
  });
  app.get('/chatbot', (req, res) => {
    res.send(require('fs').readFileSync('public/chat.html', { encoding: 'utf-8' }));
    res.end();
  });
  app.get('/vision', (req, res) => {
    res.send(require('fs').readFileSync('public/image.html', { encoding: 'utf-8' }));
    res.end();
  });
  app.get('/multibot', (req, res) => {
    res.send(require('fs').readFileSync('public/multi.html', { encoding: 'utf-8' }));
    res.end();
  });
  app.get('/boxgen', (req, res) => {
    res.send(require('fs').readFileSync('public/boxgen.html', { encoding: 'utf-8' }));
    res.end();
  });
  app.get('/imagen/api', async(req,res)=>{
    var q = req.query.prompt;
    // var oai =new(require('openai').OpenAIApi)();
    var r = await oai.createImage({
      prompt:q,
      response_format: 'url',
      n: 1,
      size: '256x256'
    });
    var fs = require('fs');
    var orig = JSON.parse(fs.readFileSync('images.json', { encoding: 'utf-8' }));
    let currentDate = new Date();
    let cDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    let cTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    orig.push({
      question: q,
      response: r.data.data[0].url,
      dateTime: "" + dateTime + ""
    });
    fs.writeFile('images.json', JSON.stringify(orig), 'utf8', () => { console.log("Brainbase has been used"); });
    res.end((await r).data.data[0].url);
  });
  app.use('/chatbotresponse', async (req, res) => {
    try {
      res.type('text/json');
      var messageHistory = [{
        role: 'system',
        content: `You are Brainbase, a large language model and chatbot trained and made by KlashDevelopment. Your lead developer is GavinGoGaming. Answer as concisely as possible. Knowledge cutoff: September 2021. Current date: ${new Date().toDateString()}.
Personality: ${req.query.person == undefined ? 'smart, funny, friendly' : req.query.person}.
IF you are sending a code block, DO NOT put the language next to the triple-backtick. ${req.query.slang ? 'From now on, use slang, gen-z-like, and lowercase.' : ''}
You are to be a ${req.query.character == undefined ? 'human' : req.query.character}. ${req.query.short ? 'You are to respond with short messages (1-2 sentences), no explanations UNLESS asked to.' : 'Try to explain as much as possible and respond with long content.'}`
      }];
      for(var history1 of req.body.history) {
        if(history1.answer == null || history1.answer == undefined || history1.answer == '') {
          continue;
        }
        console.log(history1.person == "Brainbase" ? 'assistant' : (history1.person == "Sys" ? 'system' : 'user'));
        messageHistory.push({role: history1.person == "Brainbase" ? 'assistant' : (history1.person == "Sys" ? 'system' : 'user'), content: ""+history1.answer+""});
      }
      // var oai = new opai.OpenAIApi();
      // console.log(messageHistory);
      var gptr = oai.createChatCompletion({
        messages: messageHistory,
        model: 'gpt-3.5-turbo',
        n: 1
      }).then(rsp => {
        if(rsp.statusText.includes("Too Many Requests")) {
          res.json({answer: 'Error - Brainbase\'s servers have sent a LOT of messages recently. Please wait 1-2 minutes before continuing.', tmr: true})
        }
        res.json({answer: rsp.data.choices[0].message.content});
      });
    } catch (exc) {
      console.error(exc);
      res.json({ 'isError': true, 'error': exc });
    }
  });
}

module.exports = runchat;