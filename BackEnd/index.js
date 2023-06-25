require('dotenv').config({ path: '../.env' });
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors=require('cors')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand,UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const data=require('./data.js')

const updateData = async (date, link,col,val) => {

  const updateCommand = new UpdateCommand({
    TableName: "temp",
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
      TableName: "temp",
      KeyConditionExpression: "#scraped_time = :scraped_timeValue",
      FilterExpression: "#category = :categoryValue",
      ExpressionAttributeNames: {
        "#scraped_time": "scraped_time",
        "#category": "category"
      },
      ExpressionAttributeValues: {
        ":scraped_timeValue": x,
        ":categoryValue": y
      }
    });
  
    const response = await docClient.send(command);
    console.log("hit the server");
    return response;
  };



app.get('/', (req, res) => {
  res.send('Health check')
})

app.post('/news', (req, res) => {
    console.log("calling dynamodb")
    const date=req.body.date
    const Category=req.body.Category
    console.log(Category)

    const temp=getdata(date,Category);
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
  if(upvote){
    console.log(link)
    console.log(date)
    console.log('feedback:'+'L')
    updateData(date,link,'feedback','l')


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