import { DynamoDBClient , CreateTableCommand } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";
import path from "path";

// Load your specific env file
dotenv.config({ path: path.resolve('../Credentials/DynamoDB.env') });

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const params={
    TableName:'Users',
    KeySchema:[
        { AttributeName: "email", KeyType: "HASH" } // Partition key
    ],
    AttributeDefinitions: [
    { AttributeName: "email", AttributeType: "S" }
  ],
  BillingMode: "PAY_PER_REQUEST", // On-demand,
}

async function createTable() {
    try{
        const result=await client.send(new CreateTableCommand(params))
        console.log("Table created:", result.TableDescription.TableName);
    }catch(err){
        if (err.name === "ResourceInUseException") {
      console.log("Table already exists. Skipping creation.");
    } else {
      console.error("Error creating table:", err);
    }
    }
}

createTable()

