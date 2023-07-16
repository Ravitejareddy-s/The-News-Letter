// new things added scraping image,retuning 


require('dotenv').config({ path: '.env' });
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors=require('cors')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const port = 3000
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand,UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const data=require('./data.js')
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');
const cheerio = require('cheerio');
const TableName=process.env.table_name
const mail = require("./mail.js");


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);


const resp = async (openai, title, url,p_title,p_desc) => {
    let post = '';
    if (p_title) {
        p_title=p_title
      } else {
        p_title='make the title more attractive and engaging'
      }
      
      if (p_desc) {
        p_desc=p_desc
      } else {
        p_desc="summarize news piece with a touch of humor and creativity"
      }
      const system_content = 'I will give you the title and content as input. Please give me:\n- Modified title (make the title more attractive and engaging)\n- Summarized content\nPlease provide the output in JSON format as given below:\n{"modified_title": ,"summarized_content":}';
  
    console.log(system_content)
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
                
      post=post.substring(0,10000);


      let bigImage = null;
      let maxArea = 0;
  
      $('img').each((index, element) => {
        const imageElement = $(element);
        const imageUrl = imageElement.attr('src');
        const imageWidth = imageElement.attr('width') || 0;
        const imageHeight = imageElement.attr('height') || 0;
        const imageArea = parseInt(imageWidth) * parseInt(imageHeight);
  
        if (imageArea > maxArea) {
          maxArea = imageArea;
          bigImage = imageUrl;
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
  
      return [completion.data.choices[0].message.content,bigImage];
    } catch (error) {
      console.error('Error:', error);
    }
  }


  (async () => {
    const x = await resp(openai, '', 'https://www.indiewire.com/features/interviews/sag-aftra-lead-negotiator-studios-ai-demands-interview-1234884219/',"testing","descriptive");
    // const obj = JSON.parse(x);
    console.log('gpt_title',x[0]);
    console.log('gpt_summary',x[1]);
  })();



