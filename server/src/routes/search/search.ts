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
        `${process.env.API_URL}/search`,
        {
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`
          },
          params: {
            q: req.query.q,
            type: req.query.type,
            limit: req.query.limit,
            offset: req.query.offset
          }
        }
      );
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  });

export default router;
