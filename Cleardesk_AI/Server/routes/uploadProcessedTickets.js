import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  BatchWriteCommand
} from "@aws-sdk/lib-dynamodb";
import finalresponse from "./payloadBuilder.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../Credentials/DynamoDB.env"),
});


const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const docClient = DynamoDBDocumentClient.from(client);


//store the final tickets in a new dynamo db table called 'Tickets'
//this table is created via the aws console

// We are sending the tickets in chunks or batches to Dynamodb to reduce the network calls
const chunks = [];
for (let i = 0; i < finalresponse.length; i += 10) {
  chunks.push(finalresponse.slice(i, i + 10));
}

async function uploadTickets() {
  for (const batch of chunks) {

    // Prepare the batch write request
    const params = {
      RequestItems: {
        Tickets: batch.map(ticket => ({
          PutRequest: {
            Item: ticket, 
          },
        })),
      },
    };

    try {
      // Send the batch write request
      const command = new BatchWriteCommand(params);
      const response = await docClient.send(command);

      if (response.UnprocessedItems && Object.keys(response.UnprocessedItems).length > 0) {
        console.warn("Some items were not processed. Retrying...");
        // simple retry logic for unprocessed items
        const retryParams = { RequestItems: response.UnprocessedItems };
        await docClient.send(new BatchWriteCommand(retryParams));
      }

      console.log(`Successfully uploaded batch of ${batch.length} tickets`);
    } catch (err) {
      console.error(" Error uploading batch:", err.message);
    }

    // small delay between batches to avoid throttling
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log("All tickets uploaded to DynamoDB!");
}

uploadTickets();