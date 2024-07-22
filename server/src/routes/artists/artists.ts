import { Router } from 'express';
import axios, { AxiosResponse } from 'axios';
import TokenAuth from '../../services/token-auth';
import Token from '../../model/token';
import topTracksRoute from './top-tracks';
import artistAlbumsRoute from './artist-albums';
import relatedAritstsRoute from './related-artists';

const router = Router();
const tokenAuth = new TokenAuth();

router.use('/top-tracks', topTracksRoute);
router.use('/artist-albums', artistAlbumsRoute);
router.use('/related-artists', relatedAritstsRoute);

router
  .route("/")
  .get(async (req, res) => {
    try {
      const token: Token = await tokenAuth.getJson();
      const response: AxiosResponse = await axios.get(
        `${process.env.API_URL}/artists/${req.query.id}`,
        {
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
    }
  });

export default router;
