// PRODUCER: Upload tickets to SQS
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import processTickets from "./processTickets.js";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../Credentials/DynamoDB.env"),
});

const router = express.Router();

// ---------- AWS SQS Setup ----------
const sqsClient = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const QUEUE_URL ="https://sqs.ap-south-1.amazonaws.com/345594574524/Tickets-Queue"

// ---------- Core Logic: Push tickets to SQS ----------
async function pushTicketsToSQS() {
  try {
    const tickets = await processTickets();

    if (!tickets || tickets.length === 0) {
      console.log("No tickets to push to SQS.");
      return { status: "empty", count: 0 };
    }

    for (const ticket of tickets) {
      const command = new SendMessageCommand({
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify(ticket),
      });

      const response = await sqsClient.send(command);
      console.log(`Message sent with ID: ${response.MessageId}`);
    }

    console.log("======== ALL MESSAGES PUSHED TO QUEUE ========");
    return { status: "success", count: tickets.length };
  } catch (err) {
    console.error("Error sending messages to SQS:", err.message);
    throw err;
  }
}

// ---------- Express Route ----------
router.get("/uploadSQS", async (req, res) => {
  try {
    console.log("Starting upload to SQS queue...");
    const result = await pushTicketsToSQS();

    res.status(200).json({
      status: result.status,
      message:
        result.status === "success"
          ? "All tickets pushed to SQS successfully"
          : "No tickets available to push",
      count: result.count,
    });
  } catch (err) {
    console.error("[ERROR] Upload failed:", err.message);
    res.status(500).json({
      status: "error",
      message: "Failed to upload tickets to SQS",
      error: err.message,
    });
  }
});

export default router;
