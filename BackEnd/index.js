require('dotenv').config({ path: '.env' });
const serverless=require("serverless-http")
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
var jwt = require('jsonwebtoken');
const mail = require("./mail.js");
const JWT_SECRET = process.env.jwt_token
const { auth } = require("./middleware");
const mails=['ravitejareddy.seemala@gmail.com','shaikfayaz17@saveetha.com']

const USERS = [
  {
    id: '1',
    name: "jacob",
    email: "100xgrowthteam@gmail.com",
    password: "hashed_password_1",
  }
  // Additional user objects...
];
// function that scrapes the data and summerrises
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const resp = async (openai, title, url,p_title,p_desc,scraped_data) => {
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
  const system_content = `I will give you the title and content as input. Please give me:\n- Modified title (${p_title})\n- Summarized content(${p_desc})\nPlease provide the output in JSON format as given below:\n{"modified_title": ,"summarized_content":}`;

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
    
    if(scraped_data){
      console.log("post is taking from input",scraped_data)
      post=scraped_data
    }
    
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
        console.log(bigImage)

      }
    });

    $('img').each((index, element) => {
      const imageElement = $(element);
      const imageUrl = imageElement.attr('src');
      const imageWidth = imageElement.attr('width') || 0;
      const imageHeight = imageElement.attr('height') || 0;
      const imageArea = parseInt(imageWidth) * parseInt(imageHeight);

      if (imageArea > maxArea) {
        maxArea = imageArea;
        bigImage = imageUrl;
        console.log(bigImage);
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
    bigImage=''
    return [{"modified_title":"GPT ERROR pls try again" ,"summarized_content":"GPT ERROR pls try again"},bigImage];
  }
}
const updateData = async (date, uid, updates) => {
  let updateExpression = "SET ";
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  Object.keys(updates).forEach((col, index) => {
    const attrName = `#attr${index}`;
    const attrValue = `:value${index}`;
    updateExpression += `${attrName} = ${attrValue}, `;
    expressionAttributeNames[attrName] = col;
    expressionAttributeValues[attrValue] = updates[col];
  });

  // Remove the trailing comma and space from the update expression
  const finalUpdateExpression = updateExpression.slice(0, -2);

  const updateCommand = new UpdateCommand({
    TableName: TableName,
    Key: {
      "scraped_time": date,
      "uid": parseInt(uid)
    },
    UpdateExpression: finalUpdateExpression,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues
  });

  await docClient.send(updateCommand);
  console.log("Update completed successfully.");
};



const getdata = async (x, y) => {
  let command;
  if (y.uid) {
    console.log("hitting if");
    command = new QueryCommand({
      TableName: TableName,
      KeyConditionExpression: "#scraped_time = :scraped_timeValue AND #uid = :uidValue",
      ExpressionAttributeNames: {
        "#scraped_time": "scraped_time",
        "#uid": "uid",
      },
      ExpressionAttributeValues: {
        ":scraped_timeValue": x,
        ":uidValue": parseInt(y.uid),
      },
    });

  } else {
    console.log("hitting else");

    command = new QueryCommand({
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
  }

  const response = await docClient.send(command);
  console.log("hit the server");
  return response;
};


app.post("/login", (req, res) => {
  const {email,password} = req.body;
  const user = USERS.find((x) => x.email === email);
  console.log(email,password)

  if (!user) {
    return res.status(403).json({ msg: "User not found" });
  }

  if (user.password !== password) {
    return res.status(403).json({ msg: "Incorrect password" });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_SECRET
  );

  return res.json({ token });
});


app.get('/', (req, res) => {

  // updateData('2023', 23223233232300, {'not present':"insert it"});
  
  res.send('authenticated')
})

app.post('/update_data', auth,(req, res) => {

  updateData(req.body.date, req.body.uid, req.body.update);
  
  res.send('Health check')
})


app.post('/mail', auth,(req, res) => {
  const list=req.body
  for(let j=0;j < (list.length/3);j++){
    let x=[]
    for (let i = 0; i < 3; i++) {
        if(list[i+(j*3)]){
            x.push(list[i+(j*3)]);

        }
      }
    mail(mails,x)

}

  res.send('email sent')
})

app.post('/generate', auth,(req, res) => {
  const { title, link,p_title,p_desc,scraped_data } = req.body;
// const resp = async (openai, title, url,p_title,p_desc,scraped_data) => {

    (async () => {
      const x = (await resp(openai, title, link,p_title,p_desc,scraped_data));
      console.log("--------------------")
      const obj = JSON.parse(x[0]);
      res.json({ 'gpt_title':  obj.modified_title,'gpt_summary':obj.summarized_content,'image':x[1]});

    })();

})



app.post('/news', auth,(req, res) => {
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

app.post('/user-action', auth,(req, res) => {

  const link=req.body.link
  const uid=req.body.uid
  const date=req.body.date
  const upvote=req.body.upvote
  const downvote=req.body.downvote
  const fav=req.body.fav
  const bookmark=req.body.bookmark
  const title=req.body.title
  if(upvote){
    console.log('feedback:'+'L')
    updateData(date,uid,{'feedback':'l'});
    (async () => {
      const x = (await resp(openai, title, link))[0];
      console.log("--------------------")
      const obj = JSON.parse(x);
      updateData(date,uid,{'gpt_title':obj.modified_title});
      updateData(date,uid,{'gpt_summary':obj.summarized_content});
    })();


  }
  if(downvote){
    console.log(date)
    console.log(link)
    updateData(date,uid,{'feedback':'d'})
    console.log('feedback:'+'D')

  }
  if(fav){
    console.log(date)
    console.log(link)
    updateData(date,uid,{'feedback':'f'})
    console.log('feedback:'+'F');
  
    (async () => {
      const x = (await resp(openai, title, link))[0];
      console.log("--------------------")
      const obj = JSON.parse(x);
      updateData(date,uid,{'gpt_title':obj.modified_title});
      updateData(date,uid,{'gpt_summary':obj.summarized_content});
    })();


  }
  if(fav===0||upvote===0||downvote===0){
    console.log(date)
    console.log(link)
    updateData(date,uid,{'feedback':0})
    console.log('feedback:'+'0')

  }
  if(bookmark===0){
    console.log(date)
    console.log(link)
    updateData(date,uid,{'bookmark':0})
    console.log({'bookmark':0})

  }
  if(bookmark===1){
    console.log(date)
    console.log(link)
    updateData(date,uid,{'bookmark':1})
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

// module.exports.handler=serverless(app);