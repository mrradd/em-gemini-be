import express from "express";
import DotenvFlow from "dotenv-flow";
import bodyParser from "body-parser";
import chatRouter from "./routes/chat_router.js"
import cors from "cors"

DotenvFlow.config();
const hostname = process.env.HOST || "localhost";
const port = process.env.PORT || 3042;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/gemini', chatRouter);

app.get('/heartbeat', (req, res) => {
  const date = new Date().toUTCString();
  console.log(`42: ${date}`);
  res.status(200).json({now: date});
});

app.listen(port, hostname, () => {
  console.log(`\nServer is running on http://${hostname}:${port}`);
});