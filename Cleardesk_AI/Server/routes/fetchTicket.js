import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../Credentials/DynamoDB.env"),
});

const router = express.Router();

const checkpointsDir = "D:\\Frontend Projects\\ReactJS-Tailwind_MiniProjects\\Cleardesk_AI\\Server\\checkpoints";
const filepath2 = path.join(checkpointsDir, "lastprocessed.json");
const filepath1 = path.join(checkpointsDir, "tickets.json");

// Ensure checkpoint folder exists
if (!fs.existsSync(checkpointsDir)) {
  fs.mkdirSync(checkpointsDir, { recursive: true });
  console.log("[INIT] Created checkpoints directory");
}

// Initialize S3
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
    console.log("---PIPELINE START----");

    // Read last processed timestamp (if exists)
    const content = fs.existsSync(filepath2) ? fs.readFileSync(filepath2, "utf-8").trim() : "";
    const isColdStart = content.length === 0;
    const lastProcessed = isColdStart ? null : new Date(JSON.parse(content));

    // List all objects in S3
    const listCommand = new ListObjectsV2Command({
      Bucket: "tickets-bucket-amzn-s3",
      Prefix: "tickets/",
    });

    const listResponse = await s3.send(listCommand);

    // ---- COLD START ----
    if (isColdStart) {
      console.log("[COLD START] Fetching all tickets...");
      for (const obj of listResponse.Contents || []) {
        const getCommand = new GetObjectCommand({
          Bucket: "tickets-bucket-amzn-s3",
          Key: obj.Key,
        });
        const response = await s3.send(getCommand);
        const jsonString = await response.Body.transformToString();
        tickets.push(JSON.parse(jsonString));
      }

      fs.writeFileSync(filepath1, JSON.stringify(tickets, null, 2));
      console.log(`[COLD START] Stored ${tickets.length} tickets.`);
    }

    // ---- INCREMENTAL FETCH ----
    // ---- INCREMENTAL FETCH ----
else {
  console.log(`[INCREMENTAL] Fetching tickets after ${lastProcessed.toISOString()}`);
  for (const obj of listResponse.Contents || []) {
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

  if (tickets.length > 0) {
    // Overwrite the file instead of merging
    fs.writeFileSync(filepath1, JSON.stringify(tickets, null, 2));
    console.log(`[INCREMENTAL] Overwrote tickets.json with ${tickets.length} new tickets.`);
  } else {
    console.log(`[INCREMENTAL] No new tickets after ${lastProcessed.toISOString()}`);
  }
}


    return res.status(200).json({
      message: "Tickets fetched successfully",
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error("❌ Error fetching tickets:", error);
    return res.status(500).json({
      message: "Error fetching tickets from S3",
      error: error.message,
    });
  }
});

export default router;
