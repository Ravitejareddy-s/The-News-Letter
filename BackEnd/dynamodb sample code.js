require('dotenv').config({ path: '../.env' });
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand ,UpdateCommand} = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);







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

updateData('2023-06-22','https://1851franchise.com/how-to-boost-your-business-with-targeted-local-marketing-strategies-2722500','act2',243)
