import express from 'express';
import router from './routes/routes';
import Logger from './middleware/logger';

const app = express();

app.use(express.json());
app.use(Logger.logRequest);
app.use(Logger.logError);
app.use("/routes", router);

export default app;