import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// routes
import authRoute from './routes/authRoute';
import tweetRoute from './routes/tweetRoute';
import commentRoute from './routes/commentRoute';

dotenv.config();

const app = express();
const router = express.Router();
const PORT = 3000;

// Transactions dont work without replicaSet query
const URI = 'mongodb://127.0.0.1:27017/project-defense?replicaSet=rs0';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);

router.use('/auth', authRoute);
router.use('/tweet', tweetRoute);
router.use('/comment', commentRoute);

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
