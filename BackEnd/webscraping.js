require('dotenv').config({ path: '.env' });
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');
const cheerio = require('cheerio');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const resp = async (openai, title, url) => {
  let post = '';

  const system_content = 'I will give you the title and content as input. Please give me:\n- Modified title (make the title more attractive and engaging)\n- Summarized content\nPlease provide the output in JSON format as given below:\n{"modified_title": ,"summarized_content":}';
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Referer': 'https://www.google.com/',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
  };

  try {
    const response = await axios.get(url, { headers });
    const html = response.data;
    const $ = cheerio.load(html);

    $('p').each((index, element) => {
      if ($(element).text().length > 100) {
        post = post + ($(element).text().trim()) + '\n';
      }
    });

    const user_content = JSON.stringify({ title: title, content: post });
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: system_content },
        { role: "user", content: user_content }
      ]
    });

    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
  }
}

(async () => {
  const x = await resp(openai, 'Scaling audio-visual learning without labels', 'https://news.mit.edu/2023/scaling-audio-visual-learning-without-labels-0605');
  console.log(x);
})();
