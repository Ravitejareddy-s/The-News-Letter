require('dotenv').config({ path: '../.env' });
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand ,UpdateCommand} = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);







const getdata = async (x,y) => {
  const command = new QueryCommand({
    TableName: "temp",
    KeyConditionExpression: "#scraped_time = :scraped_timeValue",
    FilterExpression: "#category = :categoryValue",
    ExpressionAttributeNames: {
      "#scraped_time": "scraped_time",
      "#category": "bookmark"
    },
    ExpressionAttributeValues: {
      ":scraped_timeValue": Object.keys(y)[0],
      ":categoryValue": Object.values(y)[0]
    }
  });

  const response = await docClient.send(command);
  console.log("hit the server");
  console.log(response);
};

getdata('2023-06-24',{'bookmark':1})
