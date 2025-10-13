// This is the producer code for the SQS queue I am pushing the messages to the queue

import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import processTickets from "./processTickets.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../Credentials/DynamoDB.env"),
});




const client = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})


const queue_url = 'https://sqs.ap-south-1.amazonaws.com/345594574524/ProcessedTicketsQueue'

const tickets = await processTickets()

// upload the tickets to the queue
async function pushTicketsToQueue() {
  try {
    for (let i = 0; i < tickets.length; i++) {
      const command = new SendMessageCommand({
        QueueUrl: queue_url,
        MessageBody: JSON.stringify(i)
      })
      const response = await client.send(command)
      console.log(`Message sent with ID: ${response.MessageId}`);

    }
    console.log('========ALL MSSGS PUSHED TO QUEUE========')
  } catch (err) {
    console.error("Error sending message to SQS:", err.message)
  }

}


pushTicketsToQueue()