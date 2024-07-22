import { Router } from 'express';
import axios, { AxiosResponse } from 'axios';
import TokenAuth from '../../services/token-auth';
import Token from '../../model/token';

const router = Router();
const tokenAuth = new TokenAuth();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const token: Token = await tokenAuth.getJson();
      const response: AxiosResponse = await axios.get(
        `${process.env.API_URL}/recommendations?seed_artists=${req.query.artistSeeds}&seed_tracks=${req.query.trackSeeds}&limit=${req.query.limit}`,
        {
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`
          }
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
    }
  });

export default router;