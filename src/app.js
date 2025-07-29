import express from 'express';
import cors from 'cors';
import corsOptions from './config/cors.config.js';
import geolocationRoute from './routes/geolocation.route.js';
import culturaRoute from './routes/cultura.route.js';
const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/geolocation", geolocationRoute);

app.use("/api/cultura", culturaRoute);

export default app;
