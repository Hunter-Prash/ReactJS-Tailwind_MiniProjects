import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import {
	ReceiveMessageCommand,
	DeleteMessageBatchCommand,
	SQSClient,
} from "@aws-sdk/client-sqs";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	DynamoDBDocumentClient,
	PutCommand
} from "@aws-sdk/lib-dynamodb";
import express from 'express'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
	path: path.resolve(__dirname, "../../Credentials/DynamoDB.env"),
});

const router=express.Router()

const sqsClient = new SQSClient({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

const dbclient = new DynamoDBClient({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});
const docClient = DynamoDBDocumentClient.from(dbclient);

const queue_url ="https://sqs.ap-south-1.amazonaws.com/345594574524/Tickets-Queue"

let dbTickets = []; // local array to store processed tickets


async function consumeMessages() {
	console.log("--- Listening for messages from SQS...");

	while (true) {
		try {
			const command = new ReceiveMessageCommand({
				QueueUrl: queue_url,
				MaxNumberOfMessages: 10,
				VisibilityTimeout:10
			});

			const response = await sqsClient.send(command);
			const messages = response.Messages || [];

			if (messages.length > 0) {
				console.log(`[OK] Received ${messages.length} messages`);

				// Parse and store tickets
				for (const msg of messages) {
					const ticket = JSON.parse(msg.Body);
					dbTickets.push(ticket);
				}

				// Delete processed messages
				const deleteParams = {
					QueueUrl: queue_url,
					Entries: messages.map((msg) => ({
						Id: msg.MessageId,
						ReceiptHandle: msg.ReceiptHandle,
					})),
				};

				const deleteCommand = new DeleteMessageBatchCommand(deleteParams);
				await sqsClient.send(deleteCommand);
				console.log(`[DEL] Deleted ${messages.length} messages from queue`);
			} else {
				console.log(" No new messages. Stopping listener...");
				break;
			}
		} catch (err) {
			console.error("[ERROR] Error receiving messages:", err.message);
			await new Promise((resolve) => setTimeout(resolve, 5000)); // retry delay
		}
	}
}

//===== Push tickets to DynamoDB =====
async function writeToDb() {
    try {
        if (dbTickets.length === 0) {
            console.log("⚠️ No tickets to upload.");
            return;
        }

        for (const msg of dbTickets) {
            // Ensure the keys exist
            if (msg.userQueue===undefined || msg.id===undefined) {
                console.error("Skipping ticket - missing userQueue or id:", msg);
                continue;
            }

            const item = {
                userQueue: msg.userQueue,  // partition key
                id: msg.id,                // sort key
                ...msg                     // include rest of the properties
            };

            const command = new PutCommand({
                TableName: "Tickets",
                Item: item,
            });

            await docClient.send(command);
            console.log(`Uploaded ticket ID: ${item.id}`);
        }
    } catch (err) {
        console.error(`[ERROR] Error uploading to DynamoDB:`, err.message);
    } finally {
		//update the last processed timestamps
		const filepath = "D:\\Frontend Projects\\ReactJS-Tailwind_MiniProjects\\Cleardesk_AI\\Server\\checkpoints\\lastprocessed.json";
		const currTimeStamp=new Date().toISOString()
		fs.writeFileSync(filepath, JSON.stringify(currTimeStamp));

    }
}

router.get("/consumeTickets", async (req, res) => {
	try {
		console.log("Starting SQS → DynamoDB pipeline...");

		dbTickets = []; // clear previous tickets

		await consumeMessages();  // step 1: fetch messages from SQS
		await writeToDb();        // step 2: push to DynamoDB

		console.log("Pipeline completed successfully");
		res.status(200).json({
			status: "success",
			message: "Tickets consumed and written to DynamoDB successfully",
			count: dbTickets.length,
		});
	} catch (err) {
		console.error("[ERROR] Pipeline failed:", err.message);
		res.status(500).json({
			status: "error",
			message: "Failed to consume or upload tickets",
			error: err.message,
		});
	}
});

export default router;