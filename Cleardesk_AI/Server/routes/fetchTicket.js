import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express, { Router } from "express";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../Credentials/DynamoDB.env"),
});

const router = express.Router();

const filepath =
  "D:\\Frontend Projects\\ReactJS-Tailwind_MiniProjects\\Cleardesk_AI\\Server\\checkpoints\\lastprocessed.json";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

router.get("/fetch", async (req, res) => {
  try {
    let tickets = [];

    // Read checkpoint (file always exists)
    const content = fs.readFileSync(filepath, "utf-8").trim();
    const isColdStart = content.length === 0;
    const lastProcessed = isColdStart ? null : new Date(JSON.parse(content));

    const listCommand = new ListObjectsV2Command({
      Bucket: "tickets-bucket-amzn-s3",
      Prefix: "tickets/",
    });

    const listResponse = await s3.send(listCommand);


    //--------COLD START----------
    if (isColdStart) {
      console.log("Cold start: fetching all tickets");
      for (const obj of listResponse.Contents) {
        const getCommand = new GetObjectCommand({
          Bucket: "tickets-bucket-amzn-s3",
          Key: obj.Key,
        });
        const response = await s3.send(getCommand);
        const jsonString = await response.Body.transformToString();
        tickets.push(JSON.parse(jsonString));
      }
    } 
    
    //-------INCREMENTAL FETCH---------
    else {
      console.log(`Incremental fetch: after ${lastProcessed.toISOString()}`);
      for (const obj of listResponse.Contents) {
        if (new Date(obj.LastModified) > lastProcessed) {
          const getCommand = new GetObjectCommand({
            Bucket: "tickets-bucket-amzn-s3",
            Key: obj.Key,
          });
          const response = await s3.send(getCommand);
          const jsonString = await response.Body.transformToString();
          tickets.push(JSON.parse(jsonString));
        }
      }
    }

    return res.status(200).json({
      message: "Incremental Tickets fetched successfully",
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({
      message: "Error fetching tickets from S3",
      error: error.message,
    });
  }
});

export default router;
