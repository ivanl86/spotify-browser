import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import qs from 'qs';
import Token from '../model/token';

class TokenAuthenticator {

  private TOKEN_URL: string;
  private GRANT_VALUE: string;
  private CONTENT_VALUE: string;
  private AUTH_TOKEN: string;
  private TOKEN_PATH: string;

  constructor() {
    dotenv.config({ path: "./src/.env" });
    this.TOKEN_URL = `${process.env.BASE_URL}/api/token`;
    this.GRANT_VALUE = "client_credentials";
    this.CONTENT_VALUE = "application/x-www-form-urlencoded";
    this.AUTH_TOKEN = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, "utf-8").toString("base64");
    this.TOKEN_PATH = path.join(__dirname, '/token/token.json');
  }

  private readFromJson(path: string): Promise<Token | null> {
    return new Promise((resolve) => {
      fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
          resolve(null);
        }
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          resolve(null);
        }
      })
    });
  }

  private writeToJson(path: string, token: Token): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, JSON.stringify(token, null, 2), (err) => {
        if (err) {
          return reject(err)
        }
        resolve();
      });
    });
  }

  private isExpired(token: Token): boolean {
    return new Date() > new Date(token.expires_at);
  }

  public async getJson(): Promise<Token> {
    let token: Token | null = await this.readFromJson(this.TOKEN_PATH);

    if (token && !this.isExpired(token)) {
      token.access_token;
      return token;
    }

    const response = await axios.post(
      this.TOKEN_URL,
      qs.stringify({
        grant_type: this.GRANT_VALUE
      }),
      {
        headers: {
          "Content-Type": this.CONTENT_VALUE,
          Authorization: `Basic ${this.AUTH_TOKEN}`
        }
      }
    );
    
    token = {

      access_token: response.data.access_token,
      token_type: response.data.token_type,
      expires_at: new Date(Date.now() + (response.data.expires_in * 1000))
    }

    await this.writeToJson(this.TOKEN_PATH, token);
    return token;
  }

  public async getAccess(): Promise<string> {
    return (await this.getJson()).access_token;
  }
}

export default TokenAuthenticator;