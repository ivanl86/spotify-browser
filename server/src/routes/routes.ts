import { Router } from 'express';
import albumRoute from './albums/albums';
import artistRoute from './artists/artists';
import trackRoute from './tracks/tracks';
import browseRoute from './browse/browse'

const router = Router();

router.use("/albums", albumRoute);
router.use("/artists", artistRoute);
router.use("/browse", browseRoute);
router.use("/tracks", trackRoute);

export default router;
