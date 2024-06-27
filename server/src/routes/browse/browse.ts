import { Router } from 'express';
import newReleaseRoute from './new-releases';

const router = Router();

router
  .use("/new-releases", newReleaseRoute);

export default router;
