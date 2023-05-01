import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import cookieParser from "cookie-parser";
// DB
import connectDB from "./db/connect.js";

// routers
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

// error handler
import notFound from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET));
const baseURL = process.env.BASEURL;

app.use(`${baseURL}/users`, userRouter);
app.use(`${baseURL}/chats`, chatRouter);
app.use(`${baseURL}/messages`, messageRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    const port = process.env.PORT || 8000;
    await connectDB();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
