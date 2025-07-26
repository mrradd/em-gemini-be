import express from "express";
import DotenvFlow from "dotenv-flow";
import bodyParser from "body-parser";
import geminiRouter from "./routes/gemini_router.js"
import cors from "cors"
import chatRouter from "./routes/chat_router.js";

DotenvFlow.config();
const port = process.env.PORT || 3042;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/gemini', geminiRouter);
app.use('/api/chat', chatRouter);

app.get('/heartbeat', (req, res) => {
  const date = new Date().toUTCString();
  console.log(`42: ${date}`);
  res.status(200).json({now: date});
});

app.listen(port, () => {3
  console.log(`\nServer is running on http://localhost:${port}`);
});