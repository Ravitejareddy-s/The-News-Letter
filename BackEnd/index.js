require('dotenv').config({ path: '../.env' });
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
const mails=['ravitejareddy.seemala@gmail.com']


// function that scrapes the data and summerrises
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
// end of the scraping function

const updateData = async (date, link,col,val) => {

  const updateCommand = new UpdateCommand({
    TableName: TableName,
    Key: {
      "scraped_time": date,
      "link": link
    },
    UpdateExpression: "SET #act = :actValue",
    ExpressionAttributeNames: {
      "#act": col
    },
    ExpressionAttributeValues: {
      ":actValue": val
    }
  });

  await docClient.send(updateCommand);
  console.log("Update completed successfully.");

};

const getdata = async (x,y) => {
    const command = new QueryCommand({
      TableName: TableName,
      KeyConditionExpression: "#scraped_time = :scraped_timeValue",
      FilterExpression: "#category = :categoryValue",
      ExpressionAttributeNames: {
        "#scraped_time": "scraped_time",
        "#category": Object.keys(y)[0]
      },
      ExpressionAttributeValues: {
        ":scraped_timeValue": x,
        ":categoryValue": Object.values(y)[0]
      }
    });
  
    const response = await docClient.send(command);
    console.log("hit the server");
    return response;
  };



app.get('/', (req, res) => {
  const data=[{
    'title':'title1',
    'content':'this will be the disc of the post',
    'link':'https://blog.hubspot.com/marketing/what-is-a-blog',
    'img':'https://blog.hubspot.com/hs-fs/hubfs/what-is-a-blog-3.jpg?width=893&height=600&name=what-is-a-blog-3.jpg'
  },{
    'title':'title1',
    'content':'this will be the disc of the post',
    'link':'https://blog.hubspot.com/marketing/what-is-a-blog',
    'img':'https://blog.hubspot.com/hs-fs/hubfs/linkedin-summary-examples-4.jpg?width=893&height=600&name=linkedin-summary-examples-4.jpg'
  }]
  mail(mails,data)
  res.send('Health check')
})

app.post('/dummy', (req, res) => {

  const key=Object.keys(req.body)[1]
  const value=Object.values(req.body)[1]
  
  console.log(date);
  console.log({key:value});
  res.send('Health check')
})


app.post('/news', (req, res) => {
    console.log("calling dynamodb")
    const date=req.body.date
    const key=Object.keys(req.body)[1]
    const value=Object.values(req.body)[1]
    console.log({[key]:value})

    const temp=getdata(date,{[key]:value});
    temp.then((result) => res.send(result.Items)).catch((error) => console.error(error));
    // res.send(getdata(date).Items)
    // res.send('Hello World!')
  })


app.post('/D_news', (req, res) => {

    const date=req.body.date
    const Category=req.body.Category
    res.send(data(date,Category))
    console.log(date)
    console.log(Category)
    // res.send(getdata(date).Items)
    // res.send('Hello World!')
  })

app.post('/user-action', (req, res) => {

  const link=req.body.link
  const date=req.body.date
  const upvote=req.body.upvote
  const downvote=req.body.downvote
  const fav=req.body.fav
  const bookmark=req.body.bookmark
  const title=req.body.title
  if(upvote){
    console.log('feedback:'+'L')
    updateData(date,link,'feedback','l');
    (async () => {
      const x = await resp(openai, title, link);
      console.log("--------------------")
      const obj = JSON.parse(x);
      updateData(date,link,'gpt_title',obj.modified_title);
      updateData(date,link,'gpt_summary',obj.summarized_content);
    })();


  }
  if(downvote){
    console.log(date)
    console.log(link)
    updateData(date,link,'feedback','d')
    console.log('feedback:'+'D')

  }
  if(fav){
    console.log(date)
    console.log(link)
    updateData(date,link,'feedback','f')
    console.log('feedback:'+'F')

    (async () => {
      const x = await resp(openai, title, link);
      console.log("--------------------")
      const obj = JSON.parse(x);
      updateData(date,link,'gpt_title',obj.modified_title);
      updateData(date,link,'gpt_summary',obj.summarized_content);
    })();

  }
  if(fav===0||upvote===0||downvote===0){
    console.log(date)
    console.log(link)
    updateData(date,link,'feedback',0)
    console.log('feedback:'+'0')

  }
  if(bookmark===0){
    console.log(date)
    console.log(link)
    updateData(date,link,'bookmark',0)
    console.log({'bookmark':0})

  }
  if(bookmark===1){
    console.log(date)
    console.log(link)
    updateData(date,link,'bookmark',1)
    console.log({'bookmark':1})

  }
  res.send("dummy")


})
  
app.post('/flag', (req, res) => {
    res.send(req.body.data)
})
  
    

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})