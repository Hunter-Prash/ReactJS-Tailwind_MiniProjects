// registerRoute.js
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env file from Credentials folder
dotenv.config({
  path: path.resolve(__dirname, "../../Credentials/DynamoDB.env"),
});

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, phone, country } = req.body;

    if (!email || !password || !phone || !country) {
      return res
        .status(400)
        .json({ message: "Email, password, phone & country are required" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const docClient = DynamoDBDocumentClient.from(client);

    const command = new PutCommand({
      TableName: "Users",
      Item: {
        email: email,
        Password: hashedPassword,
        Phone: phone,
        Country: country,
      },
    });

    const response = await docClient.send(command);
    console.log("DynamoDB response:", response);

    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in /register:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
