async function run() {
  const { Configuration, OpenAIApi } = require("openai");
  const express = require('express');
  const app = express();
  const dotenv = require("dotenv");
  dotenv.config();
  const htmlerrorpage = require('./htmlerrorpage');
  const htmlres = require('./htmlres');
  const chat = require('./chat');
  const config = new Configuration({
    apiKey: process.env.API_KEY
  })
  const openai = await new OpenAIApi(config);
  const model = (f) => { return (f ? "code-davinci-002" : "text-davinci-003") };

  async function askGPT(question, useCode, textCompletion, isChatted = false, chatResp = "") {
    const response = await openai.createCompletion({
      model: model(useCode),
      prompt: question,
      max_tokens: 1000,
      temperature: (textCompletion != null ? 0 : 1)
    });
    var fs = require('fs');
    var orig = JSON.parse(fs.readFileSync((isChatted ? 'chats.json' : 'queries.json'), { encoding: 'utf-8' }));
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let cDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    let cTime = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    orig.push({
      question: isChatted ? chatResp : question,
      useCode: useCode,
      textComp: textCompletion,
      response: response.data.choices[0].text,
      dateTime: "" + dateTime + ""
    });
    fs.writeFile((isChatted ? 'chats.json' : 'queries.json'), JSON.stringify(orig), 'utf8', () => { console.log("Brainbase has been used"); });
    return response.data;
  }

  app.use(express.static('public')); // Serve files from the '/public' folder

  app.get('/api', async (req, res) => {
    if (req.query.question == null) {
      res.json({ "error": "No question added." });
      return;
    }
    const question = req.query.question;
    var answer;
    try {
      answer = await askGPT(question, !(req.query.code == null), req.query.completing); // Call the function askGPT with the question as a parameter
    } catch (exc) {
      console.log(exc);
      res.end(htmlerrorpage(JSON.stringify(exc)));
    }
    res.json(answer); // Write the answer to the screen
  });
  app.get('/answeronly', async (req, res) => {
    if (req.query.question == null) {
      res.json({ "error": "No question added." });
      return;
    }
    const question = req.query.question;
    var answer;
    try {
      answer = await askGPT(question, !(req.query.code == null), req.query.completing); // Call the function askGPT with the question as a parameter
    } catch (exc) {
      console.log(exc);
      res.end(htmlerrorpage(JSON.stringify(exc)));
    }
    res.end(htmlres(answer, question)); // Write the answer to the screen
  })
  app.get('/fval', async (req, res) => {
    if (req.query.question == null) {
      res.json({ "error": "No question added." });
      return;
    }
    if (req.query.fa == null) {
      res.json({ "error": "No F.A. added." });
      return;
    }
    const question = req.query.question;
    const fa = req.query.fa;
    var answer;
    try {
      answer = {
        choices: [{ text: fa, finish_reason: 'stop' }],
        object: 'text_completion',
        model: 'text-davinci-003'
      };
    } catch (exc) {
      console.log(exc);
      res.end(htmlerrorpage(JSON.stringify(exc)));
    }
    res.end(htmlres(answer, question)); // Write the answer to the screen
  })

  chat(askGPT, app);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};
run();