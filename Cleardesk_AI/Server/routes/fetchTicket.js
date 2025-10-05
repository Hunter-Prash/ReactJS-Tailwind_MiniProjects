import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import { Readable } from "stream";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express, { Router } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../Credentials/DynamoDB.env"),
});

const router=express.Router();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

router.get('/fetch',async(req,res)=>{
    const command=new GetObjectCommand({
        Bucket:'cleardeskai',
        Key:'tickets.json'
    })

    const response=await s3.send(command)

    const jsonstring=await response.Body.transformToString() /// waits until the entire data is fetched
    const tickets=JSON.parse(jsonstring)

    return res.status(200).json({message:'Tickets fetched',tickets:tickets})
})

export default router;