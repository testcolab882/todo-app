import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import { createProxyMiddleware } from "http-proxy-middleware";
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.get('/api/test', (req: Request, res: Response) => {
  res.send('Todo App Backend is running!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === "development") {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true
    })
  );
}
else if (NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend-dist");
  app.use("/", express.static(frontendPath));
}
else {
  console.log("please set NODE_ENV variable")
  process.exit(1);
}

app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});
