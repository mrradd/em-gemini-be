import express from "express";
import DotenvFlow from "dotenv-flow";
import bodyParser from "body-parser";
import geminiRouter from "./routes/gemini_router.js"

DotenvFlow.config();

const app = express();
const port = process.env.PORT || 3042;

app.use(bodyParser.json());

app.use('/api/gemini', geminiRouter);

app.get('/heartbeat', (req, res) => {
  const date = new Date().toUTCString();
  console.log(`42: ${date}`);
  res.status(200).json({now: date});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});