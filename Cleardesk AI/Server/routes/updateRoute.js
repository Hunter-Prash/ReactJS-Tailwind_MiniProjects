import express, { Router } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../Credentials/DynamoDB.env"),
});

const router = express.Router();

router.post('/update', async (req, res) => {
  try {
    const { email, password, phone, country } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email (key) is required to update user' });
    }

    const client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const docClient = DynamoDBDocumentClient.from(client);

    let hashedPassword;
    const updateExpressionParts = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    // Dynamically build the update expression
    
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
      updateExpressionParts.push("#pwd = :pwd");
      expressionAttributeNames["#pwd"] = "Password";
      expressionAttributeValues[":pwd"] = hashedPassword;
    }

    if (phone) {
      updateExpressionParts.push("#ph = :ph");
      expressionAttributeNames["#ph"] = "Phone";
      expressionAttributeValues[":ph"] = phone;
    }

    if (country) {
      updateExpressionParts.push("#ct = :ct");
      expressionAttributeNames["#ct"] = "Country";
      expressionAttributeValues[":ct"] = country;
    }

    // Check if there's anything to update
    if (updateExpressionParts.length === 0) {
      return res.status(400).json({ message: "No attributes provided to update." });
    }

    const updateExpression = `set ${updateExpressionParts.join(", ")}`;

    const command = new UpdateCommand({
      TableName: "Users",
      Key: { email: email },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });

    const response = await docClient.send(command);

    return res.status(200).json({ message: "User updated successfully", updatedUser: response.Attributes });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `/update failed: ${err}` });
  }
});

export default router;