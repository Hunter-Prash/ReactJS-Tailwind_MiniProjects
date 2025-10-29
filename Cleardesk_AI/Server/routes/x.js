import { S3Client, GetObjectCommand,PutObjectCommand } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import { Readable } from "stream";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express, { Router } from "express";
import fs from 'fs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../Credentials/DynamoDB.env"),
});

const router = express.Router();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});


// Folder containing tickets
const ticketsDir = path.resolve("./tickets");

// Your bucket name
const bucketName = "tickets-bucket-amzn-s3";

// Upload function
async function uploadTicketsToS3() {
  try {
    const files = fs.readdirSync(ticketsDir).filter(f => f.endsWith(".json"));

    if (files.length === 0) {
      console.log("⚠️ No ticket files found in the tickets folder.");
      return;
    }

    for (const file of files) {
      const filePath = path.join(ticketsDir, file);
      const fileContent = fs.readFileSync(filePath);

      const params = {
        Bucket: bucketName,
        Key: `tickets/${file}`, // S3 key path
        Body: fileContent,
        ContentType: "application/json",
      };

      await s3.send(new PutObjectCommand(params));
      console.log(`✅ Uploaded ${file} to S3`);
    }

    console.log("🎉 All tickets uploaded successfully!");
  } catch (err) {
    console.error("❌ Error uploading tickets:", err);
  }
}

// Run upload
uploadTicketsToS3();
