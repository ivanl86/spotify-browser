import { Router } from 'express';
import axios from 'axios';
import qs from 'qs';
import fs from 'fs';
import path from 'path';

const router = Router();

const TOKEN_URL = `${process.env.BASE_URL}/api/token`;
const GRANT_VALUE = "client_credentials";
const CONTENT_VALUE = "application/x-www-form-urlencoded";
const AUTH_TOKEN = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, "utf-8").toString("base64")

router.get("/token", async (req, res) => {
  // if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  //   return res.status(500).json({ error: "Client ID or secret is not found!" });
  // }
  try {
    const response = await axios.post(
      TOKEN_URL,
      qs.stringify({
        grant_type: GRANT_VALUE
      }),
      {
        headers: {
          "Content-Type": CONTENT_VALUE,
          "Authorization": `Basic ${AUTH_TOKEN}`
        }
      }
    );
  } catch (error) {
    
  }
});