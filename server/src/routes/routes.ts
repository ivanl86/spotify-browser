import { Router } from 'express';
import albumRoute from './albums/albums';
import artistRoute from './artists/artists';
import trackRoute from './tracks/tracks';
import browseRoute from './browse/browse'
import searchRoute from './search/search'

const router = Router();

router
  .use("/albums", albumRoute)
  .use("/artists", artistRoute)
  .use("/browse", browseRoute)
  .use("/tracks", trackRoute)
  .use("/search", searchRoute);

export default router;
