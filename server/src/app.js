import express from 'express';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import routers from './routers/index.route';

const app = express();
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use('/api', routers);

export default app;