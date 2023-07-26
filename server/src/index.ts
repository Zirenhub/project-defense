import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// routes
import authRoute from './routes/authRoute';
import tweetRoute from './routes/tweetRoute';

dotenv.config();

const app = express();
const router = express.Router();
const PORT = 3000;
const URI = process.env.DB_URI as string;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

router.use('/auth', authRoute);
router.use('/tweet', tweetRoute);

app.use('/api', router);

const server = http.createServer(app);

mongoose
  .connect(URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to mongodb err: ${err?.message}`);
  });
