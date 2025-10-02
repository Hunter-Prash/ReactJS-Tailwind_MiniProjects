import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";
import jwt from 'jsonwebtoken'


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../Credentials/DynamoDB.env"),
});

const router = express.Router();

//CREATE USER
router.post("/register", async (req, res) => {
  try {
    const { email, password, phone, country } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password are required" });
    }

    const client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const docClient = DynamoDBDocumentClient.from(client);

    // Check if user already exists
    const getCmd = new GetCommand({
      TableName: "Users",
      Key: { email },
    });

    const existingUser = await docClient.send(getCmd);
    if (existingUser.Item) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    const putCmd = new PutCommand({
      TableName: "Users",
      Item: { email, Password: hashedPassword, Phone: phone, Country: country },
    });

    await docClient.send(putCmd);

    return res.status(201).json({
      message: "User registered successfully",
      userData: { email, Phone: phone, Country: country },
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `/register failed: ${err}` });
  }
});


// Read (Get User by Email)
router.get("/read", async (req, res) => {
  try {
    const { email } = req.query;//get this as url parameter

    const client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const docClient = DynamoDBDocumentClient.from(client);
     
    let response;

    if (email) {
      // Get a single user by primary key

      const command = new GetCommand({
        TableName: "Users",
        Key: { email: email },
      });

      response = await docClient.send(command);

      if (!response.Item) {
        return res.status(404).json({ message: "User not found" });
      }

        //if AUTHENTICATION successful generate JWT
        const token=jwt.sign({email:email},
        process.env.JWT_SECRET,
        {expiresIn:'20m'}
      )
      return res.status(200).json({ user: response.Item,  jwt:token});
    } 
    
    
    else {
      // Scan entire table (expensive for large tables!)
      const command = new ScanCommand({
        TableName: "Users",
      });

      response = await docClient.send(command);

      return res.status(200).json({ users: response.Items });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `/read failed: ${err}` });
  }
});

// Update User
router.post("/update", async (req, res) => {
  try {
    const { email, password, phone, country } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email (key) is required to update user" });
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

    if (updateExpressionParts.length === 0) {
      return res.status(400).json({ message: "No attributes provided to update." });
    }

    const updateExpression = `set ${updateExpressionParts.join(", ")}`;

    const command = new UpdateCommand({
      TableName: "Users",
      Key: { email },
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

// Delete User
router.delete("/delete", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required to delete user" });
    }

    const client = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    const docClient = DynamoDBDocumentClient.from(client);

    const command = new DeleteCommand({
      TableName: "Users",
      Key: { email },
      ReturnValues: "ALL_OLD",
    });

    const response = await docClient.send(command);

    if (!response.Attributes) {
      return res.status(404).json({ message: "User not found, nothing deleted" });
    }

    return res.status(200).json({ message: "User deleted successfully", deletedUser: response.Attributes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `/delete failed: ${err}` });
  }
});

export default router;
